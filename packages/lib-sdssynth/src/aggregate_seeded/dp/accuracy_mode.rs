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

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<AccuracyMode>()?;
    Ok(())
}
