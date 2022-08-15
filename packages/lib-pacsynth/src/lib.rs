use pyo3::prelude::*;

#[allow(clippy::borrow_deref_ref)]
mod aggregate_seeded;
#[allow(clippy::borrow_deref_ref)]
mod dataset;
#[allow(clippy::borrow_deref_ref)]
mod utils;

#[pymodule]
/// Private Accurate Combination (PAC) Synthesizers
///
/// Library to generate synthetic data for privacy-preserving data sharing and analysis.
///
/// The synthesizers aim to privately keep the accuracy of the attribute combinations counts
/// from the original dataset, as well as the statistical distributions of the original data.
fn pacsynth(py: Python, m: &PyModule) -> PyResult<()> {
    aggregate_seeded::register(py, m)?;
    dataset::register(py, m)?;
    utils::register(py, m)?;
    Ok(())
}
