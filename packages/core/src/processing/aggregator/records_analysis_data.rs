use super::typedefs::{RecordsAnalysisByLenMap, RecordsByLenMap};
use itertools::Itertools;
use std::io::{Error, Write};

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

use crate::utils::math::{calc_percentage, uround_down};

#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Clone)]
/// Analysis information related to a single record
pub struct RecordsAnalysis {
    /// Number of records containing unique combinations
    pub unique_combinations_records_count: usize,
    /// Percentage of records containing unique combinations
    pub unique_combinations_records_percentage: f64,
    /// Number of records containing rare combinations
    /// (unique os not taken into account)
    pub rare_combinations_records_count: usize,
    /// Percentage of records containing rare combinations
    /// (unique os not taken into account)
    pub rare_combinations_records_percentage: f64,
    /// Count of unique + rare
    pub risky_combinations_records_count: usize,
    /// Percentage of unique + rare
    pub risky_combinations_records_percentage: f64,
}

impl RecordsAnalysis {
    #[inline]
    /// Created a new RecordsAnalysis with default values
    pub fn default() -> RecordsAnalysis {
        RecordsAnalysis {
            unique_combinations_records_count: 0,
            unique_combinations_records_percentage: 0.0,
            rare_combinations_records_count: 0,
            rare_combinations_records_percentage: 0.0,
            risky_combinations_records_count: 0,
            risky_combinations_records_percentage: 0.0,
        }
    }
}

#[cfg(feature = "pyo3")]
#[cfg_attr(feature = "pyo3", pymethods)]
impl RecordsAnalysis {
    #[getter]
    /// Number of records containing unique combinations
    fn unique_combinations_records_count(&self) -> usize {
        self.unique_combinations_records_count
    }

    #[getter]
    /// Percentage of records containing unique combinations
    fn unique_combinations_records_percentage(&self) -> f64 {
        self.unique_combinations_records_percentage
    }

    #[getter]
    /// Number of records containing rare combinations
    /// (unique os not taken into account)
    fn rare_combinations_records_count(&self) -> usize {
        self.rare_combinations_records_count
    }

    #[getter]
    /// Percentage of records containing rare combinations
    /// (unique os not taken into account)
    fn rare_combinations_records_percentage(&self) -> f64 {
        self.rare_combinations_records_percentage
    }

    #[getter]
    /// Count of unique + rare
    fn risky_combinations_records_count(&self) -> usize {
        self.risky_combinations_records_count
    }

    #[getter]
    /// Percentage of unique + rare
    fn risky_combinations_records_percentage(&self) -> f64 {
        self.risky_combinations_records_percentage
    }
}

#[cfg_attr(feature = "pyo3", pyclass)]
/// Stores the records analysis for all records grouped by
/// combination length
pub struct RecordsAnalysisData {
    /// Map of records analysis grouped by combination len
    pub records_analysis_by_len: RecordsAnalysisByLenMap,
}

impl RecordsAnalysisData {
    /// Computes the record analysis from the arguments.
    /// # Arguments
    /// * `unique_records_by_len` - unique records grouped by length
    /// * `rare_records_by_len` - rare records grouped by length
    /// * `total_number_of_records` - Total number of records on the data block
    /// * `reporting_length` - Reporting length used for the data aggregation
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `protect` - Whether or not the counts should be rounded to the
    /// nearest smallest multiple of resolution
    #[inline]
    pub fn from_unique_rare_combinations_records_by_len(
        unique_records_by_len: &RecordsByLenMap,
        rare_records_by_len: &RecordsByLenMap,
        total_n_records: usize,
        reporting_length: usize,
        resolution: usize,
        protect: bool,
    ) -> RecordsAnalysisData {
        let total_n_records_f64 = if protect {
            uround_down(total_n_records as f64, resolution as f64)
        } else {
            total_n_records
        } as f64;
        let records_analysis_by_len: RecordsAnalysisByLenMap = (1..=reporting_length)
            .map(|l| {
                let mut ra = RecordsAnalysis::default();

                ra.unique_combinations_records_count = unique_records_by_len
                    .get(&l)
                    .map_or(0, |records| records.len());
                ra.rare_combinations_records_count = rare_records_by_len
                    .get(&l)
                    .map_or(0, |records| records.len());

                if protect {
                    ra.unique_combinations_records_count = uround_down(
                        ra.unique_combinations_records_count as f64,
                        resolution as f64,
                    );
                    ra.rare_combinations_records_count =
                        uround_down(ra.rare_combinations_records_count as f64, resolution as f64)
                }

                ra.unique_combinations_records_percentage = calc_percentage(
                    ra.unique_combinations_records_count as f64,
                    total_n_records_f64,
                );
                ra.rare_combinations_records_percentage = calc_percentage(
                    ra.rare_combinations_records_count as f64,
                    total_n_records_f64,
                );
                ra.risky_combinations_records_count =
                    ra.unique_combinations_records_count + ra.rare_combinations_records_count;
                ra.risky_combinations_records_percentage = calc_percentage(
                    ra.risky_combinations_records_count as f64,
                    total_n_records_f64,
                );

                (l, ra)
            })
            .collect();
        RecordsAnalysisData {
            records_analysis_by_len,
        }
    }
}

#[cfg_attr(feature = "pyo3", pymethods)]
impl RecordsAnalysisData {
    /// Returns the records analysis map grouped by length.
    /// This method will clone the data, so its recommended to have its result stored
    /// in a local variable to avoid it being called multiple times
    pub fn get_records_analysis_by_len(&self) -> RecordsAnalysisByLenMap {
        self.records_analysis_by_len.clone()
    }

    /// Returns the total number of records containing unique combinations
    /// for all lengths
    pub fn get_total_unique(&self) -> usize {
        self.records_analysis_by_len
            .values()
            .map(|v| v.unique_combinations_records_count)
            .sum()
    }

    /// Returns the total number of records containing rare combinations
    /// for all lengths
    pub fn get_total_rare(&self) -> usize {
        self.records_analysis_by_len
            .values()
            .map(|v| v.rare_combinations_records_count)
            .sum()
    }

    /// Returns the total number of records containing risky (unique + rare)
    /// combinations for all lengths
    pub fn get_total_risky(&self) -> usize {
        self.records_analysis_by_len
            .values()
            .map(|v| v.risky_combinations_records_count)
            .sum()
    }

    /// Writes the records analysis to the file system in a csv/tsv like format
    /// # Arguments:
    /// * `records_analysis_path` - File path to be written
    /// * `records_analysis_delimiter` - Delimiter to use when writing to `records_analysis_path`
    pub fn write_records_analysis(
        &mut self,
        records_analysis_path: &str,
        records_analysis_delimiter: char,
    ) -> Result<(), Error> {
        let mut file = std::fs::File::create(records_analysis_path)?;

        file.write_all(
            format!(
                "combo_length{}sen_rare{}sen_rare_pct{}sen_unique{}sen_unique_pct{}sen_risky{}sen_risky_pct\n",
                records_analysis_delimiter,
                records_analysis_delimiter,
                records_analysis_delimiter,
                records_analysis_delimiter,
                records_analysis_delimiter,
                records_analysis_delimiter
            )
            .as_bytes(),
        )?;
        for l in self.records_analysis_by_len.keys().sorted() {
            let ra = &self.records_analysis_by_len[l];

            file.write_all(
                format!(
                    "{}{}{}{}{}{}{}{}{}{}{}{}{}\n",
                    l,
                    records_analysis_delimiter,
                    ra.rare_combinations_records_count,
                    records_analysis_delimiter,
                    ra.rare_combinations_records_percentage,
                    records_analysis_delimiter,
                    ra.unique_combinations_records_count,
                    records_analysis_delimiter,
                    ra.unique_combinations_records_percentage,
                    records_analysis_delimiter,
                    ra.risky_combinations_records_count,
                    records_analysis_delimiter,
                    ra.risky_combinations_records_percentage,
                )
                .as_bytes(),
            )?
        }
        Ok(())
    }
}
