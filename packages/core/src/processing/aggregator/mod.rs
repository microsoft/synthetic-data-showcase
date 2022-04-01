mod aggregated_count;

/// Defines the result of data aggregation for each combination
pub use aggregated_count::AggregatedCount;

/// Module to represent aggregated data and provide
/// some methods/utilities for information extracted from it
pub mod aggregated_data;

/// Defines structures related to records analysis (unique, rare and risky
/// information)
pub mod records_analysis_data;

/// Type definitions related to the aggregation process
pub mod typedefs;

/// Defines structures to store value combinations generated
/// during the aggregate process
pub mod value_combination;

mod data_aggregator;

/// Data aggregator that takes an input data block
/// and compute its aggregates
pub use data_aggregator::Aggregator;

mod rows_aggregator;
