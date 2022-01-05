use js_sys::Array;
use sds_core::data_block::{data_block_creator::DataBlockCreator, typedefs::CsvRecord};
use wasm_bindgen::JsValue;

pub struct JsDataBlockCreator;

impl DataBlockCreator for JsDataBlockCreator {
    type InputType = Array;
    type ErrorType = JsValue;

    fn get_headers(csv_data: &mut Self::InputType) -> Result<CsvRecord, Self::ErrorType> {
        let headers = csv_data.get(0);

        if headers.is_undefined() {
            Err(JsValue::from("csv data missing headers"))
        } else {
            headers
                .into_serde::<CsvRecord>()
                .map_err(|err| JsValue::from(err.to_string()))
        }
    }

    fn get_records(csv_data: &mut Self::InputType) -> Result<Vec<CsvRecord>, Self::ErrorType> {
        csv_data
            .slice(1, csv_data.length())
            .iter()
            .map(|record| {
                record
                    .into_serde::<CsvRecord>()
                    .map_err(|err| JsValue::from(err.to_string()))
            })
            .collect::<Result<Vec<CsvRecord>, Self::ErrorType>>()
    }
}
