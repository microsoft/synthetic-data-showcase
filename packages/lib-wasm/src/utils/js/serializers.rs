use js_sys::{Object, Reflect::set};
use log::error;
use sds_core::{
    data_block::typedefs::DataBlockHeadersSlice,
    processing::{
        aggregator::{typedefs::AggregatesCountMap, Aggregator, PrivacyRiskSummary},
        evaluator::typedefs::PreservationByCountBuckets,
    },
    utils::time::ElapsedDurationLogger,
};
use wasm_bindgen::JsValue;

use crate::{aggregator::AggregatedCombination, set_or_return_undefined};

#[inline]
pub fn serialize_aggregates_count(
    aggregates_count: &AggregatesCountMap,
    headers: &DataBlockHeadersSlice,
) -> JsValue {
    let _duration_logger = ElapsedDurationLogger::new(String::from("serialize_aggregates_count"));
    let aggregated_values = Object::new();

    for (agg, count) in aggregates_count.iter() {
        let combination_key = Aggregator::format_aggregate_str(headers, agg);

        set_or_return_undefined!(
            &aggregated_values,
            &combination_key.clone().into(),
            &AggregatedCombination::new(combination_key, count.count, agg.len()).into()
        );
    }
    aggregated_values.into()
}

#[inline]
pub fn serialize_buckets(buckets: &PreservationByCountBuckets) -> JsValue {
    let _duration_logger = ElapsedDurationLogger::new(String::from("serialize_buckets"));
    let serialized_buckets = Object::new();

    for (bucket_index, b) in buckets.iter() {
        let serialized_bucket = Object::new();

        set_or_return_undefined!(&serialized_bucket, &"size".into(), &b.size.into());
        set_or_return_undefined!(
            &serialized_bucket,
            &"preservationSum".into(),
            &b.preservation_sum.into()
        );
        set_or_return_undefined!(
            &serialized_bucket,
            &"lengthSum".into(),
            &b.length_sum.into()
        );

        set_or_return_undefined!(
            &serialized_buckets,
            &(*bucket_index).into(),
            &serialized_bucket.into()
        );
    }
    serialized_buckets.into()
}

#[inline]
pub fn serialize_privacy_risk(privacy_risk: &PrivacyRiskSummary) -> JsValue {
    let _duration_logger = ElapsedDurationLogger::new(String::from("serialize_privacy_risk"));
    let serialized_privacy_risk = Object::new();

    set_or_return_undefined!(
        &serialized_privacy_risk,
        &"totalNumberOfRecords".into(),
        &privacy_risk.total_number_of_records.into()
    );
    set_or_return_undefined!(
        &serialized_privacy_risk,
        &"totalNumberOfCombinations".into(),
        &privacy_risk.total_number_of_combinations.into()
    );
    set_or_return_undefined!(
        &serialized_privacy_risk,
        &"recordsWithUniqueCombinationsCount".into(),
        &privacy_risk.records_with_unique_combinations_count.into()
    );
    set_or_return_undefined!(
        &serialized_privacy_risk,
        &"recordsWithRareCombinationsCount".into(),
        &privacy_risk.records_with_rare_combinations_count.into()
    );
    set_or_return_undefined!(
        &serialized_privacy_risk,
        &"uniqueCombinationsCount".into(),
        &privacy_risk.unique_combinations_count.into()
    );
    set_or_return_undefined!(
        &serialized_privacy_risk,
        &"rareCombinationsCount".into(),
        &privacy_risk.rare_combinations_count.into()
    );
    set_or_return_undefined!(
        &serialized_privacy_risk,
        &"recordsWithUniqueCombinationsProportion".into(),
        &privacy_risk
            .records_with_unique_combinations_proportion
            .into()
    );
    set_or_return_undefined!(
        &serialized_privacy_risk,
        &"recordsWithRareCombinationsProportion".into(),
        &privacy_risk
            .records_with_rare_combinations_proportion
            .into()
    );
    set_or_return_undefined!(
        &serialized_privacy_risk,
        &"uniqueCombinationsProportion".into(),
        &privacy_risk.unique_combinations_proportion.into()
    );
    set_or_return_undefined!(
        &serialized_privacy_risk,
        &"rareCombinationsProportion".into(),
        &privacy_risk.rare_combinations_proportion.into()
    );
    serialized_privacy_risk.into()
}
