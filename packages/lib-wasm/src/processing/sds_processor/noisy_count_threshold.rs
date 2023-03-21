use sds_core::dp::NoisyCountThreshold;
use wasm_bindgen::JsValue;

use crate::utils::js::{from_js_value, JsNoisyCountThreshold};

impl TryFrom<JsNoisyCountThreshold> for NoisyCountThreshold {
    type Error = JsValue;

    fn try_from(js_threshold: JsNoisyCountThreshold) -> Result<Self, Self::Error> {
        from_js_value(&js_threshold).map_err(|err| JsValue::from(err.to_string()))
    }
}
