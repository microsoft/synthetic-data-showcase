use super::{
    consolidate::Consolidate,
    context::SynthesizerContext,
    suppress::Suppress,
    synthesis_data::SynthesisData,
    typedefs::{AttributeCountMap, AvailableAttrsMap, SynthesizedRecords, SynthesizedRecordsSlice},
};
use std::sync::Arc;

use crate::{
    data_block::{block::DataBlock, typedefs::AttributeRowsMap},
    processing::aggregator::aggregated_data::AggregatedData,
    utils::{math::calc_percentage, reporting::ReportProgress},
};

/// Represents all the information required to perform the synthesis from counts
pub struct FromCountsSynthesizer {
    /// Reference to the original data block
    data_block: Arc<DataBlock>,
    /// Maps a data block value to all the rows where it occurs
    attr_rows_map: AttributeRowsMap,
    /// Cached single attribute counts
    single_attr_counts: AttributeCountMap,
    /// Reporting resolution used for data synthesis
    resolution: usize,
    /// Maximum cache size allowed
    cache_max_size: usize,
    /// Aggregated data used to avoid oversampling
    aggregated_data: Arc<AggregatedData>,
    /// Ratio of oversampling allowed for each L from 1 up
    /// to the reporting length
    oversampling_ratio: Option<f64>,
    /// How many times should we try to resample if
    /// the currently sampled value causes oversampling
    oversampling_tries: Option<usize>,
    /// Percentage already completed on the consolidation step
    consolidate_percentage: f64,
    /// Percentage already completed on the suppression step
    suppress_percentage: f64,
}

impl FromCountsSynthesizer {
    /// Returns a new FromCountsSynthesizer
    /// # Arguments
    /// * `data_block` - Sensitive data to be synthesized
    /// * `attr_rows_map` - Maps a data block value to all the rows where it occurs
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    /// * `aggregated_data` - Aggregated data used to avoid oversampling
    /// * `oversampling_ratio` - Ratio of oversampling allowed for each L from 1 up
    /// to the reporting length
    /// * `oversampling_tries` - How many times should we try to resample if
    /// the currently sampled value causes oversampling
    #[inline]
    pub fn new(
        data_block: Arc<DataBlock>,
        attr_rows_map: AttributeRowsMap,
        resolution: usize,
        cache_max_size: usize,
        aggregated_data: Option<Arc<AggregatedData>>,
        oversampling_ratio: Option<f64>,
        oversampling_tries: Option<usize>,
    ) -> FromCountsSynthesizer {
        FromCountsSynthesizer {
            data_block,
            single_attr_counts: attr_rows_map
                .iter()
                .map(|(attr, rows)| (attr.clone(), rows.len()))
                .collect(),
            attr_rows_map,
            resolution,
            cache_max_size,
            aggregated_data: aggregated_data.unwrap_or_else(|| Arc::new(AggregatedData::default())),
            oversampling_ratio,
            oversampling_tries,
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
    pub fn run<T>(&mut self, progress_reporter: &mut Option<T>) -> SynthesizedRecords
    where
        T: ReportProgress,
    {
        let mut synthesized_records: SynthesizedRecords = SynthesizedRecords::new();

        if !self.data_block.records.is_empty() {
            let mut context = SynthesizerContext::new(
                self.data_block.headers.len(),
                self.data_block.records.len(),
                self.resolution,
                self.cache_max_size,
            );

            self.consolidate_percentage = 0.0;
            self.suppress_percentage = 0.0;

            self.consolidate(
                &mut synthesized_records,
                progress_reporter,
                &mut context,
                self.oversampling_ratio,
                self.oversampling_tries,
            );
            self.suppress(&mut synthesized_records, progress_reporter);
        }
        synthesized_records
    }

    #[inline]
    fn calc_overall_progress(&self) -> f64 {
        self.consolidate_percentage * 0.7 + self.suppress_percentage * 0.3
    }
}

impl SynthesisData for FromCountsSynthesizer {
    #[inline]
    fn get_data_block(&self) -> &Arc<DataBlock> {
        &self.data_block
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

    #[inline]
    fn get_aggregated_data(&self) -> &AggregatedData {
        &self.aggregated_data
    }
}

impl Consolidate for FromCountsSynthesizer {
    #[inline]
    fn get_not_used_attrs(
        &self,
        _synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap {
        // get all the single attribute counts
        self.attr_rows_map
            .iter()
            .map(|(attr, rows)| (attr.clone(), rows.len() as isize))
            .collect()
    }

    #[inline]
    fn sample_next_attr(
        &self,
        context: &mut SynthesizerContext,
        _last_processed: &crate::processing::aggregator::value_combination::ValueCombination,
        current_seed: &super::typedefs::SynthesizerSeedSlice,
        synthesized_record: &super::typedefs::SynthesizedRecord,
        _available_attrs: &AvailableAttrsMap,
        not_allowed_attr_set: &super::typedefs::NotAllowedAttrSet,
    ) -> Option<Arc<crate::data_block::value::DataBlockValue>> {
        context.sample_next_attr_from_seed(
            synthesized_record,
            current_seed,
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
    ) where
        T: ReportProgress,
    {
        if let Some(r) = progress_reporter {
            self.consolidate_percentage = calc_percentage(n_processed as f64, total);
            r.report(self.calc_overall_progress());
        }
    }
}

impl Suppress for FromCountsSynthesizer {
    #[inline]
    fn update_suppress_progress<T>(
        &mut self,
        n_processed: usize,
        total: f64,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        if let Some(r) = progress_reporter {
            self.suppress_percentage = calc_percentage(n_processed as f64, total);
            r.report(self.calc_overall_progress());
        }
    }
}
