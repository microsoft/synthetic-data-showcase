use pyo3::prelude::*;

mod dp;

pub use dp::*;

pub(crate) fn register(py: Python<'_>, parent_module: &PyModule) -> PyResult<()> {
    dp::register(py, parent_module)?;
    Ok(())
}
