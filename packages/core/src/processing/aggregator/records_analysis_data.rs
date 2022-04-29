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
    pub number_of_records_with_unique_combinations: usize,
    /// Percentage of records containing unique combinations
    pub percentage_of_records_with_unique_combinations: f64,
    /// Number of records containing rare combinations
    /// (unique are not taken into account)
    pub number_of_records_with_rare_combinations: usize,
    /// Percentage of records containing rare combinations
    /// (unique are not taken into account)
    pub percentage_of_records_with_rare_combinations: f64,
    /// Count of unique + rare
    pub number_of_records_with_risky_combinations: usize,
    /// Percentage of unique + rare
    pub percentage_of_records_with_risky_combinations: f64,
}

impl RecordsAnalysis {
    #[inline]
    /// Created a new RecordsAnalysis with default values
    pub fn default() -> RecordsAnalysis {
        RecordsAnalysis {
            number_of_records_with_unique_combinations: 0,
            percentage_of_records_with_unique_combinations: 0.0,
            number_of_records_with_rare_combinations: 0,
            percentage_of_records_with_rare_combinations: 0.0,
            number_of_records_with_risky_combinations: 0,
            percentage_of_records_with_risky_combinations: 0.0,
        }
    }
}

#[cfg(feature = "pyo3")]
#[cfg_attr(feature = "pyo3", pymethods)]
impl RecordsAnalysis {
    #[getter]
    /// Number of records containing unique combinations
    fn number_of_records_with_unique_combinations(&self) -> usize {
        self.number_of_records_with_unique_combinations
    }

    #[getter]
    /// Percentage of records containing unique combinations
    fn percentage_of_records_with_unique_combinations(&self) -> f64 {
        self.percentage_of_records_with_unique_combinations
    }

    #[getter]
    /// Number of records containing rare combinations
    /// (unique os not taken into account)
    fn number_of_records_with_rare_combinations(&self) -> usize {
        self.number_of_records_with_rare_combinations
    }

    #[getter]
    /// Percentage of records containing rare combinations
    /// (unique os not taken into account)
    fn percentage_of_records_with_rare_combinations(&self) -> f64 {
        self.percentage_of_records_with_rare_combinations
    }

    #[getter]
    /// Count of unique + rare
    fn number_of_records_with_risky_combinations(&self) -> usize {
        self.number_of_records_with_risky_combinations
    }

    #[getter]
    /// Percentage of unique + rare
    fn percentage_of_records_with_risky_combinations(&self) -> f64 {
        self.percentage_of_records_with_risky_combinations
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
    /// * `records_with_unique_combs_by_len` - records with unique combinations grouped by length
    /// * `records_with_rare_combs_by_len` - records with rare combinations grouped by length
    /// * `total_number_of_records` - Total number of records on the data block
    /// * `reporting_length` - Reporting length used for the data aggregation
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `protect` - Whether or not the counts should be rounded to the
    /// nearest smallest multiple of resolution
    #[inline]
    pub fn from_records_with_unique_rare_combinations_by_len(
        records_with_unique_combs_by_len: &RecordsByLenMap,
        records_with_rare_combs_by_len: &RecordsByLenMap,
        total_number_of_records: usize,
        reporting_length: usize,
        resolution: usize,
        protect: bool,
    ) -> RecordsAnalysisData {
        let total_number_of_records_f64 = if protect {
            uround_down(total_number_of_records as f64, resolution as f64)
        } else {
            total_number_of_records
        } as f64;
        let records_analysis_by_len: RecordsAnalysisByLenMap = (1..=reporting_length)
            .map(|l| {
                let mut ra = RecordsAnalysis::default();

                ra.number_of_records_with_unique_combinations = records_with_unique_combs_by_len
                    .get(&l)
                    .map_or(0, |records| records.len());
                ra.number_of_records_with_rare_combinations = records_with_rare_combs_by_len
                    .get(&l)
                    .map_or(0, |records| records.len());

                if protect {
                    ra.number_of_records_with_unique_combinations = uround_down(
                        ra.number_of_records_with_unique_combinations as f64,
                        resolution as f64,
                    );
                    ra.number_of_records_with_rare_combinations = uround_down(
                        ra.number_of_records_with_rare_combinations as f64,
                        resolution as f64,
                    )
                }

                ra.percentage_of_records_with_unique_combinations = calc_percentage(
                    ra.number_of_records_with_unique_combinations as f64,
                    total_number_of_records_f64,
                );
                ra.percentage_of_records_with_rare_combinations = calc_percentage(
                    ra.number_of_records_with_rare_combinations as f64,
                    total_number_of_records_f64,
                );
                ra.number_of_records_with_risky_combinations = ra
                    .number_of_records_with_unique_combinations
                    + ra.number_of_records_with_rare_combinations;
                ra.percentage_of_records_with_risky_combinations = calc_percentage(
                    ra.number_of_records_with_risky_combinations as f64,
                    total_number_of_records_f64,
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
            .map(|v| v.number_of_records_with_unique_combinations)
            .sum()
    }

    /// Returns the total number of records containing rare combinations
    /// for all lengths
    pub fn get_total_rare(&self) -> usize {
        self.records_analysis_by_len
            .values()
            .map(|v| v.number_of_records_with_rare_combinations)
            .sum()
    }

    /// Returns the total number of records containing risky (unique + rare)
    /// combinations for all lengths
    pub fn get_total_risky(&self) -> usize {
        self.records_analysis_by_len
            .values()
            .map(|v| v.number_of_records_with_risky_combinations)
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
        let mut file = std::io::BufWriter::new(std::fs::File::create(records_analysis_path)?);

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
                    ra.number_of_records_with_rare_combinations,
                    records_analysis_delimiter,
                    ra.percentage_of_records_with_rare_combinations,
                    records_analysis_delimiter,
                    ra.number_of_records_with_unique_combinations,
                    records_analysis_delimiter,
                    ra.percentage_of_records_with_unique_combinations,
                    records_analysis_delimiter,
                    ra.number_of_records_with_risky_combinations,
                    records_analysis_delimiter,
                    ra.percentage_of_records_with_risky_combinations,
                )
                .as_bytes(),
            )?
        }
        Ok(())
    }
}
