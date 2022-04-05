use super::preservation_by_count::{PreservationByCountBucketBins, PreservationByCountBuckets};
use super::rare_combinations_comparison_data::RareCombinationsComparisonData;
use fnv::{FnvHashMap, FnvHashSet};
use std::sync::Arc;

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

use crate::processing::aggregator::{
    AggregatedCountByLenMap, AggregatedData, AggregatedMetricByLenMap, ValueCombination,
};
use crate::processing::evaluator::preservation_bucket::PreservationBucket;
use crate::processing::evaluator::preservation_by_length::PreservationByLengthBuckets;

#[cfg_attr(feature = "pyo3", pyclass)]
/// Evaluates aggregated, sensitive and synthesized data
pub struct Evaluator {}

impl Evaluator {
    /// Returns a new Evaluator
    pub fn default() -> Evaluator {
        Evaluator {}
    }

    fn calc_combinations_abs_error_sum_count_by_len(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
    ) -> FnvHashMap<usize, (f64, usize)> {
        let mut error_sum_count_by_len: FnvHashMap<usize, (f64, usize)> = FnvHashMap::default();

        for (sensitive_comb, sensitive_count) in sensitive_aggregated_data.aggregates_count.iter() {
            if let Some(synthetic_agg) = synthetic_aggregated_data
                .aggregates_count
                .get(sensitive_comb)
            {
                let err = if sensitive_count.count > synthetic_agg.count {
                    sensitive_count.count - synthetic_agg.count
                } else {
                    synthetic_agg.count - sensitive_count.count
                };
                let err_sum_count = error_sum_count_by_len
                    .entry(sensitive_comb.len())
                    .or_insert((0.0, 0));

                (*err_sum_count).0 += err as f64;
                (*err_sum_count).1 += 1;
            }
        }
        error_sum_count_by_len
    }
}

#[cfg_attr(feature = "pyo3", pymethods)]
impl Evaluator {
    /// Returns a new Evaluator
    #[cfg(feature = "pyo3")]
    #[new]
    pub fn default_pyo3() -> Evaluator {
        Evaluator::default()
    }

    /// Calculates the leakage counts grouped by combination length
    /// (how many attribute combinations exist on the sensitive data and
    /// appear on the synthetic data with `count < resolution`).
    /// By design this should be `0`
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_leakage_count_by_len(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
        resolution: usize,
    ) -> AggregatedCountByLenMap {
        let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

        for (sensitive_agg, sensitive_count) in sensitive_aggregated_data.aggregates_count.iter() {
            if sensitive_count.count < resolution {
                if let Some(synthetic_count) = synthetic_aggregated_data
                    .aggregates_count
                    .get(sensitive_agg)
                {
                    if synthetic_count.count < resolution {
                        let leaks = result.entry(sensitive_agg.len()).or_insert(0);
                        *leaks += 1;
                    }
                }
            }
        }
        result
    }

    /// Calculates the leakage percentage grouped by combination length
    /// (how many attribute combinations exist on the sensitive data and
    /// appear on the synthetic data with `count < resolution`).
    /// By design this should be `0`
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_leakage_percentage_by_len(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
        resolution: usize,
    ) -> AggregatedMetricByLenMap {
        let total_by_len = sensitive_aggregated_data.calc_total_number_of_combinations_by_len();

        self.calc_leakage_count_by_len(
            sensitive_aggregated_data,
            synthetic_aggregated_data,
            resolution,
        )
        .iter()
        .filter_map(|(l, c)| {
            total_by_len
                .get(l)
                .map(|total_count| (*l, ((*c as f64) / (*total_count as f64)) * 100.0))
        })
        .collect::<AggregatedMetricByLenMap>()
    }

    /// Calculates the total number of suppressed combinations
    /// (how many attribute combinations exist on the sensitive data that do not
    /// exist on the synthetic data).
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    pub fn calc_number_of_suppressed_combinations(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
    ) -> usize {
        let mut suppressed = 0;

        for sensitive_agg in sensitive_aggregated_data.aggregates_count.keys() {
            if !synthetic_aggregated_data
                .aggregates_count
                .contains_key(sensitive_agg)
            {
                suppressed += 1;
            }
        }
        suppressed
    }

    /// Calculates the total percentage of suppressed combinations
    /// (how many attribute combinations exist on the sensitive data that do not
    /// exist on the synthetic data).
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    pub fn calc_percentage_of_suppressed_combinations(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
    ) -> f64 {
        let total_count = sensitive_aggregated_data.number_of_distinct_combinations();

        if total_count > 0 {
            ((self.calc_number_of_suppressed_combinations(
                sensitive_aggregated_data,
                synthetic_aggregated_data,
            ) as f64)
                / (total_count as f64))
                * 100.0
        } else {
            0.0
        }
    }

    /// Calculates the total number of fabricated combinations
    /// (how many attribute combinations exist on the synthetic data that do not
    /// exist on the sensitive data).
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    pub fn calc_number_of_fabricated_combinations(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
    ) -> usize {
        let mut fabricated = 0;

        for synthetic_agg in synthetic_aggregated_data.aggregates_count.keys() {
            if !sensitive_aggregated_data
                .aggregates_count
                .contains_key(synthetic_agg)
            {
                fabricated += 1;
            }
        }
        fabricated
    }

    /// Calculates the total percentage of fabricated combinations
    /// (how many attribute combinations exist on the synthetic data that do not
    /// exist on the sensitive data).
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    pub fn calc_percentage_of_fabricated_combinations(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
    ) -> f64 {
        let total_count = sensitive_aggregated_data.number_of_distinct_combinations();

        if total_count > 0 {
            ((self.calc_number_of_fabricated_combinations(
                sensitive_aggregated_data,
                synthetic_aggregated_data,
            ) as f64)
                / (total_count as f64))
                * 100.0
        } else {
            0.0
        }
    }

    /// Calculates the preservation information grouped by combination count.
    /// An example output might be a map like:
    /// `{ 10 -> PreservationBucket, 20 -> PreservationBucket, ...}`
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_preservation_by_count(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
        resolution: usize,
    ) -> PreservationByCountBuckets {
        let max_syn_count = *synthetic_aggregated_data
            .aggregates_count
            .values()
            .map(|a| &a.count)
            .max()
            .unwrap_or(&0);
        let bins: PreservationByCountBucketBins = PreservationByCountBucketBins::new(max_syn_count);
        let mut buckets: PreservationByCountBuckets = PreservationByCountBuckets::default();
        let mut processed_combs: FnvHashSet<&Arc<ValueCombination>> = FnvHashSet::default();

        for (comb, count) in sensitive_aggregated_data.aggregates_count.iter() {
            // exclude sensitive rare combinations
            if count.count >= resolution && !processed_combs.contains(comb) {
                buckets.populate(
                    &bins,
                    comb,
                    &sensitive_aggregated_data.aggregates_count,
                    &synthetic_aggregated_data.aggregates_count,
                );
                processed_combs.insert(comb);
            }
        }
        for comb in synthetic_aggregated_data.aggregates_count.keys() {
            if !processed_combs.contains(comb) {
                buckets.populate(
                    &bins,
                    comb,
                    &sensitive_aggregated_data.aggregates_count,
                    &synthetic_aggregated_data.aggregates_count,
                );
                processed_combs.insert(comb);
            }
        }

        // fill empty buckets with default value
        for bin in bins.iter() {
            buckets
                .entry(*bin)
                .or_insert_with(PreservationBucket::default);
        }

        buckets
    }

    /// Calculates the preservation information grouped by combination length.
    /// An example output might be a map like:
    /// `{ 1 -> PreservationBucket, 2 -> PreservationBucket, ...}`
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_preservation_by_length(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
        resolution: usize,
    ) -> PreservationByLengthBuckets {
        let mut buckets: PreservationByLengthBuckets = PreservationByLengthBuckets::default();
        let mut processed_combs: FnvHashSet<&Arc<ValueCombination>> = FnvHashSet::default();

        for (comb, count) in sensitive_aggregated_data.aggregates_count.iter() {
            // exclude sensitive rare combinations
            if count.count >= resolution && !processed_combs.contains(comb) {
                buckets.populate(
                    comb,
                    &sensitive_aggregated_data.aggregates_count,
                    &synthetic_aggregated_data.aggregates_count,
                );
                processed_combs.insert(comb);
            }
        }
        for comb in synthetic_aggregated_data.aggregates_count.keys() {
            if !processed_combs.contains(comb) {
                buckets.populate(
                    comb,
                    &sensitive_aggregated_data.aggregates_count,
                    &synthetic_aggregated_data.aggregates_count,
                );
                processed_combs.insert(comb);
            }
        }

        // fill empty buckets with default value
        for l in 1..=synthetic_aggregated_data.reporting_length {
            buckets.entry(l).or_insert_with(PreservationBucket::default);
        }

        buckets
    }

    //// Compares the rare combinations on the synthetic data with
    /// the sensitive data counts
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `combination_delimiter` - Delimiter used to join combinations and format then
    /// as strings
    /// * `protect` - Whether or not the sensitive counts should be rounded to the
    /// nearest smallest multiple of resolution
    pub fn compare_synthetic_and_sensitive_rare(
        &self,
        synthetic_aggregated_data: &AggregatedData,
        sensitive_aggregated_data: &AggregatedData,
        resolution: usize,
        combination_delimiter: &str,
        protect: bool,
    ) -> RareCombinationsComparisonData {
        RareCombinationsComparisonData::from_synthetic_and_sensitive_aggregated_data(
            synthetic_aggregated_data,
            sensitive_aggregated_data,
            resolution,
            combination_delimiter,
            protect,
        )
    }

    /// Calculates the mean absolute error (`|sensitive_count - synthetic_count|`)
    /// grouped by combination length
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    pub fn calc_combinations_count_mean_abs_error_by_len(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
    ) -> AggregatedMetricByLenMap {
        self.calc_combinations_abs_error_sum_count_by_len(
            sensitive_aggregated_data,
            synthetic_aggregated_data,
        )
        .drain()
        .map(|(l, sum_count)| (l, sum_count.0 / (sum_count.1 as f64)))
        .collect()
    }

    /// Calculates the mean absolute error (`|sensitive_count - synthetic_count|`)
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    pub fn calc_combinations_count_mean_abs_error(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
    ) -> f64 {
        let err_sum_count = self
            .calc_combinations_abs_error_sum_count_by_len(
                sensitive_aggregated_data,
                synthetic_aggregated_data,
            )
            .values()
            .fold((0.0, 0), |acc, sum_count| {
                (acc.0 + sum_count.0, acc.1 + sum_count.1)
            });

        if err_sum_count.1 > 0 {
            err_sum_count.0 / (err_sum_count.1 as f64)
        } else {
            0.0
        }
    }

    /// Calculates the record expansion percentage
    /// (number of synthetic records / number of sensitive records)
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    pub fn calc_record_expansion_percentage(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
    ) -> f64 {
        if sensitive_aggregated_data.number_of_records > 0 {
            (((synthetic_aggregated_data.number_of_records as f64)
                / (sensitive_aggregated_data.number_of_records as f64))
                - 1.0)
                * 100.0
        } else {
            0.0
        }
    }
}
