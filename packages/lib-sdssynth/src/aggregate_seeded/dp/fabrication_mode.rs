use pyo3::prelude::*;
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

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<FabricationMode>()?;
    Ok(())
}
