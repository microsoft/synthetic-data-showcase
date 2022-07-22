use pyo3::prelude::*;

mod logger;
mod progress;
mod threading;

pub use logger::*;
pub use progress::*;
pub use threading::*;

pub(crate) fn register(py: Python<'_>, m: &PyModule) -> PyResult<()> {
    logger::register(py, m)?;
    threading::register(py, m)?;
    Ok(())
}
