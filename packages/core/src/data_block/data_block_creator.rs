use super::{
    block::DataBlock,
    headers_metadata::DataBlockHeadersMetadata,
    input_value::DataBlockInputValue,
    record::DataBlockRecord,
    typedefs::{CsvRecord, DataBlockRecords},
    value::DataBlockValue,
    CsvRecordInputValues, DataBlockHeaders, DataBlockHeadersSlice, MultiValueColumnMetadata,
};
use itertools::Itertools;
use std::{
    collections::{HashMap, HashSet},
    sync::Arc,
};

use crate::{
    data_block::MultiValueColumnMetadataMap, utils::strings::normalize_reserved_delimiters,
};

/// Trait that needs to be implement to create a data block.
/// It already contains the logic to create the data block, so we only
/// need to worry about mapping the headers and records from InputType
pub trait DataBlockCreator {
    /// Creator input type, it can be a File Reader, another data structure...
    type InputType;
    /// The error type that can be generated when parsing headers/records
    type ErrorType;

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

    #[inline]
    fn gen_records_input_values(
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
                    .collect()
            })
            .collect()
    }

    #[inline]
    fn format_multi_value_header(header: &str, value: &str) -> String {
        format!("{header}_{value}")
    }

    #[inline]
    fn create_headers_and_multi_value_columns_metadata(
        records_inputs: &[CsvRecordInputValues],
        headers_metadata: &DataBlockHeadersMetadata,
    ) -> (DataBlockHeaders, MultiValueColumnMetadataMap) {
        let mut multi_value_column_metadata_map = MultiValueColumnMetadataMap::default();

        (headers_metadata.normalized_headers_to_be_used
            .iter()
            .enumerate()
            .flat_map(|(input_index, normalized_header)| {
                let mut values_set = HashSet::new();

                if let Some(delim) = headers_metadata.multi_value_column_normalized_names_delimiters_map.get(&**normalized_header) {
                    for record_input in records_inputs.iter() {
                        let input_value = &record_input[input_index];

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

    #[inline]
    fn create_records(
        headers: &DataBlockHeadersSlice,
        headers_metadata: &DataBlockHeadersMetadata,
        mut records_inputs: Vec<CsvRecordInputValues>,
    ) -> DataBlockRecords {
        let header_index_by_name: HashMap<Arc<String>, usize> = headers
            .iter()
            .enumerate()
            .map(|(i, h)| (h.clone(), i))
            .collect();

        records_inputs
            .drain(..)
            .map(|mut record_input| {
                let mut result_records: Vec<Arc<DataBlockValue>> = Vec::new();

                for (i, input_value) in record_input.drain(..).enumerate() {
                    let normalized_header = &headers_metadata.normalized_headers_to_be_used[i];

                    match input_value {
                        DataBlockInputValue::SingleValue(value) => {
                            if !value.is_empty() {
                                result_records.push(Arc::new(DataBlockValue::new(
                                    header_index_by_name[normalized_header],
                                    value,
                                )));
                            }
                        }
                        DataBlockInputValue::MultiValue(mut values) => {
                            result_records.extend(values.drain(..).map(|value| {
                                Arc::new(DataBlockValue::new(
                                    header_index_by_name[&Self::format_multi_value_header(
                                        normalized_header,
                                        &value,
                                    )],
                                    Arc::new("1".to_owned()),
                                ))
                            }));
                        }
                    }
                }
                Arc::new(DataBlockRecord::new(result_records))
            })
            .collect()
    }

    #[inline]
    fn create(
        input_res: Result<Self::InputType, Self::ErrorType>,
        use_columns: &[String],
        multi_value_columns: &HashMap<String, String>,
        sensitive_zeros: &[String],
        record_limit: usize,
    ) -> Result<Arc<DataBlock>, Self::ErrorType> {
        let mut input = input_res?;
        let headers_metadata = DataBlockHeadersMetadata::new(
            Self::get_headers(&mut input)?,
            use_columns,
            multi_value_columns,
            sensitive_zeros,
        );
        let records_inputs = Self::gen_records_input_values(
            Self::get_records(&mut input)?,
            &headers_metadata,
            record_limit,
        );
        let (headers, multi_value_column_metadata_map) =
            Self::create_headers_and_multi_value_columns_metadata(
                &records_inputs,
                &headers_metadata,
            );
        let records = Self::create_records(&headers, &headers_metadata, records_inputs);

        Ok(Arc::new(DataBlock::new(
            headers,
            multi_value_column_metadata_map,
            records,
        )))
    }

    /// Should be implemented to return the CsvRecords representing the headers
    fn get_headers(input: &mut Self::InputType) -> Result<CsvRecord, Self::ErrorType>;

    /// Should be implemented to return the vector of CsvRecords representing rows
    fn get_records(input: &mut Self::InputType) -> Result<Vec<CsvRecord>, Self::ErrorType>;
}
