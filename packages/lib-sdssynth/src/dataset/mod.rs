use self::dataset_data_block_creator::DatasetDataBlockCreator;
use pyo3::prelude::*;
use sds_core::data_block::{DataBlock, DataBlockCreator};
use std::{collections::HashMap, sync::Arc};

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
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<Dataset>()?;
    Ok(())
}
