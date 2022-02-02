use js_sys::{Object, Reflect::set};
use sds_core::{
    processing::generator::generated_data::GeneratedData, utils::time::ElapsedDurationLogger,
};
use std::ops::{Deref, DerefMut};
use wasm_bindgen::{prelude::*, JsCast};

use crate::utils::js::ts_definitions::{JsGenerateResult, JsResult};

#[wasm_bindgen]
pub struct WasmGenerateResult {
    generated_data: GeneratedData,
}

impl WasmGenerateResult {
    #[inline]
    pub fn default() -> WasmGenerateResult {
        WasmGenerateResult {
            generated_data: GeneratedData::default(),
        }
    }

    #[inline]
    pub fn new(generated_data: GeneratedData) -> WasmGenerateResult {
        WasmGenerateResult { generated_data }
    }
}

#[wasm_bindgen]
impl WasmGenerateResult {
    #[wasm_bindgen(getter)]
    #[wasm_bindgen(js_name = "expansionRatio")]
    pub fn expansion_ratio(&self) -> f64 {
        self.generated_data.expansion_ratio
    }

    #[wasm_bindgen(js_name = "syntheticDataToJs")]
    pub fn synthetic_data_to_js(&self, delimiter: char) -> JsResult<String> {
        self.generated_data
            .synthetic_data_to_string(delimiter)
            .map_err(|err| JsValue::from(err.to_string()))
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(&self, delimiter: char) -> JsResult<JsGenerateResult> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("generate result serialization"));
        let result = Object::new();

        set(
            &result,
            &"expansionRatio".into(),
            &self.expansion_ratio().into(),
        )?;
        set(
            &result,
            &"syntheticData".into(),
            &self.synthetic_data_to_js(delimiter)?.into(),
        )?;

        Ok(JsValue::from(result).unchecked_into::<JsGenerateResult>())
    }
}

impl Deref for WasmGenerateResult {
    type Target = GeneratedData;

    fn deref(&self) -> &Self::Target {
        &self.generated_data
    }
}

impl DerefMut for WasmGenerateResult {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.generated_data
    }
}
