use super::{
    record::DataBlockRecord,
    typedefs::{
        AttributeRows, AttributeRowsMap, CsvRecord, CsvRecordSlice, DataBlockHeaders,
        DataBlockRecords, DataBlockRecordsSlice,
    },
    value::DataBlockValue,
};
use std::collections::HashSet;

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

/// Represents a data block that can be derived from a particular dataset.
/// The goal of this is to allow data processing to handle with memory references
/// to the data block instead of copying data around
#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Debug)]
pub struct DataBlock {
    /// Vector of strings representhing the data headers
    pub headers: DataBlockHeaders,
    /// Vector of data records, where each record represents a row (headers not included)
    pub records: DataBlockRecords,
}

impl DataBlock {
    /// Returns a new DataBlock
    /// # Arguments
    /// * `headers` - Vector of string representhing the data headers
    /// * `records` - Vector of data records, where each record represents a row (headers not included)
    #[inline]
    pub fn new(headers: DataBlockHeaders, records: DataBlockRecords) -> DataBlock {
        DataBlock { headers, records }
    }

    /// Calcules the rows where each value on the data records is present
    /// # Arguments
    /// * `records`: List of records to analyze
    #[inline]
    pub fn calc_attr_rows(records: &DataBlockRecordsSlice) -> AttributeRowsMap {
        let mut attr_rows: AttributeRowsMap = AttributeRowsMap::default();

        for (i, r) in records.iter().enumerate() {
            for v in r.values.iter() {
                attr_rows
                    .entry(v)
                    .or_insert_with(AttributeRows::new)
                    .push(i);
            }
        }
        attr_rows
    }
}

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
        filtered_headers: &CsvRecordSlice,
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
    fn map_headers(
        headers: &mut CsvRecord,
        use_columns: &[String],
        sensitive_zeros: &[String],
    ) -> (CsvRecord, HashSet<usize>, HashSet<usize>) {
        let use_columns_set = Self::gen_use_columns_set(headers, use_columns);
        let filtered_headers: CsvRecord = headers
            .iter()
            .enumerate()
            .filter_map(|(i, h)| {
                if use_columns_set.contains(&i) {
                    Some(h.clone())
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

            DataBlockRecord::new(
                values
                    .iter()
                    .enumerate()
                    .filter_map(|(i, r)| {
                        let record_val = r.trim();
                        if !record_val.is_empty()
                            && (sensitive_zeros_set.contains(&i) || record_val != "0")
                        {
                            Some(DataBlockValue::new(i, record_val.into()))
                        } else {
                            None
                        }
                    })
                    .collect(),
            )
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
    ) -> Result<DataBlock, Self::ErrorType> {
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

        Ok(DataBlock::new(headers, records))
    }

    /// Should be implemented to return the CsvRecords reprensenting the headers
    fn get_headers(input: &mut Self::InputType) -> Result<CsvRecord, Self::ErrorType>;

    /// Should be implemented to return the vector of CsvRecords reprensenting rows
    fn get_records(input: &mut Self::InputType) -> Result<Vec<CsvRecord>, Self::ErrorType>;
}
