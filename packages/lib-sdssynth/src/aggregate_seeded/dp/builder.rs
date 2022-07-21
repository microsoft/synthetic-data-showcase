use super::{AccuracyMode, FabricationMode};
use pyo3::prelude::*;
use serde::Serialize;

#[pyclass]
#[derive(Serialize)]
pub struct DpAggregateSeededParametersBuilder {
    _reporting_length: usize,
    _epsilon: f64,
    _delta: Option<f64>,
    _percentile_percentage: usize,
    _percentile_epsilon_proportion: f64,
    _accuracy_mode: AccuracyMode,
    _number_of_records_epsilon: f64,
    _fabrication_mode: FabricationMode,
    _empty_value: String,
    _weight_selection_percentile: usize,
    _aggregate_counts_scale_factor: Option<f64>,
}

#[pymethods]
impl DpAggregateSeededParametersBuilder {
    #[inline]
    #[new]
    pub fn default() -> Self {
        Self {
            _reporting_length: 3,
            _epsilon: 0.1,
            _delta: None,
            _percentile_percentage: 99,
            _percentile_epsilon_proportion: 0.01,
            _accuracy_mode: AccuracyMode::prioritize_large_counts(),
            _number_of_records_epsilon: 0.1,
            _fabrication_mode: FabricationMode::uncontrolled(),
            _empty_value: "".to_owned(),
            _weight_selection_percentile: 95,
            _aggregate_counts_scale_factor: None,
        }
    }

    #[inline]
    pub fn reporting_length(&mut self, value: usize) {
        self._reporting_length = value;
    }

    #[inline]
    pub fn epsilon(&mut self, value: f64) {
        self._epsilon = value;
    }

    #[inline]
    pub fn delta(&mut self, value: f64) {
        self._delta = Some(value);
    }

    #[inline]
    pub fn percentile_percentage(&mut self, value: usize) {
        self._percentile_percentage = value;
    }

    #[inline]
    pub fn percentile_epsilon_proportion(&mut self, value: f64) {
        self._percentile_epsilon_proportion = value;
    }

    #[inline]
    pub fn accuracy_mode(&mut self, value: AccuracyMode) {
        self._accuracy_mode = value;
    }

    #[inline]
    pub fn number_of_records_epsilon(&mut self, value: f64) {
        self._number_of_records_epsilon = value
    }

    #[inline]
    pub fn fabrication_mode(&mut self, value: FabricationMode) {
        self._fabrication_mode = value;
    }

    #[inline]
    pub fn empty_value(&mut self, value: String) {
        self._empty_value = value
    }

    #[inline]
    pub fn weight_selection_percentile(&mut self, value: usize) {
        self._weight_selection_percentile = value;
    }

    #[inline]
    pub fn aggregate_counts_scale_factor(&mut self, value: f64) {
        self._aggregate_counts_scale_factor = Some(value);
    }

    fn __str__(&self) -> String {
        serde_json::to_string_pretty(self).unwrap()
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<DpAggregateSeededParametersBuilder>()?;
    Ok(())
}
