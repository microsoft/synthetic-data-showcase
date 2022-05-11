use crate::{
    processing::aggregator::WasmAggregateResult,
    utils::js::{JsMicrodataStatistics, JsResult},
};
use sds_core::processing::{
    aggregator::{AggregatedCountByLenMap, AggregatedMetricByLenMap},
    evaluator::Evaluator,
};
use serde::Serialize;
use wasm_bindgen::{prelude::wasm_bindgen, JsCast, JsValue};

#[derive(Serialize, Default)]
#[serde(rename_all = "camelCase")]
#[wasm_bindgen]
pub struct WasmMicrodataStatistics {
    percentage_of_suppressed_combinations: f64,
    percentage_of_fabricated_combinations: f64,
    original_combinations_count_mean: f64,
    original_combinations_count_mean_by_len: AggregatedMetricByLenMap,
    combinations_count_mean_abs_error: f64,
    combinations_count_mean_abs_error_by_len: AggregatedMetricByLenMap,
    mean_proportional_error: f64,
    mean_proportional_error_by_bucket: AggregatedMetricByLenMap,
    mean_combination_length_by_bucket: AggregatedMetricByLenMap,
    record_expansion_percentage: f64,
    combinations_count_mean_by_len: AggregatedMetricByLenMap,
    total_number_of_combinations_by_len: AggregatedCountByLenMap,
    number_of_rare_combinations_by_len: AggregatedCountByLenMap,
    percentage_of_rare_combinations_by_len: AggregatedMetricByLenMap,
    leakage_count_by_len: AggregatedCountByLenMap,
    leakage_percentage_by_len: AggregatedMetricByLenMap,
    percentage_of_records_with_unique_combinations: f64,
    percentage_of_records_with_rare_combinations: f64,
    percentage_of_unique_combinations: f64,
    percentage_of_rare_combinations: f64,
}

#[wasm_bindgen]
impl WasmMicrodataStatistics {
    #[wasm_bindgen(constructor)]
    pub fn from_aggregate_results(
        original_aggregate_result: &WasmAggregateResult,
        aggregate_result: &WasmAggregateResult,
        resolution: usize,
    ) -> JsResult<WasmMicrodataStatistics> {
        let evaluator = Evaluator::default();
        let preservation_by_count = evaluator.calc_preservation_by_count(
            original_aggregate_result,
            aggregate_result,
            resolution,
        );

        Ok(WasmMicrodataStatistics {
            percentage_of_suppressed_combinations: evaluator
                .calc_percentage_of_suppressed_combinations(
                    original_aggregate_result,
                    aggregate_result,
                ),
            percentage_of_fabricated_combinations: evaluator
                .calc_percentage_of_fabricated_combinations(
                    original_aggregate_result,
                    aggregate_result,
                ),
            original_combinations_count_mean: original_aggregate_result
                .calc_combinations_count_mean(),
            original_combinations_count_mean_by_len: original_aggregate_result
                .calc_combinations_count_mean_by_len(),
            combinations_count_mean_abs_error: evaluator.calc_combinations_count_mean_abs_error(
                original_aggregate_result,
                aggregate_result,
            ),
            combinations_count_mean_abs_error_by_len: evaluator
                .calc_combinations_count_mean_abs_error_by_len(
                    original_aggregate_result,
                    aggregate_result,
                ),
            mean_proportional_error: preservation_by_count.calc_mean_proportional_error(),
            mean_proportional_error_by_bucket: preservation_by_count
                .calc_mean_proportional_error_by_bucket(),
            mean_combination_length_by_bucket: preservation_by_count
                .calc_mean_combination_length_by_bucket(),
            record_expansion_percentage: evaluator
                .calc_record_expansion_percentage(original_aggregate_result, aggregate_result),
            combinations_count_mean_by_len: aggregate_result.calc_combinations_count_mean_by_len(),
            total_number_of_combinations_by_len: aggregate_result
                .calc_total_number_of_combinations_by_len(),
            number_of_rare_combinations_by_len: aggregate_result
                .calc_number_of_rare_combinations_by_len(resolution),
            percentage_of_rare_combinations_by_len: aggregate_result
                .calc_percentage_of_rare_combinations_by_len(resolution),
            leakage_count_by_len: evaluator.calc_leakage_count_by_len(
                original_aggregate_result,
                aggregate_result,
                resolution,
            ),
            leakage_percentage_by_len: evaluator.calc_leakage_percentage_by_len(
                original_aggregate_result,
                aggregate_result,
                resolution,
            ),
            percentage_of_records_with_unique_combinations: aggregate_result
                .calc_percentage_of_records_with_unique_combinations(),
            percentage_of_records_with_rare_combinations: aggregate_result
                .calc_percentage_of_records_with_rare_combinations(resolution),
            percentage_of_unique_combinations: aggregate_result
                .calc_percentage_of_unique_combinations(),
            percentage_of_rare_combinations: aggregate_result
                .calc_percentage_of_rare_combinations(resolution),
        })
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(&self) -> JsResult<JsMicrodataStatistics> {
        Ok(JsValue::from_serde(self)
            .map_err(|err| JsValue::from(err.to_string()))?
            .unchecked_into::<JsMicrodataStatistics>())
    }
}
