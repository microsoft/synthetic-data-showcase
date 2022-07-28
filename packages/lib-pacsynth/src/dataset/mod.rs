use self::dataset_data_block_creator::DatasetDataBlockCreator;
use pyo3::{exceptions::PyValueError, prelude::*, types::IntoPyDict};
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

    #[staticmethod]
    pub fn from_data_frame(
        df: PyObject,
        py: Python,
        subject_id: Option<String>,
        use_columns: Option<Vec<String>>,
        multi_value_columns: Option<HashMap<String, String>>,
        sensitive_zeros: Option<Vec<String>>,
        record_limit: Option<usize>,
    ) -> PyResult<Self> {
        Self::new(
            Self::data_frame_to_raw_data(df, py)?,
            subject_id,
            use_columns,
            multi_value_columns,
            sensitive_zeros,
            record_limit,
        )
    }

    #[staticmethod]
    pub fn data_frame_to_raw_data(df: PyObject, py: Python) -> PyResult<DatasetRawData> {
        let df_as_str =
            df.call_method1(py, "fillna", ("",))?
                .call_method1(py, "astype", ("str",))?;
        let mut raw_data: DatasetRawData = vec![df_as_str
            .getattr(py, "columns")?
            .call_method0(py, "tolist")?
            .extract(py)?];

        raw_data.append(
            &mut df_as_str
                .getattr(py, "values")?
                .call_method0(py, "tolist")?
                .extract(py)?,
        );

        Ok(raw_data)
    }

    #[staticmethod]
    pub fn raw_data_to_data_frame(mut raw_data: DatasetRawData) -> PyResult<PyObject> {
        if raw_data.is_empty() {
            return Err(PyValueError::new_err("dataset missing headers"));
        }

        Python::with_gil(|py| {
            let pandas = PyModule::import(py, "pandas")?;
            let headers = raw_data[0].clone();

            pandas
                .getattr("DataFrame")?
                .call(
                    (raw_data.drain(1..).collect::<Vec<Vec<String>>>(),),
                    Some([("columns", headers)].into_py_dict(py)),
                )?
                .extract()
        })
    }

    pub fn to_raw_data(
        &self,
        empty_value: Option<String>,
        join_multi_value_columns: Option<bool>,
    ) -> DatasetRawData {
        self.data_block.to_raw_data_vec(
            &empty_value
                .map(Arc::new)
                .unwrap_or_else(|| Arc::new("".to_owned())),
            join_multi_value_columns.unwrap_or(false),
        )
    }

    pub fn to_data_frame(
        &self,
        empty_value: Option<String>,
        join_multi_value_columns: Option<bool>,
    ) -> PyResult<PyObject> {
        Self::raw_data_to_data_frame(self.to_raw_data(empty_value, join_multi_value_columns))
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
