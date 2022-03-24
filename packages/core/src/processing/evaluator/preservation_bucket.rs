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
    /// Proportional error sum  `if sensitive_sensitive > 0
    /// (|synthetic_count - sensitive_sensitive| / sensitive_sensitive) else 1`
    pub proportional_error_sum: f64,
}

impl PreservationBucket {
    /// Return a new PreservationBucket with default values
    pub fn default() -> PreservationBucket {
        PreservationBucket {
            size: 0,
            preservation_sum: 0.0,
            length_sum: 0,
            combination_count_sum: 0,
            proportional_error_sum: 0.0,
        }
    }

    /// Adds a new value to the bucket
    /// # Arguments
    /// * `preservation` - Preservation related to the value
    /// * `length` - Combination length related to the value
    /// * `combination_count` - Combination count related to the value
    /// * `proportional_error_sum` - Proportional error related to the value
    pub fn add(
        &mut self,
        preservation: f64,
        length: usize,
        combination_count: usize,
        proportional_error_sum: f64,
    ) {
        self.size += 1;
        self.preservation_sum += preservation;
        self.length_sum += length;
        self.combination_count_sum += combination_count;
        self.proportional_error_sum += proportional_error_sum;
    }
}

#[cfg_attr(feature = "pyo3", pymethods)]
impl PreservationBucket {
    /// Gets the mean preservation for the values in this bucket
    pub fn get_mean_preservation(&self) -> f64 {
        if self.size > 0 {
            self.preservation_sum / (self.size as f64)
        } else {
            0.0
        }
    }

    /// Gets the mean combination length for the values in this bucket
    pub fn get_mean_combination_length(&self) -> f64 {
        if self.size > 0 {
            (self.length_sum as f64) / (self.size as f64)
        } else {
            0.0
        }
    }

    /// Gets the mean combination count for the values in this bucket
    pub fn get_mean_combination_count(&self) -> f64 {
        if self.size > 0 {
            (self.combination_count_sum as f64) / (self.size as f64)
        } else {
            0.0
        }
    }

    /// Gets the mean proportional error for the values in this bucket.
    ///
    /// Proportional Error = `if sensitive_sensitive > 0
    /// (|synthetic_count - sensitive_sensitive| / sensitive_sensitive) else 1`
    pub fn get_mean_proportional_error(&self) -> f64 {
        if self.size > 0 {
            self.proportional_error_sum / (self.size as f64)
        } else {
            0.0
        }
    }
}
