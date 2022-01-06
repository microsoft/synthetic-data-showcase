/// Implement this trait to inform progress
pub trait ReportProgress {
    /// Receives the updated progress
    fn report(&mut self, new_progress: f64);
}
