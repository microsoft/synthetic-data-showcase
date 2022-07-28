use pyo3::prelude::*;
use sds_core::utils::threading;

#[pyfunction]
#[pyo3(text_signature = "(n)")]
/// Sets the number of threads used for the algorithms that provide a parallel implementation.
/// If not called, the default is one thread per CPU core.
///
/// Arguments:
///     * n: int - desired number of threads
pub fn set_number_of_threads(n: usize) {
    threading::set_number_of_threads(n);
}

pub(crate) fn register(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(set_number_of_threads, m)?)?;
    Ok(())
}
