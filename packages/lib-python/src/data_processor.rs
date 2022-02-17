use csv::ReaderBuilder;
use log::{log_enabled, Level::Debug};
use pyo3::{exceptions::PyValueError, prelude::*};
use sds_core::{
    data_block::{
        block::DataBlock, csv_block_creator::CsvDataBlockCreator, csv_io_error::CsvIOError,
        data_block_creator::DataBlockCreator,
    },
    processing::{
        aggregator::{aggregated_data::AggregatedData, Aggregator},
        generator::{
            generated_data::GeneratedData,
            synthesizer::consolidate_parameters::ConsolidateParameters, Generator, SynthesisMode,
        },
    },
    utils::reporting::LoggerProgressReporter,
};
use std::{str::FromStr, sync::Arc};

#[pyclass]
/// Processor exposing the main features
pub struct SDSProcessor {
    data_block: Arc<DataBlock>,
}

#[pymethods]
impl SDSProcessor {
    /// Creates a new processor by reading the content of a given file
    /// # Arguments
    /// * `path` - File to be read to build the data block
    /// * `delimiter` - CSV/TSV separator for the content on `path`
    /// * `use_columns` - Column names to be used (if `[]` use all columns)
    /// * `sensitive_zeros` - Column names containing sensitive zeros
    /// (if `[]` no columns are considered to have sensitive zeros)
    /// * `record_limit` - Use only the first `record_limit` records (if `0` use all records)
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

    #[staticmethod]
    /// Load the SDS Processor for the data block linked to `aggregated_data`
    pub fn from_aggregated_data(aggregated_data: &AggregatedData) -> SDSProcessor {
        SDSProcessor {
            data_block: aggregated_data.data_block.clone(),
        }
    }

    #[inline]
    /// Returns the number of records on the data block
    pub fn number_of_records(&self) -> usize {
        self.data_block.number_of_records()
    }

    #[inline]
    /// Returns the number of records on the data block protected by `resolution`
    pub fn protected_number_of_records(&self, resolution: usize) -> usize {
        self.data_block.protected_number_of_records(resolution)
    }

    #[inline]
    /// Normalizes the reporting length based on the number of selected headers.
    /// Returns the normalized value
    /// # Arguments
    /// * `reporting_length` - Reporting length to be normalized (0 means use all columns)
    pub fn normalize_reporting_length(&self, reporting_length: usize) -> usize {
        self.data_block.normalize_reporting_length(reporting_length)
    }

    /// Builds the aggregated data for the content
    /// using the specified `reporting_length` and `sensitivity_threshold`.
    /// The result is written to `sensitive_aggregates_path` and `reportable_aggregates_path`.
    /// # Arguments
    /// * `reporting_length` - Maximum length to compute attribute combinations
    /// * `sensitivity_threshold` - Sensitivity threshold to filter record attributes
    /// (0 means no suppression)
    pub fn aggregate(
        &self,
        reporting_length: usize,
        sensitivity_threshold: usize,
    ) -> AggregatedData {
        let mut progress_reporter = if log_enabled!(Debug) {
            Some(LoggerProgressReporter::new(Debug))
        } else {
            None
        };
        let mut aggregator = Aggregator::new(self.data_block.clone());
        aggregator.aggregate(
            reporting_length,
            sensitivity_threshold,
            &mut progress_reporter,
        )
    }

    /// Synthesizes the content using the specified `resolution` and
    /// returns the generated data
    /// # Arguments
    /// * `cache_max_size` - Maximum cache size used during the synthesis process
    /// * `resolution` - Reporting resolution to be used
    /// * `empty_value` - Empty values on the synthetic data will be represented by this
    /// * `synthesis_mode` - Which mode to perform the data synthesis ("seeded", "unseeded", "from_counts" or "from_aggregates")
    // * `consolidate_parameters` - Parameters used for data consolidation
    pub fn generate(
        &self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        synthesis_mode: String,
        consolidate_parameters: ConsolidateParameters,
    ) -> Result<GeneratedData, PyErr> {
        let mut progress_reporter = if log_enabled!(Debug) {
            Some(LoggerProgressReporter::new(Debug))
        } else {
            None
        };
        let mut generator = Generator::new(self.data_block.clone());
        let mode = SynthesisMode::from_str(&synthesis_mode).map_err(PyValueError::new_err)?;

        Ok(generator.generate(
            resolution,
            cache_max_size,
            empty_value,
            mode,
            consolidate_parameters,
            &mut progress_reporter,
        ))
    }
}
