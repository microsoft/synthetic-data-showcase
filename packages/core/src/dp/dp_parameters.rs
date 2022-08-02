#[cfg(feature = "pyo3")]
use pyo3::prelude::*;
use serde::{Deserialize, Serialize};

/// Default epsilon used to add noise to the protected number of records in the aggregated data
pub const DEFAULT_NUMBER_OF_RECORDS_EPSILON: f64 = 0.1;

/// Parameters for aggregate generation with differential privacy
#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DpParameters {
    /// Overall privacy budget used between
    /// percentile filtering and noisy generation by combination length
    pub epsilon: f64,
    /// Delta value used for noisy generation by combination length
    pub delta: f64,
    /// Percentage used to calculate the percentile that filters sensitivity
    pub percentile_percentage: usize,
    /// Maximum proportion to consume of the total privacy budget (0.1 means 10%)
    /// during the sensitivity filter stage
    pub percentile_epsilon_proportion: f64,
    /// `epsilon` and `percentile_epsilon_proportion` will be used to infer the
    /// sigma value by combination length. This parameters
    /// controls how the budget being split across combination lengths
    /// (e.g. \[1.0, 2.0, 3.0\] means that `sigma_2 = 2.0 * sigma_1` and `sigma_3 = 3.0 * sigma_1`)
    /// - If `None` all the sigma values will be the same
    pub sigma_proportions: Option<Vec<f64>>,
    /// Epsilon used to add noise to the protected number of records in the aggregated data
    /// (default is 0.1)
    pub number_of_records_epsilon: Option<f64>,
}

#[cfg_attr(feature = "pyo3", pymethods)]
impl DpParameters {
    #[inline]
    #[cfg(feature = "pyo3")]
    #[new]
    /// Creates a new DpParameters structure
    /// # Arguments
    /// * `epsilon` - Overall privacy budget used between
    /// percentile filtering and noisy generation by combination length
    /// * `delta` - Delta value used for noisy generation by combination length
    /// * `percentile_percentage` - Percentage used to calculate the percentile that filters sensitivity
    /// * `percentile_epsilon_proportion` - Maximum proportion to consume of the total privacy budget (0.1 means 10%)
    /// during the sensitivity filter stage
    /// * `sigma_proportions` - `epsilon` and `percentile_epsilon_proportion` will be used to infer the
    /// sigma value by combination length. This parameters
    /// controls how the budget being split across combination lengths
    /// (e.g. \[1.0, 2.0, 3.0\] means that `sigma_2 = 2.0 * sigma_1` and `sigma_3 = 3.0 * sigma_1`)
    ///     - If `None` all the sigma values will be the same
    /// * `number_of_records_epsilon` - Epsilon used to add noise to the protected number of records in the aggregated data
    /// (default is 0.1)
    pub fn new(
        epsilon: f64,
        delta: f64,
        percentile_percentage: usize,
        percentile_epsilon_proportion: f64,
        sigma_proportions: Option<Vec<f64>>,
        number_of_records_epsilon: Option<f64>,
    ) -> Self {
        DpParameters {
            epsilon,
            delta,
            percentile_percentage,
            percentile_epsilon_proportion,
            sigma_proportions,
            number_of_records_epsilon,
        }
    }

    #[inline]
    #[cfg(not(feature = "pyo3"))]
    /// Creates a new DpParameters structure
    /// # Arguments
    /// * `epsilon` - Overall privacy budget used between
    /// percentile filtering and noisy generation by combination length
    /// * `delta` - Delta value used for noisy generation by combination length
    /// * `percentile_percentage` - Percentage used to calculate the percentile that filters sensitivity
    /// * `percentile_epsilon_proportion` - Maximum proportion to consume of the total privacy budget (0.1 means 10%)
    /// during the sensitivity filter stage
    /// * `sigma_proportions` - `epsilon` and `percentile_epsilon_proportion` will be used to infer the
    /// sigma value by combination length. This parameters
    /// controls how the budget being split across combination lengths
    /// (e.g. \[1.0, 2.0, 3.0\] means that `sigma_2 = 2.0 * sigma_1` and `sigma_3 = 3.0 * sigma_1`)
    ///     - If `None` all the sigma values will be the same
    /// * `number_of_records_epsilon` - Epsilon used to add noise to the protected number of records in the aggregated data
    /// (default is 0.1)
    pub fn new(
        epsilon: f64,
        delta: f64,
        percentile_percentage: usize,
        percentile_epsilon_proportion: f64,
        sigma_proportions: Option<Vec<f64>>,
        number_of_records_epsilon: Option<f64>,
    ) -> Self {
        DpParameters {
            epsilon,
            delta,
            percentile_percentage,
            percentile_epsilon_proportion,
            sigma_proportions,
            number_of_records_epsilon,
        }
    }
}
