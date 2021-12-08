use js_sys::Object;
use js_sys::Reflect::set;
use log::error;
use sds_core::data_block::block::DataBlock;
use sds_core::data_block::typedefs::DataBlockHeaders;
use sds_core::processing::aggregator::typedefs::{AggregatedCountByLenMap, AggregatesCountMap};
use sds_core::processing::aggregator::{Aggregator, PrivacyRiskSummary};
use sds_core::utils::reporting::ReportProgress;
use sds_core::utils::time::ElapsedDurationLogger;
use serde::Serialize;
use wasm_bindgen::JsValue;

use crate::utils::js::serializers::{serialize_aggregates_count, serialize_privacy_risk};
use crate::{match_or_return_undefined, set_or_return_undefined};

#[derive(Serialize)]
pub struct AggregatedCombination {
    combination_key: String,
    count: usize,
    length: usize,
}

impl AggregatedCombination {
    #[inline]
    pub fn new(combination_key: String, count: usize, length: usize) -> AggregatedCombination {
        AggregatedCombination {
            combination_key,
            count,
            length,
        }
    }
}

impl From<AggregatedCombination> for JsValue {
    #[inline]
    fn from(aggregated_combination: AggregatedCombination) -> Self {
        match_or_return_undefined!(JsValue::from_serde(&aggregated_combination))
    }
}

pub struct AggregatedResult<'data_block> {
    pub headers: &'data_block DataBlockHeaders,
    pub aggregates_count: AggregatesCountMap<'data_block>,
    pub rare_combinations_count_by_len: AggregatedCountByLenMap,
    pub combinations_count_by_len: AggregatedCountByLenMap,
    pub combinations_sum_by_len: AggregatedCountByLenMap,
    pub privacy_risk: PrivacyRiskSummary,
}

impl<'data_block> From<AggregatedResult<'data_block>> for JsValue {
    #[inline]
    fn from(aggregated_result: AggregatedResult) -> Self {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("AggregatedResult conversion to JsValue"));
        let result = Object::new();

        set_or_return_undefined!(
            &result,
            &"aggregatedCombinations".into(),
            &serialize_aggregates_count(
                &aggregated_result.aggregates_count,
                aggregated_result.headers
            ),
        );
        set_or_return_undefined!(
            &result,
            &"rareCombinationsCountByLen".into(),
            &match_or_return_undefined!(JsValue::from_serde(
                &aggregated_result.rare_combinations_count_by_len
            ))
        );
        set_or_return_undefined!(
            &result,
            &"combinationsCountByLen".into(),
            &match_or_return_undefined!(JsValue::from_serde(
                &aggregated_result.combinations_count_by_len
            ))
        );
        set_or_return_undefined!(
            &result,
            &"combinationsSumByLen".into(),
            &match_or_return_undefined!(JsValue::from_serde(
                &aggregated_result.combinations_sum_by_len
            ))
        );
        set_or_return_undefined!(
            &result,
            &"privacyRisk".into(),
            &serialize_privacy_risk(&aggregated_result.privacy_risk)
        );

        result.into()
    }
}

pub fn aggregate<'data_block, T: ReportProgress>(
    data_block: &'data_block DataBlock,
    reporting_length: usize,
    resolution: usize,
    progress_reporter: &mut Option<T>,
) -> Result<AggregatedResult<'data_block>, String> {
    let mut aggregator = Aggregator::new(data_block);
    let aggregates_data = aggregator.aggregate(reporting_length, 0, progress_reporter);

    Ok(AggregatedResult {
        headers: &data_block.headers,
        rare_combinations_count_by_len: aggregator
            .calc_rare_combinations_count_by_len(&aggregates_data.aggregates_count, resolution),
        combinations_count_by_len: aggregator
            .calc_combinations_count_by_len(&aggregates_data.aggregates_count),
        combinations_sum_by_len: aggregator
            .calc_combinations_sum_by_len(&aggregates_data.aggregates_count),
        privacy_risk: aggregator.calc_privacy_risk(&aggregates_data.aggregates_count, resolution),
        aggregates_count: aggregates_data.aggregates_count,
    })
}
