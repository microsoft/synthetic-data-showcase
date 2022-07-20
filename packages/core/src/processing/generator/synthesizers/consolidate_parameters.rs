use std::sync::Arc;

use crate::processing::aggregator::AggregatedData;

/// Define the parameters needed for data consolidation
#[derive(Clone)]
pub struct ConsolidateParameters {
    /// Aggregated data used to avoid oversampling/synthesize data
    pub aggregated_data: Arc<AggregatedData>,
    /// Ratio of oversampling allowed for each length from 1 up to the reporting length
    pub oversampling_ratio: Option<f64>,
    /// How many times should we try to resample if the sampled attribute leads to oversampling
    pub oversampling_tries: Option<usize>,
    /// Total number of records to be synthesized.
    /// If `None` sample from all available counts
    pub target_number_of_records: Option<usize>,
    /// Whether or not the synthetic counts should be used to
    /// control the sampling process aggregate seeded
    pub use_synthetic_counts: bool,
}

impl ConsolidateParameters {
    /// Returns a new ConsolidateParameters
    /// # Arguments
    /// * `aggregated_data` - Aggregated data used to avoid oversampling/synthesize data
    /// * `oversampling_ratio` - Ratio of oversampling allowed for each length from 1 up to the reporting length
    /// * `oversampling_tries` - How many times should we try to resample if the sampled attribute leads to oversampling
    /// * `target_number_of_records` - Total number of records to be synthesized.
    /// If `None` sample from all available counts
    /// * `use_synthetic_counts` - Whether or not the synthetic counts should be used to
    /// control the aggregate seeded sampling process
    #[inline]
    pub fn new(
        aggregated_data: Arc<AggregatedData>,
        oversampling_ratio: Option<f64>,
        oversampling_tries: Option<usize>,
        target_number_of_records: Option<usize>,
        use_synthetic_counts: bool,
    ) -> ConsolidateParameters {
        ConsolidateParameters {
            aggregated_data,
            oversampling_ratio,
            oversampling_tries,
            target_number_of_records,
            use_synthetic_counts,
        }
    }
}

impl Default for ConsolidateParameters {
    fn default() -> Self {
        Self {
            aggregated_data: Arc::new(AggregatedData::default()),
            oversampling_ratio: None,
            oversampling_tries: None,
            target_number_of_records: None,
            use_synthetic_counts: false,
        }
    }
}
