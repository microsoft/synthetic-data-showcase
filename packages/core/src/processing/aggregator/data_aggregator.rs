use super::aggregated_data::AggregatedData;
use super::rows_aggregator::RowsAggregator;
use itertools::Itertools;
use log::info;
use std::sync::Arc;

use crate::data_block::DataBlock;
use crate::dp::{DpParameters, NoiseAggregator, NoisyCountThreshold};
use crate::utils::math::calc_percentage;
use crate::utils::reporting::{ReportProgress, StoppableResult};
use crate::utils::threading::get_number_of_threads;
use crate::utils::time::ElapsedDurationLogger;

/// Process a data block to produced aggregated data
pub struct Aggregator {
    data_block: Arc<DataBlock>,
}

impl Aggregator {
    /// Returns a data aggregator for the given data block
    /// # Arguments
    /// * `data_block` - The data block to be processed
    #[inline]
    pub fn new(data_block: Arc<DataBlock>) -> Aggregator {
        Aggregator { data_block }
    }

    /// Compute the aggregate data for the `data_block` informed in
    /// the constructor
    /// # Arguments
    /// * `reporting_length` - Calculate combinations from 1 up to `reporting_length`
    /// * `progress_reporter` - Will be used to report the processing
    /// progress (`ReportProgress` trait). If `None`, nothing will be reported
    pub fn aggregate<T>(
        &mut self,
        reporting_length: usize,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<AggregatedData>
    where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("data aggregation");
        let normalized_reporting_length =
            self.data_block.normalize_reporting_length(reporting_length);
        let total_n_records = self.data_block.number_of_records();
        let total_n_records_f64 = total_n_records as f64;

        info!(
            "aggregating data with reporting length = {} and {} thread(s)",
            normalized_reporting_length,
            get_number_of_threads()
        );

        RowsAggregator::aggregate_all(
            total_n_records,
            normalized_reporting_length,
            &mut self.build_rows_aggregators(normalized_reporting_length),
            progress_reporter,
        )
        .and_then(|result| {
            Aggregator::update_aggregate_progress(
                progress_reporter,
                total_n_records,
                total_n_records_f64,
            )?;

            info!(
                "data aggregated resulting in {} distinct combinations...",
                result.aggregates_count.len()
            );

            Ok(AggregatedData::new(
                self.data_block.headers.clone(),
                self.data_block.multi_value_column_metadata_map.clone(),
                self.data_block.number_of_records(),
                None,
                result.aggregates_count,
                result.records_sensitivity_by_len,
                normalized_reporting_length,
            ))
        })
    }

    /// Compute the aggregate data for the `data_block` informed in
    /// the constructor using differential privacy
    /// # Arguments
    /// * `reporting_length` - Calculate combinations from 1 up to `reporting_length`
    /// * `dp_parameters` - Differential privacy parameters
    /// * `threshold` - Threshold used to filter noisy counts
    /// * `progress_reporter` - Will be used to report the processing
    /// progress (`ReportProgress` trait). If `None`, nothing will be reported
    pub fn aggregate_with_dp<T>(
        &self,
        reporting_length: usize,
        dp_parameters: &DpParameters,
        threshold: NoisyCountThreshold,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<AggregatedData>
    where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("data aggregation with DP");
        let normalized_reporting_length =
            self.data_block.normalize_reporting_length(reporting_length);

        info!(
            "aggregating data with reporting length = {}, {} thread(s), dp parameters={:?}, threshold = {:?}",
            normalized_reporting_length, get_number_of_threads(), dp_parameters, threshold
        );

        let result = NoiseAggregator::new(
            self.data_block.clone(),
            reporting_length,
            dp_parameters,
            threshold,
        )
        .generate_noisy_aggregates(progress_reporter)?;

        info!(
            "data aggregated resulting in {} distinct combinations...",
            result.aggregates_count.len()
        );

        Ok(result)
    }

    #[inline]
    fn build_rows_aggregators(&self, reporting_length: usize) -> Vec<RowsAggregator> {
        if self.data_block.records.is_empty() {
            return Vec::default();
        }

        let chunk_size = ((self.data_block.records.len() as f64) / (get_number_of_threads() as f64))
            .ceil() as usize;
        let mut rows_aggregators: Vec<RowsAggregator> = Vec::default();

        for c in &self
            .data_block
            .records
            .clone()
            .drain(..)
            .enumerate()
            .chunks(chunk_size)
        {
            rows_aggregators.push(RowsAggregator::new(
                self.data_block.clone(),
                c.collect(),
                reporting_length,
            ))
        }
        rows_aggregators
    }

    #[inline]
    fn update_aggregate_progress<T>(
        progress_reporter: &mut Option<T>,
        n_processed: usize,
        total: f64,
    ) -> StoppableResult<()>
    where
        T: ReportProgress,
    {
        progress_reporter
            .as_mut()
            .map(|r| r.report(calc_percentage(n_processed as f64, total)))
            .unwrap_or_else(|| Ok(()))
    }
}
