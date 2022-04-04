/// Defines a wrapper for aggregate counts to make them
/// differential private
pub mod noise_aggregator;

/// Defines functions and structures to create
/// normal distributions using the Analytic Gaussian Mechanism
pub mod analytic_gaussian;

/// Parameter definitions for sensitivity filtering
pub mod sensitivity_filter_parameters;

/// Defines a wrapper to filter aggregate counts by sensitivity
/// using differential privacy
mod sensitivity_filter;

/// Functions and structures to perform DP selection
/// for a vector of integers using percentiles
pub mod percentile;

/// Defines stats error for handling statistics
/// that are easier to bind to other languages
pub mod stats_error;

/// Defines possible thresholds types to use while
/// adding noise to the aggregates
pub mod threshold_type;

/// Useful type definitions to process differential privacy
pub mod typedefs;
