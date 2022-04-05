use std::{io::Error, sync::Arc};

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

use crate::processing::aggregator::AggregatedData;

/// Define the parameters needed for data consolidation
#[derive(Clone)]
#[cfg_attr(feature = "pyo3", pyclass)]
pub struct ConsolidateParameters {
    /// Aggregated data used to avoid oversampling ("value_seeded" and "aggregate_seeded" mode)
    pub aggregated_data: Arc<AggregatedData>,
    /// Ratio of oversampling allowed for each L from 1 up ("value_seeded" mode)
    pub oversampling_ratio: Option<f64>,
    /// How many times should we try to resample if the sampled attribute leads to oversampling
    pub oversampling_tries: Option<usize>,
    /// Whether or not the synthetic counts should be used to
    /// control the sampling process aggregate seeded
    pub use_synthetic_counts: bool,
}

impl ConsolidateParameters {
    /// Returns a new ConsolidateParameters
    /// # Arguments
    /// * `aggregated_data_path` - Aggregated data used to avoid oversampling/control synthetic counts ("value_seeded" and "aggregate_seeded" mode)
    /// * `oversampling_ratio` - Ratio of oversampling allowed for each L from 1 up ("value_seeded" mode)
    /// * `oversampling_ratio` - How many times should we try to resample if the sampled attribute leads to oversampling
    /// * `use_synthetic_counts` - Whether or not the synthetic counts should be used to
    /// control the sampling process from aggregates
    #[inline]
    pub fn new(
        aggregated_data_path: Option<String>,
        oversampling_ratio: Option<f64>,
        oversampling_tries: Option<usize>,
        use_synthetic_counts: bool,
    ) -> Result<ConsolidateParameters, Error> {
        let aggregated_data = aggregated_data_path
            .map(|path| AggregatedData::read_from_json(&path))
            .unwrap_or_else(|| Ok(AggregatedData::default()))?;

        Ok(ConsolidateParameters {
            aggregated_data: Arc::new(aggregated_data),
            oversampling_ratio,
            oversampling_tries,
            use_synthetic_counts,
        })
    }
}

#[cfg(feature = "pyo3")]
#[cfg_attr(feature = "pyo3", pymethods)]
impl ConsolidateParameters {
    /// Returns a new ConsolidateParameters
    /// # Arguments
    /// * `aggregated_data_path` - Aggregated data used to avoid oversampling/control synthetic counts ("value_seeded" and "aggregate_seeded" mode)
    /// * `oversampling_ratio` - Ratio of oversampling allowed for each L from 1 up ("value_seeded" mode)
    /// * `oversampling_ratio` - How many times should we try to resample if the sampled attribute leads to oversampling
    /// * `use_synthetic_counts` - Whether or not the synthetic counts should be used to
    /// control the sampling process from aggregates
    #[inline]
    #[new]
    pub fn constructor(
        aggregated_data_path: Option<String>,
        oversampling_ratio: Option<f64>,
        oversampling_tries: Option<usize>,
        use_synthetic_counts: bool,
    ) -> Result<ConsolidateParameters, Error> {
        Self::new(
            aggregated_data_path,
            oversampling_ratio,
            oversampling_tries,
            use_synthetic_counts,
        )
    }
}

impl Default for ConsolidateParameters {
    fn default() -> Self {
        Self {
            aggregated_data: Arc::new(AggregatedData::default()),
            oversampling_ratio: None,
            oversampling_tries: None,
            use_synthetic_counts: false,
        }
    }
}
