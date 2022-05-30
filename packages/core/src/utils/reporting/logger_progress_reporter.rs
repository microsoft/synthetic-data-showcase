use super::{ReportProgress, StoppableResult};
use log::{log, Level};

/// Simple progress reporter using the default logger.
/// * It will log progress using the configured `log_level`
/// * It will only log at every 1% completed
pub struct LoggerProgressReporter {
    progress: f64,
    log_level: Level,
}

impl LoggerProgressReporter {
    /// Returns a new LoggerProgressReporter
    /// # Arguments
    /// * `log_level - which log level use to log progress
    pub fn new(log_level: Level) -> LoggerProgressReporter {
        LoggerProgressReporter {
            progress: 0.0,
            log_level,
        }
    }
}

impl ReportProgress for LoggerProgressReporter {
    fn report(&mut self, new_progress: f64) -> StoppableResult<()> {
        let p = new_progress.floor();

        if p > self.progress {
            self.progress = new_progress;
            log!(
                self.log_level,
                "Processing progress: {:.2} %",
                self.progress
            );
        }
        Ok(())
    }
}
