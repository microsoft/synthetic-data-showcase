use super::{
    csv_record_input_values::CsvRecordInputValues, headers_metadata::DataBlockHeadersMetadata,
    input_value::DataBlockInputValue, DataBlockCreatorError,
};
use fnv::FnvHashSet;
use itertools::Itertools;
use std::{collections::HashSet, fmt::Display, marker::PhantomData, sync::Arc};

/// Takes the given Subject ID and tries to join
/// multiple records having the same ID
pub struct SubjectIdJoiner<ErrorType>
where
    ErrorType: Display,
{
    phantom: PhantomData<ErrorType>,
}

impl<ErrorType> SubjectIdJoiner<ErrorType>
where
    ErrorType: Display,
{
    #[inline]
    fn validate_subject_ids(
        records_inputs: &[CsvRecordInputValues],
    ) -> Result<(), DataBlockCreatorError<ErrorType>> {
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
    ) -> Result<(), DataBlockCreatorError<ErrorType>> {
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
    ) -> Result<Vec<CsvRecordInputValues>, DataBlockCreatorError<ErrorType>> {
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

    /// Takes the `records_input` vector, the `header_metadata` with
    /// information about the subject id and multi value columns, and tries
    /// to join records with same id
    #[inline]
    pub fn join_records_by_subject_id(
        records_inputs: Vec<CsvRecordInputValues>,
        headers_metadata: &DataBlockHeadersMetadata,
    ) -> Result<Vec<CsvRecordInputValues>, DataBlockCreatorError<ErrorType>> {
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
}
