//! This crate will generate python bindings for the main features
//! of the `sds_core` library.

use csv::ReaderBuilder;
use pyo3::{exceptions::PyIOError, prelude::*};
use sds_core::{
    data_block::{
        block::{DataBlock, DataBlockCreator},
        csv_block_creator::CsvDataBlockCreator,
    },
    processing::{
        aggregator::{typedefs::AggregatedCountByLenMap, Aggregator},
        generator::Generator,
    },
    utils::reporting::LoggerProgressReporter,
};

/// Creates a data block by reading the content of a given file
/// # Arguments
/// * `path` - File to be read to build the data block
/// * `delimiter` - CSV/TSV separator for the content on `path`
/// * `use_columns` - Column names to be used (if `[]` use all columns)
/// * `sensitive_zeros` - Column names containing sensitive zeros
/// (if `[]` no columns are considered to have sensitive zeros)
/// * `record_limit` - Use only the first `record_limit` records (if `0` use all records)
#[pyfunction]
pub fn create_data_block_from_file(
    path: &str,
    delimiter: char,
    use_columns: Vec<String>,
    sensitive_zeros: Vec<String>,
    record_limit: usize,
) -> PyResult<DataBlock> {
    match CsvDataBlockCreator::create(
        ReaderBuilder::new()
            .delimiter(delimiter as u8)
            .from_path(path),
        &use_columns,
        &sensitive_zeros,
        record_limit,
    ) {
        Ok(data_block) => Ok(data_block),
        Err(err) => Err(PyIOError::new_err(format!(
            "error reading data block: {}",
            err
        ))),
    }
}

/// Builds the protected and aggregated data for the content in `data_block`
/// using the specified `reporting_length` and `resolution`.
/// The result is written to `sensitive_aggregates_path` and `reportable_aggregates_path`.
///
/// The function returns a tuple (combo_counts, rare_counts).
///
/// * `combo_counts` - computed number of distinct combinations grouped by combination length (not protected)
/// * `rare_counts` - computed number of rare combinations (`count < resolution`) grouped by combination length (not protected)
///
/// # Arguments
/// * `data_block` - Data block with the content to be aggregated
/// * `sensitive_aggregates_path` - Path to write the sensitive aggregates
/// * `reportable_aggregates_path` - Path to write the aggregates with protected count
/// (rounded down to the nearest multiple of `resolution`)
/// * `delimiter` - CSV/TSV separator for the content be written in
/// `sensitive_aggregates_path` and `reportable_aggregates_path`
/// * `reporting_length` - Maximum length to compute attribute combinations
/// * `resolution` - Reporting resolution to be used
#[pyfunction]
pub fn aggregate_and_write(
    data_block: &DataBlock,
    sensitive_aggregates_path: &str,
    reportable_aggregates_path: &str,
    delimiter: char,
    reporting_length: usize,
    resolution: usize,
) -> PyResult<(AggregatedCountByLenMap, AggregatedCountByLenMap)> {
    let mut progress_reporter: Option<LoggerProgressReporter> = None;
    let mut aggregator = Aggregator::new(data_block);
    let mut aggregated_data = aggregator.aggregate(reporting_length, 0, &mut progress_reporter);
    let combo_count = aggregator.calc_combinations_count_by_len(&aggregated_data.aggregates_count);
    let rare_count = aggregator
        .calc_rare_combinations_count_by_len(&aggregated_data.aggregates_count, resolution);

    if let Err(err) = aggregator.write_aggregates_count(
        &aggregated_data.aggregates_count,
        sensitive_aggregates_path,
        delimiter,
        resolution,
        false,
    ) {
        return Err(PyIOError::new_err(format!(
            "error writing sensitive aggregates: {}",
            err
        )));
    }

    Aggregator::protect_aggregates_count(&mut aggregated_data.aggregates_count, resolution);

    match aggregator.write_aggregates_count(
        &aggregated_data.aggregates_count,
        reportable_aggregates_path,
        delimiter,
        resolution,
        true,
    ) {
        Ok(_) => Ok((combo_count, rare_count)),
        Err(err) => Err(PyIOError::new_err(format!(
            "error writing reportable aggregates: {}",
            err
        ))),
    }
}

/// Synthesizes the `data_block` using the specified `resolution`.
/// The result is written to `synthetic_path`.
///
/// The function returns the expansion ratio:
/// `Synthetic data length / Sensitive data length` (header not included)
///
/// # Arguments
/// * `data_block` - Data block with the content to be synthesized
/// * `synthetic_path` - Path to write the synthetic data
/// * `synthetic_delimiter` - CSV/TSV separator for the content be written in `synthetic_path`
/// * `cache_max_size` - Maximum cache size used during the synthesis process
/// * `resolution` - Reporting resolution to be used
#[pyfunction]
pub fn generate_seeded_and_write(
    data_block: &DataBlock,
    synthetic_path: &str,
    synthetic_delimiter: char,
    cache_max_size: usize,
    resolution: usize,
) -> PyResult<f64> {
    let mut progress_reporter: Option<LoggerProgressReporter> = None;
    let mut generator = Generator::new(data_block);
    let generated_data = generator.generate(resolution, cache_max_size, "", &mut progress_reporter);

    match generator.write_records(
        &generated_data.synthetic_data,
        synthetic_path,
        synthetic_delimiter as u8,
    ) {
        Ok(_) => Ok(generated_data.expansion_ratio),
        Err(err) => Err(PyIOError::new_err(format!(
            "error writing synthetic data: {}",
            err
        ))),
    }
}

/// A Python module implemented in Rust. The name of this function must match
/// the `lib.name` setting in the `Cargo.toml`, else Python will not be able to
/// import the module.
#[pymodule]
fn sds(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(create_data_block_from_file, m)?)?;
    m.add_function(wrap_pyfunction!(aggregate_and_write, m)?)?;
    m.add_function(wrap_pyfunction!(generate_seeded_and_write, m)?)?;
    Ok(())
}
