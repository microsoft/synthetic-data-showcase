use super::{
    block::DataBlock,
    csv_record_input_values::CsvRecordInputValues,
    headers_metadata::DataBlockHeadersMetadata,
    input_value::DataBlockInputValue,
    record::DataBlockRecord,
    subject_id_joiner::SubjectIdJoiner,
    typedefs::{CsvRecord, DataBlockRecords},
    value::DataBlockValue,
    DataBlockCreatorError, DataBlockHeadersSlice,
};
use itertools::Itertools;
use std::{collections::HashMap, fmt::Display, sync::Arc};

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
                                    header_index_by_name
                                        [&DataBlockHeadersMetadata::format_multi_value_header(
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
        subject_id: Option<String>,
        use_columns: &[String],
        multi_value_columns: &HashMap<String, String>,
        sensitive_zeros: &[String],
        record_limit: usize,
    ) -> Result<Arc<DataBlock>, DataBlockCreatorError<Self::ErrorType>> {
        let mut input = input_res.map_err(DataBlockCreatorError::ParsingError)?;
        let headers_metadata = DataBlockHeadersMetadata::new(
            Self::get_headers(&mut input).map_err(DataBlockCreatorError::ParsingError)?,
            subject_id,
            use_columns,
            multi_value_columns,
            sensitive_zeros,
        );
        let records_inputs = SubjectIdJoiner::join_records_by_subject_id(
            CsvRecordInputValues::create_records_input_values(
                Self::get_records(&mut input).map_err(DataBlockCreatorError::ParsingError)?,
                &headers_metadata,
                record_limit,
            ),
            &headers_metadata,
        )?;
        let (headers, multi_value_column_metadata_map) =
            headers_metadata.create_headers_and_multi_value_columns_metadata(&records_inputs);
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
