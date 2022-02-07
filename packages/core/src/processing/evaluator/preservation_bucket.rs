#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

/// Bucket to store preservation information
#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Debug, Clone)]
pub struct PreservationBucket {
    /// How many elements are stored in the bucket
    pub size: usize,
    /// Preservation sum of all elements in the bucket
    pub preservation_sum: f64,
    /// Combination length sum of all elements in the bucket
    pub length_sum: usize,
    /// Combination count sum
    pub combination_count_sum: usize,
    /// Absolute error sum `|synthetic_count - sensitive_sensitive|`
    pub absolute_error_sum: usize,
}

impl PreservationBucket {
    /// Return a new PreservationBucket with default values
    pub fn default() -> PreservationBucket {
        PreservationBucket {
            size: 0,
            preservation_sum: 0.0,
            length_sum: 0,
            combination_count_sum: 0,
            absolute_error_sum: 0,
        }
    }

    /// Adds a new value to the bucket
    /// # Arguments
    /// * `preservation` - Preservation related to the value
    /// * `length` - Combination length related to the value
    /// * `combination_count` - Combination count related to the value
    /// * `absolute_error` - Absolute error related to the value
    pub fn add(
        &mut self,
        preservation: f64,
        length: usize,
        combination_count: usize,
        absolute_error: usize,
    ) {
        self.size += 1;
        self.preservation_sum += preservation;
        self.length_sum += length;
        self.combination_count_sum += combination_count;
        self.absolute_error_sum += absolute_error;
    }
}

#[cfg_attr(feature = "pyo3", pymethods)]
impl PreservationBucket {
    /// Gets the mean preservation for the values in this bucket
    pub fn get_mean_preservation(&self) -> f64 {
        self.preservation_sum / (self.size as f64)
    }

    /// Gets the mean combination length for the values in this bucket
    pub fn get_mean_combination_length(&self) -> f64 {
        (self.length_sum as f64) / (self.size as f64)
    }

    /// Gets the mean combination count for the values in this bucket
    pub fn get_mean_combination_count(&self) -> f64 {
        (self.combination_count_sum as f64) / (self.size as f64)
    }

    /// Gets the mean absolute error (`|synthetic_count - sensitive_sensitive|`) for the values in this bucket
    pub fn get_mean_absolute_error(&self) -> f64 {
        (self.absolute_error_sum as f64) / (self.size as f64)
    }
}
