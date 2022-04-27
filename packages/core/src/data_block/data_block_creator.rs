use super::{
    block::DataBlock,
    record::DataBlockRecord,
    typedefs::{CsvRecord, CsvRecordRef, CsvRecordRefSlice, CsvRecordSlice, DataBlockRecords},
    value::DataBlockValue,
};
use std::{collections::HashSet, sync::Arc};

/// Trait that needs to be implement to create a data block.
/// It already contains the logic to create the data block, so we only
/// need to worry about mapping the headers and records from InputType
pub trait DataBlockCreator {
    /// Creator input type, it can be a File Reader, another data structure...
    type InputType;
    /// The error type that can be generated when parsing headers/records
    type ErrorType;

    #[inline]
    fn gen_use_columns_set(headers: &CsvRecordSlice, use_columns: &[String]) -> HashSet<usize> {
        let use_columns_str_set: HashSet<String> = use_columns
            .iter()
            .map(|c| c.trim().to_lowercase())
            .collect();
        headers
            .iter()
            .enumerate()
            .filter_map(|(i, h)| {
                if use_columns_str_set.is_empty()
                    || use_columns_str_set.contains(&h.trim().to_lowercase())
                {
                    Some(i)
                } else {
                    None
                }
            })
            .collect()
    }

    #[inline]
    fn gen_sensitive_zeros_set(
        filtered_headers: &CsvRecordRefSlice,
        sensitive_zeros: &[String],
    ) -> HashSet<usize> {
        let sensitive_zeros_str_set: HashSet<String> = sensitive_zeros
            .iter()
            .map(|c| c.trim().to_lowercase())
            .collect();
        filtered_headers
            .iter()
            .enumerate()
            .filter_map(|(i, h)| {
                if sensitive_zeros_str_set.contains(&h.trim().to_lowercase()) {
                    Some(i)
                } else {
                    None
                }
            })
            .collect()
    }

    #[inline]
    fn normalize_value(value: &str) -> String {
        value
            .trim()
            // replace reserved delimiters
            .replace(';', "<semicolon>")
            .replace(':', "<colon>")
    }

    #[inline]
    fn map_headers(
        headers: &mut CsvRecord,
        use_columns: &[String],
        sensitive_zeros: &[String],
    ) -> (CsvRecordRef, HashSet<usize>, HashSet<usize>) {
        let use_columns_set = Self::gen_use_columns_set(headers, use_columns);
        let filtered_headers: CsvRecordRef = headers
            .iter()
            .enumerate()
            .filter_map(|(i, h)| {
                if use_columns_set.contains(&i) {
                    Some(Arc::new(Self::normalize_value(h)))
                } else {
                    None
                }
            })
            .collect();
        let sensitive_zeros_set = Self::gen_sensitive_zeros_set(&filtered_headers, sensitive_zeros);

        (filtered_headers, use_columns_set, sensitive_zeros_set)
    }

    #[inline]
    fn map_records(
        records: &[CsvRecord],
        use_columns_set: &HashSet<usize>,
        sensitive_zeros_set: &HashSet<usize>,
        record_limit: usize,
    ) -> DataBlockRecords {
        let map_result = |record: &CsvRecord| {
            let values: CsvRecord = record
                .iter()
                .enumerate()
                .filter_map(|(i, h)| {
                    if use_columns_set.contains(&i) {
                        Some(h.trim().to_string())
                    } else {
                        None
                    }
                })
                .collect();

            Arc::new(DataBlockRecord::new(
                values
                    .iter()
                    .enumerate()
                    .filter_map(|(i, r)| {
                        let record_val = Self::normalize_value(r);
                        if !record_val.is_empty()
                            && (sensitive_zeros_set.contains(&i) || record_val != "0")
                        {
                            Some(Arc::new(DataBlockValue::new(i, Arc::new(record_val))))
                        } else {
                            None
                        }
                    })
                    .collect(),
            ))
        };

        if record_limit > 0 {
            records.iter().take(record_limit).map(map_result).collect()
        } else {
            records.iter().map(map_result).collect()
        }
    }

    #[inline]
    fn create(
        input_res: Result<Self::InputType, Self::ErrorType>,
        use_columns: &[String],
        sensitive_zeros: &[String],
        record_limit: usize,
    ) -> Result<Arc<DataBlock>, Self::ErrorType> {
        let mut input = input_res?;
        let (headers, use_columns_set, sensitive_zeros_set) = Self::map_headers(
            &mut Self::get_headers(&mut input)?,
            use_columns,
            sensitive_zeros,
        );
        let records = Self::map_records(
            &Self::get_records(&mut input)?,
            &use_columns_set,
            &sensitive_zeros_set,
            record_limit,
        );

        Ok(Arc::new(DataBlock::new(headers, records)))
    }

    /// Should be implemented to return the CsvRecords representing the headers
    fn get_headers(input: &mut Self::InputType) -> Result<CsvRecord, Self::ErrorType>;

    /// Should be implemented to return the vector of CsvRecords representing rows
    fn get_records(input: &mut Self::InputType) -> Result<Vec<CsvRecord>, Self::ErrorType>;
}
