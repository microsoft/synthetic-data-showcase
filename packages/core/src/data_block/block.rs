use super::{
    typedefs::{
        AttributeRows, AttributeRowsByColumnMap, AttributeRowsMap, ColumnIndexByName,
        DataBlockHeaders, DataBlockRecords,
    },
    value::DataBlockValue,
    MultiValueColumnMetadataMap, RawData, RawDataMultiValueColumnJoiner,
};
use fnv::FnvHashMap;
use itertools::Itertools;
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::{
    processing::{aggregator::RecordsSet, generator::SynthesizerCacheKey},
    utils::math::uround_down,
};

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

/// Represents a data block that can be derived from a particular dataset.
/// The goal of this is to allow data processing to handle with memory references
/// to the data block instead of copying data around
#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Debug, Serialize, Deserialize, Eq, PartialEq)]
pub struct DataBlock {
    /// Vector of strings representing the data headers
    pub headers: DataBlockHeaders,
    /// Maps a normalized multi-value header name (such as A_a1) to its corresponding metadata
    pub multi_value_column_metadata_map: MultiValueColumnMetadataMap,
    /// Vector of data records, where each record represents a row (headers not included)
    pub records: DataBlockRecords,
}

impl DataBlock {
    /// Returns a new DataBlock with default values
    pub fn default() -> DataBlock {
        DataBlock {
            headers: DataBlockHeaders::default(),
            multi_value_column_metadata_map: MultiValueColumnMetadataMap::default(),
            records: DataBlockRecords::default(),
        }
    }

    /// Returns a new DataBlock
    /// # Arguments
    /// * `headers` - Vector of string representing the data headers
    /// * `multi_value_column_metadata_map` - Maps a normalized multi-value header name (such as A_a1) to
    /// its corresponding metadata
    /// * `records` - Vector of data records, where each record represents a row (headers not included)
    #[inline]
    pub fn new(
        headers: DataBlockHeaders,
        multi_value_column_metadata_map: MultiValueColumnMetadataMap,
        records: DataBlockRecords,
    ) -> DataBlock {
        DataBlock {
            headers,
            multi_value_column_metadata_map,
            records,
        }
    }

    /// Returns a map of column name -> column index
    #[inline]
    pub fn calc_column_index_by_name(&self) -> ColumnIndexByName {
        self.headers
            .iter()
            .enumerate()
            .map(|(column_index, column_name)| ((**column_name).clone(), column_index))
            .collect()
    }

    /// Calculates the rows where each value on the data records is present
    #[inline]
    pub fn calc_attr_rows(&self) -> AttributeRowsMap {
        let mut attr_rows: AttributeRowsMap = AttributeRowsMap::default();

        for (i, r) in self.records.iter().enumerate() {
            for v in r.values.iter() {
                attr_rows
                    .entry(v.clone())
                    .or_insert_with(AttributeRows::new)
                    .push(i);
            }
        }
        attr_rows
    }

    /// Calculates the rows where each value on the data records is present
    /// grouped by column index.
    #[inline]
    pub fn calc_attr_rows_by_column_with_no_empty_values(&self) -> AttributeRowsByColumnMap {
        let mut attr_rows_by_column: AttributeRowsByColumnMap = AttributeRowsByColumnMap::default();

        for (i, r) in self.records.iter().enumerate() {
            for v in r.values.iter() {
                attr_rows_by_column
                    .entry(v.column_index)
                    .or_insert_with(AttributeRowsMap::default)
                    .entry(v.clone())
                    .or_insert_with(AttributeRows::new)
                    .push(i);
            }
        }
        attr_rows_by_column
    }

    /// Calculates the rows where each value on the data records is present
    /// grouped by column index. This will also include empty values mapped with
    /// the `empty_value` string.
    /// # Arguments
    /// * `empty_value` - Empty values on the final synthetic data will be represented by this
    #[inline]
    pub fn calc_attr_rows_by_column_with_empty_values(
        &self,
        empty_value: &Arc<String>,
    ) -> AttributeRowsByColumnMap {
        let mut attr_rows_by_column: FnvHashMap<
            usize,
            FnvHashMap<Arc<DataBlockValue>, RecordsSet>,
        > = FnvHashMap::default();
        let empty_records: RecordsSet = (0..self.records.len()).collect();

        // start with empty values for all columns
        for column_index in 0..self.headers.len() {
            attr_rows_by_column
                .entry(column_index)
                .or_insert_with(FnvHashMap::default)
                .entry(Arc::new(DataBlockValue::new(
                    column_index,
                    empty_value.clone(),
                )))
                .or_insert_with(|| empty_records.clone());
        }

        // go through each record and map where the values occur on the columns
        for (i, r) in self.records.iter().enumerate() {
            for value in r.values.iter() {
                let current_attr_rows = attr_rows_by_column
                    .entry(value.column_index)
                    .or_insert_with(FnvHashMap::default);

                // insert it on the correspondent entry for the data block value
                current_attr_rows
                    .entry(value.clone())
                    .or_insert_with(RecordsSet::default)
                    .insert(i);
                // it's now being used, so we make sure to remove this from the column empty records
                current_attr_rows
                    .entry(Arc::new(DataBlockValue::new(
                        value.column_index,
                        empty_value.clone(),
                    )))
                    .or_insert_with(RecordsSet::default)
                    .remove(&i);
            }
        }

        // sort the records ids, so we can leverage the intersection alg later on
        attr_rows_by_column
            .drain()
            .map(|(column_index, mut attr_rows)| {
                (
                    column_index,
                    attr_rows
                        .drain()
                        .map(|(value, mut rows_set)| (value, rows_set.drain().sorted().collect()))
                        .collect(),
                )
            })
            .collect()
    }

    #[inline]
    /// Returns the number of records on the data block
    pub fn number_of_records(&self) -> usize {
        self.records.len()
    }

    #[inline]
    /// Returns the number of records on the data block protected by `resolution`
    pub fn protected_number_of_records(&self, resolution: usize) -> usize {
        uround_down(self.number_of_records() as f64, resolution as f64)
    }

    #[inline]
    /// Normalizes the reporting length based on the number of selected headers.
    /// Returns the normalized value
    /// # Arguments
    /// * `reporting_length` - Reporting length to be normalized (0 means use all columns)
    pub fn normalize_reporting_length(&self, reporting_length: usize) -> usize {
        if reporting_length == 0 {
            self.headers.len()
        } else {
            usize::min(reporting_length, self.headers.len())
        }
    }

    #[inline]
    /// Creates a `RawData` vector for the stored data,
    /// where the first entry is the headers
    /// # Arguments
    /// * `empty_value` - Empty values will be replaced by this
    pub fn to_raw_data(&self, empty_value: &Arc<String>) -> RawData {
        let mut raw_data: RawData = vec![self.headers.iter().map(|h| (*h).clone()).collect()];
        let n_headers = self.headers.len();

        raw_data.append(
            &mut self
                .records
                .iter()
                .map(|r| SynthesizerCacheKey::new(n_headers, &r.values).format_record(empty_value))
                .collect(),
        );
        raw_data
    }

    #[inline]
    /// Clones the data block data to a `Vec<Vec<String>>`,
    /// where the first entry is the headers
    /// # Arguments
    /// * `empty_value` - Empty values will be replaced by this
    /// * `join_multi_value_columns` - Whether multi value columns should be joined back together or not
    pub fn to_raw_data_vec(
        &self,
        empty_value: &Arc<String>,
        join_multi_value_columns: bool,
    ) -> Vec<Vec<String>> {
        Self::raw_data_to_vec(
            &self.to_raw_data(empty_value),
            empty_value,
            &self.multi_value_column_metadata_map,
            join_multi_value_columns,
        )
    }

    #[inline]
    /// Clones the `raw_data` data to a `Vec<Vec<String>>`,
    /// where the first entry is the headers
    /// # Arguments
    /// * `raw_data` - Raw data to be cloned
    /// * `empty_value` - Empty values will be replaced by this
    /// * `multi_value_column_metadata_map` - Maps a normalized multi-value header name (such as A_a1)
    /// to its corresponding metadata
    /// * `join_multi_value_columns` - Whether multi value columns should be joined back together or not
    pub fn raw_data_to_vec(
        raw_data: &RawData,
        empty_value: &Arc<String>,
        multi_value_column_metadata_map: &MultiValueColumnMetadataMap,
        join_multi_value_columns: bool,
    ) -> Vec<Vec<String>> {
        let mut raw_data_vec = if join_multi_value_columns {
            RawDataMultiValueColumnJoiner::new(
                raw_data,
                multi_value_column_metadata_map,
                empty_value,
            )
            .join()
        } else {
            raw_data.clone()
        };
        raw_data_vec
            .drain(..)
            .map(|mut record| record.drain(..).map(|value| (*value).clone()).collect())
            .collect()
    }
}
