use self::dataset_data_block_creator::DatasetDataBlockCreator;
use pyo3::prelude::*;
use sds_core::{
    data_block::{DataBlock, DataBlockCreator},
    processing::aggregator::{AggregatesCountStringMap, Aggregator},
};
use std::{collections::HashMap, sync::Arc};

use crate::utils::create_progress_reporter;

mod dataset_data_block_creator;

pub type DatasetRawData = Vec<Vec<String>>;

#[pyclass]
pub struct Dataset {
    pub(crate) data_block: Arc<DataBlock>,
}

#[pymethods]
impl Dataset {
    #[inline]
    #[new]
    pub fn new(
        raw_data: DatasetRawData,
        subject_id: Option<String>,
        use_columns: Option<Vec<String>>,
        multi_value_columns: Option<HashMap<String, String>>,
        sensitive_zeros: Option<Vec<String>>,
        record_limit: Option<usize>,
    ) -> PyResult<Self> {
        Ok(Self {
            data_block: DatasetDataBlockCreator::create(
                Ok(raw_data),
                subject_id,
                &use_columns.unwrap_or_default(),
                &multi_value_columns.unwrap_or_default(),
                &sensitive_zeros.unwrap_or_default(),
                record_limit.unwrap_or_default(),
            )?,
        })
    }

    pub fn get_aggregates(
        &self,
        reporting_length: usize,
        combination_delimiter: &str,
    ) -> PyResult<AggregatesCountStringMap> {
        Ok(Aggregator::new(self.data_block.clone())
            .aggregate(reporting_length, &mut create_progress_reporter())
            .map(|ad| ad.aggregates_count_as_str(combination_delimiter))?)
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<Dataset>()?;
    Ok(())
}
