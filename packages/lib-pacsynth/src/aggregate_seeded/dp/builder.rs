use super::{AccuracyMode, DpAggregateSeededParameters, FabricationMode};
use pyo3::{exceptions::PyValueError, prelude::*};
use serde::Serialize;

#[pyclass]
#[derive(Serialize)]
#[pyo3(text_signature = "()")]
/// Parameters builder for the
/// Differential Privacy (DP) Aggregate Seeded Synthesizer - DpAggregateSeededSynthesizer.
///
/// By default, the builder will be constructed with default values:
///     - reporting_length: 3
///     - epsilon: 0.1
///     - delta: will be set in runtime to 1 / (2 * number_of_records)
///     - percentile_percentage: 99
///     - percentile_epsilon_proportion: 0.01
///     - accuracy_mode: AccuracyMode.prioritize_large_counts()
///     - number_of_records_epsilon: 0.1
///     - fabrication_mode: FabricationMode.uncontrolled()
///     - empty_value: ''
///     - use_synthetic_counts: false
///     - weight_selection_percentile: 95
///     - aggregate_counts_scale_factor: None
///
/// Calling the builder methods will update the parameters in place and return
/// a reference to the builder itself (so method calls can be chained for configuration).
///
/// When you are done configuring the desired parameters, call `.build()` to construct the parameters.
///
/// Returns:
///     New DpAggregateSeededParametersBuilder
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
    _use_synthetic_counts: bool,
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
            _use_synthetic_counts: false,
            _weight_selection_percentile: 95,
            _aggregate_counts_scale_factor: None,
        }
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// Maximum length (inclusive) to compute attribute combinations for.
    ///
    /// An attribute combination is defined as a tuple such that: (<column_name_i>:<attribute_value_i>, ...)
    ///
    /// Example:
    ///     ('A:a1', 'B:b1') has length of 2 (2-count) and represents attribute a1 from column A and
    ///     attribute b1 from column B.
    ///
    ///     The synthesis mode relies on counting attribute combinations, for example, ('A:a1', 'B:b1')
    ///     happens 10 times in the dataset.
    ///
    /// Arguments:
    ///     * value: int - value to be set
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn reporting_length(slf: Py<Self>, py: Python, value: usize) -> Py<Self> {
        slf.borrow_mut(py)._reporting_length = value;
        slf
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// Privacy budget for the aggregates generation with differential privacy.
    ///
    /// Arguments:
    ///     * value: float - value to be set
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn epsilon(slf: Py<Self>, py: Python, value: f64) -> Py<Self> {
        slf.borrow_mut(py)._epsilon = value;
        slf
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// Delta value for the aggregates generation with differential privacy.
    ///
    /// Arguments:
    ///     * value: float - value to be set
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn delta(slf: Py<Self>, py: Python, value: f64) -> Py<Self> {
        slf.borrow_mut(py)._delta = Some(value);
        slf
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// During the aggregates generation with differential privacy, some of the
    /// privacy budget is spent to select combinations and lower the records overall sensitivity,
    /// producing reported counts with better accuracy. Although, some combinations will be
    /// randomly suppressed to achieve this.
    ///
    /// The closest it is from 100, less combinations will be suppressed. A general good value for this
    /// is 99.
    ///
    /// The proportion of the privacy budget dedicated to the percentile technique
    /// is set using the percentile_epsilon_proportion parameter.
    ///
    /// Arguments:
    ///     * value: int - value to be set (0, 100]
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn percentile_percentage(slf: Py<Self>, py: Python, value: usize) -> Py<Self> {
        slf.borrow_mut(py)._percentile_percentage = value;
        slf
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// Proportion of the privacy budget dedicated to the percentile technique.
    /// See percentile_percentage documentation.
    ///
    /// A value of 0.01 means 1%.
    ///
    /// Arguments:
    ///     * value: float - value to be set (0, 1)
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn percentile_epsilon_proportion(slf: Py<Self>, py: Python, value: f64) -> Py<Self> {
        slf.borrow_mut(py)._percentile_epsilon_proportion = value;
        slf
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// Defines how to split the privacy budget across the different combination
    /// lengths during the aggregates generation with differential privacy.
    ///
    /// For more information see the AccuracyMode documentation.
    ///
    /// Arguments:
    ///     * value: AccuracyMode - value to be set
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn accuracy_mode(slf: Py<Self>, py: Python, value: AccuracyMode) -> Py<Self> {
        slf.borrow_mut(py)._accuracy_mode = value;
        slf
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// The synthesizer exposes the number of records computed directly
    /// from the differential privacy aggregate data using the method `.get_dp_number_of_records`.
    ///
    /// To do so, noise needs to be added to original number of records
    /// to ensure it is protected by DP.
    ///
    /// This specifies the privacy budget used to generate this noise.
    ///
    /// Arguments:
    ///     * value: float - value to be set
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn number_of_records_epsilon(slf: Py<Self>, py: Python, value: f64) -> Py<Self> {
        slf.borrow_mut(py)._number_of_records_epsilon = value;
        slf
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// Defines how to control fabrication during the
    /// aggregates generation with differential privacy.
    ///
    /// For more information see the FabricationMode documentation.
    ///
    /// Arguments:
    ///     * value: FabricationMode - value to be set
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn fabrication_mode(slf: Py<Self>, py: Python, value: FabricationMode) -> Py<Self> {
        slf.borrow_mut(py)._fabrication_mode = value;
        slf
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// By default empty strings and '0' are not taken into account when creating and
    /// counting attribute combinations, generating empty values.
    ///
    /// When producing the synthetic data, empty values in the result will be replaced by this parameter,
    /// which is set by default to an empty string.
    ///
    /// Please see sensitive_zeros documentation in the Dataset class for more information.
    ///
    /// Arguments:
    ///     * value: str - value to be set
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn empty_value(slf: Py<Self>, py: Python, value: String) -> Py<Self> {
        slf.borrow_mut(py)._empty_value = value;
        slf
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// After the aggregates are processed with differential privacy. During the
    /// synthesis process (sampling), this flag indicates whether already synthesized
    /// attribute combination counts should be used to balance the sampling process or not.
    ///
    /// For instance, if set to `True`, the more a particular combination is sampled, less chance it will have
    /// to be sampled again.
    ///
    /// Arguments:
    ///     * value: bool - value to be set
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn use_synthetic_counts(slf: Py<Self>, py: Python, value: bool) -> Py<Self> {
        slf.borrow_mut(py)._use_synthetic_counts = value;
        slf
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// After the aggregates are processed with differential privacy. During the
    /// synthesis process (sampling), attribute combinations up to the reporting
    /// length will use the counts from differently private aggregates to balance the
    /// sampling process.
    ///
    /// When the attribute combination exceeds the reporting length,
    /// all its sub-combinations will be computed and the weight used to balance sampling will
    /// be selected using the percentile specified by this parameter.
    ///
    /// A good default for this is 95.
    ///
    /// Arguments:
    ///     * value: int - value to be set (0, 100]
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn weight_selection_percentile(slf: Py<Self>, py: Python, value: usize) -> Py<Self> {
        slf.borrow_mut(py)._weight_selection_percentile = value;
        slf
    }

    #[inline]
    #[pyo3(text_signature = "(self, value)")]
    /// After the aggregates are processed with differential privacy. During the
    /// synthesis process (sampling), we can optionally multiply the aggregate counts computed
    /// with differential privacy by some factor (aggregate_counts_scale_factor).
    ///
    /// For example, setting this to 1.5 and setting the flag use_synthetic_count=True,
    /// might improve the accuracy of bigger combination lengths, but decrease the
    /// accuracy of the 1-counts.
    ///
    /// By default this is implicitly 1.
    ///
    /// Arguments:
    ///     * value: float - value to be set (greater than 0)
    ///
    /// Returns:
    ///     Self reference to the builder - DpAggregateSeededParametersBuilder
    pub fn aggregate_counts_scale_factor(slf: Py<Self>, py: Python, value: f64) -> Py<Self> {
        slf.borrow_mut(py)._aggregate_counts_scale_factor = Some(value);
        slf
    }

    #[pyo3(text_signature = "(self)")]
    /// Validates if the configured parameters, if validation does not pass, throws
    /// an exception.
    pub fn validate(&self) -> PyResult<()> {
        if self._reporting_length == 0 {
            return Err(PyValueError::new_err("reporting_length must be > 0"));
        }

        if self._epsilon <= 0.0 {
            return Err(PyValueError::new_err("epsilon must be > 0"));
        }

        if let Some(delta) = self._delta {
            if delta <= 0.0 {
                return Err(PyValueError::new_err("delta must be > 0"));
            }
        }

        if self._percentile_percentage > 100 {
            return Err(PyValueError::new_err("percentile_percentage must be < 100"));
        }

        if self._percentile_epsilon_proportion <= 0.0 || self._percentile_epsilon_proportion >= 1.0
        {
            return Err(PyValueError::new_err(
                "percentile_epsilon_proportion must be > 0 and < 1",
            ));
        }

        self._accuracy_mode.validate(self._reporting_length)?;

        if self._number_of_records_epsilon <= 0.0 {
            return Err(PyValueError::new_err(
                "number_of_records_epsilon must be > 0",
            ));
        }

        self._fabrication_mode.validate(self._reporting_length)?;

        if self._weight_selection_percentile > 100 {
            return Err(PyValueError::new_err(
                "weight_selection_percentile must be < 100",
            ));
        }

        if let Some(aggregate_counts_scale_factor) = self._delta {
            if aggregate_counts_scale_factor <= 0.0 {
                return Err(PyValueError::new_err(
                    "aggregate_counts_scale_factor must be > 0",
                ));
            }
        }

        Ok(())
    }

    #[pyo3(text_signature = "(self)")]
    /// Validates the parameters set in the builder and constructs the
    /// DpAggregateSeededParameters to be used with the DpAggregateSeededSynthesizer.
    ///
    /// Returns:
    ///     Constructed DpAggregateSeededParameters
    pub fn build(&self) -> PyResult<DpAggregateSeededParameters> {
        self.validate()?;
        Ok(DpAggregateSeededParameters {
            reporting_length: self._reporting_length,
            epsilon: self._epsilon,
            delta: self._delta,
            percentile_percentage: self._percentile_percentage,
            percentile_epsilon_proportion: self._percentile_epsilon_proportion,
            sigma_proportions: self
                ._accuracy_mode
                .extract_sigma_proportions(self._reporting_length),
            number_of_records_epsilon: self._number_of_records_epsilon,
            threshold: self
                ._fabrication_mode
                .extract_threshold(self._reporting_length),
            empty_value: self._empty_value.clone(),
            use_synthetic_counts: self._use_synthetic_counts,
            weight_selection_percentile: self._weight_selection_percentile,
            aggregate_counts_scale_factor: self._aggregate_counts_scale_factor,
        })
    }

    #[pyo3(text_signature = "(self)")]
    /// Returns the JSON string representation of the builder.
    ///
    /// Returns:
    ///     Builder serialized to a JSON String - str
    fn to_json_str(&self) -> String {
        serde_json::to_string_pretty(self).unwrap()
    }

    fn __str__(&self) -> String {
        serde_json::to_string_pretty(self).unwrap()
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<DpAggregateSeededParametersBuilder>()?;
    Ok(())
}
