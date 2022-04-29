use js_sys::Array;
use sds_core::data_block::CsvRecord;
use std::convert::TryFrom;
use wasm_bindgen::{JsCast, JsValue};

use crate::utils::js::JsHeaderNames;

impl JsHeaderNames {
    #[inline]
    pub fn default() -> JsHeaderNames {
        Array::default().unchecked_into()
    }
}

impl TryFrom<JsHeaderNames> for CsvRecord {
    type Error = JsValue;

    fn try_from(js_csv_record: JsHeaderNames) -> Result<Self, Self::Error> {
        js_csv_record
            .into_serde::<CsvRecord>()
            .map_err(|err| JsValue::from(err.to_string()))
    }
}
