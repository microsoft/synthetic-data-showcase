use std::convert::TryFrom;
use wasm_bindgen::JsValue;

use crate::utils::js::JsHeaderNames;

pub type HeaderNames = Vec<String>;

impl TryFrom<JsHeaderNames> for HeaderNames {
    type Error = JsValue;

    fn try_from(js_header_names: JsHeaderNames) -> Result<Self, Self::Error> {
        js_header_names
            .into_serde::<HeaderNames>()
            .map_err(|err| JsValue::from(err.to_string()))
    }
}
