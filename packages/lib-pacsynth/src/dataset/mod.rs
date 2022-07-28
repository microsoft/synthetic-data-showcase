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
#[pyo3(
    text_signature = "(raw_data, subject_id=None, use_columns=None, multi_value_columns=None, sensitive_zeros=None, record_limit=None)"
)]
/// Creates a new Dataset, which is optimized for the internal algorithms to run.
///
/// The input raw_data is cloned.
///
/// Arguments:
///     * raw_data: list[list[str]] - input raw data where the first entry (raw_data[0]) contains the headers and the
///                                   others the records (raw_data[1:])
///     * subject_id: Optional[str] - the column name that specifies the ID for each record
///         - if there are duplicated IDs throughout the data, the records will be attempted to be joined together
///             - for this you will need to specify the columns causing conflicts as multi_value_columns
///         - if not provided, no ID is assumed
///     * use_columns: Optional[list[str]] - list of column names to be used
///         - if not set, or [], all columns will be used
///     * multi_value_columns: Optional[dict[str, str]] - the column name is the key and delimiter is the value
///         - if column A has values like 'a1;a2' and {'A': ';'} is set, then the column will be broken into two
///             - A_a1: with values set 1 when a1 occurs
///             - A_a2: with values set 1 when a2 occurs
///          - if not set, none of the columns are assumed to contain multi values
///     * sensitive_zeros: Optional[list[str]] - list of column names containing sensitive zeros
///         - by default empty strings and '0' are not taken into account when creating and counting attribute combinations,
///           any columns where zero values are of interest (and thus sensitive) should be listed as `sensitive_zeros`,
///           so they will be treated the same way as positive values
///     * record_limit: Optional[int] - number of records to use (starting from the first one)
///         - if not set or 0, use all records
///
/// Returns:
///     New library's optimized representation of the data - Dataset
pub struct Dataset {
    pub(crate) data_block: Arc<DataBlock>,
}

#[pymethods]
impl Dataset {
    #[inline]
    #[new]
    /// See the `Dataset` class documentation.
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
    #[pyo3(
        text_signature = "(df, subject_id=None, use_columns=None, multi_value_columns=None, sensitive_zeros=None, record_limit=None)"
    )]
    /// Creates a new Dataset from a pandas data frame.
    ///
    /// The input df will be cloned and:
    ///     - have its values converted to strings [.astype('str')]
    ///     - have NaN mapped to empty strings [.fillna('')]
    ///
    /// Arguments:
    ///     * df: pandas.DataFrame - input data frame
    ///     * subject_id: Optional[str] - the column name that specifies the ID for each record
    ///         - if there are duplicated IDs throughout the data, the records will be attempted to be joined together
    ///             - for this you will need to specify the columns causing conflicts as multi_value_columns
    ///         - if not provided, no ID is assumed
    ///     * use_columns: Optional[list[str]] - list of column names to be used
    ///         - if not set, or [], all columns will be used
    ///     * multi_value_columns: Optional[dict[str, str]] - the column name is the key and delimiter is the value
    ///         - if column A has values like 'a1;a2' and {'A': ';'} is set, then the column will be broken into two
    ///             - A_a1: with values set 1 when a1 occurs
    ///             - A_a2: with values set 1 when a2 occurs
    ///          - if not set, none of the columns are assumed to contain multi values
    ///     * sensitive_zeros: Optional[list[str]] - list of column names containing sensitive zeros
    ///         - by default empty strings and '0' are not taken into account when creating and counting attribute combinations,
    ///           any columns where zero values are of interest (and thus sensitive) should be listed as `sensitive_zeros`,
    ///           so they will be treated the same way as positive values
    ///     * record_limit: Optional[int] - number of records to use (starting from the first one)
    ///
    /// Returns:
    ///     New library's optimized representation of the data - Dataset
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
    #[pyo3(text_signature = "(df)")]
    /// Converts the given data frame to the library raw data representation.
    ///
    /// The input df will be cloned and:
    ///     - have its values converted to strings [.astype('str')]
    ///     - have NaN mapped to empty strings [.fillna('')]
    ///
    /// Arguments:
    ///     * df: pandas.DataFrame - input data frame
    ///
    /// Returns:
    ///     New raw data representation - list[list[str]]
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
    #[pyo3(text_signature = "(raw_data)")]
    /// Converts the raw data representation to a pandas data frame.
    ///
    /// Arguments:
    ///     * raw_data: list[list[str]] - raw data representation
    ///
    /// Returns:
    ///     New pandas data frame - pandas.DataFrame
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

    #[pyo3(text_signature = "(self, empty_value=None, join_multi_value_columns=None)")]
    /// Creates the raw data representation from the dataset.
    ///
    /// Arguments:
    ///     * empty_value: Optional[str] - empty values in the data will be replaced by this
    ///     * join_multi_value_columns: Optional[bool] - whether previous spread multi value columns should
    ///                                                  be joined back together
    ///
    /// Returns:
    ///     New raw data representation - list[list[str]]
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

    #[pyo3(text_signature = "(self, empty_value=None, join_multi_value_columns=None)")]
    /// Creates the a pandas data frame from the dataset.
    ///
    /// Arguments:
    ///     * empty_value: Optional[str] - empty values in the data will be replaced by this
    ///     * join_multi_value_columns: Optional[bool] - whether previous spread multi value columns should
    ///                                                  be joined back together
    ///
    /// Returns:
    ///     New pandas data frame - pandas.DataFrame
    pub fn to_data_frame(
        &self,
        empty_value: Option<String>,
        join_multi_value_columns: Option<bool>,
    ) -> PyResult<PyObject> {
        Self::raw_data_to_data_frame(self.to_raw_data(empty_value, join_multi_value_columns))
    }

    #[pyo3(text_signature = "(self, reporting_length, combination_delimiter)")]
    /// Computes the plain aggregates counts for the dataset in the following format:
    ///     <column_name_i>:<attribute_value_i>[<combination_delimiter><column_name_j>:<attribute_value_j>...]
    ///
    /// Example:
    ///     for:
    ///         - reporting_length=3
    ///         - combination_delimiter=';'
    ///     given the record:
    ///         - A:a1 B:b1 C:c1 D:d1
    ///     will produce:
    ///         - 1-counts: "A:a1", "B:b1", "C:c1", "D:d1"
    ///         - 2-counts: "A:a1;B:b1", "A:a1;C:c1", "A:a1;D:d1",
    ///                     "B:b1;C:c1", "B:b1;D:d1", "C:c1;D:d1"
    ///         - 3-counts: "A:a1;B:b1;C:c1", "A:a1;B:b1;D:d1", "A:a1;C:c1;D:d1",
    ///                     "B:b1;C:c1;D:d1"
    ///
    /// Arguments:
    ///     * reporting_length: int - maximum length (inclusive) to compute attribute combinations for
    ///     * combination_delimiter: str - combination delimiter to use
    ///
    /// Returns:
    ///     A dictionary with the combination string representation as key
    ///     and the combination count as value - dict[str, int]
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
