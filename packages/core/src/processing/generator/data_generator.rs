use super::generated_data::GeneratedData;
use super::synthesizers::RowSeededSynthesizer;
use super::synthesizers::SynthesizedRecords;
use super::synthesizers::UnseededSynthesizer;
use super::synthesizers::ValueSeededSynthesizer;
use super::OversamplingParameters;
use log::info;
use std::sync::Arc;

use crate::data_block::DataBlock;
use crate::data_block::DataBlockHeaders;
use crate::data_block::RawSyntheticData;
use crate::processing::aggregator::AggregatedData;
use crate::processing::generator::synthesizers::AggregateSeededSynthesizer;
use crate::processing::generator::synthesizers::SynthesizerCacheKey;
use crate::utils::reporting::ReportProgress;
use crate::utils::reporting::StoppableResult;
use crate::utils::time::ElapsedDurationLogger;

/// Process a data block and generates new synthetic data
#[derive(Default)]
pub struct Generator {}

impl Generator {
    #[inline]
    fn build_generated_data(
        &self,
        headers: &DataBlockHeaders,
        number_of_records: usize,
        mut synthesized_records: SynthesizedRecords,
        empty_value: Arc<String>,
    ) -> GeneratedData {
        let mut result: RawSyntheticData = RawSyntheticData::default();
        let mut records: RawSyntheticData = synthesized_records
            .drain(..)
            .map(|r| SynthesizerCacheKey::new(headers.len(), &r).format_record(&empty_value))
            .collect();

        // sort by number of defined attributes
        records.sort();
        records.sort_by_key(|r| {
            -r.iter()
                .map(|s| if s.is_empty() { 0 } else { 1 })
                .sum::<isize>()
        });

        result.push(headers.to_vec());
        result.extend(records);

        let expansion_ratio = (result.len() - 1) as f64 / number_of_records as f64;

        info!("expansion ratio: {:.4?}", expansion_ratio);

        GeneratedData::new(result, expansion_ratio)
    }

    /// Synthesize data using the row seeded method
    /// # Arguments
    /// * `data_block` - Sensitive data to be synthesized
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    /// * `empty_value` - Empty values on the synthetic data will be represented by this
    /// * `progress_reporter` - Will be used to report the processing
    /// progress (`ReportProgress` trait). If `None`, nothing will be reported
    pub fn generate_row_seeded<T>(
        &self,
        data_block: &Arc<DataBlock>,
        resolution: usize,
        cache_max_size: usize,
        empty_value: &str,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<GeneratedData>
    where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("row seeded generation");

        info!("starting row seeded generation...");

        let empty_value_arc = Arc::new(empty_value.to_owned());
        let mut synth = RowSeededSynthesizer::new(
            data_block.clone(),
            Arc::new(data_block.calc_attr_rows()),
            resolution,
            cache_max_size,
        );

        Ok(self.build_generated_data(
            &data_block.headers,
            data_block.number_of_records(),
            synth.run(progress_reporter)?,
            empty_value_arc,
        ))
    }

    /// Synthesize data using the unseeded method
    /// # Arguments
    /// * `data_block` - Sensitive data to be synthesized
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    /// * `empty_value` - Empty values on the synthetic data will be represented by this
    /// * `progress_reporter` - Will be used to report the processing
    /// progress (`ReportProgress` trait). If `None`, nothing will be reported
    pub fn generate_unseeded<T>(
        &self,
        data_block: &Arc<DataBlock>,
        resolution: usize,
        cache_max_size: usize,
        empty_value: &str,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<GeneratedData>
    where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("unseeded generation");

        info!("starting unseeded generation...");

        let empty_value_arc = Arc::new(empty_value.to_owned());
        let mut synth = UnseededSynthesizer::new(
            data_block.clone(),
            Arc::new(data_block.calc_attr_rows_by_column_with_empty_values(&empty_value_arc)),
            resolution,
            cache_max_size,
            empty_value_arc.clone(),
        );

        Ok(self.build_generated_data(
            &data_block.headers,
            data_block.number_of_records(),
            synth.run(progress_reporter)?,
            empty_value_arc,
        ))
    }

    /// Synthesize data using the value seeded method
    /// # Arguments
    /// * `data_block` - Sensitive data to be synthesized
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    /// * `empty_value` - Empty values on the synthetic data will be represented by this
    /// * `oversampling_parameters` - Parameters used to control oversampling
    /// (if `None`, allow unlimited oversampling)
    /// * `progress_reporter` - Will be used to report the processing
    /// progress (`ReportProgress` trait). If `None`, nothing will be reported
    pub fn generate_value_seeded<T>(
        &self,
        data_block: &Arc<DataBlock>,
        resolution: usize,
        cache_max_size: usize,
        empty_value: &str,
        oversampling_parameters: Option<OversamplingParameters>,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<GeneratedData>
    where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("value seeded generation");

        info!("starting value seeded generation...");

        let empty_value_arc = Arc::new(empty_value.to_owned());
        let mut synth = ValueSeededSynthesizer::new(
            data_block.clone(),
            data_block.calc_attr_rows(),
            resolution,
            cache_max_size,
            oversampling_parameters,
        );

        Ok(self.build_generated_data(
            &data_block.headers,
            data_block.number_of_records(),
            synth.run(progress_reporter)?,
            empty_value_arc,
        ))
    }

    /// Synthesize data using the aggregate seeded method
    /// # Arguments
    /// * `empty_value` - Empty values on the synthetic data will be represented by this
    /// * `aggregated_data` - Aggregated data where data should be synthesized from
    /// * `use_synthetic_counts` - Whether synthetic counts should be used to balance
    /// the sampling process or not
    /// * `progress_reporter` - Will be used to report the processing
    /// progress (`ReportProgress` trait). If `None`, nothing will be reported
    pub fn generate_aggregate_seeded<T>(
        &self,
        empty_value: &str,
        aggregated_data: Arc<AggregatedData>,
        use_synthetic_counts: bool,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<GeneratedData>
    where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("aggregate seeded generation");

        info!("starting aggregate seeded generation...");

        let empty_value_arc = Arc::new(empty_value.to_owned());
        let mut synth =
            AggregateSeededSynthesizer::new(aggregated_data.clone(), use_synthetic_counts);

        Ok(self.build_generated_data(
            &aggregated_data.headers,
            aggregated_data.number_of_records,
            synth.run(progress_reporter)?,
            empty_value_arc,
        ))
    }
}
