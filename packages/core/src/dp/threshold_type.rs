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
    /// The threshold value will be the maximum fabrication percentage
    /// allowed by combination length
    /// (comparison done with the original aggregates)
    MaxFabrication,
}

impl FromStr for ThresholdType {
    type Err = &'static str;

    fn from_str(mode: &str) -> Result<Self, Self::Err> {
        match mode.to_lowercase().as_str() {
            "fixed" => Ok(ThresholdType::Fixed),
            "adaptive" => Ok(ThresholdType::Adaptive),
            "max_fabrication" => Ok(ThresholdType::MaxFabrication),
            _ => Err("invalid mode, should be fixed, adaptive or max_fabrication"),
        }
    }
}

impl Display for ThresholdType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ThresholdType::Fixed => Ok(write!(f, "fixed")?),
            ThresholdType::Adaptive => Ok(write!(f, "adaptive")?),
            ThresholdType::MaxFabrication => Ok(write!(f, "max_fabrication")?),
        }
    }
}
