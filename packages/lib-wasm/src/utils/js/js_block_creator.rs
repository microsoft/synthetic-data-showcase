use js_sys::Array;
use sds_core::data_block::{block::DataBlockCreator, typedefs::CsvRecord};

pub struct JsDataBlockCreator;

impl DataBlockCreator for JsDataBlockCreator {
    type InputType = Array;
    type ErrorType = String;

    fn get_headers(csv_data: &mut Array) -> Result<CsvRecord, String> {
        let headers = csv_data.get(0);

        if headers.is_undefined() {
            Err(String::from("missing headers"))
        } else {
            match headers.into_serde::<Vec<String>>() {
                Ok(h) => Ok(h),
                Err(_) => Err(String::from("headers should an Array<string>")),
            }
        }
    }

    fn get_records(csv_data: &mut Self::InputType) -> Result<Vec<CsvRecord>, String> {
        csv_data
            .slice(1, csv_data.length())
            .iter()
            .map(|record| match record.into_serde::<Vec<String>>() {
                Ok(h) => Ok(h),
                Err(_) => Err(String::from("records should an Array<string>")),
            })
            .collect::<Result<Vec<CsvRecord>, String>>()
    }
}
