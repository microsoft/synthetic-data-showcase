use super::{
    CombinationsByRecord, DpParameters, DpPercentile, NoisyCountThreshold,
    DEFAULT_NUMBER_OF_RECORDS_EPSILON,
};
use fnv::FnvHashSet;
use itertools::Itertools;
use log::{debug, info, warn};
use rand::{
    prelude::{Distribution as rand_dist, IteratorRandom},
    thread_rng,
};
use statrs::distribution::{ContinuousCDF, Laplace, Normal};
use std::sync::Arc;

use crate::{
    data_block::{DataBlock, DataBlockValue},
    dp::{
        typedefs::{CombinationsCountMap, CombinationsCountMapByLen},
        DEFAULT_TOLERANCE,
    },
    processing::aggregator::{
        AggregatedCount, AggregatedData, AggregatesCountMap, RecordsSensitivityByLen, RecordsSet,
        ValueCombination,
    },
    utils::{
        math::calc_percentage,
        reporting::{ReportProgress, StoppableResult},
    },
};

/// Structure capable of generating
/// noisy aggregates with differential privacy
/// from the sensitive data block
pub struct NoiseAggregator {
    data_block: Arc<DataBlock>,
    reporting_length: usize,
    percentile_percentage: usize,
    percentile_epsilon: f64,
    delta: f64,
    sigmas: Vec<f64>,
    threshold: NoisyCountThreshold,
    number_of_records_epsilon: f64,
}

impl NoiseAggregator {
    #[inline]
    fn calc_percentile_epsilon_and_sigma_by_len(
        reporting_length: usize,
        epsilon: f64,
        delta: f64,
        percentile_epsilon_proportion: f64,
        sigma_proportions: &Option<Vec<f64>>,
    ) -> (f64, Vec<f64>) {
        let proportions = match sigma_proportions {
            Some(proportions) => proportions.clone(),
            None => {
                let mut v = Vec::default();
                v.resize_with(reporting_length, || 1.0);
                v
            }
        };

        assert!(
            reporting_length == proportions.len(),
            "sigma proportions array size should match the reporting length",
        );

        info!(
            "calculating percentile epsilon and sigma by len: total epsilon = {}, delta = {}, percentile_epsilon_proportion = {}, sigma_proportions = {:?}",
            epsilon,
            delta,
            percentile_epsilon_proportion,
            proportions
        );

        let t = reporting_length as f64;
        let rho = (epsilon + (2.0 / delta).ln()).sqrt() - (2.0 / delta).ln().sqrt();
        let k: f64 = proportions.iter().map(|p| 1.0 / (p * p)).sum();
        let percentile_epsilon = (2.0 * rho * percentile_epsilon_proportion / t).sqrt();
        let base_sigma = (k / (2.0 * rho * (1.0 - percentile_epsilon_proportion))).sqrt();
        let sigmas: Vec<f64> = proportions.iter().map(|p| p * base_sigma).collect();
        let lhs = ((t * percentile_epsilon * percentile_epsilon) / 2.0)
            + (sigmas.iter().map(|s| 1.0 / (s * s)).sum::<f64>() / 2.0);

        info!("percentile epsilon = {}", percentile_epsilon);
        info!("calculated sigmas = {:?}", sigmas);

        assert!(
            (lhs - rho).abs() <= DEFAULT_TOLERANCE,
            "something went wrong calculating DP sigmas"
        );

        (percentile_epsilon, sigmas)
    }

    #[inline]
    fn gen_sorted_records(&self) -> Vec<Vec<Arc<DataBlockValue>>> {
        self.data_block
            .records
            .iter()
            .map(|record| {
                let mut sorted_attrs = record.values.clone();
                sorted_attrs.sort_by_key(|k| k.as_str_using_headers(&self.data_block.headers));
                sorted_attrs
            })
            .collect()
    }

    #[inline]
    fn get_distinct_attributes(
        aggregates: &CombinationsCountMap,
    ) -> FnvHashSet<&Arc<DataBlockValue>> {
        let mut result: FnvHashSet<&Arc<DataBlockValue>> = FnvHashSet::default();

        for comb in aggregates.keys() {
            result.extend(comb.iter());
        }
        result
    }

    #[inline]
    fn is_combination_valid(
        noisy_aggregates_by_len: &CombinationsCountMapByLen,
        comb: &ValueCombination,
    ) -> bool {
        for l in 2..comb.len() {
            for mut sub_comb in comb.iter().combinations(l) {
                if !noisy_aggregates_by_len[&l].contains_key(&ValueCombination::new(
                    sub_comb.drain(..).cloned().collect(),
                )) {
                    return false;
                }
            }
        }
        true
    }

    #[inline]
    fn gen_all_current_aggregates_based_on_previous(
        &self,
        noisy_aggregates_by_len: &CombinationsCountMapByLen,
        previous_aggregates: &CombinationsCountMap,
    ) -> CombinationsCountMap {
        // try to combine the previous combinations with the distinct attributes
        let distinct_attributes = NoiseAggregator::get_distinct_attributes(previous_aggregates);

        previous_aggregates
            .keys()
            .flat_map(|comb| {
                distinct_attributes.iter().filter_map(|attr| {
                    if comb.contains_column(attr.column_index) {
                        // combinations already contains an attribute at that index
                        None
                    } else {
                        let mut new_comb = (**comb).clone();

                        new_comb.extend((*attr).clone(), &self.data_block.headers);

                        if NoiseAggregator::is_combination_valid(noisy_aggregates_by_len, &new_comb)
                        {
                            Some((Arc::new(new_comb), 0.0))
                        } else {
                            // a sub combination of this is not present
                            // on the noisy_aggregates_by_len, so we can't use it
                            None
                        }
                    }
                })
            })
            .collect()
    }

    #[inline]
    fn gen_all_current_aggregates_based_on_single_attributes(&self) -> CombinationsCountMap {
        self.data_block
            .records
            .iter()
            .flat_map(|record| record.values.iter())
            .unique()
            .map(|value| (Arc::new(ValueCombination::new(vec![value.clone()])), 0.0))
            .collect()
    }

    #[inline]
    fn gen_valid_combinations_by_record(
        sorted_records: &[Vec<Arc<DataBlockValue>>],
        comb_len: usize,
        aggregates: &CombinationsCountMap,
    ) -> CombinationsByRecord {
        sorted_records
            .iter()
            .map(|record_attributes| {
                record_attributes
                    .iter()
                    .combinations(comb_len)
                    .filter_map(|mut c| {
                        let current_comb =
                            Arc::new(ValueCombination::new(c.drain(..).cloned().collect()));

                        if aggregates.contains_key(&current_comb) {
                            Some(current_comb)
                        } else {
                            None
                        }
                    })
                    .collect()
            })
            .collect()
    }

    #[inline]
    fn get_max_and_allowed_sensitivities(
        &self,
        combinations_by_record: &CombinationsByRecord,
    ) -> (usize, usize) {
        let sensitivities: Vec<usize> = combinations_by_record
            .iter()
            .map(|combinations| combinations.len())
            .collect();
        let max_sensitivity = sensitivities.iter().max().cloned().unwrap_or(0);
        let percentile_selector = DpPercentile::new(sensitivities);
        let allowed_sensitivity = percentile_selector
            .kth_percentile_quality_scores_iter(self.percentile_percentage)
            .get_noisy_max(self.percentile_epsilon / (self.reporting_length as f64))
            .unwrap_or(0);

        (max_sensitivity, allowed_sensitivity)
    }

    #[inline]
    fn increment_count_based_on_sensitivity(
        all_current_aggregates: &mut CombinationsCountMap,
        combinations_by_record: &CombinationsByRecord,
        l1_sensitivity: usize,
    ) {
        for combinations in combinations_by_record.iter() {
            if combinations.len() > l1_sensitivity {
                for comb in combinations
                    .iter()
                    .choose_multiple(&mut thread_rng(), l1_sensitivity)
                    .drain(..)
                {
                    (*all_current_aggregates.get_mut(comb).unwrap()) += 1.0;
                }
            } else {
                for comb in combinations.iter() {
                    (*all_current_aggregates.get_mut(comb).unwrap()) += 1.0;
                }
            }
        }
    }

    #[inline]
    fn add_gaussian_noise(all_current_aggregates: &mut CombinationsCountMap, current_sigma: f64) {
        let noise = Normal::new(0.0, 1.0).unwrap();

        for count in all_current_aggregates.values_mut() {
            (*count) += current_sigma * noise.sample(&mut thread_rng());
        }
    }

    #[inline]
    fn calc_threshold(&self, l1_sensitivity: f64, comb_len: usize) -> f64 {
        if comb_len == 1 {
            1.0 + (self.sigmas[0]
                * l1_sensitivity.sqrt()
                * Normal::new(0.0, 1.0)
                    .unwrap()
                    .inverse_cdf((1.0 - (self.delta / 2.0)).powf(1.0 / l1_sensitivity)))
        } else {
            // thresholds should start at index 2 (1-counts needs to be fixed to guarantee DP)
            match self.threshold.clone() {
                NoisyCountThreshold::Fixed(thresholds) => {
                    thresholds.get(&comb_len).cloned().unwrap_or(0.0)
                }
                NoisyCountThreshold::Adaptive(thresholds) => {
                    // PPF at 0.5 should give threshold = 0
                    self.sigmas[comb_len - 1]
                        * l1_sensitivity.sqrt()
                        // threshold values should be between 0 and 0.5
                        // we are dividing by 2 here to normalize it between 0 and 1.0
                        * Normal::new(0.0, 1.0).unwrap().inverse_cdf(
                            1.0 - (
                                thresholds.get(&comb_len).cloned().unwrap_or(1.0) / 2.0
                            ).min(0.5),
                        )
                }
            }
        }
    }

    #[inline]
    fn retain_based_on_threshold(
        &self,
        all_current_aggregates: &mut CombinationsCountMap,
        l1_sensitivity: f64,
        comb_len: usize,
    ) {
        let threshold = self.calc_threshold(l1_sensitivity, comb_len);

        debug!("used threshold = {}", threshold);

        // make sure to retain combinations that have a count greater than the threshold
        // and also greater than 0, in case the threshold is negative somehow
        all_current_aggregates.retain(|_comb, count| *count > threshold && *count > 0.0);
    }

    #[inline]
    fn add_gaussian_noise_and_retain_based_on_threshold(
        &self,
        all_current_aggregates: &mut CombinationsCountMap,
        combinations_by_record: &CombinationsByRecord,
        comb_len: usize,
        l1_sensitivity: usize,
    ) {
        info!(
            "applying gaussian noise to aggregates with length = {}, sigma = {}, l1_sensitivity = {}",
            comb_len, self.sigmas[comb_len - 1], l1_sensitivity
        );

        if l1_sensitivity > 0 {
            let l1_sensitivity_f64 = l1_sensitivity as f64;
            let current_sigma = self.sigmas[comb_len - 1] * l1_sensitivity_f64.sqrt();

            NoiseAggregator::increment_count_based_on_sensitivity(
                all_current_aggregates,
                combinations_by_record,
                l1_sensitivity,
            );

            NoiseAggregator::add_gaussian_noise(all_current_aggregates, current_sigma);

            self.retain_based_on_threshold(all_current_aggregates, l1_sensitivity_f64, comb_len);

            debug!("noise added to {}-counts", comb_len);
        } else {
            warn!(
                "combinations of length = {} are being completely removed",
                comb_len
            );
            all_current_aggregates.clear();
        }
    }

    #[inline]
    pub fn protect_number_of_records(&self, number_of_records: usize) -> usize {
        info!(
            "protecting reported number of records with epsilon = {}",
            self.number_of_records_epsilon
        );

        assert!(
            self.number_of_records_epsilon > 0.0,
            "number of records epsilon should be > 0"
        );

        ((number_of_records as f64)
            + Laplace::new(0.0, 1.0 / self.number_of_records_epsilon)
                .unwrap()
                .sample(&mut thread_rng()))
        .round() as usize
    }

    #[inline]
    pub fn build_aggregated_data(
        &self,
        mut noisy_aggregates_by_len: CombinationsCountMapByLen,
    ) -> AggregatedData {
        let mut aggregates_count = AggregatesCountMap::default();

        for (_l, mut aggregates) in noisy_aggregates_by_len.drain() {
            for (comb, count) in aggregates.drain() {
                aggregates_count.insert(
                    comb,
                    AggregatedCount {
                        count: count.round() as usize,
                        contained_in_records: RecordsSet::default(),
                    },
                );
            }
        }

        let mut aggregated_data = AggregatedData::new(
            self.data_block.headers.clone(),
            self.data_block.multi_value_column_metadata_map.clone(),
            self.data_block.number_of_records(),
            Some(self.protect_number_of_records(self.data_block.number_of_records())),
            aggregates_count,
            RecordsSensitivityByLen::default(),
            self.reporting_length,
        );

        aggregated_data.remove_zero_counts();
        aggregated_data.add_missing_parent_combinations();
        aggregated_data.normalize_noisy_combinations();

        aggregated_data
    }

    #[inline]
    fn update_progress<T>(
        progress_reporter: &mut Option<T>,
        n_processed: usize,
        total: usize,
    ) -> StoppableResult<()>
    where
        T: ReportProgress,
    {
        progress_reporter
            .as_mut()
            .map(|r| r.report(calc_percentage(n_processed as f64, total as f64)))
            .unwrap_or_else(|| Ok(()))
    }
}

impl NoiseAggregator {
    /// Creates a new NoiseAggregator
    /// # Arguments
    /// * `data_block` - The data block to create the noisy aggregates from
    /// * `reporting_length` - Maximum combination length to process
    /// * `dp_parameters` - Differential privacy parameters
    /// * `threshold` - Threshold used to filter noisy counts
    #[inline]
    pub fn new(
        data_block: Arc<DataBlock>,
        reporting_length: usize,
        dp_parameters: &DpParameters,
        threshold: NoisyCountThreshold,
    ) -> NoiseAggregator {
        let (percentile_epsilon, sigmas) =
            NoiseAggregator::calc_percentile_epsilon_and_sigma_by_len(
                reporting_length,
                dp_parameters.epsilon,
                dp_parameters.delta,
                dp_parameters.percentile_epsilon_proportion,
                &dp_parameters.sigma_proportions,
            );

        NoiseAggregator {
            data_block,
            reporting_length,
            percentile_percentage: dp_parameters.percentile_percentage,
            percentile_epsilon,
            delta: dp_parameters.delta,
            sigmas,
            threshold,
            number_of_records_epsilon: dp_parameters
                .number_of_records_epsilon
                .unwrap_or(DEFAULT_NUMBER_OF_RECORDS_EPSILON),
        }
    }

    /// Generates the `current_comb_len`-counts. These will be the cross
    /// product `noisy_aggregates_by_len[current_comb_len - 1] x distinct_attributes(noisy_aggregates_by_len[current_comb_len - 1])`:
    /// - All the combinations will be created as a starting 0 count
    /// - Combinations containing any sub combination that is not part of `noisy_aggregates_by_len`
    /// will not be created
    pub fn gen_all_current_aggregates(
        &self,
        noisy_aggregates_by_len: &CombinationsCountMapByLen,
        current_comb_len: usize,
    ) -> CombinationsCountMap {
        if let Some(previous_aggregates) = noisy_aggregates_by_len.get(&(current_comb_len - 1)) {
            self.gen_all_current_aggregates_based_on_previous(
                noisy_aggregates_by_len,
                previous_aggregates,
            )
        } else {
            self.gen_all_current_aggregates_based_on_single_attributes()
        }
    }

    /// Generates the noisy aggregated data with differential privacy
    pub fn generate_noisy_aggregates<T>(
        &mut self,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<AggregatedData>
    where
        T: ReportProgress,
    {
        let mut noisy_aggregates_by_len = CombinationsCountMapByLen::default();
        let sorted_records = self.gen_sorted_records();

        for l in 1..=self.reporting_length {
            let mut all_current_aggregates =
                self.gen_all_current_aggregates(&noisy_aggregates_by_len, l);
            let combinations_by_record = NoiseAggregator::gen_valid_combinations_by_record(
                &sorted_records,
                l,
                &all_current_aggregates,
            );
            let (max_sensitivity, allowed_sensitivity) =
                self.get_max_and_allowed_sensitivities(&combinations_by_record);

            debug!(
                "allowed sensitivity for {}-counts is {} out of {}",
                l, allowed_sensitivity, max_sensitivity
            );

            self.add_gaussian_noise_and_retain_based_on_threshold(
                &mut all_current_aggregates,
                &combinations_by_record,
                l,
                allowed_sensitivity,
            );

            debug!("generated noisy {}-counts", l);

            noisy_aggregates_by_len.insert(l, all_current_aggregates);

            NoiseAggregator::update_progress(progress_reporter, l, self.reporting_length)?;
        }

        Ok(self.build_aggregated_data(noisy_aggregates_by_len))
    }
}
