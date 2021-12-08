use super::js_block_creator::JsDataBlockCreator;
use js_sys::Array;
use sds_core::{
    data_block::{
        block::{DataBlock, DataBlockCreator},
        typedefs::CsvRecord,
    },
    utils::time::ElapsedDurationLogger,
};

#[inline]
pub fn deserialize_use_columns(use_columns: Array) -> Result<CsvRecord, String> {
    let _duration_logger = ElapsedDurationLogger::new(String::from("deserialize_use_columns"));

    match use_columns.into_serde::<CsvRecord>() {
        Ok(v) => Ok(v),
        _ => Err(String::from("use_columns should be an Array<string>")),
    }
}

#[inline]
pub fn deserialize_sensitive_zeros(sensitive_zeros: Array) -> Result<CsvRecord, String> {
    let _duration_logger = ElapsedDurationLogger::new(String::from("deserialize_sensitive_zeros"));

    match sensitive_zeros.into_serde::<CsvRecord>() {
        Ok(v) => Ok(v),
        _ => Err(String::from("sensitive_zeros should be an Array<string>")),
    }
}

#[inline]
pub fn deserialize_csv_data(
    csv_data: Array,
    use_columns: &[String],
    sensitive_zeros: &[String],
    record_limit: usize,
) -> Result<DataBlock, String> {
    let _duration_logger = ElapsedDurationLogger::new(String::from("deserialize_csv_data"));

    JsDataBlockCreator::create(Ok(csv_data), use_columns, sensitive_zeros, record_limit)
}
