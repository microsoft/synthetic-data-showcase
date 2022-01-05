/// Module defining the data synthesis process
pub mod synthesizer;

mod synthesis_mode;

pub use synthesis_mode::SynthesisMode;

mod data_generator;

pub use data_generator::Generator;

/// Module to describe the synthetic data generated by the Generator
pub mod generated_data;
