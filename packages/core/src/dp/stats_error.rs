use std::fmt::{Display, Formatter, Result};

#[cfg(feature = "pyo3")]
use pyo3::exceptions::PyIOError;

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

/// Wrapper for a statrs::StatsError, so the from
/// trait can be implemented for PyErr
pub struct StatsError {
    error: statrs::StatsError,
}

impl StatsError {
    /// Creates a new StatsError from a statrs::StatsError
    /// # Arguments
    /// * `error` - Related statrs::StatsError
    pub fn new(error: statrs::StatsError) -> StatsError {
        StatsError { error }
    }
}

impl Display for StatsError {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        write!(f, "{}", self.error)
    }
}

#[cfg(feature = "pyo3")]
impl From<StatsError> for PyErr {
    fn from(err: StatsError) -> PyErr {
        PyIOError::new_err(err.error.to_string())
    }
}
