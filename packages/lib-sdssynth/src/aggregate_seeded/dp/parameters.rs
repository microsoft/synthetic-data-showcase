use pyo3::prelude::*;
use sds_core::dp::NoisyCountThreshold;
use serde::Serialize;

#[pyclass]
#[derive(Serialize)]
pub struct DpAggregateSeededParameters {
    pub(crate) reporting_length: usize,
    pub(crate) epsilon: f64,
    pub(crate) delta: Option<f64>,
    pub(crate) percentile_percentage: usize,
    pub(crate) percentile_epsilon_proportion: f64,
    pub(crate) sigma_proportions: Option<Vec<f64>>,
    pub(crate) number_of_records_epsilon: f64,
    pub(crate) threshold: NoisyCountThreshold,
    pub(crate) empty_value: String,
    pub(crate) weight_selection_percentile: usize,
    pub(crate) aggregate_counts_scale_factor: Option<f64>,
}

#[pymethods]
impl DpAggregateSeededParameters {
    fn __str__(&self) -> String {
        serde_json::to_string_pretty(self).unwrap()
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<DpAggregateSeededParameters>()?;
    Ok(())
}
