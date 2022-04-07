use std::io::{Error, Write};

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

use crate::{
    data_block::CombinationsComparisons, processing::aggregator::AggregatedData,
    utils::math::uround_down,
};

#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Clone)]
/// Represents a single combination comparison
pub struct CombinationComparison {
    /// Length of the combination
    pub combination_length: usize,
    /// Combination formatted as string
    pub combination: String,
    /// Index of the record where this combination occur
    pub record_index: usize,
    /// Number of times this combination occurs on the synthetic data
    pub synthetic_count: usize,
    /// Number of times this combination occurs on the sensitive data
    pub sensitive_count: usize,
}

impl CombinationComparison {
    #[inline]
    /// Creates a new CombinationComparison
    pub fn new(
        combination_length: usize,
        combination: String,
        record_index: usize,
        synthetic_count: usize,
        sensitive_count: usize,
    ) -> CombinationComparison {
        CombinationComparison {
            combination_length,
            combination,
            record_index,
            synthetic_count,
            sensitive_count,
        }
    }
}

#[cfg(feature = "pyo3")]
#[cfg_attr(feature = "pyo3", pymethods)]
impl CombinationComparison {
    #[getter]
    /// Length of the combination
    fn combination_length(&self) -> usize {
        self.combination_length
    }

    #[getter]
    /// Combination formatted as string
    fn combination(&self) -> String {
        self.combination.clone()
    }

    #[getter]
    /// Index of the record where this combination occur
    fn record_index(&self) -> usize {
        self.record_index
    }

    #[getter]
    /// Number of times this combination occurs on the synthetic data
    fn synthetic_count(&self) -> usize {
        self.synthetic_count
    }

    #[getter]
    /// Number of times this combination occurs on the sensitive data
    fn sensitive_count(&self) -> usize {
        self.sensitive_count
    }
}

#[cfg_attr(feature = "pyo3", pyclass)]
/// Computed rare combination comparisons between the synthetic
/// and sensitive datasets for all records
pub struct RareCombinationsComparisonData {
    /// Rare combination comparison for all records
    /// (compares rare combinations on the synthetic dataset with
    /// the sensitive counts)
    pub rare_combinations: CombinationsComparisons,
}

impl RareCombinationsComparisonData {
    //// Build a new comparison between the rare combinations on the synthetic
    /// data and the sensitive data counts
    /// # Arguments
    /// * `sensitive_aggregated_data` - Calculated aggregated data for the sensitive data
    /// * `synthetic_aggregated_data` - Calculated aggregated data for the synthetic data
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `combination_delimiter` - Delimiter used to join combinations and format then
    /// as strings
    /// * `protect` - Whether or not the sensitive counts should be rounded to the
    /// nearest smallest multiple of resolution
    #[inline]
    pub fn from_synthetic_and_sensitive_aggregated_data(
        synthetic_aggregated_data: &AggregatedData,
        sensitive_aggregated_data: &AggregatedData,
        resolution: usize,
        combination_delimiter: &str,
        protect: bool,
    ) -> RareCombinationsComparisonData {
        let mut rare_combinations: CombinationsComparisons = CombinationsComparisons::default();
        let resolution_f64 = resolution as f64;

        for (agg, count) in synthetic_aggregated_data.aggregates_count.iter() {
            if count.count < resolution {
                let combination_str = agg.as_str_using_headers(
                    &synthetic_aggregated_data.headers,
                    combination_delimiter,
                );
                let mut sensitive_count = sensitive_aggregated_data
                    .aggregates_count
                    .get(agg)
                    .map_or(0, |c| c.count);

                if protect {
                    sensitive_count = uround_down(sensitive_count as f64, resolution_f64)
                }

                for record_index in count.contained_in_records.iter() {
                    rare_combinations.push(CombinationComparison::new(
                        agg.len(),
                        combination_str.clone(),
                        *record_index,
                        count.count,
                        sensitive_count,
                    ));
                }
            }
        }

        // sort result by combination length
        rare_combinations.sort_by_key(|c| c.combination_length);

        RareCombinationsComparisonData { rare_combinations }
    }
}

#[cfg_attr(feature = "pyo3", pymethods)]
impl RareCombinationsComparisonData {
    /// Returns the rare combination comparisons between the synthetic
    /// and sensitive datasets for all records.
    /// This method will clone the data, so its recommended to have its result stored
    /// in a local variable to avoid it being called multiple times
    pub fn get_rare_combinations(&self) -> CombinationsComparisons {
        self.rare_combinations.clone()
    }

    /// Writes the rare combinations to the file system in a csv/tsv like format
    /// # Arguments:
    /// * `rare_combinations_path` - File path to be written
    /// * `rare_combinations_delimiter` - Delimiter to use when writing to `rare_combinations_path`
    pub fn write_rare_combinations(
        &mut self,
        rare_combinations_path: &str,
        rare_combinations_delimiter: char,
    ) -> Result<(), Error> {
        let mut file = std::io::BufWriter::new(std::fs::File::create(rare_combinations_path)?);

        file.write_all(
            format!(
                "combo_length{}combo{}record_id{}syn_count{}sen_count\n",
                rare_combinations_delimiter,
                rare_combinations_delimiter,
                rare_combinations_delimiter,
                rare_combinations_delimiter,
            )
            .as_bytes(),
        )?;
        for ra in self.rare_combinations.iter() {
            file.write_all(
                format!(
                    "{}{}{}{}{}{}{}{}{}\n",
                    ra.combination_length,
                    rare_combinations_delimiter,
                    ra.combination,
                    rare_combinations_delimiter,
                    ra.record_index,
                    rare_combinations_delimiter,
                    ra.synthetic_count,
                    rare_combinations_delimiter,
                    ra.sensitive_count,
                )
                .as_bytes(),
            )?
        }
        Ok(())
    }
}
