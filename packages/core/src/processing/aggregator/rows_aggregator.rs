use super::{
    record_attrs_selector::RecordAttrsSelector,
    typedefs::{AggregatesCountMap, EnumeratedDataBlockRecords, RecordsSensitivity},
    value_combination::ValueCombination,
    AggregatedCount,
};
use itertools::Itertools;
use log::info;
use std::sync::Arc;

#[cfg(feature = "rayon")]
use rayon::prelude::*;

#[cfg(feature = "rayon")]
use std::sync::Mutex;

use crate::{
    data_block::block::DataBlock,
    utils::{
        math::calc_n_combinations_range,
        reporting::{ReportProgress, SendableProgressReporter, SendableProgressReporterRef},
    },
};

pub struct RowsAggregatorResult {
    pub all_combs_count: f64,
    pub selected_combs_count: f64,
    pub aggregates_count: AggregatesCountMap,
    pub records_sensitivity: RecordsSensitivity,
}

impl RowsAggregatorResult {
    #[inline]
    pub fn new(total_n_records: usize) -> RowsAggregatorResult {
        let mut records_sensitivity = RecordsSensitivity::default();

        records_sensitivity.resize(total_n_records, 0);
        RowsAggregatorResult {
            all_combs_count: 0.0,
            selected_combs_count: 0.0,
            aggregates_count: AggregatesCountMap::default(),
            records_sensitivity,
        }
    }
}

pub struct RowsAggregator<'length_range> {
    data_block: Arc<DataBlock>,
    enumerated_records: EnumeratedDataBlockRecords,
    record_attrs_selector: RecordAttrsSelector<'length_range>,
}

impl<'length_range> RowsAggregator<'length_range> {
    #[inline]
    pub fn new(
        data_block: Arc<DataBlock>,
        enumerated_records: EnumeratedDataBlockRecords,
        record_attrs_selector: RecordAttrsSelector<'length_range>,
    ) -> RowsAggregator {
        RowsAggregator {
            data_block,
            enumerated_records,
            record_attrs_selector,
        }
    }

    #[cfg(feature = "rayon")]
    #[inline]
    pub fn aggregate_all<T>(
        total_n_records: usize,
        rows_aggregators: &mut Vec<RowsAggregator>,
        progress_reporter: &mut Option<T>,
    ) -> RowsAggregatorResult
    where
        T: ReportProgress,
    {
        let sendable_pr =
            Arc::new(Mutex::new(progress_reporter.as_mut().map(|r| {
                SendableProgressReporter::new(total_n_records as f64, 1.0, r)
            })));

        RowsAggregator::join_partial_results(
            total_n_records,
            rows_aggregators
                .par_iter_mut()
                .map(|ra| ra.aggregate_rows(&mut sendable_pr.clone()))
                .collect(),
        )
    }

    #[cfg(not(feature = "rayon"))]
    #[inline]
    pub fn aggregate_all<T>(
        total_n_records: usize,
        rows_aggregators: &mut Vec<RowsAggregator>,
        progress_reporter: &mut Option<T>,
    ) -> RowsAggregatorResult
    where
        T: ReportProgress,
    {
        let mut sendable_pr = progress_reporter
            .as_mut()
            .map(|r| SendableProgressReporter::new(total_n_records as f64, 1.0, r));

        RowsAggregator::join_partial_results(
            total_n_records,
            rows_aggregators
                .iter_mut()
                .map(|ra| ra.aggregate_rows(&mut sendable_pr))
                .collect(),
        )
    }

    #[inline]
    fn join_partial_results(
        total_n_records: usize,
        mut partial_results: Vec<RowsAggregatorResult>,
    ) -> RowsAggregatorResult {
        info!("joining aggregated partial results...");

        // take last element and the initial result
        // or use the default one if there are no results
        let mut final_result = partial_results
            .pop()
            .unwrap_or_else(|| RowsAggregatorResult::new(total_n_records));

        // use drain instead of fold, so we do not duplicate memory
        for mut partial_result in partial_results.drain(..) {
            // join counts
            final_result.all_combs_count += partial_result.all_combs_count;
            final_result.selected_combs_count += partial_result.selected_combs_count;

            // join aggregated counts
            for (comb, value) in partial_result.aggregates_count.drain() {
                let final_count = final_result
                    .aggregates_count
                    .entry(comb)
                    .or_insert_with(AggregatedCount::default);
                final_count.count += value.count;
                final_count
                    .contained_in_records
                    .extend(value.contained_in_records);
            }

            // join records sensitivity
            for (i, sensitivity) in partial_result.records_sensitivity.drain(..).enumerate() {
                final_result.records_sensitivity[i] += sensitivity;
            }
        }
        final_result
    }

    #[inline]
    fn aggregate_rows<T>(
        &mut self,
        progress_reporter: &mut SendableProgressReporterRef<T>,
    ) -> RowsAggregatorResult
    where
        T: ReportProgress,
    {
        let mut result = RowsAggregatorResult::new(self.data_block.records.len());

        for (record_index, record) in self.enumerated_records.iter() {
            let mut selected_attrs = self
                .record_attrs_selector
                .select_from_record(&record.values);

            // sort the attributes here, so combinations will be already sorted
            // and we do not need to sort entry by entry on the loop below
            selected_attrs.sort_by_key(|k| k.format_str_using_headers(&self.data_block.headers));

            result.all_combs_count += calc_n_combinations_range(
                record.values.len(),
                self.record_attrs_selector.length_range,
            );

            for l in self.record_attrs_selector.length_range {
                for mut c in selected_attrs.iter().combinations(*l) {
                    let current_count = result
                        .aggregates_count
                        .entry(ValueCombination::new(
                            c.drain(..).map(|k| (*k).clone()).collect(),
                        ))
                        .or_insert_with(AggregatedCount::default);
                    current_count.count += 1;
                    current_count.contained_in_records.insert(*record_index);
                    result.records_sensitivity[*record_index] += 1;
                    result.selected_combs_count += 1.0;
                }
            }
            SendableProgressReporter::update_progress(progress_reporter, 1.0);
        }
        result
    }
}
