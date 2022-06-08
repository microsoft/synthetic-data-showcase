use std::{collections::HashMap, convert::TryFrom};
use wasm_bindgen::JsValue;

use crate::utils::js::JsMultiValueColumns;

pub type MultiValueColumns = HashMap<String, String>;

impl TryFrom<JsMultiValueColumns> for MultiValueColumns {
    type Error = JsValue;

    fn try_from(js_multi_value_columns: JsMultiValueColumns) -> Result<Self, Self::Error> {
        js_multi_value_columns
            .into_serde::<MultiValueColumns>()
            .map_err(|err| JsValue::from(err.to_string()))
    }
}
