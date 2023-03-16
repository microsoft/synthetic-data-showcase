#[cfg(feature = "pyo3")]
use pyo3::prelude::*;
use serde::{Deserialize, Serialize};

/// Parameters for aggregate generation with differential privacy
#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DpParameters {
    /// Overall privacy budget used between
    /// percentile filtering and noisy generation by combination length
    pub epsilon: f64,
    /// Delta value used for noisy generation by combination length, if None will be set
    /// in runtime to `1 / (ln(protected_number_of_records) * protected_number_of_records)`
    pub delta: Option<f64>,
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
    /// Proportion of epsilon used to add noise to the protected number of records in
    /// the aggregated data (if None, no noise is added)
    pub number_of_records_epsilon_proportion: Option<f64>,
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
    /// * `delta` - Delta value used for noisy generation by combination length, if None will be set
    /// in runtime to `1 / (ln(protected_number_of_records) * protected_number_of_records)`
    /// * `percentile_percentage` - Percentage used to calculate the percentile that filters sensitivity
    /// * `percentile_epsilon_proportion` - Maximum proportion to consume of the total privacy budget (0.1 means 10%)
    /// during the sensitivity filter stage
    /// * `sigma_proportions` - `epsilon` and `percentile_epsilon_proportion` will be used to infer the
    /// sigma value by combination length. This parameters
    /// controls how the budget being split across combination lengths
    /// (e.g. \[1.0, 2.0, 3.0\] means that `sigma_2 = 2.0 * sigma_1` and `sigma_3 = 3.0 * sigma_1`)
    ///     - If `None` all the sigma values will be the same
    /// * `number_of_records_epsilon_proportion` - Proportion of epsilon used to add noise to the protected number of records
    /// in the aggregated data (if None, no noise is added)
    pub fn new(
        epsilon: f64,
        delta: Option<f64>,
        percentile_percentage: usize,
        percentile_epsilon_proportion: f64,
        sigma_proportions: Option<Vec<f64>>,
        number_of_records_epsilon_proportion: Option<f64>,
    ) -> Self {
        DpParameters {
            epsilon,
            delta,
            percentile_percentage,
            percentile_epsilon_proportion,
            sigma_proportions,
            number_of_records_epsilon_proportion,
        }
    }

    #[inline]
    #[cfg(not(feature = "pyo3"))]
    /// Creates a new DpParameters structure
    /// # Arguments
    /// * `epsilon` - Overall privacy budget used between
    /// percentile filtering and noisy generation by combination length
    /// * `delta` - Delta value used for noisy generation by combination length, if None will be set
    /// in runtime to `1 / (ln(protected_number_of_records) * protected_number_of_records)`
    /// * `percentile_percentage` - Percentage used to calculate the percentile that filters sensitivity
    /// * `percentile_epsilon_proportion` - Maximum proportion to consume of the total privacy budget (0.1 means 10%)
    /// during the sensitivity filter stage
    /// * `sigma_proportions` - `epsilon` and `percentile_epsilon_proportion` will be used to infer the
    /// sigma value by combination length. This parameters
    /// controls how the budget being split across combination lengths
    /// (e.g. \[1.0, 2.0, 3.0\] means that `sigma_2 = 2.0 * sigma_1` and `sigma_3 = 3.0 * sigma_1`)
    ///     - If `None` all the sigma values will be the same
    /// * `number_of_records_epsilon_proportion` - Proportion of epsilon used to add noise to the protected number of records
    /// in the aggregated data (if None, no noise is added)
    pub fn new(
        epsilon: f64,
        delta: Option<f64>,
        percentile_percentage: usize,
        percentile_epsilon_proportion: f64,
        sigma_proportions: Option<Vec<f64>>,
        number_of_records_epsilon_proportion: Option<f64>,
    ) -> Self {
        DpParameters {
            epsilon,
            delta,
            percentile_percentage,
            percentile_epsilon_proportion,
            sigma_proportions,
            number_of_records_epsilon_proportion,
        }
    }
}
