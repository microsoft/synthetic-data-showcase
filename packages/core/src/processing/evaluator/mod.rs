/// Module defining routines to calculate preservation by count
pub mod preservation_by_count;

/// Module defining routines to calculate preservation by length
pub mod preservation_by_length;

/// Module defining a bucket used to calculate preservation by count
/// and length
pub mod preservation_bucket;

/// Defines structures related to rare combination comparisons
/// between the synthetic and sensitive datasets
pub mod rare_combinations_comparison_data;

/// Type definitions related to the evaluation process
pub mod typedefs;

mod data_evaluator;

pub use data_evaluator::Evaluator;

#[cfg(feature = "pyo3")]
pub use data_evaluator::register;
