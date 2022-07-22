use pyo3::prelude::*;

mod accuracy_mode;
mod builder;
mod fabrication_mode;
mod parameters;
mod synthesizer;

pub use accuracy_mode::*;
pub use builder::*;
pub use fabrication_mode::*;
pub use parameters::*;
pub use synthesizer::*;

pub(crate) fn register(py: Python<'_>, parent_module: &PyModule) -> PyResult<()> {
    accuracy_mode::register(py, parent_module)?;
    builder::register(py, parent_module)?;
    fabrication_mode::register(py, parent_module)?;
    parameters::register(py, parent_module)?;
    synthesizer::register(py, parent_module)?;
    Ok(())
}
