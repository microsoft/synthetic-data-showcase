use itertools::Itertools;
use statrs::statistics::{Data, OrderStatistics};
use std::sync::Arc;

use crate::{
    data_block::{DataBlockHeaders, DataBlockValue},
    processing::{
        aggregator::{AggregatedData, ValueCombination},
        generator::synthesizers::{
            consolidate_parameters::ConsolidateParameters,
            traits::{Consolidate, ConsolidateContext, SynthesisData},
            typedefs::{
                AttributeCountMap, AvailableAttrsMap, NotAllowedAttrSet, SynthesizedRecord,
                SynthesizedRecords, SynthesizedRecordsSlice,
            },
        },
    },
    utils::{
        collections::{sample_weighted, sort_unstable_f64},
        math::calc_percentage,
        reporting::{ReportProgress, StoppableResult},
    },
};

const DEFAULT_WEIGHT_SELECTION_PERCENTILE: usize = 95;

/// Represents all the information required to perform aggregated
/// seeded synthesis
pub struct AggregateSeededSynthesizer {
    /// Parameters used for data consolidation
    consolidate_parameters: ConsolidateParameters,
    // Percentile used for the weight selection
    weight_selection_percentile: usize,
    /// Cached single attribute counts
    single_attr_counts: AttributeCountMap,
    /// Percentage already completed on the consolidation step
    consolidate_percentage: f64,
}

impl AggregateSeededSynthesizer {
    /// Returns a new AggregateSeededSynthesizer
    /// # Arguments
    /// * `aggregated_data` - Aggregated data to synthesize from
    /// * `use_synthetic_counts` - Whether synthetic counts should be used to balance
    /// * `weight_selection_percentile` - Percentile used for the weight selection (default of 95 if none)
    /// the sampling process or not
    /// * `target_number_of_records` - Total number of records to be synthesized.
    /// If `None` sample from all available counts
    #[inline]
    pub fn new(
        aggregated_data: Arc<AggregatedData>,
        use_synthetic_counts: bool,
        weight_selection_percentile: Option<usize>,
        target_number_of_records: Option<usize>,
    ) -> AggregateSeededSynthesizer {
        AggregateSeededSynthesizer {
            single_attr_counts: aggregated_data.calc_single_attribute_counts(),
            weight_selection_percentile: weight_selection_percentile
                .unwrap_or(DEFAULT_WEIGHT_SELECTION_PERCENTILE),
            consolidate_parameters: ConsolidateParameters::new(
                aggregated_data,
                None,
                None,
                target_number_of_records,
                use_synthetic_counts,
            ),
            consolidate_percentage: 0.0,
        }
    }

    /// Performs the synthesis from the aggregates, including the consolidation and suppression
    /// steps only
    /// Returns the synthesized records
    /// # Arguments
    /// * `progress_reporter` - Will be used to report the processing
    /// progress (`ReportProgress` trait). If `None`, nothing will be reported
    pub fn run<T>(
        &mut self,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<SynthesizedRecords>
    where
        T: ReportProgress,
    {
        let mut synthesized_records: SynthesizedRecords = SynthesizedRecords::new();

        if self
            .consolidate_parameters
            .aggregated_data
            .number_of_records
            > 0
        {
            self.consolidate_percentage = 0.0;

            self.consolidate(
                &mut synthesized_records,
                progress_reporter,
                self.consolidate_parameters.clone(),
            )?;
        }
        Ok(synthesized_records)
    }

    #[inline]
    fn calc_weight_for_single_combination(
        &self,
        consolidate_context: &ConsolidateContext,
        value_combination: &ValueCombination,
    ) -> Option<usize> {
        let local_count = self
            .consolidate_parameters
            .aggregated_data
            .aggregates_count
            .get(value_combination)?;

        if self.consolidate_parameters.use_synthetic_counts {
            let synthetic_count = consolidate_context
                .synthetic_counts
                .get(value_combination)
                .unwrap_or(&0);

            if local_count.count > *synthetic_count {
                // get the aggregate count
                // that will be used in the weighted sampling
                // and remove the count already synthesized
                Some(local_count.count - synthetic_count)
            } else {
                None
            }
        } else {
            // get the aggregate count
            // that will be used in the weighted sampling
            Some(local_count.count)
        }
    }

    #[inline]
    fn calc_weight_for_all_combinations(
        &self,
        consolidate_context: &ConsolidateContext,
        current_comb: &ValueCombination,
        attr: &Arc<DataBlockValue>,
        percentile: usize,
    ) -> Option<usize> {
        let mut weights = Vec::default();

        for l in 1..=self.consolidate_parameters.aggregated_data.reporting_length {
            for mut comb in current_comb.iter().combinations(l) {
                if comb.contains(&attr) {
                    weights.push(self.calc_weight_for_single_combination(
                        consolidate_context,
                        &ValueCombination::new(comb.drain(..).cloned().collect()),
                    )? as f64);
                }
            }
        }

        sort_unstable_f64(&mut weights);

        let weight = Data::new(weights).percentile(percentile);

        if weight.is_nan() {
            None
        } else {
            Some(weight.round() as usize)
        }
    }
}

impl SynthesisData for AggregateSeededSynthesizer {
    #[inline]
    fn get_headers(&self) -> &DataBlockHeaders {
        &self.consolidate_parameters.aggregated_data.headers
    }

    #[inline]
    fn get_single_attr_counts(&self) -> &AttributeCountMap {
        // get all the single attribute counts
        // from the aggregate counts
        &self.single_attr_counts
    }

    #[inline]
    fn get_resolution(&self) -> usize {
        // when synthesizing from aggregates, those
        // are supposed to have their counts protected in advance
        1
    }
}

impl Consolidate for AggregateSeededSynthesizer {
    #[inline]
    fn get_not_used_attrs(
        &self,
        _synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap {
        // get all the single attribute counts
        // from the aggregate counts
        self.consolidate_parameters
            .aggregated_data
            .aggregates_count
            .iter()
            .filter_map(|(attr, count)| {
                if attr.len() == 1 {
                    Some((attr[0].clone(), count.count as isize))
                } else {
                    None
                }
            })
            .collect()
    }

    #[inline]
    fn sample_next_attr(
        &mut self,
        consolidate_context: &ConsolidateContext,
        last_processed: &ValueCombination,
        synthesized_record: &SynthesizedRecord,
        not_allowed_attr_set: &NotAllowedAttrSet,
    ) -> Option<Arc<DataBlockValue>> {
        let counts: AttributeCountMap = consolidate_context
            .available_attrs
            .iter()
            .filter_map(|(attr, count)| {
                if *count > 0
                    && !synthesized_record.contains(attr)
                    && !not_allowed_attr_set.contains(attr)
                    && !last_processed.contains_column(attr.column_index)
                {
                    let mut current_comb = last_processed.clone();

                    current_comb.extend(
                        attr.clone(),
                        &self.consolidate_parameters.aggregated_data.headers,
                    );

                    Some((
                        attr.clone(),
                        if current_comb.len()
                            > self.consolidate_parameters.aggregated_data.reporting_length
                        {
                            self.calc_weight_for_all_combinations(
                                consolidate_context,
                                &current_comb,
                                attr,
                                self.weight_selection_percentile,
                            )?
                        } else {
                            self.calc_weight_for_single_combination(
                                consolidate_context,
                                &current_comb,
                            )?
                        },
                    ))
                } else {
                    None
                }
            })
            .collect();

        sample_weighted(&counts)
    }

    #[inline]
    fn update_consolidate_progress<T>(
        &mut self,
        n_processed: usize,
        total: f64,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<()>
    where
        T: ReportProgress,
    {
        progress_reporter
            .as_mut()
            .map(|r| {
                self.consolidate_percentage = calc_percentage(n_processed as f64, total);
                r.report(self.consolidate_percentage)
            })
            .unwrap_or_else(|| Ok(()))
    }
}
