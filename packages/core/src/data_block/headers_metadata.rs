use super::{
    csv_record_input_values::CsvRecordInputValues, input_value::DataBlockInputValue, CsvRecord,
    CsvRecordRef, CsvRecordSlice, DataBlockHeaders, MultiValueColumnMetadata,
    MultiValueColumnMetadataMap,
};
use fnv::FnvHashSet;
use itertools::Itertools;
use std::{
    collections::{HashMap, HashSet},
    sync::Arc,
};

use crate::utils::strings::{normalize_reserved_delimiters, transform_for_insensitive_cmp};

#[derive(Debug)]
/// Metadata about the headers being currently parsed
pub struct DataBlockHeadersMetadata {
    /// Normalized headers names to be used
    /// (after filtering according with the columns to be used)
    pub normalized_headers_to_be_used: CsvRecordRef,
    /// Index of a possible Subject ID column
    pub subject_id_index: Option<usize>,
    /// Index of the original headers to be used
    pub use_columns_set: HashSet<usize>,
    /// Index of the original headers that contain sensitive zeros
    pub sensitive_zeros_set: HashSet<usize>,
    /// Index of the original headers that contain
    /// multi value columns, mapped to the corresponding delimiter
    pub multi_value_columns_map: HashMap<usize, String>,
    /// Normalized header names of the multi value columns and its delimiters
    pub multi_value_column_normalized_names_delimiters_map: HashMap<String, String>,
}

impl DataBlockHeadersMetadata {
    #[inline]
    fn gen_use_columns_set(raw_headers: &CsvRecordSlice, use_columns: &[String]) -> HashSet<usize> {
        let use_columns_str_set: HashSet<String> = use_columns
            .iter()
            .map(|c| transform_for_insensitive_cmp(c))
            .collect();
        raw_headers
            .iter()
            .enumerate()
            .filter_map(|(i, h)| {
                if use_columns_str_set.is_empty()
                    || use_columns_str_set.contains(&transform_for_insensitive_cmp(h))
                {
                    Some(i)
                } else {
                    None
                }
            })
            .collect()
    }

    #[inline]
    fn find_subject_id_index(
        raw_headers: &CsvRecordSlice,
        subject_id: Option<String>,
    ) -> Option<usize> {
        subject_id.and_then(|s_id| {
            let subject_id_for_cmp = transform_for_insensitive_cmp(&s_id);
            raw_headers
                .iter()
                .find_position(|h| *transform_for_insensitive_cmp(h) == *subject_id_for_cmp)
                .map(|(index, _)| index)
        })
    }

    #[inline]
    fn gen_normalized_headers_to_be_used(
        raw_headers: &CsvRecordSlice,
        use_columns_set: &HashSet<usize>,
    ) -> CsvRecordRef {
        raw_headers
            .iter()
            .enumerate()
            .filter_map(|(i, h)| {
                if use_columns_set.contains(&i) {
                    Some(Arc::new(normalize_reserved_delimiters(h)))
                } else {
                    None
                }
            })
            .collect()
    }

    #[inline]
    fn gen_sensitive_zeros_set(
        raw_headers: &CsvRecordSlice,
        sensitive_zeros: &[String],
    ) -> HashSet<usize> {
        let sensitive_zeros_str_set: HashSet<String> = sensitive_zeros
            .iter()
            .map(|c| transform_for_insensitive_cmp(c))
            .collect();
        raw_headers
            .iter()
            .enumerate()
            .filter_map(|(i, h)| {
                if sensitive_zeros_str_set.contains(&transform_for_insensitive_cmp(h)) {
                    Some(i)
                } else {
                    None
                }
            })
            .collect()
    }

    #[inline]
    fn gen_multi_value_columns_map(
        raw_headers: &CsvRecordSlice,
        multi_value_columns: &HashMap<String, String>,
    ) -> HashMap<usize, String> {
        let multi_value_columns_str_map: HashMap<String, String> = multi_value_columns
            .iter()
            .map(|(c, delimiter)| (transform_for_insensitive_cmp(c), delimiter.clone()))
            .collect();
        raw_headers
            .iter()
            .enumerate()
            .filter_map(|(i, h)| {
                multi_value_columns_str_map
                    .get(&transform_for_insensitive_cmp(h))
                    .map(|delimiter| (i, delimiter.clone()))
            })
            .collect()
    }

    #[inline]
    fn gen_multi_value_column_normalized_names_delimiters_map(
        raw_headers: &CsvRecordSlice,
        multi_value_columns_map: &HashMap<usize, String>,
    ) -> HashMap<String, String> {
        raw_headers
            .iter()
            .enumerate()
            .filter_map(|(i, h)| {
                multi_value_columns_map
                    .get(&i)
                    .map(|delim| (normalize_reserved_delimiters(h), delim.clone()))
            })
            .collect()
    }

    /// Creates the headers metadata
    /// # Arguments
    /// * `raw_headers` - Raw headers parsed from the CSV/TSV file
    /// * `subject_id` - Optional name of an ID column, if provided will be used for validation
    /// and also to join records with the same id
    /// * `use_columns` - Column names to be used
    /// * `multi_value_columns` - Column names with multi value columns and
    /// their corresponding delimiters
    /// * `sensitive_zeros` - Column names with sensitive zeros
    #[inline]
    pub fn new(
        raw_headers: CsvRecord,
        subject_id: Option<String>,
        use_columns: &[String],
        multi_value_columns: &HashMap<String, String>,
        sensitive_zeros: &[String],
    ) -> Self {
        let subject_id_index = Self::find_subject_id_index(&raw_headers, subject_id);
        let use_columns_set = Self::gen_use_columns_set(&raw_headers, use_columns);
        let normalized_headers_to_be_used =
            Self::gen_normalized_headers_to_be_used(&raw_headers, &use_columns_set);
        let sensitive_zeros_set = Self::gen_sensitive_zeros_set(&raw_headers, sensitive_zeros);
        let multi_value_columns_map =
            Self::gen_multi_value_columns_map(&raw_headers, multi_value_columns);
        let multi_value_column_normalized_names_delimiters_map =
            Self::gen_multi_value_column_normalized_names_delimiters_map(
                &raw_headers,
                &multi_value_columns_map,
            );

        DataBlockHeadersMetadata {
            subject_id_index,
            use_columns_set,
            normalized_headers_to_be_used,
            sensitive_zeros_set,
            multi_value_columns_map,
            multi_value_column_normalized_names_delimiters_map,
        }
    }

    /// Builds a record with empty values based on the header schema
    pub fn build_record_with_empty_values(&self) -> Vec<DataBlockInputValue> {
        self.normalized_headers_to_be_used
            .iter()
            .map(|h| {
                if self
                    .multi_value_column_normalized_names_delimiters_map
                    .contains_key(&**h)
                {
                    DataBlockInputValue::MultiValue(FnvHashSet::default())
                } else {
                    DataBlockInputValue::SingleValue(Arc::new("".to_owned()))
                }
            })
            .collect()
    }

    /// Creates the final headers array and the multi value column metadata
    /// based on the record inputs.
    pub fn create_headers_and_multi_value_columns_metadata(
        &self,
        records_inputs: &[CsvRecordInputValues],
    ) -> (DataBlockHeaders, MultiValueColumnMetadataMap) {
        let mut multi_value_column_metadata_map = MultiValueColumnMetadataMap::default();

        (self.normalized_headers_to_be_used
            .iter()
            .enumerate()
            .flat_map(|(input_index, normalized_header)| {
                let mut values_set = HashSet::new();

                if let Some(delim) = self.multi_value_column_normalized_names_delimiters_map.get(&**normalized_header) {
                    for record_input in records_inputs.iter() {
                        let input_value = &record_input.values[input_index];

                        match input_value {
                            DataBlockInputValue::MultiValue(values) => {
                                values_set.extend(
                                values
                                        .iter()
                                        .map(|value| {
                                            let multi_value_header_name = Arc::new(Self::format_multi_value_header(normalized_header, value));

                                            multi_value_column_metadata_map
                                                .entry(multi_value_header_name.clone())
                                                .or_insert_with(|| MultiValueColumnMetadata::new(
                                                    normalized_header.clone(),
                                                    value.clone(),
                                                    delim.clone())
                                                );
                                            multi_value_header_name
                                        })
                                );
                            },
                            _ => {
                                // this should never happen, force panic here
                                panic!("invalid single value in multi value column, this is an implementation bug");
                            }
                        }
                    }
                } else {
                    values_set.insert(normalized_header.clone());
                }
                values_set.drain().sorted()
            }).collect(), multi_value_column_metadata_map)
    }

    /// Formats the multi value header name using the base `header` name
    /// and the attribute `value`
    #[inline]
    pub fn format_multi_value_header(header: &str, value: &str) -> String {
        format!("{header}_{value}")
    }
}
