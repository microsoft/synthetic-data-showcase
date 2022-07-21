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
pub struct AccuracyMode {
    pub(crate) mode: AccuracyModeEnum,
}

#[pymethods]
impl AccuracyMode {
    #[inline]
    #[staticmethod]
    pub fn prioritize_large_counts() -> Self {
        Self {
            mode: AccuracyModeEnum::PrioritizeLargeCounts,
        }
    }

    #[inline]
    #[staticmethod]
    pub fn prioritize_small_counts() -> Self {
        Self {
            mode: AccuracyModeEnum::PrioritizeSmallCounts,
        }
    }

    #[inline]
    #[staticmethod]
    pub fn balanced() -> Self {
        Self {
            mode: AccuracyModeEnum::Balanced,
        }
    }

    #[inline]
    #[staticmethod]
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
