use super::Evaluator;
use pyo3::{types::PyModule, PyResult, Python};

pub fn register_pyo3(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_class::<Evaluator>()?;
    Ok(())
}
