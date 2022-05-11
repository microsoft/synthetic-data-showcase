use std::fmt::{Debug, Display, Formatter, Result};

#[cfg(feature = "pyo3")]
use pyo3::exceptions::PyIOError;

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

/// Indicates that a processing step that reports progress
/// has been stopped
#[derive(Default)]
pub struct ProcessingStoppedError;

impl Display for ProcessingStoppedError {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        write!(f, "processing has been stopped")
    }
}

impl Debug for ProcessingStoppedError {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        write!(f, "{}", self)
    }
}

#[cfg(feature = "pyo3")]
impl From<ProcessingStoppedError> for PyErr {
    fn from(err: ProcessingStoppedError) -> PyErr {
        PyIOError::new_err(err.to_string())
    }
}
