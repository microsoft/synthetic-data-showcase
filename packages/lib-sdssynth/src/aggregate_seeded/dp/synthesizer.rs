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
pub struct DpAggregatedSeededSynthesizer {
    _parameters: DpAggregateSeededParameters,
    _aggregated_data: Option<Arc<AggregatedData>>,
}

#[pymethods]
impl DpAggregatedSeededSynthesizer {
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
    pub fn parameters(&self) -> DpAggregateSeededParameters {
        self._parameters.clone()
    }

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
                    Some(self._parameters.number_of_records_epsilon),
                ),
                self._parameters.threshold.clone(),
                &mut create_progress_reporter(),
            )?,
        ));

        Ok(())
    }

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

    pub fn get_dp_number_of_records(&self) -> PyResult<usize> {
        self._aggregated_data
            .as_ref()
            .map(|ad| ad.protected_number_of_records.unwrap_or(0))
            .ok_or_else(|| {
                PyRuntimeError::new_err("make sure 'fit' method has been successfully called first")
            })
    }
}

impl DpAggregatedSeededSynthesizer {
    #[inline]
    fn delta_value_or_default(&self, data_block: &DataBlock) -> f64 {
        let number_of_records = data_block.number_of_records();

        self._parameters.delta.unwrap_or(if number_of_records > 0 {
            1.0 / (2.0 * (number_of_records as f64))
        } else {
            0.0
        })
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<DpAggregatedSeededSynthesizer>()?;
    Ok(())
}
