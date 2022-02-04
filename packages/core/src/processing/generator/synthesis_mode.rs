use std::{fmt::Display, str::FromStr};

#[derive(Debug)]
/// Modes to execute the data generation/synthesis
pub enum SynthesisMode {
    Seeded,
    Unseeded,
    FromCounts,
}

impl FromStr for SynthesisMode {
    type Err = &'static str;

    fn from_str(mode: &str) -> Result<Self, Self::Err> {
        match mode.to_lowercase().as_str() {
            "seeded" => Ok(SynthesisMode::Seeded),
            "unseeded" => Ok(SynthesisMode::Unseeded),
            "from_counts" => Ok(SynthesisMode::FromCounts),
            _ => Err("invalid mode, should be seeded, unseeded or from_counts"),
        }
    }
}

impl Display for SynthesisMode {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            SynthesisMode::Seeded => Ok(write!(f, "seeded")?),
            SynthesisMode::Unseeded => Ok(write!(f, "unseeded")?),
            SynthesisMode::FromCounts => Ok(write!(f, "from_counts")?),
        }
    }
}
