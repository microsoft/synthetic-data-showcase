use super::{
    block::DataBlock,
    csv_record_input_values::CsvRecordInputValues,
    headers_metadata::DataBlockHeadersMetadata,
    input_value::DataBlockInputValue,
    record::DataBlockRecord,
    typedefs::{CsvRecord, DataBlockRecords},
    value::DataBlockValue,
    DataBlockCreatorError, DataBlockHeaders, DataBlockHeadersSlice, MultiValueColumnMetadata,
};
use fnv::FnvHashSet;
use itertools::Itertools;
use std::{
    collections::{HashMap, HashSet},
    fmt::Display,
    sync::Arc,
};

use crate::{
    data_block::MultiValueColumnMetadataMap,
    utils::strings::{normalize_reserved_delimiters, transform_for_insensitive_cmp},
};

/// Trait that needs to be implement to create a data block.
/// It already contains the logic to create the data block, so we only
/// need to worry about mapping the headers and records from InputType
pub trait DataBlockCreator
where
    Self::ErrorType: Display,
{
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

    #[inline]
    fn validate_subject_ids(
        records_inputs: &[CsvRecordInputValues],
    ) -> Result<(), DataBlockCreatorError<Self::ErrorType>> {
        if records_inputs
            .iter()
            .any(|record_input| record_input.id.is_empty())
        {
            return Err(DataBlockCreatorError::JoinRecordsByIdError(
                "records with missing/empty Subject ID".to_owned(),
            ));
        }
        Ok(())
    }

    #[inline]
    fn join_single_value_to_input(
        new_value: Arc<String>,
        joined_record_input: &mut CsvRecordInputValues,
        index: usize,
        missing_multi_values_indexes: &mut HashSet<usize>,
    ) {
        if !new_value.is_empty() {
            match &mut joined_record_input.values[index] {
                DataBlockInputValue::SingleValue(value) => {
                    if value.is_empty() {
                        // the current stores value is empty, we can replace it
                        *value = new_value;
                    } else if *value != new_value {
                        // the current stored value is different from the new one
                        // this should now happen and column should be marked
                        // as multi column
                        missing_multi_values_indexes.insert(index);
                    }
                }
                _ => {
                    // this should never happen, force panic here
                    panic!("expected single value but found multi value");
                }
            }
        }
    }

    #[inline]
    fn join_multi_value_to_input(
        new_values: FnvHashSet<Arc<String>>,
        joined_record_input: &mut CsvRecordInputValues,
        index: usize,
    ) {
        match &mut joined_record_input.values[index] {
            DataBlockInputValue::MultiValue(values) => {
                values.extend(new_values);
            }
            _ => {
                // this should never happen, force panic here
                panic!("expected multi value but found single value");
            }
        }
    }

    #[inline]
    fn group_records_by_id(
        mut records_inputs: Vec<CsvRecordInputValues>,
        missing_multi_values_indexes: &mut HashSet<usize>,
        base_record: Vec<DataBlockInputValue>,
    ) -> Vec<CsvRecordInputValues> {
        // sort by key, group by only works on consecutive elements
        records_inputs.sort_unstable_by(|a, b| a.id.cmp(&b.id));

        records_inputs
            .drain(..)
            .group_by(|record_input| record_input.id.clone())
            .into_iter()
            .map(|(id, group)| {
                let mut joined_record_input = CsvRecordInputValues::new(id, base_record.clone());

                for mut record_input in group {
                    for (i, input_value) in record_input.values.drain(..).enumerate() {
                        match input_value {
                            DataBlockInputValue::SingleValue(new_value) => {
                                Self::join_single_value_to_input(
                                    new_value,
                                    &mut joined_record_input,
                                    i,
                                    missing_multi_values_indexes,
                                );
                            }
                            DataBlockInputValue::MultiValue(new_values) => {
                                Self::join_multi_value_to_input(
                                    new_values,
                                    &mut joined_record_input,
                                    i,
                                );
                            }
                        }
                    }
                }
                joined_record_input
            })
            .collect()
    }

    #[inline]
    fn validate_missing_multi_value_columns(
        missing_multi_values_indexes: &HashSet<usize>,
        headers_metadata: &DataBlockHeadersMetadata,
    ) -> Result<(), DataBlockCreatorError<Self::ErrorType>> {
        if !missing_multi_values_indexes.is_empty() {
            let missing_multi_values_names = missing_multi_values_indexes
                .iter()
                .sorted()
                .map(|index| &headers_metadata.normalized_headers_to_be_used[*index])
                .join(", ");
            return Err(DataBlockCreatorError::JoinRecordsByIdError(format!("records with duplicated IDs, please set the following columns as multi value if you want to join records with duplicated IDs: {missing_multi_values_names}")));
        }
        Ok(())
    }

    #[inline]
    fn validate_multi_value_columns_and_group_records_by_id(
        records_inputs: Vec<CsvRecordInputValues>,
        headers_metadata: &DataBlockHeadersMetadata,
    ) -> Result<Vec<CsvRecordInputValues>, DataBlockCreatorError<Self::ErrorType>> {
        let mut missing_multi_values_indexes = HashSet::new();
        let result = Self::group_records_by_id(
            records_inputs,
            &mut missing_multi_values_indexes,
            headers_metadata.build_record_with_empty_values(),
        );

        Self::validate_missing_multi_value_columns(
            &missing_multi_values_indexes,
            headers_metadata,
        )?;

        Ok(result)
    }

    #[inline]
    fn join_records_by_subject_id(
        records_inputs: Vec<CsvRecordInputValues>,
        headers_metadata: &DataBlockHeadersMetadata,
    ) -> Result<Vec<CsvRecordInputValues>, DataBlockCreatorError<Self::ErrorType>> {
        if headers_metadata.subject_id_index.is_some() && !records_inputs.is_empty() {
            Self::validate_subject_ids(&records_inputs)?;
            Self::validate_multi_value_columns_and_group_records_by_id(
                records_inputs,
                headers_metadata,
            )
        } else {
            Ok(records_inputs)
        }
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

                for (i, input_value) in record_input.values.drain(..).enumerate() {
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
                            result_records.extend(values.drain().sorted().map(|value| {
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
    ) -> Result<Arc<DataBlock>, DataBlockCreatorError<Self::ErrorType>> {
        // TODO: Make this a parameter
        let subject_id: Option<String> = None;

        let mut input = input_res.map_err(DataBlockCreatorError::ParsingError)?;
        let headers_metadata = DataBlockHeadersMetadata::new(
            Self::get_headers(&mut input).map_err(DataBlockCreatorError::ParsingError)?,
            subject_id,
            use_columns,
            multi_value_columns,
            sensitive_zeros,
        );
        let records_inputs = Self::join_records_by_subject_id(
            Self::gen_records_input_values(
                Self::get_records(&mut input).map_err(DataBlockCreatorError::ParsingError)?,
                &headers_metadata,
                record_limit,
            ),
            &headers_metadata,
        )?;
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
