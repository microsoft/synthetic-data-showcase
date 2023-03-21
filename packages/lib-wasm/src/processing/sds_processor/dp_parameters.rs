use sds_core::dp::DpParameters;
use wasm_bindgen::JsValue;

use crate::utils::js::{from_js_value, JsDpParameters};

impl TryFrom<JsDpParameters> for DpParameters {
    type Error = JsValue;

    fn try_from(js_dp_params: JsDpParameters) -> Result<Self, Self::Error> {
        from_js_value(&js_dp_params).map_err(|err| JsValue::from(err.to_string()))
    }
}
