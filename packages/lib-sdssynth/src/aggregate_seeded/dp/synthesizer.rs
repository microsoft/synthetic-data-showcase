use super::{DpAggregateSeededParameters, DpAggregateSeededParametersBuilder};
use log::{log_enabled, Level::Debug};
use pyo3::{exceptions::PyRuntimeError, prelude::*};
use sds_core::{
    data_block::DataBlock,
    dp::DpParameters,
    processing::{
        aggregator::{AggregatedData, Aggregator},
        generator::Generator,
    },
    utils::reporting::LoggerProgressReporter,
};
use std::sync::Arc;

use crate::dataset::{Dataset, DatasetRawData};

#[pyclass]
pub struct DpAggregatedSeededSynthesizer {
    parameters: DpAggregateSeededParameters,
    aggregated_data: Option<Arc<AggregatedData>>,
}

#[pymethods]
impl DpAggregatedSeededSynthesizer {
    #[inline]
    #[new]
    pub fn new(parameters: Option<DpAggregateSeededParameters>) -> PyResult<Self> {
        Ok(Self {
            parameters: if let Some(params) = parameters {
                params
            } else {
                DpAggregateSeededParametersBuilder::default().build()?
            },
            aggregated_data: None,
        })
    }

    pub fn fit(&mut self, dataset: &Dataset) -> PyResult<()> {
        self.aggregated_data = Some(Arc::new(
            Aggregator::new(dataset.data_block.clone()).aggregate_with_dp(
                self.parameters.reporting_length,
                &DpParameters::new(
                    self.parameters.epsilon,
                    self.delta_value_or_default(&dataset.data_block),
                    self.parameters.percentile_percentage,
                    self.parameters.percentile_epsilon_proportion,
                    Some(self.parameters.sigma_proportions.clone()),
                    Some(self.parameters.number_of_records_epsilon),
                ),
                self.parameters.threshold.clone(),
                &mut Self::create_progress_reporter(),
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

        if let Some(aggregated_data) = &self.aggregated_data {
            let generated_data = generator.generate_aggregate_seeded(
                &self.parameters.empty_value,
                aggregated_data.clone(),
                self.parameters.use_synthetic_counts,
                Some(self.parameters.weight_selection_percentile),
                self.parameters.aggregate_counts_scale_factor,
                target_number_of_records,
                &mut Self::create_progress_reporter(),
            )?;
            Ok(generated_data.synthetic_data_to_vec(join_multi_value_columns.unwrap_or(false)))
        } else {
            Err(PyRuntimeError::new_err(
                "make sure 'fit' method has been successfully called first",
            ))
        }
    }
}

impl DpAggregatedSeededSynthesizer {
    #[inline]
    fn delta_value_or_default(&self, data_block: &DataBlock) -> f64 {
        let number_of_records = data_block.number_of_records();

        self.parameters.delta.unwrap_or(if number_of_records > 0 {
            1.0 / (2.0 * (number_of_records as f64))
        } else {
            0.0
        })
    }

    #[inline]
    fn create_progress_reporter() -> Option<LoggerProgressReporter> {
        if log_enabled!(Debug) {
            Some(LoggerProgressReporter::new(Debug))
        } else {
            None
        }
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<DpAggregatedSeededSynthesizer>()?;
    Ok(())
}
