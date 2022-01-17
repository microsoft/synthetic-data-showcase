/// Defines a wrapper to aggregated data to make the
/// aggregate counts differential private
pub mod aggregated_data_transformer;

/// Defines functions and structures to create
/// normal distributions using the Analytic Gaussian Mechanism
pub mod analytic_gaussian;

/// Functions and structures to perform DP selection
/// for a vector of integers using percentiles
pub mod percentile;

/// Useful type definitions to process differential privacy
pub mod typedefs;
