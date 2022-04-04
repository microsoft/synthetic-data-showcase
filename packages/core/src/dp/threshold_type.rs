use std::{fmt::Display, str::FromStr};

#[derive(Debug)]
/// Possible threshold types when adding noise with DP
pub enum ThresholdType {
    /// The actual threshold value will be used to filter combinations
    /// based on their counts
    Fixed,
    /// The threshold value will be a multiplier of the gaussian
    /// standard deviation (which them will be used as value to filter
    /// combinations based on their counts)
    Adaptive,
}

impl FromStr for ThresholdType {
    type Err = &'static str;

    fn from_str(mode: &str) -> Result<Self, Self::Err> {
        match mode.to_lowercase().as_str() {
            "fixed" => Ok(ThresholdType::Fixed),
            "adaptive" => Ok(ThresholdType::Adaptive),
            _ => Err("invalid mode, should be fixed or adaptive"),
        }
    }
}

impl Display for ThresholdType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ThresholdType::Fixed => Ok(write!(f, "fixed")?),
            ThresholdType::Adaptive => Ok(write!(f, "adaptive")?),
        }
    }
}
