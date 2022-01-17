use super::{
    percentile::DpPercentile,
    typedefs::{AllowedSensitivityByLen, CombinationsByRecord, CombinationsToRemoveByRecord},
};
use itertools::Itertools;
use log::{debug, info};
use rand::{prelude::IteratorRandom, thread_rng};
use std::sync::Arc;

use crate::processing::aggregator::{
    aggregated_data::AggregatedData, typedefs::ALL_SENSITIVITIES_INDEX,
    value_combination::ValueCombination,
};

/// Structure that takes a reference to the aggregated data
/// and provide ways to make filter aggregate counts by sensitivity
/// using differential privacy
pub struct AggregatedDataSensitivityFilter<'aggregated_data> {
    combs_by_record: CombinationsByRecord,
    aggregated_data: &'aggregated_data mut AggregatedData,
}

impl<'aggregated_data> AggregatedDataSensitivityFilter<'aggregated_data> {
    /// Creates a new AggregatedDataSensitivityFilter for the given aggregated data
    #[inline]
    pub fn new(
        aggregated_data: &'aggregated_data mut AggregatedData,
    ) -> AggregatedDataSensitivityFilter<'aggregated_data> {
        AggregatedDataSensitivityFilter {
            combs_by_record: AggregatedDataSensitivityFilter::make_combinations_by_record(
                aggregated_data,
            ),
            aggregated_data,
        }
    }

    /// Filters aggregates counts for each record to ensure that the final sensitivity
    /// for each record will be `<= percentile_percentage`.
    /// Returns the maximum allowed sensitivity by combination length.
    /// # Arguments
    /// * `percentile_percentage` - percentage used to calculate the percentile that filters sensitivity
    /// * `epsilon` - epsilon used to generate noise when selecting the `percentile_percentage`-th percentile
    /// for sensitivity
    pub fn filter_sensitivities(
        &mut self,
        percentile_percentage: usize,
        epsilon: f64,
    ) -> AllowedSensitivityByLen {
        info!(
            "filtering sensitivities with percentile = {} and epsilon = {}",
            percentile_percentage, epsilon
        );

        let max_sensitivities: Vec<usize> = self.get_max_sensitivities_by_len();
        let allowed_sensitivity_by_len: AllowedSensitivityByLen =
            self.filter_allowed_sensitivity_by_len(percentile_percentage, epsilon);
        let filtered_max_sensitivities: Vec<usize> = self.get_max_sensitivities_by_len();

        // validate the filtering
        assert!(allowed_sensitivity_by_len
            .iter()
            .all(|(length, sensitivity)| filtered_max_sensitivities[*length] <= *sensitivity));

        debug!(
            "sensitivities before percentile filtering: {:?}",
            max_sensitivities
        );
        debug!(
            "sensitivities after percentile filtering: {:?}",
            filtered_max_sensitivities
        );

        // remove 0 counts from final result
        self.aggregated_data.remove_zero_counts();

        allowed_sensitivity_by_len
    }

    #[inline]
    fn make_combinations_by_record(aggregated_data: &AggregatedData) -> CombinationsByRecord {
        let mut combs_by_record: CombinationsByRecord = CombinationsByRecord::new();

        combs_by_record.resize_with(aggregated_data.data_block.number_of_records(), Vec::default);

        for (comb, count) in aggregated_data.aggregates_count.iter() {
            for record_index in count.contained_in_records.iter() {
                combs_by_record[*record_index].push(comb.clone());
            }
        }
        combs_by_record
    }

    #[inline]
    fn get_max_sensitivities_by_len(&self) -> Vec<usize> {
        self.aggregated_data
            .records_sensitivity_by_len
            .iter()
            .map(|rs| *rs.iter().max().unwrap_or(&0))
            .collect()
    }

    #[inline]
    fn remove_combs_contributions_for_records(
        &mut self,
        combs_to_remove_by_record: &CombinationsToRemoveByRecord,
    ) {
        for (record_index, combs_to_remove) in combs_to_remove_by_record.iter() {
            for value in &self.combs_by_record[*record_index] {
                let value_set = value.build_ref_set();
                let count = self
                    .aggregated_data
                    .aggregates_count
                    .get_mut(value)
                    .unwrap();

                // this combination might have already been removed from the record on previous
                // iterations, so we double check it is still in the contained_in_records set
                if count.contained_in_records.contains(record_index)
                    && combs_to_remove
                        .iter()
                        .any(|c| ValueCombination::ref_set_contains_other(&value_set, c))
                {
                    count.count -= 1;
                    count.contained_in_records.remove(record_index);
                    self.aggregated_data.records_sensitivity_by_len[value.len()][*record_index] -=
                        1;
                    self.aggregated_data.records_sensitivity_by_len[ALL_SENSITIVITIES_INDEX]
                        [*record_index] -= 1;
                }
            }
        }
    }

    #[inline]
    fn select_n_combs_contributions_to_remove(
        &mut self,
        n_to_remove: usize,
        record_index: usize,
        length: usize,
    ) -> Vec<Arc<ValueCombination>> {
        self.combs_by_record[record_index]
            .iter()
            .filter(|comb| {
                if comb.len() == length {
                    let count = self.aggregated_data.aggregates_count.get(*comb).unwrap();
                    // this combination might have already been removed from the record on previous
                    // iterations, so we double check it is still in the contained_in_records set
                    count.contained_in_records.contains(&record_index) && count.count > 0
                } else {
                    false
                }
            })
            .choose_multiple(&mut thread_rng(), n_to_remove)
            .iter()
            .map(|comb| (**comb).clone())
            .collect_vec()
    }

    #[inline]
    fn find_combinations_to_remove(
        &mut self,
        length: usize,
        allowed_sensitivity: usize,
    ) -> CombinationsToRemoveByRecord {
        let mut combs_to_remove_by_record = CombinationsToRemoveByRecord::default();

        for record_index in 0..self.aggregated_data.data_block.number_of_records() {
            let current_sensitivity =
                self.aggregated_data.records_sensitivity_by_len[length][record_index];

            if current_sensitivity > allowed_sensitivity {
                combs_to_remove_by_record.insert(
                    record_index,
                    self.select_n_combs_contributions_to_remove(
                        current_sensitivity - allowed_sensitivity,
                        record_index,
                        length,
                    ),
                );
            }
        }
        combs_to_remove_by_record
    }

    fn filter_allowed_sensitivity_by_len(
        &mut self,
        percentile_percentage: usize,
        epsilon: f64,
    ) -> AllowedSensitivityByLen {
        let mut allowed_sensitivity_by_len = AllowedSensitivityByLen::default();

        if self.aggregated_data.reporting_length < 2 {
            return allowed_sensitivity_by_len;
        }

        // for the length = 1 do not filter sensitivity
        allowed_sensitivity_by_len.insert(
            1,
            *self.aggregated_data.records_sensitivity_by_len[1]
                .iter()
                .max()
                .unwrap_or(&0),
        );

        for length in 2..=self.aggregated_data.reporting_length {
            let percentile_selector =
                DpPercentile::new(self.aggregated_data.records_sensitivity_by_len[length].clone());
            let allowed_sensitivity = percentile_selector
                .kth_percentile_quality_scores_iter(percentile_percentage)
                .get_noisy_max(epsilon)
                .unwrap_or(0);

            info!(
                "finding combinations of length {} to be removed across all records for allowed sensitivity of {}",
                length, allowed_sensitivity
            );
            let combs_to_remove_by_record =
                self.find_combinations_to_remove(length, allowed_sensitivity);

            if !combs_to_remove_by_record.is_empty() {
                info!(
                    "removing counts of length {} and derived ones from {} records",
                    length,
                    combs_to_remove_by_record.len()
                );
                self.remove_combs_contributions_for_records(&combs_to_remove_by_record);
            }
            allowed_sensitivity_by_len.insert(length, allowed_sensitivity);
        }
        allowed_sensitivity_by_len
    }
}
