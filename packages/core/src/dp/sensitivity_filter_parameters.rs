#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

/// Parameters for the sensitivity filtering
#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Clone, Copy)]
pub struct SensitivityFilterParameters {
    /// Percentage used to calculate the percentile that filters sensitivity
    pub percentile_percentage: usize,
    /// Epsilon used to generate noise when selecting the `percentile_percentage`-th percentile
    pub epsilon: f64,
}

#[cfg_attr(feature = "pyo3", pymethods)]
impl SensitivityFilterParameters {
    #[inline]
    #[cfg(feature = "pyo3")]
    #[new]
    /// Creates a new SensitivityFilterParameters structure
    /// # Arguments
    /// * `percentile_percentage` - percentage used to calculate the percentile that filters sensitivity
    /// * `epsilon` - epsilon used to generate noise when selecting the `percentile_percentage`-th percentile
    pub fn new(percentile_percentage: usize, epsilon: f64) -> Self {
        SensitivityFilterParameters {
            percentile_percentage,
            epsilon,
        }
    }

    #[inline]
    #[cfg(not(feature = "pyo3"))]
    /// Creates a new SensitivityFilterParameters structure
    /// # Arguments
    /// * `percentile_percentage` - percentage used to calculate the percentile that filters sensitivity
    /// * `epsilon` - epsilon used to generate noise when selecting the `percentile_percentage`-th percentile
    pub fn new(percentile_percentage: usize, epsilon: f64) -> Self {
        SensitivityFilterParameters {
            percentile_percentage,
            epsilon,
        }
    }
}

#[cfg(feature = "pyo3")]
pub fn register(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_class::<SensitivityFilterParameters>()?;
    Ok(())
}
