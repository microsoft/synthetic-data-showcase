#[derive(Debug)]
/// Possible thresholds when adding noise with DP
pub enum NoisyCountThreshold {
    /// Filter combinations based on a fixed threshold
    /// (keep only noisy counts that are `> threshold`)
    Fixed(f64),
    /// Filter combinations based on a fraction of
    /// the fabricated counts distribution
    /// (this should be a value between 0 and 1)
    Adaptive(f64),
    /// The threshold value will be the maximum fabrication percentage
    /// (considering the original aggregate counts) allowed by combination length
    /// (this should be a value between 0 and 1)
    MaxFabrication(f64),
}
