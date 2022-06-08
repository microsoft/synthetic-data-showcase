use std::fmt::{Display, Formatter, Result};

#[cfg(feature = "pyo3")]
use pyo3::exceptions::PyIOError;

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

/// Generic error generated when creating a data block
#[derive(Debug)]
pub enum DataBlockCreatorError<T>
where
    T: Display,
{
    /// This can be generated when parsing headers and records
    /// on the implemented trait
    ParsingError(T),
    /// This is generated while trying to join records using the
    /// Subject ID
    JoinRecordsByIdError(String),
}

impl<T> Display for DataBlockCreatorError<T>
where
    T: Display,
{
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        write!(
            f,
            "{}",
            match self {
                DataBlockCreatorError::ParsingError(err) => format!("{err}"),
                DataBlockCreatorError::JoinRecordsByIdError(err) => err.clone(),
            }
        )
    }
}

#[cfg(feature = "pyo3")]
impl<T> From<DataBlockCreatorError<T>> for PyErr
where
    T: Display,
{
    fn from(err: DataBlockCreatorError<T>) -> PyErr {
        PyIOError::new_err(match err {
            DataBlockCreatorError::ParsingError(err) => format!("{err}"),
            DataBlockCreatorError::JoinRecordsByIdError(err) => err,
        })
    }
}
