#[cfg(feature = "rayon")]
use rayon;

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

pub fn get_number_of_threads() -> usize {
    #[cfg(feature = "rayon")]
    {
        rayon::current_num_threads()
    }
    #[cfg(not(feature = "rayon"))]
    {
        1
    }
}

#[cfg(feature = "rayon")]
#[cfg_attr(feature = "pyo3", pyfunction)]
#[allow(unused_must_use)]
/// Sets the number of threads used for parallel processing
/// # Arguments
/// * `n` - number of threads
pub fn set_number_of_threads(n: usize) {
    rayon::ThreadPoolBuilder::new()
        .num_threads(n)
        .build_global();
}

#[cfg(feature = "pyo3")]
pub fn register_pyo3(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(set_number_of_threads, m)?)?;
    Ok(())
}
