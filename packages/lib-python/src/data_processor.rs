use csv::ReaderBuilder;
use log::{log_enabled, Level::Debug};
use pyo3::{exceptions::PyValueError, prelude::*};
use sds_core::{
    data_block::{CsvDataBlockCreator, CsvIOError, DataBlock, DataBlockCreator},
    processing::{
        aggregator::{AggregatedData, Aggregator},
        generator::{ConsolidateParameters, GeneratedData, Generator, SynthesisMode},
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

    #[inline]
    /// Returns the number of records on the data block
    pub fn number_of_records(&self) -> usize {
        self.data_block.number_of_records()
    }

    /// Builds the aggregated data for the content
    /// using the specified `reporting_length`.
    /// The result is written to `sensitive_aggregates_path` and `reportable_aggregates_path`.
    /// # Arguments
    /// * `reporting_length` - Maximum length to compute attribute combinations
    /// (0 means no suppression)
    pub fn aggregate(&self, reporting_length: usize) -> AggregatedData {
        let mut progress_reporter = if log_enabled!(Debug) {
            Some(LoggerProgressReporter::new(Debug))
        } else {
            None
        };
        let mut aggregator = Aggregator::new(self.data_block.clone());
        aggregator.aggregate(reporting_length, &mut progress_reporter)
    }

    /// Synthesizes the content using the specified `resolution` and
    /// returns the generated data
    /// # Arguments
    /// * `cache_max_size` - Maximum cache size used during the synthesis process
    /// * `resolution` - Reporting resolution to be used
    /// * `empty_value` - Empty values on the synthetic data will be represented by this
    /// * `synthesis_mode` - Which mode to perform the data synthesis ("row_seeded", "unseeded", "value_seeded" or "aggregate_seeded")
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
