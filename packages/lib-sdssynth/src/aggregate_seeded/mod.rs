use pyo3::prelude::*;

mod dp;

pub use dp::*;

pub(crate) fn register(py: Python<'_>, parent_module: &PyModule) -> PyResult<()> {
    let child_module = PyModule::new(py, "aggregate_seeded")?;

    dp::register(py, child_module)?;

    parent_module.add_submodule(child_module)?;

    Ok(())
}
