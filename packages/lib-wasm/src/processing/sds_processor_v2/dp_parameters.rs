use sds_core::dp::DpParameters;
use wasm_bindgen::JsValue;

use crate::utils::js::JsDpParameters;

impl TryFrom<JsDpParameters> for DpParameters {
    type Error = JsValue;

    fn try_from(js_dp_params: JsDpParameters) -> Result<Self, Self::Error> {
        js_dp_params
            .into_serde::<DpParameters>()
            .map_err(|err| JsValue::from(err.to_string()))
    }
}
