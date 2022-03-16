use super::stats::{
    calc_distinct_combinations_count_by_len, calc_leakage_count_by_len,
    calc_leakage_percentage_by_len, calc_mean_combinations_count_by_len,
    calc_rare_combinations_count_by_len, calc_rare_combinations_percentage,
    calc_rare_combinations_percentage_by_len, calc_records_with_rare_combinations_percentage,
    calc_records_with_unique_combinations_percentage, calc_unique_combinations_percentage,
};
use crate::{
    processing::aggregator::aggregate_result::WasmAggregateResult,
    utils::js::ts_definitions::{JsResult, JsSensitiveDataStatistics},
};
use sds_core::processing::aggregator::typedefs::{
    AggregatedCountByLenMap, AggregatedMetricByLenMap,
};
use serde::Serialize;
use wasm_bindgen::{prelude::wasm_bindgen, JsCast, JsValue};

#[wasm_bindgen]
#[derive(Serialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct WasmSensitiveDataStatistics {
    mean_combinations_count_by_len: AggregatedMetricByLenMap,
    distinct_combinations_count_by_len: AggregatedCountByLenMap,
    rare_combinations_count_by_len: AggregatedCountByLenMap,
    rare_combinations_percentage_by_len: AggregatedMetricByLenMap,
    leakage_count_by_len: AggregatedCountByLenMap,
    leakage_percentage_by_len: AggregatedMetricByLenMap,
    records_with_unique_combinations_percentage: f64,
    records_with_rare_combinations_percentage: f64,
    unique_combinations_percentage: f64,
    rare_combinations_percentage: f64,
}

#[wasm_bindgen]
impl WasmSensitiveDataStatistics {
    #[wasm_bindgen(constructor)]
    pub fn from_aggregate_results(
        sensitive_aggregate_result: &WasmAggregateResult,
        resolution: usize,
    ) -> JsResult<WasmSensitiveDataStatistics> {
        let privacy_risk_summary = sensitive_aggregate_result.calc_privacy_risk(resolution);

        Ok(WasmSensitiveDataStatistics {
            mean_combinations_count_by_len: calc_mean_combinations_count_by_len(
                sensitive_aggregate_result,
            ),
            distinct_combinations_count_by_len: calc_distinct_combinations_count_by_len(
                sensitive_aggregate_result,
            ),
            rare_combinations_count_by_len: calc_rare_combinations_count_by_len(
                sensitive_aggregate_result,
                resolution,
            ),
            rare_combinations_percentage_by_len: calc_rare_combinations_percentage_by_len(
                sensitive_aggregate_result,
                resolution,
            ),
            leakage_count_by_len: calc_leakage_count_by_len(
                sensitive_aggregate_result,
                sensitive_aggregate_result,
                resolution,
            ),
            leakage_percentage_by_len: calc_leakage_percentage_by_len(
                sensitive_aggregate_result,
                sensitive_aggregate_result,
                resolution,
            ),
            records_with_unique_combinations_percentage:
                calc_records_with_unique_combinations_percentage(&privacy_risk_summary),
            records_with_rare_combinations_percentage:
                calc_records_with_rare_combinations_percentage(&privacy_risk_summary),
            unique_combinations_percentage: calc_unique_combinations_percentage(
                &privacy_risk_summary,
            ),
            rare_combinations_percentage: calc_rare_combinations_percentage(&privacy_risk_summary),
        })
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(&self) -> JsResult<JsSensitiveDataStatistics> {
        Ok(JsValue::from_serde(self)
            .map_err(|err| JsValue::from(err.to_string()))?
            .unchecked_into::<JsSensitiveDataStatistics>())
    }
}
