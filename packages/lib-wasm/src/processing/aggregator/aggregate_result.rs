use js_sys::{Object, Reflect::set};
use sds_core::{
    dp::SensitivityFilterParameters, processing::aggregator::AggregatedData,
    utils::time::ElapsedDurationLogger,
};
use std::{ops::Deref, sync::Arc};
use wasm_bindgen::{prelude::*, JsCast};

use crate::utils::js::{JsAggregateResult, JsResult};

#[wasm_bindgen]
#[derive(Clone)]
pub struct WasmAggregateResult {
    pub(crate) aggregated_data: Arc<AggregatedData>,
}

impl WasmAggregateResult {
    #[inline]
    pub fn default() -> WasmAggregateResult {
        WasmAggregateResult {
            aggregated_data: Arc::new(AggregatedData::default()),
        }
    }

    #[inline]
    pub fn new(aggregated_data: Arc<AggregatedData>) -> WasmAggregateResult {
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

    #[wasm_bindgen(js_name = "protectWithKAnonymity")]
    pub fn protect_with_k_anonymity(&mut self, resolution: usize) -> WasmAggregateResult {
        let mut new_aggregated_data = (*self.aggregated_data).clone();

        new_aggregated_data.protect_with_k_anonymity(resolution);

        WasmAggregateResult::new(Arc::new(new_aggregated_data))
    }

    #[wasm_bindgen(js_name = "protectWithDp")]
    pub fn protect_with_dp(
        &mut self,
        percentile_percentage: usize,
        sensitivity_filter_epsilon: f64,
        noise_epsilon: f64,
        noise_delta: f64,
    ) -> JsResult<WasmAggregateResult> {
        let mut new_aggregated_data = (*self.aggregated_data).clone();

        // TODO: propagate all parameters to API
        new_aggregated_data
            .protect_with_dp_adaptive_threshold(
                noise_epsilon,
                noise_delta,
                2.0,
                Some(SensitivityFilterParameters::new(
                    percentile_percentage,
                    sensitivity_filter_epsilon,
                )),
            )
            .map_err(|err| JsValue::from(err.to_string()))?;

        Ok(WasmAggregateResult::new(Arc::new(new_aggregated_data)))
    }
}

impl Deref for WasmAggregateResult {
    type Target = AggregatedData;

    fn deref(&self) -> &Self::Target {
        &self.aggregated_data
    }
}
