use super::StoppableResult;

#[cfg(feature = "rayon")]
use std::sync::{Arc, Mutex};

use crate::utils::{math::calc_percentage, reporting::ReportProgress};

/// Progress reporter to be used in parallel environments
/// (should be wrapped with `Arc` and `Mutex` if multi-threading is enabled).
/// It will calculate `proportion * (n_processed * 100.0 / total)` and report
/// it to the main reporter
pub struct SendableProgressReporter<'main_reporter, T>
where
    T: ReportProgress,
{
    total: f64,
    n_processed: f64,
    proportion: f64,
    main_reporter: &'main_reporter mut T,
}

impl<'main_reporter, T> SendableProgressReporter<'main_reporter, T>
where
    T: ReportProgress,
{
    /// Creates a new SendableProgressReporter
    /// # Arguments
    /// * `total` - Total number of steps to be reported
    /// * `proportion` - Value to multiply the percentage before reporting to
    /// main_reporter
    /// * `main_reporter` - Main reporter to which this should report
    pub fn new(
        total: f64,
        proportion: f64,
        main_reporter: &'main_reporter mut T,
    ) -> SendableProgressReporter<T> {
        SendableProgressReporter {
            total,
            proportion,
            n_processed: 0.0,
            main_reporter,
        }
    }

    /// Updates `reporter` by adding `value_to_add` and reporting
    /// to the main reporter in a thread safe way
    #[inline]
    pub fn update_progress(
        reporter: &mut SendableProgressReporterRef<T>,
        value_to_add: f64,
    ) -> StoppableResult<()>
    where
        T: ReportProgress,
    {
        #[cfg(feature = "rayon")]
        if let Ok(guard) = &mut reporter.lock() {
            if let Some(r) = guard.as_mut() {
                return r.report(value_to_add);
            }
        }
        #[cfg(not(feature = "rayon"))]
        if let Some(r) = reporter {
            return r.report(value_to_add);
        }
        Ok(())
    }
}

impl<'main_reporter, T> ReportProgress for SendableProgressReporter<'main_reporter, T>
where
    T: ReportProgress,
{
    /// Will add `value_to_add` to `n_processed` and call the main reporter with
    /// `proportion * (n_processed * 100.0 / total)`
    fn report(&mut self, value_to_add: f64) -> StoppableResult<()> {
        self.n_processed += value_to_add;
        self.main_reporter
            .report(self.proportion * calc_percentage(self.n_processed, self.total))
    }
}

#[cfg(feature = "rayon")]
///  People using this should correctly handle race conditions with a `Mutex`
/// (see `SendableProgressReporterRef`), so we inform the compiler this struct is thread safe
unsafe impl<'main_reporter, T> Send for SendableProgressReporter<'main_reporter, T> where
    T: ReportProgress
{
}

#[cfg(feature = "rayon")]
/// Use this to refer to SendableProgressReporter if multi-threading is enabled
pub type SendableProgressReporterRef<'main_reporter, T> =
    Arc<Mutex<Option<SendableProgressReporter<'main_reporter, T>>>>;

#[cfg(not(feature = "rayon"))]
/// Use this to refer to SendableProgressReporter if multi-threading is disabled
pub type SendableProgressReporterRef<'main_reporter, T> =
    Option<SendableProgressReporter<'main_reporter, T>>;
