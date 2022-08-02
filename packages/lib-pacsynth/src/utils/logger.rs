use log::{set_boxed_logger, set_max_level, LevelFilter, Log, Metadata, Record};
use pyo3::{
    exceptions::{PyRuntimeError, PyValueError},
    prelude::*,
};
use std::str::FromStr;

struct DefaultLogger {
    pub level: LevelFilter,
}

impl DefaultLogger {
    pub fn new(level: LevelFilter) -> DefaultLogger {
        DefaultLogger { level }
    }
}

impl Log for DefaultLogger {
    #[inline]
    fn enabled(&self, metadata: &Metadata) -> bool {
        metadata.level() <= self.level
    }

    #[inline]
    fn log(&self, record: &Record) {
        if self.enabled(record.metadata()) {
            println!("[{}] - {}", record.level(), record.args());
        }
    }

    fn flush(&self) {}
}

#[pyfunction]
#[pyo3(text_signature = "(level_str)")]
/// Enables logging and sets the desired log level.
/// This is supposed to be called only once.
///
/// Arguments:
///     * level_str: str - 'off' || 'error' || 'warn' || 'info' || 'debug' || 'trace'
pub fn init_logger(level_str: &str) -> PyResult<()> {
    match LevelFilter::from_str(level_str) {
        Ok(level) => match set_boxed_logger(Box::new(DefaultLogger::new(level))) {
            Ok(_) => {
                set_max_level(level);
                Ok(())
            }
            Err(err) => Err(PyRuntimeError::new_err(format!(
                "error setting logger: {}",
                err
            ))),
        },
        Err(err) => Err(PyValueError::new_err(format!("invalid log level: {}", err))),
    }
}

pub(crate) fn register(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(init_logger, m)?)?;
    Ok(())
}
