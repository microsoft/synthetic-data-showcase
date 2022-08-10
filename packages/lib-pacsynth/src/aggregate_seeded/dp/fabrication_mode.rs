use pyo3::{exceptions::PyValueError, prelude::*};
use sds_core::dp::{InputValueByLen, NoisyCountThreshold};
use serde::Serialize;

#[derive(Clone, Serialize)]
pub enum FabricationModeEnum {
    Uncontrolled,
    Progressive,
    Balanced,
    Minimize,
    Custom(NoisyCountThreshold),
}

#[pyclass]
#[derive(Clone, Serialize)]
/// This provides controls over fabrication (spurious attribute combinations)
/// during the aggregation with differential privacy (DP Aggregation).
///
/// An attribute combination is called fabricated (spurious) if it exists
/// in the reported aggregated data with differential privacy but
/// does not exist in the original sensitive dataset.
///
/// For each combination length, the aggregates generation with differential
/// privacy will sample noise from a gaussian distribution and then add it
/// to the original attribute count, so that:
///
///     reported_count = sensitive_counts + noise
///
/// With this being said, we can define a threshold [threshold(i)] per combination length,
/// to decide if attribute combinations should be reported or not. So they are only reported
/// if:
///
///     reported_count > threshold(i)
///
/// For fabricated combinations, the reported count is:
///
///     reported_count = 0 + noise
///
/// So if the noise exceeds the defined threshold, the fabricated combination is reported.
///
/// This is not supposed to be create using the constructor,
/// instead a set of static methods are provided to construct an object
/// representing the desired fabrication mode.
pub struct FabricationMode {
    pub(crate) mode: FabricationModeEnum,
}

#[pymethods]
impl FabricationMode {
    #[inline]
    #[staticmethod]
    #[pyo3(text_signature = "()")]
    /// This mode will not define any threshold to control fabrication (default threshold equals 0).
    ///
    /// Returns:
    ///     FabricationMode
    pub fn uncontrolled() -> Self {
        Self {
            mode: FabricationModeEnum::Uncontrolled,
        }
    }

    #[inline]
    #[staticmethod]
    #[pyo3(text_signature = "()")]
    /// This mode will start with higher thresholds for smaller attribute combination lengths
    /// and decrease it as the combination length grows.
    ///
    /// Returns:
    ///     FabricationMode
    pub fn progressive() -> Self {
        Self {
            mode: FabricationModeEnum::Progressive,
        }
    }

    #[inline]
    #[staticmethod]
    #[pyo3(text_signature = "()")]
    /// This mode controls fabrication only for the 2-counts and leaves the larger
    /// combination lengths uncontrolled. Sometimes, only controlling the fabrication
    /// for the 2-counts is enough to avoid fabricated combinations to propagate for longer
    /// combinations lengths.
    ///
    /// Returns:
    ///     FabricationMode
    pub fn balanced() -> Self {
        Self {
            mode: FabricationModeEnum::Balanced,
        }
    }

    #[inline]
    #[staticmethod]
    #[pyo3(text_signature = "()")]
    /// This mode will try to minimize fabrication while keeping differential privacy guarantees.
    ///
    /// Returns:
    ///     FabricationMode
    pub fn minimize() -> Self {
        Self {
            mode: FabricationModeEnum::Minimize,
        }
    }

    #[inline]
    #[staticmethod]
    #[pyo3(text_signature = "(thresholds)")]
    /// This mode let's you specify the threshold used to
    /// control fabrication per combination length. In there, the actual
    /// threshold value used to filter reported counts can be provided by
    /// combination length.
    ///
    /// To ensure differential privacy guarantees, this cannot be set for the 1-counts.
    ///
    /// Example:
    ///     - for a reporting_length=3: thresholds = {2: 30, 3: 0}
    ///
    /// Arguments:
    ///     * thresholds: dict[int, float] - the key is the target combination length while
    ///                                      the value is the threshold value
    ///         - if not set for a particular length, will default to 0
    ///
    /// Returns:
    ///     FabricationMode
    pub fn custom_fixed(thresholds: InputValueByLen<f64>) -> Self {
        Self {
            mode: FabricationModeEnum::Custom(NoisyCountThreshold::Fixed(thresholds)),
        }
    }

    #[inline]
    #[staticmethod]
    #[pyo3(text_signature = "(thresholds)")]
    /// This mode let's you specify a number between 0 (exclusive) and 1 (inclusive) to
    /// control fabrication per combination length:
    ///     - values close to 0: will try to minimize fabrication as much as possible
    ///     - values closer to 1: will let fabrication happen more frequently
    ///
    /// To ensure differential privacy guarantees, this cannot be set for the 1-counts.
    ///
    /// Example:
    ///     - for a reporting_length=3: thresholds = {2: 0.01, 3: 1.0}
    ///
    /// Arguments:
    ///     * thresholds: dict[int, float] - the key is the target combination length while
    ///                                      the value is a number (0, 1]
    ///         - if not set for a particular length, will default to 1.0
    ///
    /// Returns:
    ///     FabricationMode
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
                    if values.keys().any(|v| *v <= 1 || *v > reporting_length) {
                        return Err(PyValueError::new_err(
                            "fixed threshold keys must be > 1 and <= reporting_length",
                        ));
                    }
                    if values.values().any(|v| *v < 0.0) {
                        return Err(PyValueError::new_err("fixed threshold values must be >= 0"));
                    }
                    Ok(())
                }
                NoisyCountThreshold::Adaptive(values) => {
                    if values.keys().any(|v| *v <= 1 || *v > reporting_length) {
                        return Err(PyValueError::new_err(
                            "adaptive threshold keys must be > 1 and <= reporting_length",
                        ));
                    }
                    if values.values().any(|v| *v <= 0.0 || *v > 1.0) {
                        return Err(PyValueError::new_err(
                            "adaptive threshold values must be > 0 and <= 1",
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
            FabricationModeEnum::Progressive => {
                NoisyCountThreshold::Adaptive(if reporting_length == 2 {
                    [(2, 0.1)].iter().cloned().collect()
                } else {
                    let ratio = 0.9 / ((reporting_length - 2) as f64);
                    (2..=reporting_length)
                        .map(|i| (i, f64::min(1.0, 0.1 + ratio * ((i - 2) as f64))))
                        .collect()
                })
            }
            FabricationModeEnum::Balanced => {
                NoisyCountThreshold::Adaptive(if reporting_length >= 2 {
                    let mut ret: InputValueByLen<f64> =
                        (3..=reporting_length).map(|i| (i, 1.0)).collect();
                    ret.insert(2, 0.55);
                    ret
                } else {
                    InputValueByLen::<f64>::default()
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
