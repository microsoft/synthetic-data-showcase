use std::{fmt::Display, str::FromStr};

#[derive(Debug)]
/// Modes to execute the data generation/synthesis
pub enum SynthesisMode {
    RowSeeded,
    Unseeded,
    ValueSeeded,
    AggregateSeeded,
}

impl FromStr for SynthesisMode {
    type Err = &'static str;

    fn from_str(mode: &str) -> Result<Self, Self::Err> {
        match mode.to_lowercase().as_str() {
            "row_seeded" => Ok(SynthesisMode::RowSeeded),
            "unseeded" => Ok(SynthesisMode::Unseeded),
            "value_seeded" => Ok(SynthesisMode::ValueSeeded),
            "aggregate_seeded" => Ok(SynthesisMode::AggregateSeeded),
            _ => Err(
                "invalid mode, should be row_seeded, unseeded, value_seeded or aggregate_seeded",
            ),
        }
    }
}

impl Display for SynthesisMode {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            SynthesisMode::RowSeeded => Ok(write!(f, "row_seeded")?),
            SynthesisMode::Unseeded => Ok(write!(f, "unseeded")?),
            SynthesisMode::ValueSeeded => Ok(write!(f, "value_seeded")?),
            SynthesisMode::AggregateSeeded => Ok(write!(f, "aggregate_seeded")?),
        }
    }
}
