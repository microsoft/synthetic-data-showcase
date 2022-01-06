use super::typedefs::{AggregatesCountMap, RecordsSet};

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

/// Represents the privacy risk information related to a data block
#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Debug)]
pub struct PrivacyRiskSummary {
    /// Total number of records on the data block
    pub total_number_of_records: usize,
    /// Total number of combinations aggregated (up to reporting length)
    pub total_number_of_combinations: usize,
    /// Number of records with unique combinations
    pub records_with_unique_combinations_count: usize,
    /// Number of records with rare combinations (combination count < resolution)
    pub records_with_rare_combinations_count: usize,
    /// Number of unique combinations
    pub unique_combinations_count: usize,
    /// Number of rare combinations
    pub rare_combinations_count: usize,
    /// Proportion of records containing unique combinations
    pub records_with_unique_combinations_proportion: f64,
    /// Proportion of records containing rare combinations
    pub records_with_rare_combinations_proportion: f64,
    /// Proportion of unique combinations
    pub unique_combinations_proportion: f64,
    /// Proportion of rare combinations
    pub rare_combinations_proportion: f64,
}

#[cfg(feature = "pyo3")]
#[cfg_attr(feature = "pyo3", pymethods)]
impl PrivacyRiskSummary {
    /// Total number of records on the data block
    #[getter]
    fn total_number_of_records(&self) -> usize {
        self.total_number_of_records
    }

    /// Total number of combinations aggregated (up to reporting length)
    #[getter]
    fn total_number_of_combinations(&self) -> usize {
        self.total_number_of_combinations
    }

    /// Number of records with unique combinations
    #[getter]
    fn records_with_unique_combinations_count(&self) -> usize {
        self.records_with_unique_combinations_count
    }

    /// Number of records with rare combinations (combination count < resolution)
    #[getter]
    fn records_with_rare_combinations_count(&self) -> usize {
        self.records_with_rare_combinations_count
    }

    /// Number of unique combinations
    #[getter]
    fn unique_combinations_count(&self) -> usize {
        self.unique_combinations_count
    }

    /// Number of rare combinations
    #[getter]
    fn rare_combinations_count(&self) -> usize {
        self.rare_combinations_count
    }

    /// Proportion of records containing unique combinations
    #[getter]
    fn records_with_unique_combinations_proportion(&self) -> f64 {
        self.records_with_unique_combinations_proportion
    }

    /// Proportion of records containing rare combinations
    #[getter]
    fn records_with_rare_combinations_proportion(&self) -> f64 {
        self.records_with_rare_combinations_proportion
    }

    /// Proportion of unique combinations
    #[getter]
    fn unique_combinations_proportion(&self) -> f64 {
        self.unique_combinations_proportion
    }

    /// Proportion of rare combinations
    #[getter]
    fn rare_combinations_proportion(&self) -> f64 {
        self.rare_combinations_proportion
    }
}

impl PrivacyRiskSummary {
    #[inline]
    /// Calculates ands returns the privacy risk related to the aggregates counts
    /// # Arguments:
    /// * `total_number_of_records` - Total number of records on the data block
    /// * `aggregates_count` - Aggregates counts to compute the privacy risk for
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn from_aggregates_count(
        total_number_of_records: usize,
        aggregates_count: &AggregatesCountMap,
        resolution: usize,
    ) -> PrivacyRiskSummary {
        let mut records_with_unique_combinations = RecordsSet::default();
        let mut records_with_rare_combinations = RecordsSet::default();
        let mut unique_combinations_count: usize = 0;
        let mut rare_combinations_count: usize = 0;
        let total_number_of_combinations = aggregates_count.len();

        for count in aggregates_count.values() {
            if count.count == 1 {
                unique_combinations_count += 1;
                records_with_unique_combinations.extend(&count.contained_in_records);
            }
            if count.count < resolution {
                rare_combinations_count += 1;
                records_with_rare_combinations.extend(&count.contained_in_records);
            }
        }

        PrivacyRiskSummary {
            total_number_of_records,
            total_number_of_combinations,
            records_with_unique_combinations_count: records_with_unique_combinations.len(),
            records_with_rare_combinations_count: records_with_rare_combinations.len(),
            unique_combinations_count,
            rare_combinations_count,
            records_with_unique_combinations_proportion: (records_with_unique_combinations.len()
                as f64)
                / (total_number_of_records as f64),
            records_with_rare_combinations_proportion: (records_with_rare_combinations.len()
                as f64)
                / (total_number_of_records as f64),
            unique_combinations_proportion: (unique_combinations_count as f64)
                / (total_number_of_combinations as f64),
            rare_combinations_proportion: (rare_combinations_count as f64)
                / (total_number_of_combinations as f64),
        }
    }
}
