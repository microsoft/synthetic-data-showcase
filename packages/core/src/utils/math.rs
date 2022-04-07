/// Rounds `value` down to closest multiple of `multiple`.
/// The result is returned as a `isize`
#[inline]
pub fn iround_down(value: f64, multiple: f64) -> isize {
    (((value / multiple).floor()) as isize) * (multiple as isize)
}

/// Rounds `value` down to closest multiple of `multiple`.
/// The result is returned as a `usize`
#[inline]
pub fn uround_down(value: f64, multiple: f64) -> usize {
    (((value / multiple).floor()) as usize) * (multiple as usize)
}

/// Calculates the percentage of processed elements up to a total
#[inline]
pub fn calc_percentage(n_processed: f64, total: f64) -> f64 {
    n_processed * 100.0 / total
}
