use js_sys::{Object, Reflect::set};
use sds_core::utils::time::ElapsedDurationLogger;
use wasm_bindgen::{prelude::*, JsCast};

use crate::{
    processing::{
        aggregator::aggregate_result::WasmAggregateResult,
        evaluator::{
            aggregate_counts_stats::WasmAggregateCountsStatistics,
            sensitive_data_stats::WasmSensitiveDataStatistics,
            synthetic_data_stats::WasmSyntheticDataStatistics,
        },
    },
    utils::js::ts_definitions::{JsEvaluateResult, JsResult},
};

#[wasm_bindgen]
pub struct WasmEvaluateResult {
    aggregate_counts_stats: WasmAggregateCountsStatistics,
    sensitive_data_stats: WasmSensitiveDataStatistics,
    synthetic_data_stats: WasmSyntheticDataStatistics,
}

impl WasmEvaluateResult {
    #[inline]
    pub fn default() -> WasmEvaluateResult {
        WasmEvaluateResult {
            aggregate_counts_stats: WasmAggregateCountsStatistics::default(),
            sensitive_data_stats: WasmSensitiveDataStatistics::default(),
            synthetic_data_stats: WasmSyntheticDataStatistics::default(),
        }
    }
}

#[wasm_bindgen]
impl WasmEvaluateResult {
    #[wasm_bindgen(constructor)]
    pub fn from_aggregate_results(
        sensitive_aggregate_result: &WasmAggregateResult,
        reportable_aggregate_result: &WasmAggregateResult,
        synthetic_aggregate_result: &WasmAggregateResult,
        resolution: usize,
    ) -> JsResult<WasmEvaluateResult> {
        Ok(WasmEvaluateResult {
            aggregate_counts_stats: WasmAggregateCountsStatistics::from_aggregate_results(
                sensitive_aggregate_result,
                reportable_aggregate_result,
                resolution,
            )?,
            sensitive_data_stats: WasmSensitiveDataStatistics::from_aggregate_results(
                sensitive_aggregate_result,
                resolution,
            )?,
            synthetic_data_stats: WasmSyntheticDataStatistics::from_aggregate_results(
                sensitive_aggregate_result,
                synthetic_aggregate_result,
                resolution,
            )?,
        })
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(&self) -> JsResult<JsEvaluateResult> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("evaluate result serialization"));
        let result = Object::new();

        set(
            &result,
            &"aggregateCountsStats".into(),
            &self.aggregate_counts_stats.to_js()?.into(),
        )?;
        set(
            &result,
            &"sensitiveDataStats".into(),
            &self.sensitive_data_stats.to_js()?.into(),
        )?;
        set(
            &result,
            &"syntheticDataStats".into(),
            &self.synthetic_data_stats.to_js()?.into(),
        )?;

        Ok(JsValue::from(result).unchecked_into::<JsEvaluateResult>())
    }
}
