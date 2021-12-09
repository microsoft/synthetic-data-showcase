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

/// Return the `n!`
#[inline]
pub fn factorial(n: u64) -> u64 {
    let mut res = 1_u64;
    let mut curr_n = n;

    while curr_n > 1 {
        res *= curr_n;
        curr_n -= 1;
    }
    res
}

/// Calculates "`n` choose `l`" using the formula:
/// `C(n,l) = n! / ((n - l)! l!)`
#[inline]
pub fn calc_n_combinations(n: u64, l: u64) -> u64 {
    if l > n {
        0
    } else {
        let mut num = 1_u64;
        let mut curr_n = n;

        while curr_n > l {
            num *= curr_n;
            curr_n -= 1;
        }

        num / factorial(n - l)
    }
}

/// Calculates the sum of "`n` choose `l`" for l every l in range
#[inline]
pub fn calc_n_combinations_range(n: usize, range: &[usize]) -> u64 {
    range.iter().fold(0_u64, |acc, val| {
        acc + calc_n_combinations(n as u64, *val as u64)
    })
}

/// Calculates the percentage of processed elements up to a total
#[inline]
pub fn calc_percentage(n_processed: usize, total: f64) -> f64 {
    (n_processed as f64) * 100.0 / total
}
