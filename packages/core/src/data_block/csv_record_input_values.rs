use super::{
    headers_metadata::DataBlockHeadersMetadata, input_value::DataBlockInputValue, CsvRecord,
};
use std::{collections::HashSet, sync::Arc};

use crate::utils::strings::{normalize_reserved_delimiters, transform_for_insensitive_cmp};

/// A record from a CSV file mapped to a vector of input values
#[derive(Clone)]
pub struct CsvRecordInputValues {
    /// ID for the given record (could be an empty string if not set)
    pub id: String,
    /// Input values for the given record (indexed by header index)
    pub values: Vec<DataBlockInputValue>,
}

impl CsvRecordInputValues {
    /// Creates a new CsvRecordInputValues
    /// # Arguments
    /// * `id`- ID for the given record (could be an empty string if not set)
    /// * `values` - Input values for the given record (indexed by header index)
    #[inline]
    pub fn new(id: String, values: Vec<DataBlockInputValue>) -> Self {
        CsvRecordInputValues { id, values }
    }

    #[inline]
    fn remove_non_sensitive_zeros_and_normalize(
        value: &str,
        header_index: usize,
        sensitive_zeros_set: &HashSet<usize>,
    ) -> Option<Arc<String>> {
        let normalized_value = Arc::new(normalize_reserved_delimiters(value));

        if !normalized_value.is_empty()
            && (sensitive_zeros_set.contains(&header_index) || *normalized_value != "0")
        {
            Some(normalized_value)
        } else {
            None
        }
    }

    #[inline]
    fn record_value_to_input_value(
        record_val: String,
        header_index: usize,
        headers_metadata: &DataBlockHeadersMetadata,
    ) -> DataBlockInputValue {
        if let Some(value_delimiter) = headers_metadata.multi_value_columns_map.get(&header_index) {
            DataBlockInputValue::MultiValue(
                record_val
                    .split(value_delimiter)
                    .filter_map(|value| {
                        Self::remove_non_sensitive_zeros_and_normalize(
                            value,
                            header_index,
                            &headers_metadata.sensitive_zeros_set,
                        )
                    })
                    .collect(),
            )
        } else {
            DataBlockInputValue::SingleValue(
                Self::remove_non_sensitive_zeros_and_normalize(
                    &record_val,
                    header_index,
                    &headers_metadata.sensitive_zeros_set,
                )
                .unwrap_or_else(|| Arc::new("".to_owned())),
            )
        }
    }

    /// Creates the vector of record inputs based on the raw CSV input
    pub fn create_records_input_values(
        mut records: Vec<CsvRecord>,
        headers_metadata: &DataBlockHeadersMetadata,
        record_limit: usize,
    ) -> Vec<CsvRecordInputValues> {
        let records_to_take = if record_limit > 0 {
            record_limit
        } else {
            // take all records
            records.len()
        };

        records
            .drain(..)
            .take(records_to_take)
            .map(|mut record| {
                CsvRecordInputValues::new(
                    headers_metadata
                        .subject_id_index
                        .map(|index| transform_for_insensitive_cmp(&record[index]))
                        .unwrap_or_default(),
                    record
                        .drain(..)
                        .enumerate()
                        .filter_map(|(header_index, record_val)| {
                            if headers_metadata.use_columns_set.contains(&header_index) {
                                Some(Self::record_value_to_input_value(
                                    record_val,
                                    header_index,
                                    headers_metadata,
                                ))
                            } else {
                                None
                            }
                        })
                        .collect(),
                )
            })
            .collect()
    }
}
