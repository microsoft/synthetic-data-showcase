use pyo3::prelude::*;

mod aggregate_seeded;
mod dataset;
mod utils;

#[pymodule]
fn pacsynth(py: Python, m: &PyModule) -> PyResult<()> {
    aggregate_seeded::register(py, m)?;
    dataset::register(py, m)?;
    utils::register(py, m)?;
    Ok(())
}
