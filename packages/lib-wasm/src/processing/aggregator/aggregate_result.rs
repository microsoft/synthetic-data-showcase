use js_sys::{Object, Reflect::set};
use sds_core::{
    processing::aggregator::aggregated_data::AggregatedData, utils::time::ElapsedDurationLogger,
};
use std::ops::{Deref, DerefMut};
use wasm_bindgen::{prelude::*, JsCast};

use crate::utils::js::ts_definitions::{JsAggregateResult, JsResult};

#[wasm_bindgen]
#[derive(Clone)]
pub struct WasmAggregateResult {
    aggregated_data: AggregatedData,
}

impl WasmAggregateResult {
    #[inline]
    pub fn default() -> WasmAggregateResult {
        WasmAggregateResult {
            aggregated_data: AggregatedData::default(),
        }
    }

    #[inline]
    pub fn new(aggregated_data: AggregatedData) -> WasmAggregateResult {
        WasmAggregateResult { aggregated_data }
    }
}

#[wasm_bindgen]
impl WasmAggregateResult {
    #[wasm_bindgen(getter)]
    #[wasm_bindgen(js_name = "reportingLength")]
    pub fn reporting_length(&self) -> usize {
        self.aggregated_data.reporting_length
    }

    #[wasm_bindgen(js_name = "aggregatesCountToJs")]
    pub fn aggregates_count_to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
        resolution: usize,
        counts_are_protected: bool,
    ) -> JsResult<String> {
        self.aggregated_data
            .write_aggregates_to_string(
                aggregates_delimiter,
                combination_delimiter,
                resolution,
                counts_are_protected,
            )
            .map_err(|err| JsValue::from(err.to_string()))
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
        resolution: usize,
        counts_are_protected: bool,
    ) -> JsResult<JsAggregateResult> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("aggregate result serialization"));
        let result = Object::new();

        set(
            &result,
            &"reportingLength".into(),
            &self.reporting_length().into(),
        )?;
        set(
            &result,
            &"aggregatesData".into(),
            &self
                .aggregates_count_to_js(
                    aggregates_delimiter,
                    combination_delimiter,
                    resolution,
                    counts_are_protected,
                )?
                .into(),
        )?;

        Ok(JsValue::from(result).unchecked_into::<JsAggregateResult>())
    }

    #[wasm_bindgen(js_name = "protectAggregatesCount")]
    pub fn protect_aggregates_count(&mut self, resolution: usize) {
        self.aggregated_data.protect_aggregates_count(resolution)
    }
}

impl Deref for WasmAggregateResult {
    type Target = AggregatedData;

    fn deref(&self) -> &Self::Target {
        &self.aggregated_data
    }
}

impl DerefMut for WasmAggregateResult {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.aggregated_data
    }
}
