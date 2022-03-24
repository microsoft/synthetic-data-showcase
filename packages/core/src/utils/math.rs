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
pub fn factorial(n: f64) -> f64 {
    let mut res = 1.0;
    let mut curr_n = n;

    while curr_n > 1.0 {
        res *= curr_n;
        curr_n -= 1.0;
    }
    res
}

/// Calculates "`n` choose `l`" using the formula:
/// `C(n,l) = n! / ((n - l)! l!)`
#[inline]
pub fn calc_n_combinations(n: f64, l: f64) -> f64 {
    if l > n {
        0.0
    } else {
        let mut num = 1.0;
        let mut curr_n = n;

        while curr_n > l {
            num *= curr_n;
            curr_n -= 1.0;
        }

        num / factorial(n - l)
    }
}

/// Calculates the sum of "`n` choose `l`" for l every l in range
#[inline]
pub fn calc_n_combinations_range(n: usize, range: &[usize]) -> f64 {
    let n_float = n as f64;

    range.iter().fold(0.0, |acc, val| {
        acc + calc_n_combinations(n_float, *val as f64)
    })
}

/// Calculates the percentage of processed elements up to a total
#[inline]
pub fn calc_percentage(n_processed: f64, total: f64) -> f64 {
    n_processed * 100.0 / total
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    pub fn validate_n_combinations_range() {
        let tolerance = 1e-1;

        assert!((calc_n_combinations_range(30, &[1]) - 30.0).abs() < tolerance);
        assert!((calc_n_combinations_range(30, &[2]) - 435.0).abs() < tolerance);
        assert!((calc_n_combinations_range(30, &[3]) - 4060.0).abs() < tolerance);
        assert!((calc_n_combinations_range(30, &[4]) - 27405.0).abs() < tolerance);
        assert!((calc_n_combinations_range(30, &[5]) - 142506.0).abs() < tolerance);
        assert!((calc_n_combinations_range(30, &[6]) - 593775.0).abs() < tolerance);
        assert!((calc_n_combinations_range(30, &[7]) - 2035800.0).abs() < tolerance);
        assert!((calc_n_combinations_range(30, &[30]) - 1.0).abs() < tolerance);
        assert!((calc_n_combinations_range(0, &[1]) - 0.0).abs() < tolerance);
        assert!((calc_n_combinations_range(30, &[31]) - 0.0).abs() < tolerance);
        assert!((calc_n_combinations_range(100, &[8]) - 186087894300.0).abs() < tolerance);
    }
}
