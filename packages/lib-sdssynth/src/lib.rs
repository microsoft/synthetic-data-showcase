use pyo3::prelude::*;

pub mod aggregate_seeded;

#[pymodule]
fn sdssynth(py: Python, m: &PyModule) -> PyResult<()> {
    env_logger::init();

    aggregate_seeded::register(py, m)?;

    Ok(())
}
