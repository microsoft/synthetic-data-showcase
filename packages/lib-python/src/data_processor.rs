use csv::ReaderBuilder;
use log::{log_enabled, Level::Debug};
use pyo3::prelude::*;
use sds_core::{
    data_block::{CsvDataBlockCreator, CsvIOError, DataBlock, DataBlockCreator},
    dp::DpParameters,
    dp::{InputValueByLen, NoisyCountThreshold},
    processing::{
        aggregator::{AggregatedData, Aggregator},
        generator::{GeneratedData, Generator, OversamplingParameters},
    },
    utils::reporting::{LoggerProgressReporter, StoppableResult},
};
use std::sync::Arc;

#[pyclass]
pub struct SDSProcessor {
    data_block: Arc<DataBlock>,
}

impl SDSProcessor {
    #[inline]
    fn aggregate_with_dp(
        &self,
        reporting_length: usize,
        dp_parameters: &DpParameters,
        threshold: NoisyCountThreshold,
    ) -> StoppableResult<AggregatedData> {
        let mut progress_reporter = if log_enabled!(Debug) {
            Some(LoggerProgressReporter::new(Debug))
        } else {
            None
        };
        let aggregator = Aggregator::new(self.data_block.clone());
        aggregator.aggregate_with_dp(
            reporting_length,
            dp_parameters,
            threshold,
            &mut progress_reporter,
        )
    }
}

#[pymethods]
impl SDSProcessor {
    #[inline]
    #[new]
    pub fn new(
        path: &str,
        delimiter: char,
        use_columns: Vec<String>,
        sensitive_zeros: Vec<String>,
        record_limit: usize,
    ) -> Result<SDSProcessor, CsvIOError> {
        match CsvDataBlockCreator::create(
            ReaderBuilder::new()
                .delimiter(delimiter as u8)
                .from_path(path),
            &use_columns,
            &sensitive_zeros,
            record_limit,
        ) {
            Ok(data_block) => Ok(SDSProcessor { data_block }),
            Err(err) => Err(CsvIOError::new(err)),
        }
    }

    #[inline]
    pub fn number_of_records(&self) -> usize {
        self.data_block.number_of_records()
    }

    pub fn aggregate(&self, reporting_length: usize) -> StoppableResult<AggregatedData> {
        let mut progress_reporter = if log_enabled!(Debug) {
            Some(LoggerProgressReporter::new(Debug))
        } else {
            None
        };
        let mut aggregator = Aggregator::new(self.data_block.clone());
        aggregator.aggregate(reporting_length, &mut progress_reporter)
    }

    fn aggregate_with_dp_fixed_threshold(
        &self,
        reporting_length: usize,
        dp_parameters: &DpParameters,
        threshold: InputValueByLen<f64>,
    ) -> StoppableResult<AggregatedData> {
        self.aggregate_with_dp(
            reporting_length,
            dp_parameters,
            NoisyCountThreshold::Fixed(threshold),
        )
    }

    fn aggregate_with_dp_adaptive_threshold(
        &self,
        reporting_length: usize,
        dp_parameters: &DpParameters,
        threshold: InputValueByLen<f64>,
    ) -> StoppableResult<AggregatedData> {
        self.aggregate_with_dp(
            reporting_length,
            dp_parameters,
            NoisyCountThreshold::Adaptive(threshold),
        )
    }

    pub fn generate_row_seeded(
        &self,
        resolution: usize,
        cache_max_size: usize,
        empty_value: &str,
    ) -> StoppableResult<GeneratedData> {
        let mut progress_reporter = if log_enabled!(Debug) {
            Some(LoggerProgressReporter::new(Debug))
        } else {
            None
        };
        let generator = Generator::default();

        generator.generate_row_seeded(
            &self.data_block,
            resolution,
            cache_max_size,
            empty_value,
            &mut progress_reporter,
        )
    }

    pub fn generate_unseeded(
        &self,
        resolution: usize,
        cache_max_size: usize,
        empty_value: &str,
    ) -> StoppableResult<GeneratedData> {
        let mut progress_reporter = if log_enabled!(Debug) {
            Some(LoggerProgressReporter::new(Debug))
        } else {
            None
        };
        let generator = Generator::default();

        generator.generate_unseeded(
            &self.data_block,
            resolution,
            cache_max_size,
            empty_value,
            &mut progress_reporter,
        )
    }

    pub fn generate_value_seeded(
        &self,
        resolution: usize,
        cache_max_size: usize,
        empty_value: &str,
        oversampling_parameters: Option<OversamplingParameters>,
    ) -> StoppableResult<GeneratedData> {
        let mut progress_reporter = if log_enabled!(Debug) {
            Some(LoggerProgressReporter::new(Debug))
        } else {
            None
        };
        let generator = Generator::default();

        generator.generate_value_seeded(
            &self.data_block,
            resolution,
            cache_max_size,
            empty_value,
            oversampling_parameters,
            &mut progress_reporter,
        )
    }

    pub fn generate_aggregate_seeded(
        &self,
        empty_value: &str,
        aggregated_data: AggregatedData,
        use_synthetic_counts: bool,
    ) -> StoppableResult<GeneratedData> {
        let mut progress_reporter = if log_enabled!(Debug) {
            Some(LoggerProgressReporter::new(Debug))
        } else {
            None
        };
        let generator = Generator::default();

        generator.generate_aggregate_seeded(
            empty_value,
            Arc::new(aggregated_data),
            use_synthetic_counts,
            &mut progress_reporter,
        )
    }
}
