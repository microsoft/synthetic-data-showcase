use serde::{Deserialize, Serialize};

use super::InputValueByLen;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", content = "valuesByLen")]
/// Possible thresholds when adding noise with DP
pub enum NoisyCountThreshold {
    /// Filter combinations by combination length based on a fixed threshold
    /// (keep only noisy counts that are `> threshold`)
    Fixed(InputValueByLen<f64>),
    /// Filter combinations by combination length based on a fraction of
    /// the fabricated counts distribution
    /// (this should be a value between 0 and 1.0)
    Adaptive(InputValueByLen<f64>),
}
