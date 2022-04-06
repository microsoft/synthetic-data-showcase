use std::sync::Arc;

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

use crate::processing::aggregator::AggregatedData;

/// Define the parameters needed to control oversampling
#[derive(Clone)]
#[cfg_attr(feature = "pyo3", pyclass)]
pub struct OversamplingParameters {
    /// Aggregated data used to avoid oversampling
    pub aggregated_data: Arc<AggregatedData>,
    /// Ratio of oversampling allowed for each length from 1 up to the reporting length
    pub oversampling_ratio: Option<f64>,
    /// How many times should we try to resample if the sampled attribute leads to oversampling
    pub oversampling_tries: Option<usize>,
}

impl OversamplingParameters {
    /// Returns a new OversamplingParameters
    /// # Arguments
    /// * `aggregated_data` - Aggregated data used to avoid oversampling
    /// * `oversampling_ratio` - Ratio of oversampling allowed for each length from 1 up to the reporting length
    /// * `oversampling_tries` - How many times should we try to resample if the sampled attribute leads to oversampling
    #[inline]
    pub fn new(
        aggregated_data: Arc<AggregatedData>,
        oversampling_ratio: Option<f64>,
        oversampling_tries: Option<usize>,
    ) -> OversamplingParameters {
        OversamplingParameters {
            aggregated_data,
            oversampling_ratio,
            oversampling_tries,
        }
    }
}

#[cfg(feature = "pyo3")]
#[cfg_attr(feature = "pyo3", pymethods)]
impl OversamplingParameters {
    #[inline]
    #[new]
    pub fn constructor(
        aggregated_data: AggregatedData,
        oversampling_ratio: Option<f64>,
        oversampling_tries: Option<usize>,
    ) -> OversamplingParameters {
        Self::new(
            Arc::new(aggregated_data),
            oversampling_ratio,
            oversampling_tries,
        )
    }
}

impl Default for OversamplingParameters {
    fn default() -> Self {
        Self {
            aggregated_data: Arc::new(AggregatedData::default()),
            oversampling_ratio: None,
            oversampling_tries: None,
        }
    }
}
