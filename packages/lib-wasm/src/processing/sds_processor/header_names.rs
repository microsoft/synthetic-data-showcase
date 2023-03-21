use std::convert::TryFrom;
use wasm_bindgen::JsValue;

use crate::utils::js::{from_js_value, JsHeaderNames};

pub type HeaderNames = Vec<String>;

impl TryFrom<JsHeaderNames> for HeaderNames {
    type Error = JsValue;

    fn try_from(js_header_names: JsHeaderNames) -> Result<Self, Self::Error> {
        from_js_value(&js_header_names).map_err(|err| JsValue::from(err.to_string()))
    }
}
