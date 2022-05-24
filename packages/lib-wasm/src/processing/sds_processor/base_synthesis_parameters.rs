use serde::{Deserialize, Serialize};
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

use crate::utils::js::JsBaseSynthesisParameters;

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[wasm_bindgen]
pub struct WasmBaseSynthesisParameters {
    pub(crate) resolution: usize,
    pub(crate) cache_max_size: Option<usize>,
    pub(crate) empty_value: Option<String>,
}

impl TryFrom<JsBaseSynthesisParameters> for WasmBaseSynthesisParameters {
    type Error = JsValue;

    fn try_from(js_base_params: JsBaseSynthesisParameters) -> Result<Self, Self::Error> {
        js_base_params
            .into_serde::<WasmBaseSynthesisParameters>()
            .map_err(|err| JsValue::from(err.to_string()))
    }
}
