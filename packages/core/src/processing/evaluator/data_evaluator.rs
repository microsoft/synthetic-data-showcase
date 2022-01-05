use super::preservation_by_count::{PreservationByCountBucketBins, PreservationByCountBuckets};
use super::rare_combinations_comparison_data::RareCombinationsComparisonData;
use fnv::FnvHashSet;
use log::info;

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

use crate::processing::aggregator::aggregated_data::AggregatedData;
use crate::processing::aggregator::typedefs::AggregatedCountByLenMap;
use crate::processing::aggregator::value_combination::ValueCombination;
use crate::processing::evaluator::preservation_bucket::PreservationBucket;
use crate::processing::evaluator::preservation_by_length::PreservationByLengthBuckets;
use crate::utils::time::ElapsedDurationLogger;

#[cfg_attr(feature = "pyo3", pyclass)]
/// Evaluates aggregated, sensitive and synthesized data
pub struct Evaluator {}

impl Evaluator {
    /// Returns a new Evaluator
    pub fn default() -> Evaluator {
        Evaluator {}
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
    pub fn calc_leakage_count(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
        resolution: usize,
    ) -> AggregatedCountByLenMap {
        let _duration_logger = ElapsedDurationLogger::new("leakage count calculation");
        let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

        info!("calculating rare sensitive combination leakages by length");

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

    /// Calculates the fabricated counts grouped by combination length
    /// (how many attribute combinations exist on the synthetic data that do not
    /// exist on the sensitive data).
    /// By design this should be `0`
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    pub fn calc_fabricated_count(
        &self,
        sensitive_aggregated_data: &AggregatedData,
        synthetic_aggregated_data: &AggregatedData,
    ) -> AggregatedCountByLenMap {
        let _duration_logger = ElapsedDurationLogger::new("fabricated count calculation");
        let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

        info!("calculating fabricated synthetic combinations by length");

        for synthetic_agg in synthetic_aggregated_data.aggregates_count.keys() {
            if sensitive_aggregated_data
                .aggregates_count
                .get(synthetic_agg)
                .is_none()
            {
                let fabricated = result.entry(synthetic_agg.len()).or_insert(0);
                *fabricated += 1;
            }
        }
        result
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
        let _duration_logger = ElapsedDurationLogger::new("preservation by count calculation");

        info!(
            "calculating preservation by count with resolution: {}",
            resolution
        );

        let max_syn_count = *synthetic_aggregated_data
            .aggregates_count
            .values()
            .map(|a| &a.count)
            .max()
            .unwrap_or(&0);
        let bins: PreservationByCountBucketBins = PreservationByCountBucketBins::new(max_syn_count);
        let mut buckets: PreservationByCountBuckets = PreservationByCountBuckets::default();
        let mut processed_combs: FnvHashSet<&ValueCombination> = FnvHashSet::default();

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
        let _duration_logger = ElapsedDurationLogger::new("preservation by length calculation");

        info!(
            "calculating preservation by length with resolution: {}",
            resolution
        );

        let mut buckets: PreservationByLengthBuckets = PreservationByLengthBuckets::default();
        let mut processed_combs: FnvHashSet<&ValueCombination> = FnvHashSet::default();

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
        let _duration_logger =
            ElapsedDurationLogger::new("synthetic and sensitive rare comparison");
        RareCombinationsComparisonData::from_synthetic_and_sensitive_aggregated_data(
            synthetic_aggregated_data,
            sensitive_aggregated_data,
            resolution,
            combination_delimiter,
            protect,
        )
    }
}

#[cfg(feature = "pyo3")]
pub fn register(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_class::<Evaluator>()?;
    Ok(())
}
