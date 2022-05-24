use js_sys::{Object, Reflect::set};
use sds_core::utils::time::ElapsedDurationLogger;
use wasm_bindgen::{prelude::*, JsCast};

use crate::{
    processing::aggregator::WasmAggregateResult,
    utils::js::{JsEvaluateResult, JsResult},
};

use super::microdata_data_stats::WasmMicrodataStatistics;

#[wasm_bindgen]
#[derive(Default)]
pub struct WasmEvaluateResult {
    aggregate_counts_stats: WasmMicrodataStatistics,
    sensitive_data_stats: WasmMicrodataStatistics,
    synthetic_data_stats: WasmMicrodataStatistics,
    synthetic_vs_aggregate_data_stats: WasmMicrodataStatistics,
    reporting_length: usize,
}

#[wasm_bindgen]
impl WasmEvaluateResult {
    #[wasm_bindgen(constructor)]
    pub fn from_aggregate_results(
        sensitive_aggregate_result: &WasmAggregateResult,
        reportable_aggregate_result: &WasmAggregateResult,
        synthetic_aggregate_result: &WasmAggregateResult,
        resolution: usize,
        reporting_length: usize,
    ) -> JsResult<WasmEvaluateResult> {
        Ok(WasmEvaluateResult {
            aggregate_counts_stats: WasmMicrodataStatistics::from_aggregate_results(
                sensitive_aggregate_result,
                reportable_aggregate_result,
                resolution,
            )?,
            sensitive_data_stats: WasmMicrodataStatistics::from_aggregate_results(
                sensitive_aggregate_result,
                sensitive_aggregate_result,
                resolution,
            )?,
            synthetic_data_stats: WasmMicrodataStatistics::from_aggregate_results(
                sensitive_aggregate_result,
                synthetic_aggregate_result,
                resolution,
            )?,
            synthetic_vs_aggregate_data_stats: WasmMicrodataStatistics::from_aggregate_results(
                reportable_aggregate_result,
                synthetic_aggregate_result,
                resolution,
            )?,
            reporting_length,
        })
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(&self) -> JsResult<JsEvaluateResult> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("evaluate result serialization"));
        let result = Object::new();

        set(
            &result,
            &"reportingLength".into(),
            &self.reporting_length.into(),
        )?;
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
        set(
            &result,
            &"syntheticVsAggregateDataStats".into(),
            &self.synthetic_vs_aggregate_data_stats.to_js()?.into(),
        )?;

        Ok(JsValue::from(result).unchecked_into::<JsEvaluateResult>())
    }
}
