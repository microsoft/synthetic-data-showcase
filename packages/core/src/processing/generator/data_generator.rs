use super::generated_data::GeneratedData;
use super::synthesizers::ConsolidateParameters;
use super::synthesizers::RowSeededSynthesizer;
use super::synthesizers::SynthesizedRecords;
use super::synthesizers::UnseededSynthesizer;
use super::synthesizers::ValueSeededSynthesizer;
use super::SynthesisMode;
use log::info;
use std::sync::Arc;

use crate::data_block::DataBlock;
use crate::data_block::RawSyntheticData;
use crate::processing::generator::synthesizers::AggregateSeededSynthesizer;
use crate::processing::generator::synthesizers::SynthesizerCacheKey;
use crate::utils::reporting::ReportProgress;
use crate::utils::time::ElapsedDurationLogger;

/// Process a data block and generates new synthetic data
pub struct Generator {
    data_block: Arc<DataBlock>,
}

impl Generator {
    /// Returns a new Generator
    /// # Arguments
    /// * `data_block` - Sensitive data to be synthesized
    #[inline]
    pub fn new(data_block: Arc<DataBlock>) -> Generator {
        Generator { data_block }
    }

    /// Generates new synthetic data based on sensitive data
    /// # Arguments
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    /// * `empty_value` - Empty values on the synthetic data will be represented by this
    /// * `mode` - Which mode to perform the data synthesis
    /// * `consolidate_parameters` - Parameters used for data consolidation
    /// * `progress_reporter` - Will be used to report the processing
    /// progress (`ReportProgress` trait). If `None`, nothing will be reported
    pub fn generate<T>(
        &mut self,
        resolution: usize,
        cache_max_size: usize,
        empty_value: String,
        mode: SynthesisMode,
        consolidate_parameters: ConsolidateParameters,
        progress_reporter: &mut Option<T>,
    ) -> GeneratedData
    where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("data generation");
        let empty_value_arc = Arc::new(empty_value);

        info!("starting {} generation...", mode);

        let synthesized_records = match mode {
            SynthesisMode::RowSeeded => {
                self.row_seeded_synthesis(resolution, cache_max_size, progress_reporter)
            }
            SynthesisMode::Unseeded => self.unseeded_synthesis(
                resolution,
                cache_max_size,
                &empty_value_arc,
                progress_reporter,
            ),
            SynthesisMode::ValueSeeded => self.value_seeded_synthesis(
                resolution,
                cache_max_size,
                consolidate_parameters,
                progress_reporter,
            ),
            SynthesisMode::AggregateSeeded => self.aggregate_seeded_synthesis(
                resolution,
                consolidate_parameters,
                progress_reporter,
            ),
        };

        self.build_generated_data(synthesized_records, empty_value_arc)
    }

    #[inline]
    fn build_generated_data(
        &self,
        mut synthesized_records: SynthesizedRecords,
        empty_value: Arc<String>,
    ) -> GeneratedData {
        let mut result: RawSyntheticData = RawSyntheticData::default();
        let mut records: RawSyntheticData = synthesized_records
            .drain(..)
            .map(|r| {
                SynthesizerCacheKey::new(self.data_block.headers.len(), &r)
                    .format_record(&empty_value)
            })
            .collect();

        // sort by number of defined attributes
        records.sort();
        records.sort_by_key(|r| {
            -r.iter()
                .map(|s| if s.is_empty() { 0 } else { 1 })
                .sum::<isize>()
        });

        result.push(self.data_block.headers.to_vec());
        result.extend(records);

        let expansion_ratio = (result.len() - 1) as f64 / self.data_block.records.len() as f64;

        info!("expansion ratio: {:.4?}", expansion_ratio);

        GeneratedData::new(result, expansion_ratio)
    }

    #[inline]
    fn row_seeded_synthesis<T>(
        &self,
        resolution: usize,
        cache_max_size: usize,
        progress_reporter: &mut Option<T>,
    ) -> SynthesizedRecords
    where
        T: ReportProgress,
    {
        let attr_rows_map = Arc::new(self.data_block.calc_attr_rows());
        let mut synth = RowSeededSynthesizer::new(
            self.data_block.clone(),
            attr_rows_map,
            resolution,
            cache_max_size,
        );
        synth.run(progress_reporter)
    }

    #[inline]
    fn unseeded_synthesis<T>(
        &self,
        resolution: usize,
        cache_max_size: usize,
        empty_value: &Arc<String>,
        progress_reporter: &mut Option<T>,
    ) -> SynthesizedRecords
    where
        T: ReportProgress,
    {
        let attr_rows_map_by_column = Arc::new(
            self.data_block
                .calc_attr_rows_by_column_with_empty_values(empty_value),
        );
        let mut synth = UnseededSynthesizer::new(
            self.data_block.clone(),
            attr_rows_map_by_column,
            resolution,
            cache_max_size,
            empty_value.clone(),
        );
        synth.run(progress_reporter)
    }

    #[inline]
    pub fn value_seeded_synthesis<T>(
        &self,
        resolution: usize,
        cache_max_size: usize,
        consolidate_parameters: ConsolidateParameters,
        progress_reporter: &mut Option<T>,
    ) -> SynthesizedRecords
    where
        T: ReportProgress,
    {
        let attr_rows_map = self.data_block.calc_attr_rows();

        if consolidate_parameters.oversampling_ratio.is_some() {
            assert!(
                !consolidate_parameters
                    .aggregated_data
                    .aggregates_count
                    .is_empty(),
                "no aggregated data provided"
            );
        }

        let mut synth = ValueSeededSynthesizer::new(
            self.data_block.clone(),
            attr_rows_map,
            resolution,
            cache_max_size,
            consolidate_parameters,
        );
        synth.run(progress_reporter)
    }

    #[inline]
    pub fn aggregate_seeded_synthesis<T>(
        &self,
        resolution: usize,
        consolidate_parameters: ConsolidateParameters,
        progress_reporter: &mut Option<T>,
    ) -> SynthesizedRecords
    where
        T: ReportProgress,
    {
        assert!(
            !consolidate_parameters
                .aggregated_data
                .aggregates_count
                .is_empty(),
            "no aggregated data provided"
        );

        let mut synth = AggregateSeededSynthesizer::new(
            self.data_block.clone(),
            resolution,
            consolidate_parameters,
        );
        synth.run(progress_reporter)
    }
}
