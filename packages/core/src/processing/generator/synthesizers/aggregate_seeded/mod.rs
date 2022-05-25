use itertools::Itertools;
use std::sync::Arc;

use crate::{
    data_block::{DataBlockHeaders, DataBlockValue},
    processing::{
        aggregator::{AggregatedData, ValueCombination},
        generator::synthesizers::{
            consolidate_parameters::ConsolidateParameters,
            traits::{Consolidate, ConsolidateContext, Suppress, SynthesisData},
            typedefs::{
                AttributeCountMap, AvailableAttrsMap, NotAllowedAttrSet, SynthesizedRecord,
                SynthesizedRecords, SynthesizedRecordsSlice,
            },
        },
    },
    utils::{
        collections::sample_weighted,
        math::calc_percentage,
        reporting::{ReportProgress, StoppableResult},
    },
};

/// Represents all the information required to perform aggregated
/// seeded synthesis
pub struct AggregateSeededSynthesizer {
    /// Parameters used for data consolidation
    consolidate_parameters: ConsolidateParameters,
    /// Cached single attribute counts
    single_attr_counts: AttributeCountMap,
    /// Percentage already completed on the consolidation step
    consolidate_percentage: f64,
    /// Percentage already completed on the suppression step
    suppress_percentage: f64,
}

impl AggregateSeededSynthesizer {
    /// Returns a new AggregateSeededSynthesizer
    /// # Arguments
    /// * `aggregated_data` - Aggregated data to synthesize from
    /// * `use_synthetic_counts` - Whether synthetic counts should be used to balance
    /// the sampling process or not
    #[inline]
    pub fn new(
        aggregated_data: Arc<AggregatedData>,
        use_synthetic_counts: bool,
    ) -> AggregateSeededSynthesizer {
        AggregateSeededSynthesizer {
            single_attr_counts: aggregated_data.calc_single_attribute_counts(),
            consolidate_parameters: ConsolidateParameters::new(
                aggregated_data,
                None,
                None,
                use_synthetic_counts,
            ),
            consolidate_percentage: 0.0,
            suppress_percentage: 0.0,
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
            self.suppress_percentage = 0.0;

            self.consolidate(
                &mut synthesized_records,
                progress_reporter,
                self.consolidate_parameters.clone(),
            )?;
            self.suppress(&mut synthesized_records, progress_reporter)?;
        }
        Ok(synthesized_records)
    }

    #[inline]
    fn calc_overall_progress(&self) -> f64 {
        self.consolidate_percentage * 0.7 + self.suppress_percentage * 0.3
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
                {
                    // find the minimum value between the new record
                    // length and the combination length
                    let combination_length = usize::min(
                        synthesized_record.len() + 1,
                        self.consolidate_parameters.aggregated_data.reporting_length,
                    );
                    let mut current_comb = last_processed.clone();
                    let mut sensitive_count = 0;

                    current_comb.extend(
                        attr.clone(),
                        &self.consolidate_parameters.aggregated_data.headers,
                    );

                    // check if the combinations
                    // from this record are valid according
                    // to the resolution
                    for mut comb in current_comb.iter().combinations(combination_length) {
                        let value_combination =
                            ValueCombination::new(comb.drain(..).cloned().collect());

                        if let Some(local_count) = self
                            .consolidate_parameters
                            .aggregated_data
                            .aggregates_count
                            .get(&value_combination)
                        {
                            if self.consolidate_parameters.use_synthetic_counts {
                                let synthetic_count = consolidate_context
                                    .synthetic_counts
                                    .get(&value_combination)
                                    .unwrap_or(&0);

                                if *synthetic_count == 0 {
                                    // burst contribution if the combination has not
                                    // been used just yet
                                    sensitive_count += 2 * self
                                        .consolidate_parameters
                                        .aggregated_data
                                        .number_of_records;
                                } else {
                                    if *synthetic_count > local_count.count {
                                        return None;
                                    }

                                    // get the aggregate count
                                    // that will be used in the weighted sampling
                                    // and remove the count already synthesized
                                    sensitive_count += local_count.count - synthetic_count;
                                }
                            } else {
                                // get the aggregate count
                                // that will be used in the weighted sampling
                                sensitive_count += local_count.count;
                            }
                        } else {
                            return None;
                        }
                    }

                    Some((attr.clone(), sensitive_count))
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
                r.report(self.calc_overall_progress())
            })
            .unwrap_or_else(|| Ok(()))
    }
}

impl Suppress for AggregateSeededSynthesizer {
    #[inline]
    fn update_suppress_progress<T>(
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
                self.suppress_percentage = calc_percentage(n_processed as f64, total);
                r.report(self.calc_overall_progress())
            })
            .unwrap_or_else(|| Ok(()))
    }
}
