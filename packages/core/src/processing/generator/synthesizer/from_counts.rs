use super::{
    consolidate::Consolidate,
    context::SynthesizerContext,
    suppress::Suppress,
    synthesis_data::SynthesisData,
    typedefs::{AvailableAttrsMap, SynthesizedRecords, SynthesizedRecordsSlice},
};
use std::sync::Arc;

use crate::{
    data_block::{block::DataBlock, typedefs::AttributeRowsMap},
    utils::{math::calc_percentage, reporting::ReportProgress},
};

/// Represents all the information required to perform the synthesis from counts
pub struct FromCountsSynthesizer {
    /// Reference to the original data block
    data_block: Arc<DataBlock>,
    /// Maps a data block value to all the rows where it occurs
    attr_rows_map: AttributeRowsMap,
    /// Reporting resolution used for data synthesis
    resolution: usize,
    /// Maximum cache size allowed
    cache_max_size: usize,
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
    #[inline]
    pub fn new(
        data_block: Arc<DataBlock>,
        attr_rows_map: AttributeRowsMap,
        resolution: usize,
        cache_max_size: usize,
    ) -> FromCountsSynthesizer {
        FromCountsSynthesizer {
            data_block,
            attr_rows_map,
            resolution,
            cache_max_size,
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

            self.consolidate(&mut synthesized_records, progress_reporter, &mut context);
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
    fn get_attr_rows_map(&self) -> &AttributeRowsMap {
        &self.attr_rows_map
    }

    #[inline]
    fn get_resolution(&self) -> usize {
        self.resolution
    }

    #[inline]
    fn get_attr_rows_map_mut(&mut self) -> &mut AttributeRowsMap {
        &mut self.attr_rows_map
    }
}

impl Consolidate for FromCountsSynthesizer {
    #[inline]
    fn get_not_used_attrs(
        &self,
        _synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap {
        // get all the single attribute counts
        self.get_attr_rows_map()
            .iter()
            .map(|(attr, rows)| (attr.clone(), rows.len() as isize))
            .collect()
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
