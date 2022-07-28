use pyo3::prelude::*;
use sds_core::utils::threading;

#[pyfunction]
pub fn set_number_of_threads(n: usize) {
    threading::set_number_of_threads(n);
}

pub(crate) fn register(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(set_number_of_threads, m)?)?;
    Ok(())
}
