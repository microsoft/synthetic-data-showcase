mod seeded_rows_synthesizer;

use itertools::{izip, Itertools};
use log::info;
use seeded_rows_synthesizer::SeededRowsSynthesizer;
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
        threading::get_number_of_threads,
        time::ElapsedDurationLogger,
    },
};

/// Represents all the information required to perform the row seeded synthesis
pub struct RowSeededSynthesizer {
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
    /// Sampler that keeps the attribute rows distributions
    consolidate_sampler: AttributeRowsSampler,
    /// Percentage already completed on the row synthesis step
    synthesize_percentage: f64,
    /// Percentage already completed on the consolidation step
    consolidate_percentage: f64,
    /// Percentage already completed on the suppression step
    suppress_percentage: f64,
}

impl RowSeededSynthesizer {
    /// Returns a new RowSeededSynthesizer
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
    ) -> RowSeededSynthesizer {
        let consolidate_sampler = AttributeRowsSampler::new(
            data_block.clone(),
            resolution,
            SynthesizerCache::new(cache_max_size),
        );

        RowSeededSynthesizer {
            data_block,
            single_attr_counts: attr_rows_map
                .iter()
                .map(|(attr, rows)| (attr.clone(), rows.len()))
                .collect(),
            attr_rows_map,
            resolution,
            cache_max_size,
            consolidate_sampler,
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
    pub fn run<T>(
        &mut self,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<SynthesizedRecords>
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
            )?;

            self.consolidate_sampler.clear_cache();
            self.consolidate(
                &mut synthesized_records,
                progress_reporter,
                ConsolidateParameters::default(),
            )?;
            self.suppress(&mut synthesized_records, progress_reporter)?;
        }
        Ok(synthesized_records)
    }

    #[inline]
    fn build_rows_synthesizers(&self) -> Vec<SeededRowsSynthesizer> {
        let chunk_size = ((self.data_block.records.len() as f64) / (get_number_of_threads() as f64))
            .ceil() as usize;
        let mut rows_synthesizers: Vec<SeededRowsSynthesizer> = Vec::default();

        for c in &self.data_block.records.iter().chunks(chunk_size) {
            rows_synthesizers.push(SeededRowsSynthesizer::new(
                AttributeRowsSampler::new(
                    self.data_block.clone(),
                    self.resolution,
                    SynthesizerCache::new(self.cache_max_size),
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
    ) -> StoppableResult<()>
    where
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
        )?;

        self.update_synthesize_progress(self.data_block.records.len(), total, progress_reporter)?;

        Ok(())
    }

    #[inline]
    fn update_synthesize_progress<T>(
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
                self.synthesize_percentage = calc_percentage(n_processed as f64, total);
                r.report(self.calc_overall_progress())
            })
            .unwrap_or_else(|| Ok(()))
    }

    #[inline]
    fn calc_overall_progress(&self) -> f64 {
        self.synthesize_percentage * 0.5
            + self.consolidate_percentage * 0.3
            + self.suppress_percentage * 0.2
    }
}

impl SynthesisData for RowSeededSynthesizer {
    #[inline]
    fn get_headers(&self) -> &DataBlockHeaders {
        &self.data_block.headers
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
}

impl Consolidate for RowSeededSynthesizer {
    #[inline]
    fn get_not_used_attrs(
        &self,
        synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap {
        let mut available_attrs: AvailableAttrsMap = AvailableAttrsMap::default();

        // go through the pairs (original_record, synthesized_record) and count how many
        // attributes were not used
        for (original_record, synthesized_record) in
            izip!(self.data_block.records.iter(), synthesized_records.iter())
        {
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

impl Suppress for RowSeededSynthesizer {
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
