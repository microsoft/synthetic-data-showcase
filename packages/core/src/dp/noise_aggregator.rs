use super::{
    sensitivity_filter::SensitivityFilter,
    sensitivity_filter_parameters::SensitivityFilterParameters, threshold_type::ThresholdType,
};
use fnv::FnvHashSet;
use itertools::Itertools;
use log::{debug, info, warn};
use rand::{prelude::Distribution as rand_dist, thread_rng};
use statrs::{distribution::Normal, statistics::Distribution};
use std::sync::Arc;

use crate::{
    data_block::DataBlockValue,
    dp::{
        analytic_gaussian::{DpAnalyticGaussianContinuousCDFScale, DEFAULT_TOLERANCE},
        stats_error::StatsError,
        typedefs::{CombinationsByRecord, CombinationsCountMap, CombinationsCountMapByLen},
    },
    processing::aggregator::{
        AggregatedCount, AggregatedData, RecordsSet, ValueCombination, ValueCombinationRefSet,
        ALL_SENSITIVITIES_INDEX,
    },
};

/// Structure that takes a reference to the aggregated data
/// and provide ways do add noise to the aggregates
/// using differential privacy
pub struct NoiseAggregator<'aggregated_data> {
    combs_by_record: CombinationsByRecord,
    aggregated_data: &'aggregated_data mut AggregatedData,
}

impl<'aggregated_data> NoiseAggregator<'aggregated_data> {
    #[inline]
    fn split_privacy_budget(
        &self,
        sensitivity_filter_params: Option<SensitivityFilterParameters>,
    ) -> Option<SensitivityFilterParameters> {
        if self.aggregated_data.reporting_length > 1 {
            // split the privacy budget between the 1, 2, 3...reporting length counts
            sensitivity_filter_params.map(|params| {
                SensitivityFilterParameters::new(
                    params.percentile_percentage,
                    params.epsilon / (self.aggregated_data.reporting_length as f64),
                )
            })
        } else {
            sensitivity_filter_params
        }
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
    fn was_count_not_removed(count: &AggregatedCount) -> bool {
        !count.contained_in_records.is_empty()
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

                        new_comb.extend((*attr).clone(), &self.aggregated_data.headers);

                        if NoiseAggregator::is_combination_valid(noisy_aggregates_by_len, &new_comb)
                        {
                            let count_opt = self.aggregated_data.aggregates_count.get(&new_comb);

                            if let Some(count) = count_opt {
                                if NoiseAggregator::was_count_not_removed(count) {
                                    Some((Arc::new(new_comb), count.count as f64))
                                } else {
                                    None
                                }
                            } else {
                                // this aggregate does not exist on the real data,
                                // let's give it a change of being sampled
                                Some((Arc::new(new_comb), 0.0))
                            }
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
        self.aggregated_data
            .aggregates_count
            .iter()
            .filter_map(|(comb, count)| {
                if comb.len() == 1 {
                    if NoiseAggregator::was_count_not_removed(count) {
                        Some((comb.clone(), count.count as f64))
                    } else {
                        None
                    }
                } else {
                    None
                }
            })
            .collect()
    }

    #[inline]
    fn add_gaussian_noise(
        comb_len: usize,
        epsilon: f64,
        delta: f64,
        l1_sensitivity: f64,
        aggregates: &mut CombinationsCountMap,
    ) -> Result<f64, StatsError> {
        info!(
            "applying gaussian noise to aggregates with length = {} using epsilon = {}, delta = {}, l1_sensitivity = {}",
            comb_len, epsilon, delta, l1_sensitivity
        );

        let mut sigma = 0.0;

        if l1_sensitivity > 0.0 {
            let noise = Normal::new_analytic_gaussian(
                f64::sqrt(l1_sensitivity),
                epsilon,
                delta,
                DEFAULT_TOLERANCE,
            )?;

            sigma = noise.std_dev().unwrap();

            info!(
                "for length = {} the calculated sigma for the noise is {:.2} [used privacy budget is {}]",
                comb_len,
                sigma,
                epsilon
            );

            // sample and add the noise
            for (_comb, count) in aggregates.iter_mut() {
                (*count) = ((*count) + noise.sample(&mut thread_rng())).round();
            }

            info!("noise added to {}-counts", comb_len);
        } else {
            warn!(
                "combinations of length = {} are being completely removed",
                comb_len
            );
        }

        Ok(sigma)
    }

    #[inline]
    fn get_combs_to_remove(
        aggregates: &CombinationsCountMap,
        threshold: f64,
    ) -> Vec<&ValueCombination> {
        aggregates
            .iter()
            .filter_map(|(comb, count)| {
                if *count < threshold {
                    Some(&(**comb))
                } else {
                    None
                }
            })
            .collect()
    }

    #[inline]
    fn was_comb_not_removed_and_contains_comb_to_be_removed(
        comb_ref_set: &ValueCombinationRefSet,
        count: &AggregatedCount,
        combs_to_remove: &[&&ValueCombination],
    ) -> bool {
        NoiseAggregator::was_count_not_removed(count)
            && combs_to_remove
                .iter()
                .any(|c| ValueCombination::ref_set_contains_other(comb_ref_set, c))
    }

    #[inline]
    fn remove_combs_based_on_threshold(aggregates: &mut CombinationsCountMap, threshold: f64) {
        aggregates.retain(|_comb, count| *count >= threshold);
    }

    #[inline]
    fn filter_and_get_sensitivity_for_len(
        &mut self,
        comb_len: usize,
        sensitivity_filter_params: &Option<SensitivityFilterParameters>,
    ) -> f64 {
        if let Some(params) = sensitivity_filter_params {
            return SensitivityFilter::new(&self.combs_by_record, self.aggregated_data)
                .filter_sensitivities_for_len(comb_len, params) as f64;
        }

        self.aggregated_data
            .records_sensitivity_by_len
            .get(comb_len)
            .map(|rs| rs.iter().max().cloned().unwrap_or(0))
            .unwrap_or(0) as f64
    }

    #[inline]
    fn calc_threshold(
        &self,
        total_number_of_combinations_on_length: f64,
        all_current_aggregates: &CombinationsCountMap,
        threshold_type: &ThresholdType,
        threshold_value: f64,
        sigma: f64,
    ) -> f64 {
        match threshold_type {
            ThresholdType::Fixed => threshold_value,
            ThresholdType::Adaptive => sigma * threshold_value,
            ThresholdType::MaxFabrication => {
                let fabricated = all_current_aggregates
                    .iter()
                    .filter_map(|(comb, count)| {
                        if !self.aggregated_data.aggregates_count.contains_key(comb) && *count > 0.0
                        {
                            Some(*count)
                        } else {
                            None
                        }
                    })
                    .sorted_by(|a, b| a.partial_cmp(b).unwrap())
                    .collect_vec();
                let max_allowed_fabricated_count =
                    (total_number_of_combinations_on_length * threshold_value).round() as usize;

                if fabricated.len() > max_allowed_fabricated_count {
                    fabricated[fabricated.len() - max_allowed_fabricated_count - 1].floor() + 1.0
                } else {
                    *fabricated.first().unwrap_or(&1.0)
                }
            }
        }
    }

    #[inline]
    fn replace_aggregates_count(&mut self, mut noisy_aggregates_by_len: CombinationsCountMapByLen) {
        self.aggregated_data.aggregates_count.clear();
        for (_l, mut aggregates) in noisy_aggregates_by_len.drain() {
            for (comb, count) in aggregates.drain() {
                self.aggregated_data.aggregates_count.insert(
                    comb,
                    AggregatedCount {
                        count: count.round() as usize,
                        contained_in_records: RecordsSet::default(),
                    },
                );
            }
        }
    }

    #[inline]
    fn make_combinations_by_record(aggregated_data: &AggregatedData) -> CombinationsByRecord {
        let mut combs_by_record: CombinationsByRecord = CombinationsByRecord::new();

        combs_by_record.resize_with(aggregated_data.number_of_records, Vec::default);

        for (comb, count) in aggregated_data.aggregates_count.iter() {
            for record_index in count.contained_in_records.iter() {
                combs_by_record[*record_index].push(comb.clone());
            }
        }
        combs_by_record
    }
}

impl<'aggregated_data> NoiseAggregator<'aggregated_data> {
    /// Creates a new NoiseAggregator for the given aggregated data
    #[inline]
    pub fn new(
        aggregated_data: &'aggregated_data mut AggregatedData,
    ) -> NoiseAggregator<'aggregated_data> {
        NoiseAggregator {
            combs_by_record: NoiseAggregator::make_combinations_by_record(aggregated_data),
            aggregated_data,
        }
    }

    /// Generates the `current_comb_len`-counts. These will be the cross
    /// product `noisy_aggregates_by_len[current_comb_len - 1] x distinct_attributes(noisy_aggregates_by_len[current_comb_len - 1])`:
    /// - Combinations that do not exist in the `aggregated_data` will be added with a `0` count.
    /// - Combinations that have a `0` count in `aggregated_data` will not be added.
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

    /// For all the combinations in `aggregated_data` that contains any
    /// `combs_to_remove`, set its count on `aggregated_data` to `0`, and remove
    /// its contribution to the record sensitivities
    pub fn decrement_record_sensitivity_and_set_count_to_zero(
        &mut self,
        combs_to_remove: &[&ValueCombination],
    ) {
        let existing_combs_to_remove: Vec<&&ValueCombination> = combs_to_remove
            .iter()
            .filter(|comb| self.aggregated_data.aggregates_count.contains_key(**comb))
            .collect();

        debug!(
            "existing combs to remove are {} out of {}",
            existing_combs_to_remove.len(),
            combs_to_remove.len()
        );

        for (comb, count) in self.aggregated_data.aggregates_count.iter_mut() {
            if NoiseAggregator::was_comb_not_removed_and_contains_comb_to_be_removed(
                &comb.build_ref_set(),
                count,
                &existing_combs_to_remove,
            ) {
                // set the combination count as zero for consistence
                (*count).count = 0;
                // decrement the sensitivity of all records that contains this combination
                for record_index in count.contained_in_records.iter() {
                    self.aggregated_data.records_sensitivity_by_len[comb.len()][*record_index] -= 1;
                    self.aggregated_data.records_sensitivity_by_len[ALL_SENSITIVITIES_INDEX]
                        [*record_index] -= 1;
                }
                // clear this, so it won't affect the sensitivity filtering
                // and to indicate this combination should not be used
                (*count).contained_in_records.clear();
            }
        }
    }

    /// Add gaussian noise to the aggregates, also fabricating and suppressing
    /// combinations to ensure the final result will be differential private
    /// # Arguments
    /// * `epsilon` - privacy budget used to generate noise (split for all lengths)
    /// * `delta` - allowed proportion to leak
    /// * `threshold_type` - either `Fixed` or `Adaptive`
    /// * `threshold_value` - threshold to suppress a combination if its noisy count is smaller than it
    ///     - if `threshold_type` is `Fixed`, the used threshold will be the provided value
    ///     - if `threshold_type` is `Adaptive`, the used threshold will be
    /// `gaussian_std_per_combination_length * threshold_value`)
    ///     - if `threshold_type` is `MaxFabrication`, the used threshold will be calculated so
    /// the fabrication by combination length does not exceed the percentage informed in `threshold_value`
    /// (e.g. 0.2 means 20% of the original aggregates counts for that length)
    /// * `sensitivity_filter_params` - `None` if no sensitivity filtering should be applied, otherwise
    /// the parameters that should be used
    pub fn make_aggregates_noisy(
        &mut self,
        epsilon: f64,
        delta: f64,
        threshold_type: ThresholdType,
        threshold_value: f64,
        sensitivity_filter_params: Option<SensitivityFilterParameters>,
    ) -> Result<(), StatsError> {
        let mut noisy_aggregates_by_len = CombinationsCountMapByLen::default();
        let epsilon_by_length = epsilon / (self.aggregated_data.reporting_length as f64);
        let params = self.split_privacy_budget(sensitivity_filter_params);
        let total_number_of_combinations_by_len = self
            .aggregated_data
            .calc_total_number_of_combinations_by_len();

        for l in 1..=self.aggregated_data.reporting_length {
            let max_sensitivity = self.filter_and_get_sensitivity_for_len(l, &params);
            // this should be called after the aggregated data is filtered using the DP sensitivity
            let mut all_current_aggregates =
                self.gen_all_current_aggregates(&noisy_aggregates_by_len, l);

            if max_sensitivity == 0.0 {
                // make sure the aggregate selection is working as expected
                // if the sensitivity is 0.0, there should never be sensitive
                // combinations
                assert!(all_current_aggregates
                    .keys()
                    .all(|comb| !self.aggregated_data.aggregates_count.contains_key(comb)));
            }

            debug!(
                "maximum sensitivity for {}-counts is {:.2}",
                l, max_sensitivity
            );

            let sigma = NoiseAggregator::add_gaussian_noise(
                l,
                epsilon_by_length,
                delta,
                max_sensitivity,
                &mut all_current_aggregates,
            )?;
            let threshold = self.calc_threshold(
                total_number_of_combinations_by_len[&l] as f64,
                &all_current_aggregates,
                &threshold_type,
                threshold_value,
                sigma,
            );

            debug!("used threshold = {}", threshold);

            let combs_to_remove =
                NoiseAggregator::get_combs_to_remove(&all_current_aggregates, threshold);

            debug!(
                "removing {} {}-counts due to threshold",
                combs_to_remove.len(),
                l
            );

            self.decrement_record_sensitivity_and_set_count_to_zero(&combs_to_remove);

            NoiseAggregator::remove_combs_based_on_threshold(
                &mut all_current_aggregates,
                threshold,
            );

            debug!("generated noisy {}-counts", l);

            noisy_aggregates_by_len.insert(l, all_current_aggregates);
        }

        self.replace_aggregates_count(noisy_aggregates_by_len);

        Ok(())
    }
}
