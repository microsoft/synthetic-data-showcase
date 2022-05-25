mod unseeded_rows_synthesizer;

use log::info;
use std::sync::Arc;
use unseeded_rows_synthesizer::UnseededRowsSynthesizer;

use crate::{
    data_block::{AttributeRowsByColumnMap, DataBlock},
    processing::generator::synthesizers::{cache::SynthesizerCache, typedefs::SynthesizedRecords},
    utils::{
        math::calc_percentage,
        reporting::{ReportProgress, StoppableResult},
        threading::get_number_of_threads,
        time::ElapsedDurationLogger,
    },
};

/// Represents all the information required to perform the unseeded data synthesis
pub struct UnseededSynthesizer {
    /// Reference to the original data block
    data_block: Arc<DataBlock>,
    /// Maps a data block value to all the rows where it occurs grouped by column
    attr_rows_map_by_column: Arc<AttributeRowsByColumnMap>,
    /// Reporting resolution used for data synthesis
    resolution: usize,
    /// Maximum cache size allowed
    cache_max_size: usize,
    /// Empty values on the synthetic data will be represented by this
    empty_value: Arc<String>,
    /// Percentage already completed on the row synthesis step
    synthesize_percentage: f64,
}

impl UnseededSynthesizer {
    /// Returns a new UnseededSynthesizer
    /// # Arguments
    /// * `data_block` - Sensitive data to be synthesized
    /// * `attr_rows_map_by_column` - Maps a data block value to all the rows where it occurs grouped by column
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    /// * `empty_value` - Empty values on the synthetic data will be represented by this
    #[inline]
    pub fn new(
        data_block: Arc<DataBlock>,
        attr_rows_map_by_column: Arc<AttributeRowsByColumnMap>,
        resolution: usize,
        cache_max_size: usize,
        empty_value: Arc<String>,
    ) -> UnseededSynthesizer {
        UnseededSynthesizer {
            data_block,
            attr_rows_map_by_column,
            resolution,
            cache_max_size,
            empty_value,
            synthesize_percentage: 0.0,
        }
    }

    /// Performs the row synthesis
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
            let mut rows_synthesizers: Vec<UnseededRowsSynthesizer> =
                self.build_rows_synthesizers();

            self.synthesize_percentage = 0.0;

            self.synthesize_rows(
                &mut synthesized_records,
                &mut rows_synthesizers,
                progress_reporter,
            )?;
        }
        Ok(synthesized_records)
    }

    #[inline]
    fn build_rows_synthesizers(&self) -> Vec<UnseededRowsSynthesizer> {
        let mut total_size = self.data_block.records.len();
        let chunk_size = ((total_size as f64) / (get_number_of_threads() as f64)).ceil() as usize;
        let mut rows_synthesizers: Vec<UnseededRowsSynthesizer> = Vec::default();

        loop {
            if total_size > chunk_size {
                rows_synthesizers.push(UnseededRowsSynthesizer::new(
                    SynthesizerCache::new(self.cache_max_size),
                    self.data_block.clone(),
                    self.resolution,
                    chunk_size,
                    self.attr_rows_map_by_column.clone(),
                    self.empty_value.clone(),
                ));
                total_size -= chunk_size;
            } else {
                rows_synthesizers.push(UnseededRowsSynthesizer::new(
                    SynthesizerCache::new(self.cache_max_size),
                    self.data_block.clone(),
                    self.resolution,
                    total_size,
                    self.attr_rows_map_by_column.clone(),
                    self.empty_value.clone(),
                ));
                break;
            }
        }
        rows_synthesizers
    }

    fn synthesize_rows<T>(
        &mut self,
        synthesized_records: &mut SynthesizedRecords,
        rows_synthesizers: &mut Vec<UnseededRowsSynthesizer>,
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

        UnseededRowsSynthesizer::synthesize_all(
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
                r.report(self.synthesize_percentage)
            })
            .unwrap_or_else(|| Ok(()))
    }
}
