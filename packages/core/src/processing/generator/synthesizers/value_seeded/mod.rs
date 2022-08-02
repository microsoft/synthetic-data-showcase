use super::OversamplingParameters;
use std::sync::Arc;

use crate::{
    data_block::{AttributeRowsMap, DataBlock, DataBlockHeaders, DataBlockValue},
    processing::{
        aggregator::ValueCombination,
        generator::synthesizers::{
            attribute_rows_sampler::AttributeRowsSampler,
            cache::SynthesizerCache,
            consolidate_parameters::ConsolidateParameters,
            traits::{Consolidate, ConsolidateContext, Suppress, SynthesisData},
            typedefs::{
                AttributeCountMap, AvailableAttrsMap, NotAllowedAttrSet, SynthesizedRecord,
                SynthesizedRecords, SynthesizedRecordsSlice,
            },
        },
    },
    utils::{
        math::calc_percentage,
        reporting::{ReportProgress, StoppableResult},
    },
};

/// Represents all the information required to perform the value seeded synthesis
pub struct ValueSeededSynthesizer {
    /// Reference to the original data block
    data_block: Arc<DataBlock>,
    /// Maps a data block value to all the rows where it occurs
    attr_rows_map: AttributeRowsMap,
    /// Cached single attribute counts
    single_attr_counts: AttributeCountMap,
    /// Reporting resolution used for data synthesis
    resolution: usize,
    /// Parameters used for data consolidation
    consolidate_parameters: ConsolidateParameters,
    /// Sampler that keeps the attribute rows distributions
    consolidate_sampler: AttributeRowsSampler,
    /// Percentage already completed on the consolidation step
    consolidate_percentage: f64,
    /// Percentage already completed on the suppression step
    suppress_percentage: f64,
}

impl ValueSeededSynthesizer {
    /// Returns a new ValueSeededSynthesizer
    /// # Arguments
    /// * `data_block` - Sensitive data to be synthesized
    /// * `attr_rows_map` - Maps a data block value to all the rows where it occurs
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    /// * `oversampling_parameters` - Parameters used to control oversampling
    /// (if `None`, oversampling will be unlimited)
    #[inline]
    pub fn new(
        data_block: Arc<DataBlock>,
        attr_rows_map: AttributeRowsMap,
        resolution: usize,
        cache_max_size: usize,
        oversampling_parameters: Option<OversamplingParameters>,
    ) -> ValueSeededSynthesizer {
        let consolidate_sampler = AttributeRowsSampler::new(
            data_block.clone(),
            resolution,
            SynthesizerCache::new(cache_max_size),
        );

        ValueSeededSynthesizer {
            data_block,
            single_attr_counts: attr_rows_map
                .iter()
                .map(|(attr, rows)| (attr.clone(), rows.len()))
                .collect(),
            attr_rows_map,
            resolution,
            consolidate_sampler,
            consolidate_parameters: oversampling_parameters
                .map(|params| {
                    ConsolidateParameters::new(
                        params.aggregated_data,
                        params.oversampling_ratio,
                        params.oversampling_tries,
                        None,
                        false,
                    )
                })
                .unwrap_or_default(),
            consolidate_percentage: 0.0,
            suppress_percentage: 0.0,
        }
    }

    /// Performs the synthesis from the counts, including the consolidation and suppression
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

        if !self.data_block.records.is_empty() {
            self.consolidate_percentage = 0.0;
            self.suppress_percentage = 0.0;
            self.consolidate_sampler.clear_cache();

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

impl SynthesisData for ValueSeededSynthesizer {
    #[inline]
    fn get_headers(&self) -> &DataBlockHeaders {
        &self.data_block.headers
    }

    #[inline]
    fn get_single_attr_counts(&self) -> &AttributeCountMap {
        // get all the single attribute counts
        // from the aggregate counts
        &self.single_attr_counts
    }

    #[inline]
    fn get_resolution(&self) -> usize {
        self.resolution
    }
}

impl Consolidate for ValueSeededSynthesizer {
    #[inline]
    fn get_not_used_attrs(
        &self,
        _synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap {
        if self.consolidate_parameters.oversampling_ratio.is_some() {
            // since the aggregate counts will be used
            // to control oversampling
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
        } else {
            // get all the single attribute counts
            self.attr_rows_map
                .iter()
                .map(|(attr, rows)| (attr.clone(), rows.len() as isize))
                .collect()
        }
    }

    #[inline]
    fn sample_next_attr(
        &mut self,
        consolidate_context: &ConsolidateContext,
        _last_processed: &ValueCombination,
        synthesized_record: &SynthesizedRecord,
        not_allowed_attr_set: &NotAllowedAttrSet,
    ) -> Option<Arc<DataBlockValue>> {
        self.consolidate_sampler.sample_next_attr_from_seed(
            synthesized_record,
            &consolidate_context.current_seed,
            not_allowed_attr_set,
            &self.attr_rows_map,
        )
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

impl Suppress for ValueSeededSynthesizer {
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
