use pyo3::exceptions::PyValueError;
use pyo3::prelude::*;
use serde::Serialize;

#[derive(Clone, Serialize)]
pub enum AccuracyModeEnum {
    PrioritizeLargeCounts,
    PrioritizeSmallCounts,
    Balanced,
    Custom(Vec<f64>),
}

#[pyclass]
#[derive(Clone, Serialize)]
/// This controls how to split the privacy budget for different
/// combination lengths during the aggregation with differential privacy
/// (DP Aggregation).
///
/// This is not supposed to be create using the constructor,
/// instead a set of static methods are provided to construct an object
/// representing the desired accuracy mode.
pub struct AccuracyMode {
    pub(crate) mode: AccuracyModeEnum,
}

#[pymethods]
impl AccuracyMode {
    #[inline]
    #[staticmethod]
    #[pyo3(text_signature = "()")]
    /// This mode will ensure that more privacy budget is spent for
    /// for larger attribute combination lengths.
    ///
    /// For example, if reporting_length=3 and S(i) the scale of a gaussian noise
    /// added to the correspondent combination length:
    ///     - single attribute counts      (1-counts) = S(1)
    ///     - combinations of 2 attributes (2-counts) = S(2) = S(1) / 2
    ///     - combinations of 3 attributes (3-counts) = S(3) = S(1) / 3
    ///
    /// So 3 times MORE BUDGET is going to be spent with the 3-counts
    /// than with the 1-counts, meaning that the scale of noise related to the 1-counts
    /// will be 3 times bigger than the scale related with the 3-counts.
    ///
    /// Summary:
    ///     Use this if you want smaller errors for larger attribute combination lengths
    ///     (e.g. the accuracy for 3-counts is more important than for 1-counts)
    ///
    /// Returns:
    ///     AccuracyMode
    pub fn prioritize_large_counts() -> Self {
        Self {
            mode: AccuracyModeEnum::PrioritizeLargeCounts,
        }
    }

    #[inline]
    #[staticmethod]
    #[pyo3(text_signature = "()")]
    /// This mode will ensure that more privacy budget is spent for
    /// for smaller attribute combination lengths.
    ///
    /// For example, if reporting_length=3 and S(i) the scale of a gaussian noise
    /// added to the correspondent combination length:
    ///     - single attribute counts      (1-counts) = S(1) = S(3) / 3
    ///     - combinations of 2 attributes (2-counts) = S(2) = S(3) / 2
    ///     - combinations of 3 attributes (3-counts) = S(3)
    ///
    /// So 3 times LESS BUDGET is going to be spent with the 3 counts
    /// than with the 1-counts, meaning that the scale of noise related to that 1-counts
    /// will be 3 times smaller than the scale related with the 3-counts.
    ///
    /// Summary:
    ///     Use this if you want smaller errors for smaller attribute combination lengths
    ///     (e.g. the accuracy for 1-counts is more important than for 3-counts)
    ///
    /// Returns:
    ///     AccuracyMode
    pub fn prioritize_small_counts() -> Self {
        Self {
            mode: AccuracyModeEnum::PrioritizeSmallCounts,
        }
    }

    #[inline]
    #[staticmethod]
    #[pyo3(text_signature = "()")]
    /// This mode will evenly distribute the privacy budget across
    /// all attribute combination lengths.
    ///
    /// For example, if reporting_length=3 and S(i) the scale of a gaussian noise
    /// added to the correspondent combination length:
    ///     - single attribute counts      (1-counts) = S(1)
    ///     - combinations of 2 attributes (2-counts) = S(2) = S(1)
    ///     - combinations of 3 attributes (3-counts) = S(3) = S(2) = S(1)
    ///
    /// Returns:
    ///     AccuracyMode
    pub fn balanced() -> Self {
        Self {
            mode: AccuracyModeEnum::Balanced,
        }
    }

    #[inline]
    #[staticmethod]
    #[pyo3(text_signature = "(sigma_proportions)")]
    /// This mode lets you specify how to split the privacy budget across
    /// attribute combination lengths.
    ///
    /// Sigma defines the scale (standard deviation) of the gaussian noise
    /// added to a particular combination length.
    ///
    /// Example:
    ///     - given reporting_length=3
    ///     - given sigma_proportions=[1.0, 0.25, 0.5]
    ///     - being S(1), S(2), S(3) the sigma values for the noise related to the
    ///       1,2 and 3-counts, respectively
    ///     - then:
    ///         - scale of the noise added to the 1-counts: S(1) = S
    ///         - scale of the noise added to the 2-counts: S(2) = S(1) / 4 = S / 4
    ///         - scale of the noise added to the 3-counts: S(3) = S(1) / 2 = S / 2
    ///
    /// Arguments:
    ///     * sigma_proportions: list[float] - sigma proportions to be kept across the different
    ///                                        combination lengths
    ///         - len(sigma_proportions) must be the same as the reporting_length
    ///
    /// Returns:
    ///     AccuracyMode
    pub fn custom(sigma_proportions: Vec<f64>) -> Self {
        Self {
            mode: AccuracyModeEnum::Custom(sigma_proportions),
        }
    }
}

impl AccuracyMode {
    pub(crate) fn validate(&self, reporting_length: usize) -> PyResult<()> {
        match &self.mode {
            AccuracyModeEnum::Custom(sigma_proportions) => {
                if sigma_proportions.len() != reporting_length {
                    return Err(PyValueError::new_err("when accuracy mode is set to custom, sigma_proportions length must match the reporting_length"));
                }
                if sigma_proportions.iter().any(|p| *p <= 0.0) {
                    return Err(PyValueError::new_err("sigma_proportions must be > 0"));
                }
                Ok(())
            }
            _ => Ok(()),
        }
    }

    pub(crate) fn extract_sigma_proportions(&self, reporting_length: usize) -> Vec<f64> {
        match &self.mode {
            AccuracyModeEnum::PrioritizeLargeCounts => (0..reporting_length)
                .map(|i| 1.0 / ((i + 1) as f64))
                .collect(),
            AccuracyModeEnum::PrioritizeSmallCounts => (0..reporting_length)
                .map(|i| 1.0 / ((reporting_length - i) as f64))
                .collect(),
            AccuracyModeEnum::Balanced => {
                let mut sigma_proportions = Vec::default();
                sigma_proportions.resize_with(reporting_length, || 1.0);
                sigma_proportions
            }
            AccuracyModeEnum::Custom(sigma_proportions) => sigma_proportions.clone(),
        }
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<AccuracyMode>()?;
    Ok(())
}
