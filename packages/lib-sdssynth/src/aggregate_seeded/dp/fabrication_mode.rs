use pyo3::{exceptions::PyValueError, prelude::*};
use sds_core::dp::{InputValueByLen, NoisyCountThreshold};
use serde::Serialize;

#[derive(Clone, Serialize)]
pub enum FabricationModeEnum {
    Uncontrolled,
    Balanced,
    Minimize,
    Custom(NoisyCountThreshold),
}

#[pyclass]
#[derive(Clone, Serialize)]
pub struct FabricationMode {
    pub(crate) mode: FabricationModeEnum,
}

#[pymethods]
impl FabricationMode {
    #[inline]
    #[staticmethod]
    pub fn uncontrolled() -> Self {
        Self {
            mode: FabricationModeEnum::Uncontrolled,
        }
    }

    #[inline]
    #[staticmethod]
    pub fn balanced() -> Self {
        Self {
            mode: FabricationModeEnum::Balanced,
        }
    }

    #[inline]
    #[staticmethod]
    pub fn minimize() -> Self {
        Self {
            mode: FabricationModeEnum::Minimize,
        }
    }

    #[inline]
    #[staticmethod]
    pub fn custom_fixed(thresholds: InputValueByLen<f64>) -> Self {
        Self {
            mode: FabricationModeEnum::Custom(NoisyCountThreshold::Fixed(thresholds)),
        }
    }

    #[inline]
    #[staticmethod]
    pub fn custom_adaptive(thresholds: InputValueByLen<f64>) -> Self {
        Self {
            mode: FabricationModeEnum::Custom(NoisyCountThreshold::Adaptive(thresholds)),
        }
    }

    pub fn validate(&self, reporting_length: usize) -> PyResult<()> {
        match &self.mode {
            FabricationModeEnum::Custom(thresholds) => match thresholds {
                NoisyCountThreshold::Fixed(values) => {
                    if values.keys().any(|v| *v == 0 || *v > reporting_length) {
                        return Err(PyValueError::new_err(
                            "fixed threshold keys must be > 0 and <= reporting_length",
                        ));
                    }
                    if values.values().any(|v| *v < 0.0) {
                        return Err(PyValueError::new_err("fixed threshold values must be >= 0"));
                    }
                    Ok(())
                }
                NoisyCountThreshold::Adaptive(values) => {
                    if values.keys().any(|v| *v == 0 || *v > reporting_length) {
                        return Err(PyValueError::new_err(
                            "adaptive threshold keys must be > 0 and <= reporting_length",
                        ));
                    }
                    if values.values().any(|v| *v < 0.0 || *v > 1.0) {
                        return Err(PyValueError::new_err(
                            "adaptive threshold values must be >= 0 and <= 1",
                        ));
                    }
                    Ok(())
                }
            },
            _ => Ok(()),
        }
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<FabricationMode>()?;
    Ok(())
}
