use pyo3::prelude::*;

mod accuracy_mode;
mod builder;
mod fabrication_mode;
mod parameters;

pub use accuracy_mode::*;
pub use builder::*;
pub use fabrication_mode::*;
pub use parameters::*;

pub(crate) fn register(py: Python<'_>, parent_module: &PyModule) -> PyResult<()> {
    let child_module = PyModule::new(py, "dp")?;

    accuracy_mode::register(py, child_module)?;
    builder::register(py, child_module)?;
    fabrication_mode::register(py, child_module)?;
    parameters::register(py, child_module)?;

    parent_module.add_submodule(child_module)?;

    Ok(())
}
