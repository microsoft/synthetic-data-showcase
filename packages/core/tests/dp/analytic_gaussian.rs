use sds_core::dp::{DpAnalyticGaussianContinuousCDFScale, DEFAULT_TOLERANCE};
use statrs::distribution::Normal;

#[test]
pub fn validate_sigma() {
    let n = Normal::new(0.0, 1.0).unwrap();

    assert!(
        (n.calc_sigma_dp(f64::sqrt(30.0), 6.0, 0.5, DEFAULT_TOLERANCE) - 1.4659731497780966).abs()
            <= DEFAULT_TOLERANCE
    );
    assert!(
        (n.calc_sigma_dp(f64::sqrt(30.0), 6.0, 1.0 / 100000.0, DEFAULT_TOLERANCE)
            - 4.182602139814776)
            .abs()
            <= DEFAULT_TOLERANCE
    );
    assert!(
        (n.calc_sigma_dp(f64::sqrt(100.0), 0.1, 1.0 / 100000.0, DEFAULT_TOLERANCE)
            .abs()
            - 307.49566132862844)
            <= DEFAULT_TOLERANCE
    );
    assert!(
        (n.calc_sigma_dp(f64::sqrt(100.0), 0.1, 0.5, DEFAULT_TOLERANCE) - 7.016745810753165).abs()
            <= DEFAULT_TOLERANCE
    );
    assert!(
        (n.calc_sigma_dp(f64::sqrt(0.1), 0.1, 0.5, DEFAULT_TOLERANCE) - 0.221888985244248).abs()
            <= DEFAULT_TOLERANCE
    );
    assert!(
        (n.calc_sigma_dp(f64::sqrt(0.1), 0.1, 1.0 / 20000.0, DEFAULT_TOLERANCE)
            - 8.370597761781507)
            .abs()
            <= DEFAULT_TOLERANCE
    );
}
