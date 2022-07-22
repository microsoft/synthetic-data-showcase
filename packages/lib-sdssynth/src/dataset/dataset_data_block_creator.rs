use super::DatasetRawData;
use pyo3::exceptions::PyValueError;
use pyo3::prelude::*;
use sds_core::data_block::{CsvRecord, DataBlockCreator};

pub struct DatasetDataBlockCreator;

impl DataBlockCreator for DatasetDataBlockCreator {
    type InputType = DatasetRawData;
    type ErrorType = PyErr;

    fn get_headers(input: &mut Self::InputType) -> Result<CsvRecord, Self::ErrorType> {
        if input.is_empty() {
            return Err(PyValueError::new_err("dataset missing headers"));
        }
        // for the headers, we just clone, without reusing the memory
        Ok(input[0].clone())
    }

    fn get_records(input: &mut Self::InputType) -> Result<Vec<CsvRecord>, Self::ErrorType> {
        let headers_len = input.get(0).map(|headers| headers.len()).unwrap_or(0);
        // this consumes from the input data to reuse the same memory
        let records: Vec<CsvRecord> = input.drain(1..).collect();

        if records.iter().any(|r| r.len() != headers_len) {
            return Err(PyValueError::new_err(
                "the number of headers must be the same as the number of elements in every record",
            ));
        }
        Ok(records)
    }
}
