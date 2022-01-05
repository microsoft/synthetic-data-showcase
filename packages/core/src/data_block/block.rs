use super::{
    typedefs::{
        AttributeRows, AttributeRowsByColumnMap, AttributeRowsMap, ColumnIndexByName,
        DataBlockHeaders, DataBlockRecords,
    },
    value::DataBlockValue,
};
use fnv::FnvHashMap;
use itertools::Itertools;
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::{processing::aggregator::typedefs::RecordsSet, utils::math::uround_down};

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

/// Represents a data block that can be derived from a particular dataset.
/// The goal of this is to allow data processing to handle with memory references
/// to the data block instead of copying data around
#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Debug, Serialize, Deserialize)]
pub struct DataBlock {
    /// Vector of strings representing the data headers
    pub headers: DataBlockHeaders,
    /// Vector of data records, where each record represents a row (headers not included)
    pub records: DataBlockRecords,
}

impl DataBlock {
    /// Returns a new DataBlock with default values
    pub fn default() -> DataBlock {
        DataBlock {
            headers: DataBlockHeaders::default(),
            records: DataBlockRecords::default(),
        }
    }

    /// Returns a new DataBlock
    /// # Arguments
    /// * `headers` - Vector of string representing the data headers
    /// * `records` - Vector of data records, where each record represents a row (headers not included)
    #[inline]
    pub fn new(headers: DataBlockHeaders, records: DataBlockRecords) -> DataBlock {
        DataBlock { headers, records }
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

    // Calculates the rows where each value on the data records is present
    /// grouped by column index.
    #[inline]
    pub fn calc_attr_rows_with_no_empty_values(&self) -> AttributeRowsByColumnMap {
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
    pub fn calc_attr_rows_by_column(&self, empty_value: &Arc<String>) -> AttributeRowsByColumnMap {
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
                // it's now used being used, so we make sure to remove this from the column empty records
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
}
