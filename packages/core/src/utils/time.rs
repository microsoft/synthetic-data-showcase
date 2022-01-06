use instant::Instant;
use log::trace;
use std::time::Duration;

/// Structure that calculates how long it has lived and add
/// the result to `result`.
///
/// When the struct is created the current instant is collected.
/// Once the struct is dropped (destructed), the elapsed time it has
/// lived will be added to `result`
pub struct ElapsedDuration<'lifetime> {
    _start: Instant,
    result: &'lifetime mut Duration,
}

impl<'lifetime> ElapsedDuration<'lifetime> {
    /// Returns a new ElapsedDuration
    /// # Arguments
    /// * `result` - Duration where to sum the elapsed duration when the `ElapsedDuration`
    /// instance goes out of scope
    pub fn new(result: &mut Duration) -> ElapsedDuration {
        ElapsedDuration {
            _start: Instant::now(),
            result,
        }
    }
}

impl<'lifetime> Drop for ElapsedDuration<'lifetime> {
    fn drop(&mut self) {
        *self.result += self._start.elapsed();
    }
}

/// Structure that calculates how long it has lived and logs
/// the result with a message using the `trace` log level:
/// `trace!("{} executed in: {:?}", self._message, self._start.elapsed())`
pub struct ElapsedDurationLogger {
    _start: Instant,
    _message: String,
}

impl ElapsedDurationLogger {
    pub fn new<S: Into<String>>(message: S) -> ElapsedDurationLogger {
        ElapsedDurationLogger {
            _start: Instant::now(),
            _message: message.into(),
        }
    }
}

impl Drop for ElapsedDurationLogger {
    fn drop(&mut self) {
        trace!("{} executed in: {:?}", self._message, self._start.elapsed())
    }
}

/// Macro that executes `function`, measures how long it took to execute
/// and adds the result to `duration` (only if `trace` log level is enabled)
#[macro_export]
macro_rules! measure_time {
    ($function: expr, $duration: tt) => {
        if log_enabled!(Trace) {
            let mut total_duration = Duration::default();
            let ret;
            {
                let _duration = ElapsedDuration::new(&mut total_duration);
                ret = $function();
            }
            $duration += total_duration;
            ret
        } else {
            $function()
        }
    };
}
