use js_sys::Reflect::set;
use js_sys::{Array, Function, Object};
use log::{error, info};
use sds_core::processing::aggregator::typedefs::AggregatedCountByLenMap;
use sds_core::processing::aggregator::Aggregator;
use sds_core::processing::evaluator::typedefs::PreservationByCountBuckets;
use sds_core::processing::evaluator::Evaluator;
use sds_core::utils::reporting::ReportProgress;
use sds_core::utils::time::ElapsedDurationLogger;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

use crate::aggregator::{aggregate, AggregatedResult};
use crate::utils::js::deserializers::{
    deserialize_csv_data, deserialize_sensitive_zeros, deserialize_use_columns,
};
use crate::utils::js::js_progress_reporter::JsProgressReporter;
use crate::utils::js::serializers::serialize_buckets;
use crate::{match_or_return_undefined, set_or_return_undefined};

struct EvaluatedResult<'data_block> {
    sensitive_aggregated_result: AggregatedResult<'data_block>,
    synthetic_aggregated_result: AggregatedResult<'data_block>,
    leakage_count_by_len: AggregatedCountByLenMap,
    fabricated_count_by_len: AggregatedCountByLenMap,
    preservation_by_count_buckets: PreservationByCountBuckets,
    combination_loss: f64,
    record_expansion: f64,
}

impl<'data_block> From<EvaluatedResult<'data_block>> for JsValue {
    #[inline]
    fn from(evaluated_result: EvaluatedResult) -> Self {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("EvaluatedResult conversion to JsValue"));
        let result = Object::new();

        set_or_return_undefined!(
            &result,
            &"sensitiveAggregatedResult".into(),
            &evaluated_result.sensitive_aggregated_result.into(),
        );
        set_or_return_undefined!(
            &result,
            &"syntheticAggregatedResult".into(),
            &evaluated_result.synthetic_aggregated_result.into(),
        );
        set_or_return_undefined!(
            &result,
            &"leakageCountByLen".into(),
            &match_or_return_undefined!(JsValue::from_serde(
                &evaluated_result.leakage_count_by_len
            ))
        );
        set_or_return_undefined!(
            &result,
            &"fabricatedCountByLen".into(),
            &match_or_return_undefined!(JsValue::from_serde(
                &evaluated_result.fabricated_count_by_len
            ))
        );
        set_or_return_undefined!(
            &result,
            &"preservationByCountBuckets".into(),
            &serialize_buckets(&evaluated_result.preservation_by_count_buckets)
        );
        set_or_return_undefined!(
            &result,
            &"combinationLoss".into(),
            &match_or_return_undefined!(JsValue::from_serde(&evaluated_result.combination_loss))
        );
        set_or_return_undefined!(
            &result,
            &"recordExpansion".into(),
            &match_or_return_undefined!(JsValue::from_serde(&evaluated_result.record_expansion))
        );

        result.into()
    }
}

#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn evaluate(
    sensitive_csv_data: Array,
    synthetic_csv_data: Array,
    use_columns: Array,
    sensitive_zeros: Array,
    record_limit: usize,
    reporting_length: usize,
    resolution: usize,
    progress_callback: Function,
) -> JsValue {
    let _duration_logger = ElapsedDurationLogger::new(String::from("evaluation process"));
    let use_columns_vec = match_or_return_undefined!(deserialize_use_columns(use_columns));
    let sensitive_zeros_vec =
        match_or_return_undefined!(deserialize_sensitive_zeros(sensitive_zeros));

    info!("aggregating sensitive data...");
    let sensitive_data_block = match_or_return_undefined!(deserialize_csv_data(
        sensitive_csv_data,
        &use_columns_vec,
        &sensitive_zeros_vec,
        record_limit,
    ));
    let mut sensitive_aggregated_result = match_or_return_undefined!(aggregate(
        &sensitive_data_block,
        reporting_length,
        resolution,
        &mut Some(JsProgressReporter::new(&progress_callback, &|p| p * 0.40))
    ));

    info!("aggregating synthetic data...");
    let synthetic_data_block = match_or_return_undefined!(deserialize_csv_data(
        synthetic_csv_data,
        &use_columns_vec,
        &sensitive_zeros_vec,
        record_limit,
    ));
    let synthetic_aggregated_result = match_or_return_undefined!(aggregate(
        &synthetic_data_block,
        reporting_length,
        resolution,
        &mut Some(JsProgressReporter::new(&progress_callback, &|p| {
            40.0 + (p * 0.40)
        }))
    ));
    let mut evaluator_instance = Evaluator::default();

    info!("evaluating synthetic data based on sensitive data...");

    let buckets = evaluator_instance.calc_preservation_by_count(
        &sensitive_aggregated_result.aggregates_count,
        &synthetic_aggregated_result.aggregates_count,
        resolution,
    );
    let leakage_count_by_len = evaluator_instance.calc_leakage_count(
        &sensitive_aggregated_result.aggregates_count,
        &synthetic_aggregated_result.aggregates_count,
        resolution,
    );
    let fabricated_count_by_len = evaluator_instance.calc_fabricated_count(
        &sensitive_aggregated_result.aggregates_count,
        &synthetic_aggregated_result.aggregates_count,
    );
    let combination_loss = evaluator_instance.calc_combination_loss(&buckets);

    Aggregator::protect_aggregates_count(
        &mut sensitive_aggregated_result.aggregates_count,
        resolution,
    );

    JsProgressReporter::new(&progress_callback, &|p| p).report(100.0);

    EvaluatedResult {
        leakage_count_by_len,
        fabricated_count_by_len,
        combination_loss,
        preservation_by_count_buckets: buckets,
        record_expansion: (synthetic_aggregated_result
            .privacy_risk
            .total_number_of_records as f64)
            / (sensitive_aggregated_result
                .privacy_risk
                .total_number_of_records as f64),
        sensitive_aggregated_result,
        synthetic_aggregated_result,
    }
    .into()
}
