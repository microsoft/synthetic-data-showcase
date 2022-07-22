use pyo3::prelude::*;

mod logger;

pub use logger::*;

pub(crate) fn register(py: Python<'_>, m: &PyModule) -> PyResult<()> {
    logger::register(py, m)?;
    Ok(())
}
