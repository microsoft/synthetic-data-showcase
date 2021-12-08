pub mod bucket;
pub mod typedefs;

use self::bucket::{PreservationByCountBucket, PreservationByCountBucketBins};
use self::typedefs::PreservationByCountBuckets;
use fnv::FnvHashSet;
use instant::Duration;
use log::Level::Trace;
use log::{info, log_enabled, trace};

use crate::measure_time;
use crate::processing::aggregator::typedefs::ValueCombination;
use crate::utils::time::ElapsedDuration;

use super::aggregator::typedefs::{
    AggregatedCountByLenMap, AggregatesCountMap, ValueCombinationSlice,
};

#[derive(Debug)]
struct EvaluatorDurations {
    calc_leakage_count: Duration,
    calc_fabricated_count: Duration,
    calc_preservation_by_count: Duration,
    calc_combination_loss: Duration,
}

/// Evaluates aggregated, sensitive and synthesized data
pub struct Evaluator {
    durations: EvaluatorDurations,
}

impl Evaluator {
    /// Returns a new Evaluator
    #[inline]
    pub fn default() -> Evaluator {
        Evaluator {
            durations: EvaluatorDurations {
                calc_leakage_count: Duration::default(),
                calc_fabricated_count: Duration::default(),
                calc_preservation_by_count: Duration::default(),
                calc_combination_loss: Duration::default(),
            },
        }
    }

    /// Calculates the leakage counts grouped by combination length
    /// (how many attribute combinations exist on the sensitive data and
    /// appear on the synthetic data with `count < resolution`).
    /// By design this should be `0`
    /// # Arguments
    /// - `sensitive_aggregates` - Calculated aggregates counts for the sensitive data
    /// - `synthetic_aggregates` - Calculated aggregates counts for the synthetic data
    pub fn calc_leakage_count(
        &mut self,
        sensitive_aggregates: &AggregatesCountMap,
        synthetic_aggregates: &AggregatesCountMap,
        resolution: usize,
    ) -> AggregatedCountByLenMap {
        info!("calculating rare sensitive combination leakages by length");
        measure_time!(
            || {
                let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

                for (sensitive_agg, sensitive_count) in sensitive_aggregates.iter() {
                    if sensitive_count.count < resolution {
                        if let Some(synthetic_count) = synthetic_aggregates.get(sensitive_agg) {
                            if synthetic_count.count < resolution {
                                let leaks = result.entry(sensitive_agg.len()).or_insert(0);
                                *leaks += 1;
                            }
                        }
                    }
                }
                result
            },
            (self.durations.calc_leakage_count)
        )
    }

    /// Calculates the fabricated counts grouped by combination length
    /// (how many attribute combinations exist on the synthetic data that do not
    /// exist on the sensitive data).
    /// By design this should be `0`
    /// # Arguments
    /// - `sensitive_aggregates` - Calculated aggregates counts for the sensitive data
    /// - `synthetic_aggregates` - Calculated aggregates counts for the synthetic data
    pub fn calc_fabricated_count(
        &mut self,
        sensitive_aggregates: &AggregatesCountMap,
        synthetic_aggregates: &AggregatesCountMap,
    ) -> AggregatedCountByLenMap {
        info!("calculating fabricated synthetic combinations by length");
        measure_time!(
            || {
                let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

                for synthetic_agg in synthetic_aggregates.keys() {
                    if sensitive_aggregates.get(synthetic_agg).is_none() {
                        let fabricated = result.entry(synthetic_agg.len()).or_insert(0);
                        *fabricated += 1;
                    }
                }
                result
            },
            (self.durations.calc_fabricated_count)
        )
    }

    /// Calculates the preservation information by bucket.
    /// An example output might be a map like:
    /// `{ 10 -> PreservationByCountBucket, 20 -> PreservationByCountBucket, ...}`
    /// # Arguments
    /// - `sensitive_aggregates` - Calculated aggregates counts for the sensitive data
    /// - `synthetic_aggregates` - Calculated aggregates counts for the synthetic data
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_preservation_by_count(
        &mut self,
        sensitive_aggregates: &AggregatesCountMap,
        synthetic_aggregates: &AggregatesCountMap,
        resolution: usize,
    ) -> PreservationByCountBuckets {
        info!(
            "calculating preservation by count with resolution: {}",
            resolution
        );
        measure_time!(
            || {
                let max_syn_count = *synthetic_aggregates
                    .values()
                    .map(|a| &a.count)
                    .max()
                    .unwrap_or(&0);
                let bins: PreservationByCountBucketBins =
                    PreservationByCountBucketBins::new(max_syn_count);
                let mut buckets: PreservationByCountBuckets = PreservationByCountBuckets::default();
                let mut processed_combs: FnvHashSet<&ValueCombination> = FnvHashSet::default();

                for (comb, count) in sensitive_aggregates.iter() {
                    if count.count >= resolution && !processed_combs.contains(comb) {
                        Evaluator::populate_buckets(
                            &mut buckets,
                            &bins,
                            comb,
                            sensitive_aggregates,
                            synthetic_aggregates,
                        );
                        processed_combs.insert(comb);
                    }
                }
                for comb in synthetic_aggregates.keys() {
                    if !processed_combs.contains(comb) {
                        Evaluator::populate_buckets(
                            &mut buckets,
                            &bins,
                            comb,
                            sensitive_aggregates,
                            synthetic_aggregates,
                        );
                        processed_combs.insert(comb);
                    }
                }

                // fill empty buckets with default value
                for bin in bins.iter() {
                    if !buckets.contains_key(bin) {
                        buckets.insert(*bin, PreservationByCountBucket::default());
                    }
                }

                buckets
            },
            (self.durations.calc_preservation_by_count)
        )
    }

    /// Calculates the combination loss for the calculated bucket preservation information
    /// (`combination_loss = avg(1 - bucket_preservation_sum / bucket_size) for all buckets`)
    /// # Arguments
    /// - `buckets` - Calculated preservation buckets
    pub fn calc_combination_loss(&mut self, buckets: &PreservationByCountBuckets) -> f64 {
        measure_time!(
            || {
                buckets
                    .values()
                    .map(|b| 1.0 - (b.preservation_sum / (b.size as f64)))
                    .sum::<f64>()
                    / (buckets.len() as f64)
            },
            (self.durations.calc_combination_loss)
        )
    }

    #[inline]
    fn populate_buckets(
        buckets: &mut PreservationByCountBuckets,
        bins: &PreservationByCountBucketBins,
        comb: &ValueCombinationSlice,
        sensitive_aggregates: &AggregatesCountMap,
        synthetic_aggregates: &AggregatesCountMap,
    ) {
        let sen_count = match sensitive_aggregates.get(comb) {
            Some(count) => count.count,
            _ => 0,
        };
        let syn_count = match synthetic_aggregates.get(comb) {
            Some(count) => count.count,
            _ => 0,
        };
        let preservation = if sen_count > 0 {
            // max value is 100%, so use min
            f64::min((syn_count as f64) / (sen_count as f64), 1.0)
        } else {
            0.0
        };

        buckets
            .entry(bins.find_bucket_max_val(syn_count))
            .or_insert_with(PreservationByCountBucket::default)
            .add(preservation, comb.len());
    }
}

impl Drop for Evaluator {
    fn drop(&mut self) {
        trace!("evaluator durations: {:#?}", self.durations);
    }
}
