use sds_core::dp::NoisyCountThreshold;
use wasm_bindgen::JsValue;

use crate::utils::js::JsNoisyCountThreshold;

impl TryFrom<JsNoisyCountThreshold> for NoisyCountThreshold {
    type Error = JsValue;

    fn try_from(js_threshold: JsNoisyCountThreshold) -> Result<Self, Self::Error> {
        js_threshold
            .into_serde::<NoisyCountThreshold>()
            .map_err(|err| JsValue::from(err.to_string()))
    }
}
