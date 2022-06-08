use super::StoppableResult;

/// Implement this trait to inform progress
pub trait ReportProgress {
    /// Receives the updated progress
    /// If this returns an error, this means that
    /// processing should be stopped
    fn report(&mut self, new_progress: f64) -> StoppableResult<()>;
}
