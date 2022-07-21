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
}

impl FabricationMode {
    pub(crate) fn validate(&self, reporting_length: usize) -> PyResult<()> {
        match &self.mode {
            FabricationModeEnum::Custom(threshold) => match threshold {
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

    pub(crate) fn extract_threshold(&self, reporting_length: usize) -> NoisyCountThreshold {
        match &self.mode {
            FabricationModeEnum::Uncontrolled => {
                NoisyCountThreshold::Adaptive((2..=reporting_length).map(|i| (i, 1.0)).collect())
            }
            FabricationModeEnum::Balanced => {
                NoisyCountThreshold::Adaptive(if reporting_length == 2 {
                    [(2, 0.1)].iter().cloned().collect()
                } else {
                    let ratio = 0.9 / ((reporting_length - 2) as f64);
                    (2..=reporting_length)
                        .map(|i| (i, f64::min(1.0, 0.1 + ratio * ((i - 2) as f64))))
                        .collect()
                })
            }
            FabricationModeEnum::Minimize => {
                NoisyCountThreshold::Adaptive((2..=reporting_length).map(|i| (i, 0.01)).collect())
            }
            FabricationModeEnum::Custom(threshold) => threshold.clone(),
        }
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<FabricationMode>()?;
    Ok(())
}
