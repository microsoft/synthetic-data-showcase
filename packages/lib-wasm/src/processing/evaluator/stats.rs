use sds_core::processing::{
    aggregator::{
        aggregated_data::AggregatedData,
        privacy_risk_summary::PrivacyRiskSummary,
        typedefs::{AggregatedCountByLenMap, AggregatedMetricByLenMap},
    },
    evaluator::{preservation_by_count::PreservationByCountBuckets, Evaluator},
};

#[inline]
pub fn calc_mean_combinations_count_by_len(
    aggregated_data: &AggregatedData,
) -> AggregatedMetricByLenMap {
    aggregated_data.calc_combinations_mean_by_len()
}

#[inline]
pub fn calc_distinct_combinations_count_by_len(
    aggregated_data: &AggregatedData,
) -> AggregatedCountByLenMap {
    aggregated_data.calc_combinations_count_by_len()
}

#[inline]
pub fn calc_rare_combinations_count_by_len(
    aggregated_data: &AggregatedData,
    resolution: usize,
) -> AggregatedCountByLenMap {
    aggregated_data.calc_rare_combinations_count_by_len(resolution)
}

#[inline]
pub fn calc_rare_combinations_percentage_by_len(
    aggregated_data: &AggregatedData,
    resolution: usize,
) -> AggregatedMetricByLenMap {
    aggregated_data.calc_rare_combinations_percentage_by_len(resolution)
}

#[inline]
pub fn calc_leakage_count_by_len(
    original_aggregated_data: &AggregatedData,
    aggregated_data: &AggregatedData,
    resolution: usize,
) -> AggregatedCountByLenMap {
    Evaluator::default().calc_leakage_count_by_len(
        original_aggregated_data,
        aggregated_data,
        resolution,
    )
}

#[inline]
pub fn calc_leakage_percentage_by_len(
    original_aggregated_data: &AggregatedData,
    aggregated_data: &AggregatedData,
    resolution: usize,
) -> AggregatedMetricByLenMap {
    Evaluator::default().calc_leakage_percentage_by_len(
        original_aggregated_data,
        aggregated_data,
        resolution,
    )
}

#[inline]
pub fn calc_records_with_unique_combinations_percentage(privacy_risk: &PrivacyRiskSummary) -> f64 {
    privacy_risk.records_with_unique_combinations_proportion * 100.0
}

#[inline]
pub fn calc_records_with_rare_combinations_percentage(privacy_risk: &PrivacyRiskSummary) -> f64 {
    privacy_risk.records_with_rare_combinations_proportion * 100.0
}

#[inline]
pub fn calc_unique_combinations_percentage(privacy_risk: &PrivacyRiskSummary) -> f64 {
    privacy_risk.unique_combinations_proportion * 100.0
}

#[inline]
pub fn calc_rare_combinations_percentage(privacy_risk: &PrivacyRiskSummary) -> f64 {
    privacy_risk.rare_combinations_proportion * 100.0
}

#[inline]
pub fn calc_suppressed_combinations_percentage(
    original_aggregated_data: &AggregatedData,
    aggregated_data: &AggregatedData,
) -> f64 {
    Evaluator::default().calc_missed_percentage(original_aggregated_data, aggregated_data)
}

#[inline]
pub fn calc_fabricated_combinations_percentage(
    original_aggregated_data: &AggregatedData,
    aggregated_data: &AggregatedData,
) -> f64 {
    Evaluator::default().calc_fabricated_percentage(original_aggregated_data, aggregated_data)
}

#[inline]
pub fn calc_original_mean_combinations_count(original_aggregated_data: &AggregatedData) -> f64 {
    original_aggregated_data.calc_combinations_mean()
}

#[inline]
pub fn calc_original_mean_combinations_count_by_len(
    original_aggregated_data: &AggregatedData,
) -> AggregatedMetricByLenMap {
    original_aggregated_data.calc_combinations_mean_by_len()
}

#[inline]
pub fn calc_mean_combinations_count_error(
    original_aggregated_data: &AggregatedData,
    aggregated_data: &AggregatedData,
) -> f64 {
    Evaluator::default().calc_combinations_mean_abs_error(original_aggregated_data, aggregated_data)
}

#[inline]
pub fn calc_mean_combinations_count_error_by_len(
    original_aggregated_data: &AggregatedData,
    aggregated_data: &AggregatedData,
) -> AggregatedMetricByLenMap {
    Evaluator::default()
        .calc_combinations_mean_abs_error_by_len(original_aggregated_data, aggregated_data)
}

#[inline]
pub fn calc_mean_proportional_error(preservation_by_count: &PreservationByCountBuckets) -> f64 {
    preservation_by_count.calc_mean_proportional_error()
}

#[inline]
pub fn calc_mean_proportional_error_by_bucket(
    preservation_by_count: &PreservationByCountBuckets,
) -> AggregatedMetricByLenMap {
    preservation_by_count.calc_mean_proportional_error_by_bucket()
}

#[inline]
pub fn calc_mean_combinations_length_by_bucket(
    preservation_by_count: &PreservationByCountBuckets,
) -> AggregatedMetricByLenMap {
    preservation_by_count.calc_mean_combination_length_by_bucket()
}

#[inline]
pub fn calc_record_expansion(
    original_aggregated_data: &AggregatedData,
    aggregated_data: &AggregatedData,
) -> f64 {
    Evaluator::default().calc_expansion_ratio(original_aggregated_data, aggregated_data)
}
