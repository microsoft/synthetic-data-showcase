use super::stats_error::StatsError;
use statrs::distribution::{ContinuousCDF, Normal};

/// Default tolerance used to calculate sigma for the gaussian noise
pub const DEFAULT_TOLERANCE: f64 = 1e-8;

fn binary_search(
    f: &dyn Fn(f64) -> bool,
    lower_bound: f64,
    upper_bound: f64,
    tolerance: f64,
) -> f64 {
    let lower_res = f(lower_bound);
    let upper_res = f(upper_bound);

    assert!(
        lower_res != upper_res,
        "upper and lower bound predicates should have different values for binary search"
    );

    let mut lower = lower_bound;
    let mut upper = upper_bound;

    while upper - lower > tolerance {
        let mid = lower + ((upper - lower) / 2.0);
        if f(mid) == upper_res {
            upper = mid
        } else {
            lower = mid;
        }
    }

    if upper_res {
        upper
    } else {
        lower
    }
}

pub trait DpAnalyticGaussianContinuousCDFScale
where
    Self: ContinuousCDF<f64, f64> + Sized,
{
    fn calc_alpha_increasing_beta(&self, epsilon: f64, delta: f64, tolerance: f64) -> f64 {
        let beta = |v: f64| {
            self.cdf(f64::sqrt(epsilon * v))
                - (f64::exp(epsilon) * self.cdf(-f64::sqrt(epsilon * (v + 2.0))))
        };
        let mut upper_bound: f64 = 2.0;

        // this is monotonically increasing, so find the upper bound
        // for the binary search
        while beta(upper_bound) <= delta {
            upper_bound *= 2.0;
        }

        let v_star = binary_search(&|v| beta(v) <= delta, 0.0, upper_bound, tolerance);

        f64::sqrt(1.0 + (v_star / 2.0)) - f64::sqrt(v_star / 2.0)
    }

    fn calc_alpha_decreasing_beta(&self, epsilon: f64, delta: f64, tolerance: f64) -> f64 {
        let beta = |u: f64| {
            self.cdf(-f64::sqrt(epsilon * u))
                - (f64::exp(epsilon) * self.cdf(-f64::sqrt(epsilon * (u + 2.0))))
        };
        let mut upper_bound: f64 = 2.0;

        // this is monotonically increasing, so find the upper bound
        // for the binary search
        while beta(upper_bound) >= delta {
            upper_bound *= 2.0;
        }
        let u_star = binary_search(&|u| beta(u) <= delta, 0.0, upper_bound, tolerance);

        f64::sqrt(1.0 + (u_star / 2.0)) + f64::sqrt(u_star / 2.0)
    }

    /// Using the Analytic Gaussian Mechanism, calculates the standard deviation
    /// (`sigma`) for a `(epsilon, delta)-DP` normal distribution to be used as noise.
    /// # Arguments:
    /// * `sensitivity` - L2 sensitivity
    /// * `epsilon` - privacy budget
    /// * `delta` - probability of information being leaked
    /// * `tolerance` - tolerance used to find sigma
    fn calc_sigma_dp(&self, sensitivity: f64, epsilon: f64, delta: f64, tolerance: f64) -> f64 {
        let delta_zero = self.cdf(0.0) - (f64::exp(epsilon) * self.cdf(-f64::sqrt(2.0 * epsilon)));
        let alpha = if delta >= delta_zero {
            self.calc_alpha_increasing_beta(epsilon, delta, tolerance)
        } else {
            self.calc_alpha_decreasing_beta(epsilon, delta, tolerance)
        };
        alpha * sensitivity / f64::sqrt(2.0 * epsilon)
    }

    /// Using the Analytic Gaussian Mechanism, creates a normal distribution
    /// that is `(epsilon, delta)-DP` to be used as noise.
    /// # Arguments:
    /// * `sensitivity` - L2 sensitivity
    /// * `epsilon` - privacy budget
    /// * `delta` - probability of information being leaked
    /// * `tolerance` - tolerance used to find sigma used to build the normal distribution
    fn new_analytic_gaussian(
        sensitivity: f64,
        epsilon: f64,
        delta: f64,
        tolerance: f64,
    ) -> Result<Self, StatsError>;
}

impl DpAnalyticGaussianContinuousCDFScale for Normal {
    fn new_analytic_gaussian(
        sensitivity: f64,
        epsilon: f64,
        delta: f64,
        tolerance: f64,
    ) -> Result<Self, StatsError> {
        let n = Normal::new(0.0, 1.0).map_err(StatsError::new)?;
        Normal::new(0.0, n.calc_sigma_dp(sensitivity, epsilon, delta, tolerance))
            .map_err(StatsError::new)
    }
}
