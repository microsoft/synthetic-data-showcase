/// Module to represent aggregated data and provide
/// some methods/utilities for information extracted from it
pub mod aggregated_data;

/// Dataset privacy risk definitions
pub mod privacy_risk_summary;

/// Defines structures related to records analysis (unique, rare and risky
/// information)
pub mod records_analysis_data;

/// Type definitions related to the aggregation process
pub mod typedefs;

/// Defines structures to store value combinations generated
/// during the aggregate process
pub mod value_combination;

mod data_aggregator;

pub use data_aggregator::{AggregatedCount, Aggregator};

mod rows_aggregator;
