use super::sensitivity_filter_parameters::SensitivityFilterParameters;
use itertools::Itertools;
use log::info;
use rand::{prelude::IteratorRandom, thread_rng};
use std::sync::Arc;

use crate::{
    dp::{
        percentile::DpPercentile,
        typedefs::{CombinationsByRecord, CombinationsToRemoveByRecord},
    },
    processing::aggregator::{
        aggregated_data::AggregatedData, typedefs::ALL_SENSITIVITIES_INDEX,
        value_combination::ValueCombination,
    },
};

/// Structure that takes a reference to the aggregated data
/// and provide ways to filter aggregate counts by sensitivity
/// using differential privacy
pub struct SensitivityFilter<'combs_by_record, 'aggregated_data> {
    combs_by_record: &'combs_by_record CombinationsByRecord,
    aggregated_data: &'aggregated_data mut AggregatedData,
}

impl<'combs_by_record, 'aggregated_data> SensitivityFilter<'combs_by_record, 'aggregated_data> {
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

    #[inline]
    fn get_sensitivity_for_length(&self, length: usize) -> usize {
        self.aggregated_data.records_sensitivity_by_len[length]
            .iter()
            .max()
            .cloned()
            .unwrap_or(0)
    }
}

impl<'combs_by_record, 'aggregated_data> SensitivityFilter<'combs_by_record, 'aggregated_data> {
    /// Creates a new SensitivityFilter for the given aggregated data
    #[inline]
    pub fn new(
        combs_by_record: &'combs_by_record CombinationsByRecord,
        aggregated_data: &'aggregated_data mut AggregatedData,
    ) -> SensitivityFilter<'combs_by_record, 'aggregated_data> {
        SensitivityFilter {
            combs_by_record,
            aggregated_data,
        }
    }

    /// For a single combination `length`, filters aggregates counts for each record to ensure that
    /// the final sensitivity for each record will be within the specified percentile calculate with DP.
    /// Returns the maximum allowed sensitivity for the specified combination length
    /// # Arguments
    /// * `length` - combination length to filter the records sensitivities
    /// * `parameters` - parameters used for the sensitivity filtering
    pub fn filter_sensitivities_for_len(
        &mut self,
        length: usize,
        parameters: &SensitivityFilterParameters,
    ) -> usize {
        let percentile_selector =
            DpPercentile::new(self.aggregated_data.records_sensitivity_by_len[length].clone());
        let allowed_sensitivity = percentile_selector
            .kth_percentile_quality_scores_iter(parameters.percentile_percentage)
            .get_noisy_max(parameters.epsilon)
            .unwrap_or(0);
        let original_sensitivity = self.get_sensitivity_for_length(length);

        info!(
            "finding combinations of length {} to be removed across all records, allowed sensitivity = {} out of {} [used privacy budget is {}]",
            length, allowed_sensitivity, original_sensitivity, parameters.epsilon
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

        let updated_sensitivity = self.get_sensitivity_for_length(length);

        assert!(updated_sensitivity <= allowed_sensitivity);

        updated_sensitivity
    }
}
