use super::stats::{
    calc_distinct_combinations_count_by_len, calc_fabricated_combinations_percentage,
    calc_leakage_count_by_len, calc_leakage_percentage_by_len, calc_mean_combinations_count_by_len,
    calc_mean_combinations_count_error, calc_mean_combinations_count_error_by_len,
    calc_mean_combinations_length_by_bucket, calc_mean_proportional_error,
    calc_mean_proportional_error_by_bucket, calc_original_mean_combinations_count,
    calc_original_mean_combinations_count_by_len, calc_rare_combinations_count_by_len,
    calc_rare_combinations_percentage, calc_rare_combinations_percentage_by_len,
    calc_record_expansion, calc_records_with_rare_combinations_percentage,
    calc_records_with_unique_combinations_percentage, calc_suppressed_combinations_percentage,
    calc_unique_combinations_percentage,
};
use crate::{
    processing::aggregator::aggregate_result::WasmAggregateResult,
    utils::js::ts_definitions::{JsResult, JsSyntheticDataStatistics},
};
use sds_core::processing::{
    aggregator::typedefs::{AggregatedCountByLenMap, AggregatedMetricByLenMap},
    evaluator::Evaluator,
};
use serde::Serialize;
use wasm_bindgen::{prelude::wasm_bindgen, JsCast, JsValue};

#[wasm_bindgen]
#[derive(Serialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct WasmSyntheticDataStatistics {
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
    suppressed_combinations_percentage: f64,
    fabricated_combinations_percentage: f64,
    original_mean_combinations_count: f64,
    original_mean_combinations_count_by_len: AggregatedMetricByLenMap,
    mean_combinations_count_error: f64,
    mean_combinations_count_error_by_len: AggregatedMetricByLenMap,
    mean_proportional_error: f64,
    mean_proportional_error_by_bucket: AggregatedMetricByLenMap,
    mean_combinations_length_by_bucket: AggregatedMetricByLenMap,
    record_expansion: f64,
}

#[wasm_bindgen]
impl WasmSyntheticDataStatistics {
    #[wasm_bindgen(constructor)]
    pub fn from_aggregate_results(
        sensitive_aggregate_result: &WasmAggregateResult,
        synthetic_aggregate_result: &WasmAggregateResult,
        resolution: usize,
    ) -> JsResult<WasmSyntheticDataStatistics> {
        let privacy_risk_summary = synthetic_aggregate_result.calc_privacy_risk(resolution);
        let preservation_by_count = Evaluator::default().calc_preservation_by_count(
            sensitive_aggregate_result,
            synthetic_aggregate_result,
            resolution,
        );

        Ok(WasmSyntheticDataStatistics {
            mean_combinations_count_by_len: calc_mean_combinations_count_by_len(
                synthetic_aggregate_result,
            ),
            distinct_combinations_count_by_len: calc_distinct_combinations_count_by_len(
                synthetic_aggregate_result,
            ),
            rare_combinations_count_by_len: calc_rare_combinations_count_by_len(
                synthetic_aggregate_result,
                resolution,
            ),
            rare_combinations_percentage_by_len: calc_rare_combinations_percentage_by_len(
                synthetic_aggregate_result,
                resolution,
            ),
            leakage_count_by_len: calc_leakage_count_by_len(
                sensitive_aggregate_result,
                synthetic_aggregate_result,
                resolution,
            ),
            leakage_percentage_by_len: calc_leakage_percentage_by_len(
                sensitive_aggregate_result,
                synthetic_aggregate_result,
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
            suppressed_combinations_percentage: calc_suppressed_combinations_percentage(
                sensitive_aggregate_result,
                synthetic_aggregate_result,
            ),
            fabricated_combinations_percentage: calc_fabricated_combinations_percentage(
                sensitive_aggregate_result,
                synthetic_aggregate_result,
            ),
            original_mean_combinations_count: calc_original_mean_combinations_count(
                sensitive_aggregate_result,
            ),
            original_mean_combinations_count_by_len: calc_original_mean_combinations_count_by_len(
                sensitive_aggregate_result,
            ),

            mean_combinations_count_error: calc_mean_combinations_count_error(
                sensitive_aggregate_result,
                synthetic_aggregate_result,
            ),
            mean_combinations_count_error_by_len: calc_mean_combinations_count_error_by_len(
                sensitive_aggregate_result,
                synthetic_aggregate_result,
            ),
            mean_proportional_error: calc_mean_proportional_error(&preservation_by_count),
            mean_proportional_error_by_bucket: calc_mean_proportional_error_by_bucket(
                &preservation_by_count,
            ),
            mean_combinations_length_by_bucket: calc_mean_combinations_length_by_bucket(
                &preservation_by_count,
            ),
            record_expansion: calc_record_expansion(
                sensitive_aggregate_result,
                synthetic_aggregate_result,
            ),
        })
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(&self) -> JsResult<JsSyntheticDataStatistics> {
        Ok(JsValue::from_serde(self)
            .map_err(|err| JsValue::from(err.to_string()))?
            .unchecked_into::<JsSyntheticDataStatistics>())
    }
}
