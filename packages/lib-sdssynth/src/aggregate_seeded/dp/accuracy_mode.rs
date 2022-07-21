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

    pub fn validate(&self, reporting_length: usize) -> PyResult<()> {
        match &self.mode {
            AccuracyModeEnum::Custom(sigma_proportions) => {
                if !sigma_proportions.is_empty() {
                    if sigma_proportions.len() != reporting_length {
                        return Err(PyValueError::new_err("when accuracy mode is set to custom, sigma_proportions length must match the reporting_length"));
                    }
                    if sigma_proportions.iter().any(|p| *p <= 0.0) {
                        return Err(PyValueError::new_err("sigma_proportions must be > 0"));
                    }
                }
                Ok(())
            }
            _ => Ok(()),
        }
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<AccuracyMode>()?;
    Ok(())
}
