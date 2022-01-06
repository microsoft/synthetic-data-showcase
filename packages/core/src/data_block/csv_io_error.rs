use csv::Error;
use std::fmt::{Display, Formatter, Result};

#[cfg(feature = "pyo3")]
use pyo3::exceptions::PyIOError;

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

/// Wrapper for a csv::Error, so the from
/// trait can be implemented for PyErr
pub struct CsvIOError {
    error: Error,
}

impl CsvIOError {
    /// Creates a new CsvIOError from a csv::Error
    /// # Arguments
    /// * `error` - Related csv::Error
    pub fn new(error: Error) -> CsvIOError {
        CsvIOError { error }
    }
}

impl Display for CsvIOError {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        write!(f, "{}", self.error)
    }
}

#[cfg(feature = "pyo3")]
impl From<CsvIOError> for PyErr {
    fn from(err: CsvIOError) -> PyErr {
        PyIOError::new_err(err.error.to_string())
    }
}
