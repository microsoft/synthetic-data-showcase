use super::{
    consolidate::Consolidate,
    context::SynthesizerContext,
    seeded_rows_synthesizer::SeededRowsSynthesizer,
    suppress::Suppress,
    synthesis_data::SynthesisData,
    typedefs::{AttributeCountMap, AvailableAttrsMap, SynthesizedRecords, SynthesizedRecordsSlice},
};
use itertools::{izip, Itertools};
use log::info;
use std::sync::Arc;

use crate::{
    data_block::{block::DataBlock, typedefs::AttributeRowsMap, value::DataBlockValue},
    processing::aggregator::aggregated_data::AggregatedData,
    utils::{
        math::calc_percentage, reporting::ReportProgress, threading::get_number_of_threads,
        time::ElapsedDurationLogger,
    },
};

/// Represents all the information required to perform the seeded data synthesis
pub struct SeededSynthesizer {
    /// Reference to the original data block
    data_block: Arc<DataBlock>,
    /// Maps a data block value to all the rows where it occurs
    attr_rows_map: Arc<AttributeRowsMap>,
    /// Cached single attribute counts
    single_attr_counts: AttributeCountMap,
    /// Reporting resolution used for data synthesis
    resolution: usize,
    /// Maximum cache size allowed
    cache_max_size: usize,
    /// Percentage already completed on the row synthesis step
    synthesize_percentage: f64,
    /// Percentage already completed on the consolidation step
    consolidate_percentage: f64,
    /// Percentage already completed on the suppression step
    suppress_percentage: f64,
}

impl SeededSynthesizer {
    /// Returns a new SeededSynthesizer
    /// # Arguments
    /// * `data_block` - Sensitive data to be synthesized
    /// * `attr_rows_map` - Maps a data block value to all the rows where it occurs
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    #[inline]
    pub fn new(
        data_block: Arc<DataBlock>,
        attr_rows_map: Arc<AttributeRowsMap>,
        resolution: usize,
        cache_max_size: usize,
    ) -> SeededSynthesizer {
        SeededSynthesizer {
            data_block,
            single_attr_counts: attr_rows_map
                .iter()
                .map(|(attr, rows)| (attr.clone(), rows.len()))
                .collect(),
            attr_rows_map,
            resolution,
            cache_max_size,
            synthesize_percentage: 0.0,
            consolidate_percentage: 0.0,
            suppress_percentage: 0.0,
        }
    }

    /// Performs the row synthesis, consolidation and suppression.
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
            let mut rows_synthesizers: Vec<SeededRowsSynthesizer> = self.build_rows_synthesizers();

            self.synthesize_percentage = 0.0;
            self.consolidate_percentage = 0.0;
            self.suppress_percentage = 0.0;

            self.synthesize_rows(
                &mut synthesized_records,
                &mut rows_synthesizers,
                progress_reporter,
            );
            self.consolidate(
                &mut synthesized_records,
                progress_reporter,
                // use the first context to leverage already cached intersections
                &mut rows_synthesizers[0].context,
                None,
            );
            self.suppress(&mut synthesized_records, progress_reporter);
        }
        synthesized_records
    }

    #[inline]
    fn build_rows_synthesizers(&self) -> Vec<SeededRowsSynthesizer> {
        let chunk_size = ((self.data_block.records.len() as f64) / (get_number_of_threads() as f64))
            .ceil() as usize;
        let mut rows_synthesizers: Vec<SeededRowsSynthesizer> = Vec::default();

        for c in &self.data_block.records.iter().chunks(chunk_size) {
            rows_synthesizers.push(SeededRowsSynthesizer::new(
                SynthesizerContext::new(
                    self.data_block.headers.len(),
                    self.data_block.records.len(),
                    self.resolution,
                    self.cache_max_size,
                ),
                c.cloned().collect(),
                self.attr_rows_map.clone(),
            ));
        }
        rows_synthesizers
    }

    fn synthesize_rows<T>(
        &mut self,
        synthesized_records: &mut SynthesizedRecords,
        rows_synthesizers: &mut Vec<SeededRowsSynthesizer>,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("rows synthesis");

        info!(
            "synthesizing rows with {} thread(s)...",
            get_number_of_threads()
        );

        let total = self.data_block.records.len() as f64;

        SeededRowsSynthesizer::synthesize_all(
            total,
            synthesized_records,
            rows_synthesizers,
            progress_reporter,
        );

        self.update_synthesize_progress(self.data_block.records.len(), total, progress_reporter);
    }

    #[inline]
    fn update_synthesize_progress<T>(
        &mut self,
        n_processed: usize,
        total: f64,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        if let Some(r) = progress_reporter {
            self.synthesize_percentage = calc_percentage(n_processed as f64, total);
            r.report(self.calc_overall_progress());
        }
    }

    #[inline]
    fn calc_overall_progress(&self) -> f64 {
        self.synthesize_percentage * 0.5
            + self.consolidate_percentage * 0.3
            + self.suppress_percentage * 0.2
    }
}

impl SynthesisData for SeededSynthesizer {
    #[inline]
    fn get_data_block(&self) -> &Arc<DataBlock> {
        &self.data_block
    }

    #[inline]
    fn get_single_attr_counts(&self) -> &AttributeCountMap {
        // get all the single attribute counts
        &self.single_attr_counts
    }

    #[inline]
    fn get_resolution(&self) -> usize {
        self.resolution
    }

    #[inline]
    fn get_aggregated_data(&self) -> &AggregatedData {
        // this should never happen during the seeded data synthesis
        panic!("invalid use of get_aggregated_data");
    }
}

impl Consolidate for SeededSynthesizer {
    #[inline]
    fn get_not_used_attrs(
        &self,
        synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap {
        let mut available_attrs: AvailableAttrsMap = AvailableAttrsMap::default();

        // go through the pairs (original_record, synthesized_record) and count how many
        // attributes were not used
        for (original_record, synthesized_record) in izip!(
            self.get_data_block().records.iter(),
            synthesized_records.iter()
        ) {
            for d in original_record.values.iter() {
                if !synthesized_record.contains(d) {
                    let attr = available_attrs.entry(d.clone()).or_insert(0);
                    *attr += 1;
                }
            }
        }
        available_attrs
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
    ) -> Option<Arc<DataBlockValue>> {
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

impl Suppress for SeededSynthesizer {
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
