use pyo3::prelude::*;
use sds_core::dp::NoisyCountThreshold;
use serde::Serialize;

#[pyclass]
#[derive(Clone, Serialize)]
/// This represents the parameters for the
/// Differential Privacy (DP) Aggregate Seeded Synthesizer - DpAggregateSeededSynthesizer.
///
/// This is not supposed to be created using a constructor, instead
/// use the provided builder - DpAggregateSeededParametersBuilder.
pub struct DpAggregateSeededParameters {
    pub(crate) reporting_length: usize,
    pub(crate) epsilon: f64,
    pub(crate) delta: Option<f64>,
    pub(crate) percentile_percentage: usize,
    pub(crate) percentile_epsilon_proportion: f64,
    pub(crate) sigma_proportions: Vec<f64>,
    pub(crate) number_of_records_epsilon_proportion: f64,
    pub(crate) threshold: NoisyCountThreshold,
    pub(crate) empty_value: String,
    pub(crate) use_synthetic_counts: bool,
    pub(crate) weight_selection_percentile: usize,
    pub(crate) aggregate_counts_scale_factor: Option<f64>,
}

#[pymethods]
impl DpAggregateSeededParameters {
    #[pyo3(text_signature = "(self)")]
    /// Returns the JSON string representation of the parameters.
    ///
    /// Returns:
    ///     Parameters serialized to a JSON String - str
    fn to_json_str(&self) -> String {
        serde_json::to_string_pretty(self).unwrap()
    }

    fn __str__(&self) -> String {
        self.to_json_str()
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<DpAggregateSeededParameters>()?;
    Ok(())
}
