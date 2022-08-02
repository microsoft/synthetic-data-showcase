use log::{log_enabled, Level::Debug};
use sds_core::utils::reporting::LoggerProgressReporter;

#[inline]
pub fn create_progress_reporter() -> Option<LoggerProgressReporter> {
    if log_enabled!(Debug) {
        Some(LoggerProgressReporter::new(Debug))
    } else {
        None
    }
}
