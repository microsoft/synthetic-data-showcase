use super::{DpAggregateSeededParameters, DpAggregateSeededParametersBuilder};
use pyo3::{exceptions::PyRuntimeError, prelude::*};
use sds_core::{
    data_block::DataBlock,
    dp::DpParameters,
    processing::{
        aggregator::{AggregatedData, AggregatesCountStringMap, Aggregator},
        generator::Generator,
    },
};
use std::sync::Arc;

use crate::{
    dataset::{Dataset, DatasetRawData},
    utils::create_progress_reporter,
};

#[pyclass]
#[pyo3(text_signature = "(parameters=None)")]
/// Differential Privacy (DP) Aggregate Seeded Synthesizer.
///
/// DP Aggregate Seeded synthesizer is a differentially private synthesizer that relies on
/// DP Marginals to build synthetic data. It will compute DP Marginals (called aggregates)
/// for your dataset (`.fit`) using the specified parameters, and synthesize data (`.sample`) based on the
/// computed aggregated counts (`.get_dp_aggregates`).
///
/// Arguments:
///     * parameters: Optional[DpAggregateSeededParameters] - parameters constructed with DpAggregateSeededParametersBuilder
///         - if not provided, default parameters will be used: `DpAggregateSeededParametersBuilder().build()`
///
/// Returns:
///     New DpAggregateSeededSynthesizer
pub struct DpAggregateSeededSynthesizer {
    _parameters: DpAggregateSeededParameters,
    _aggregated_data: Option<Arc<AggregatedData>>,
}

#[pymethods]
impl DpAggregateSeededSynthesizer {
    #[inline]
    #[new]
    pub fn new(parameters: Option<DpAggregateSeededParameters>) -> PyResult<Self> {
        Ok(Self {
            _parameters: if let Some(params) = parameters {
                params
            } else {
                DpAggregateSeededParametersBuilder::default().build()?
            },
            _aggregated_data: None,
        })
    }

    #[inline]
    #[getter]
    /// Returns the configured parameters for the synthesizer.
    ///
    /// Returns:
    ///     Configured parameters - DpAggregateSeededParameters
    pub fn parameters(&self) -> DpAggregateSeededParameters {
        self._parameters.clone()
    }

    #[pyo3(text_signature = "(self)")]
    /// Computes the differentially private aggregates used to synthesize
    /// data.
    ///
    /// Arguments:
    ///     * dataset: Dataset - dataset to compute the aggregates for
    pub fn fit(&mut self, dataset: &Dataset) -> PyResult<()> {
        self._aggregated_data = Some(Arc::new(
            Aggregator::new(dataset.data_block.clone()).aggregate_with_dp(
                self._parameters.reporting_length,
                &DpParameters::new(
                    self._parameters.epsilon,
                    self.delta_value_or_default(&dataset.data_block),
                    self._parameters.percentile_percentage,
                    self._parameters.percentile_epsilon_proportion,
                    Some(self._parameters.sigma_proportions.clone()),
                    Some(self._parameters.number_of_records_epsilon_proportion),
                ),
                self._parameters.threshold.clone(),
                &mut create_progress_reporter(),
            )?,
        ));

        Ok(())
    }

    #[pyo3(text_signature = "(self, target_number_of_records=None, join_multi_value_columns=None)")]
    /// Sample records from the differentially private aggregates.
    ///
    /// Arguments:
    ///     * target_number_of_records: Optional[int] - desired number of records to be synthesized
    ///         - if not set, the synthesizer will use all the available differentially private attributes
    ///           counts to synthesize records (which will produce a number close to original number of records)
    ///     * join_multi_value_columns: Optional[bool] - whether previous spread multi value columns in the input
    ///                                                  dataset should be joined back together in the resulting raw data
    ///
    /// Returns:
    ///     The result raw data form the synthesis,
    ///     where the first entry contains the headers - list[list[str]]
    pub fn sample(
        &self,
        target_number_of_records: Option<usize>,
        join_multi_value_columns: Option<bool>,
    ) -> PyResult<DatasetRawData> {
        let generator = Generator::default();

        if let Some(aggregated_data) = &self._aggregated_data {
            let generated_data = generator.generate_aggregate_seeded(
                &self._parameters.empty_value,
                aggregated_data.clone(),
                self._parameters.use_synthetic_counts,
                Some(self._parameters.weight_selection_percentile),
                self._parameters.aggregate_counts_scale_factor,
                target_number_of_records,
                &mut create_progress_reporter(),
            )?;
            Ok(generated_data.synthetic_data_to_vec(
                &self._parameters.empty_value,
                join_multi_value_columns.unwrap_or(false),
            ))
        } else {
            Err(PyRuntimeError::new_err(
                "make sure 'fit' method has been successfully called first",
            ))
        }
    }

    #[pyo3(text_signature = "(self, combination_delimiter)")]
    /// Gets the differentially private aggregates computed with the `.fit` method.
    ///
    /// Arguments:
    ///     * combination_delimiter: str - combination delimiter to use
    ///
    /// Returns:
    ///     A dictionary with the combination string representation as key
    ///     and the combination count as value - dict[str, int]
    pub fn get_dp_aggregates(
        &self,
        combination_delimiter: &str,
    ) -> PyResult<AggregatesCountStringMap> {
        self._aggregated_data
            .as_ref()
            .map(|ad| ad.aggregates_count_as_str(combination_delimiter))
            .ok_or_else(|| {
                PyRuntimeError::new_err("make sure 'fit' method has been successfully called first")
            })
    }

    #[pyo3(text_signature = "(self)")]
    /// Gets the differentially private number of records computed with the `.fit` method.
    ///
    /// This is different than the number of records specified in the sample method, synthesized
    /// in the synthetic data. This refers to the differentially private protected number of records
    /// in original sensitive dataset.
    ///
    /// Returns:
    ///     Protected number of records - int
    pub fn get_dp_number_of_records(&self) -> PyResult<usize> {
        self._aggregated_data
            .as_ref()
            .map(|ad| ad.protected_number_of_records.unwrap_or(0))
            .ok_or_else(|| {
                PyRuntimeError::new_err("make sure 'fit' method has been successfully called first")
            })
    }
}

impl DpAggregateSeededSynthesizer {
    #[inline]
    fn delta_value_or_default(&self, data_block: &DataBlock) -> f64 {
        let number_of_records = data_block.number_of_records();
        let number_of_records_f64 = number_of_records as f64;

        self._parameters.delta.unwrap_or(if number_of_records > 0 {
            1.0 / (number_of_records_f64.ln() * number_of_records_f64)
        } else {
            0.0
        })
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<DpAggregateSeededSynthesizer>()?;
    Ok(())
}
