/// Module that can the used to suppress attributes from records to
/// meet a certain sensitivity threshold
pub mod record_attrs_selector;

/// Type definitions related to the aggregation process
pub mod typedefs;

use self::typedefs::{
    AggregatedCountByLenMap, AggregatesCountMap, RecordsSensitivity, RecordsSensitivitySlice,
    RecordsSet, ValueCombinationSlice,
};
use instant::Duration;
use itertools::Itertools;
use log::Level::Trace;
use log::{info, log_enabled, trace};
use std::cmp::min;
use std::io::{Error, Write};

use crate::data_block::block::DataBlock;
use crate::data_block::typedefs::DataBlockHeadersSlice;
use crate::data_block::value::DataBlockValue;
use crate::measure_time;
use crate::processing::aggregator::record_attrs_selector::RecordAttrsSelector;
use crate::utils::math::{calc_n_combinations_range, calc_percentage, uround_down};
use crate::utils::reporting::ReportProgress;
use crate::utils::time::ElapsedDuration;

/// Represents the privacy risk information related to a data block
#[derive(Debug)]
pub struct PrivacyRiskSummary {
    /// Total number of records on the data block
    pub total_number_of_records: usize,
    /// Total number of combinations aggregated (up to reporting length)
    pub total_number_of_combinations: usize,
    /// Number of records with unique combinations
    pub records_with_unique_combinations_count: usize,
    /// Number of records with rare combinations (combination count < resolution)
    pub records_with_rare_combinations_count: usize,
    /// Number of unique combinations
    pub unique_combinations_count: usize,
    /// Number of rare combinations
    pub rare_combinations_count: usize,
    /// Proportion of records containing unique combinations
    pub records_with_unique_combinations_proportion: f64,
    /// Proportion of records containing rare combinations
    pub records_with_rare_combinations_proportion: f64,
    /// Proportion of unique combinations
    pub unique_combinations_proportion: f64,
    /// Proportion of rare combinations
    pub rare_combinations_proportion: f64,
}

/// Result of data aggregation for each combination
#[derive(Debug)]
pub struct AggregatedCount {
    /// How many times the combination appears on the records
    pub count: usize,
    /// Which records this combinations is part of
    pub contained_in_records: RecordsSet,
}

impl Default for AggregatedCount {
    fn default() -> AggregatedCount {
        AggregatedCount {
            count: 0,
            contained_in_records: RecordsSet::default(),
        }
    }
}

#[derive(Debug)]
struct AggregatorDurations {
    aggregate: Duration,
    calc_rare_combinations_count_by_len: Duration,
    calc_combinations_count_by_len: Duration,
    calc_combinations_sum_by_len: Duration,
    calc_privacy_risk: Duration,
    write_aggregates_count: Duration,
}

/// Aggregated data produced by the Aggregator
pub struct AggregatedData<'data_block> {
    /// Maps a value combination to its aggregated count
    pub aggregates_count: AggregatesCountMap<'data_block>,
    /// A vector of sensitivities for each record (the vector index is the record index)
    pub records_sensitivity: RecordsSensitivity,
}

/// Process a data block to produced aggregated data
pub struct Aggregator<'data_block> {
    data_block: &'data_block DataBlock,
    durations: AggregatorDurations,
}

impl<'data_block> Aggregator<'data_block> {
    /// Returns a data aggregator for the given data block
    /// # Arguments
    /// * `data_block` - The data block to be processed
    #[inline]
    pub fn new(data_block: &'data_block DataBlock) -> Aggregator<'data_block> {
        Aggregator {
            data_block,
            durations: AggregatorDurations {
                aggregate: Duration::default(),
                calc_rare_combinations_count_by_len: Duration::default(),
                calc_combinations_count_by_len: Duration::default(),
                calc_combinations_sum_by_len: Duration::default(),
                calc_privacy_risk: Duration::default(),
                write_aggregates_count: Duration::default(),
            },
        }
    }

    /// Formats a data block value as String.
    /// The result is formatted as: `{header_name}:{block_value}`
    /// # Arguments
    /// * `headers`: data block headers
    /// * `value`: value to be formatted
    #[inline]
    pub fn format_data_block_value_str(
        headers: &DataBlockHeadersSlice,
        value: &'data_block DataBlockValue,
    ) -> String {
        format!("{}:{}", headers[value.column_index], value.value)
    }

    /// Formats a value combination as String.
    /// The result is formatted as:
    /// `{header_name}:{block_value};{header_name}:{block_value}...`
    /// # Arguments
    /// * `headers`: data block headers
    /// * `aggregate`: combinations to be formatted
    #[inline]
    pub fn format_aggregate_str(
        headers: &DataBlockHeadersSlice,
        aggregate: &ValueCombinationSlice<'data_block>,
    ) -> String {
        let mut str = String::default();
        for comb in aggregate {
            if !str.is_empty() {
                str += ";";
            }
            str += Aggregator::format_data_block_value_str(headers, comb).as_str();
        }
        str
    }

    /// Aggregates the data block and returns the aggregated data back
    /// # Arguments
    /// * `reporting_length` - Calculate combinations from 1 up to `reporting_length`
    /// * `sensitivity_threshold` - Sensitivity threshold to filter record attributes
    /// (0 means no suppression)
    /// * `progress_reporter` - Will be used to report the processing
    /// progress (`ReportProgress` trait). If `None`, nothing will be reported
    pub fn aggregate<T>(
        &mut self,
        reporting_length: usize,
        sensitivity_threshold: usize,
        progress_reporter: &mut Option<T>,
    ) -> AggregatedData<'data_block>
    where
        T: ReportProgress,
    {
        measure_time!(
            || {
                let mut aggregates_count: AggregatesCountMap = AggregatesCountMap::default();
                let max_len = if reporting_length == 0 {
                    self.data_block.headers.len()
                } else {
                    min(reporting_length, self.data_block.headers.len())
                };
                let length_range = (1..=max_len).collect::<Vec<usize>>();
                let mut record_attrs_selector = RecordAttrsSelector::new(
                    &length_range,
                    sensitivity_threshold,
                    DataBlock::calc_attr_rows(&self.data_block.records),
                );
                let mut selected_combs_count = 0_u64;
                let mut all_combs_count = 0_u64;
                let mut records_sensitivity: RecordsSensitivity = RecordsSensitivity::default();
                let total_n_records = self.data_block.records.len();
                let total_n_records_f64 = total_n_records as f64;

                records_sensitivity.resize(total_n_records, 0);

                info!(
                    "aggregating data with reporting length = {} and sensitivity_threshold = {}",
                    max_len, sensitivity_threshold
                );

                for (record_index, record) in self.data_block.records.iter().enumerate() {
                    let selected_attrs = record_attrs_selector.select_from_record(&record.values);

                    all_combs_count +=
                        calc_n_combinations_range(record.values.len(), &length_range);

                    Aggregator::update_aggregate_progress(
                        progress_reporter,
                        record_index,
                        total_n_records_f64,
                    );

                    for l in &length_range {
                        for c in selected_attrs.iter().combinations(*l) {
                            let curr_count = aggregates_count
                                .entry(
                                    c.iter()
                                        .sorted_by_key(|k| {
                                            Aggregator::format_data_block_value_str(
                                                &self.data_block.headers,
                                                k,
                                            )
                                        })
                                        .cloned()
                                        .copied()
                                        .collect_vec(),
                                )
                                .or_insert_with(AggregatedCount::default);
                            curr_count.count += 1;
                            curr_count.contained_in_records.insert(record_index);
                            records_sensitivity[record_index] += 1;
                            selected_combs_count += 1;
                        }
                    }
                }
                Aggregator::update_aggregate_progress(
                    progress_reporter,
                    total_n_records,
                    total_n_records_f64,
                );

                info!(
                    "data aggregated resulting in {} distinct combinations...",
                    aggregates_count.len()
                );
                info!(
                    "suppression ratio of aggregates is {:.2}%",
                    (1.0 - (selected_combs_count as f64 / all_combs_count as f64)) * 100.0
                );
                AggregatedData {
                    aggregates_count,
                    records_sensitivity,
                }
            },
            (self.durations.aggregate)
        )
    }

    /// Round the aggregated counts down to the nearest multiple of resolution
    /// # Arguments:
    /// * `aggregates_count` - Counts to be rounded in place
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn protect_aggregates_count(
        aggregates_count: &mut AggregatesCountMap<'data_block>,
        resolution: usize,
    ) {
        info!(
            "protecting aggregates counts with resolution {}",
            resolution
        );
        for count in aggregates_count.values_mut() {
            count.count = uround_down(count.count as f64, resolution as f64);
        }
        // remove 0 counts from response
        aggregates_count.retain(|_, count| count.count > 0);
    }

    /// Calculates the number of rare combinations grouped by combination length
    /// # Arguments:
    /// * `aggregates_count` - Calculated aggregates count map
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_rare_combinations_count_by_len(
        &mut self,
        aggregates_count: &AggregatesCountMap<'data_block>,
        resolution: usize,
    ) -> AggregatedCountByLenMap {
        info!(
            "calculating rare combinations counts by length with resolution {}",
            resolution
        );
        measure_time!(
            || {
                let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

                for (agg, count) in aggregates_count.iter() {
                    if count.count < resolution {
                        let curr_count = result.entry(agg.len()).or_insert(0);
                        *curr_count += 1;
                    }
                }
                result
            },
            (self.durations.calc_rare_combinations_count_by_len)
        )
    }

    /// Calculates the number of combinations grouped by combination length
    /// # Arguments:
    /// * `aggregates_count` - Calculated aggregates count map
    pub fn calc_combinations_count_by_len(
        &mut self,
        aggregates_count: &AggregatesCountMap<'data_block>,
    ) -> AggregatedCountByLenMap {
        info!("calculating combination counts by length");
        measure_time!(
            || {
                let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

                for agg in aggregates_count.keys() {
                    let curr_count = result.entry(agg.len()).or_insert(0);
                    *curr_count += 1;
                }
                result
            },
            (self.durations.calc_combinations_count_by_len)
        )
    }

    /// Calculates the sum of all combination counts grouped by combination length
    /// # Arguments:
    /// * `aggregates_count` - Calculated aggregates count map
    pub fn calc_combinations_sum_by_len(
        &mut self,
        aggregates_count: &AggregatesCountMap<'data_block>,
    ) -> AggregatedCountByLenMap {
        info!("calculating combination counts sums by length");
        measure_time!(
            || {
                let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

                for (agg, count) in aggregates_count.iter() {
                    let curr_sum = result.entry(agg.len()).or_insert(0);
                    *curr_sum += count.count;
                }
                result
            },
            (self.durations.calc_combinations_sum_by_len)
        )
    }

    /// Calculates the privacy risk related with data block and the generated
    /// aggregates counts
    /// # Arguments:
    /// * `aggregates_count` - Calculated aggregates count map
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_privacy_risk(
        &mut self,
        aggregates_count: &AggregatesCountMap<'data_block>,
        resolution: usize,
    ) -> PrivacyRiskSummary {
        info!("calculating privacy risk...");
        measure_time!(
            || {
                let mut records_with_unique_combinations = RecordsSet::default();
                let mut records_with_rare_combinations = RecordsSet::default();
                let mut unique_combinations_count: usize = 0;
                let mut rare_combinations_count: usize = 0;
                let total_number_of_records = self.data_block.records.len();
                let total_number_of_combinations = aggregates_count.len();

                for count in aggregates_count.values() {
                    if count.count == 1 {
                        unique_combinations_count += 1;
                        count.contained_in_records.iter().for_each(|record_index| {
                            records_with_unique_combinations.insert(*record_index);
                        });
                    }
                    if count.count < resolution {
                        rare_combinations_count += 1;
                        count.contained_in_records.iter().for_each(|record_index| {
                            records_with_rare_combinations.insert(*record_index);
                        });
                    }
                }

                PrivacyRiskSummary {
                    total_number_of_records,
                    total_number_of_combinations,
                    records_with_unique_combinations_count: records_with_unique_combinations.len(),
                    records_with_rare_combinations_count: records_with_rare_combinations.len(),
                    unique_combinations_count,
                    rare_combinations_count,
                    records_with_unique_combinations_proportion: (records_with_unique_combinations
                        .len()
                        as f64)
                        / (total_number_of_records as f64),
                    records_with_rare_combinations_proportion: (records_with_rare_combinations.len()
                        as f64)
                        / (total_number_of_records as f64),
                    unique_combinations_proportion: (unique_combinations_count as f64)
                        / (total_number_of_combinations as f64),
                    rare_combinations_proportion: (rare_combinations_count as f64)
                        / (total_number_of_combinations as f64),
                }
            },
            (self.durations.calc_privacy_risk)
        )
    }

    /// Writes the aggregates counts to the file system in a csv/tsv like format
    /// # Arguments:
    /// * `aggregates_count` - Calculated aggregates count map
    /// * `aggregates_path` - File path to be written
    /// * `aggregates_delimiter` - Delimiter to use when writing to `aggregates_path`
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `protected` - Whether or not the counts were protected before calling this
    pub fn write_aggregates_count(
        &mut self,
        aggregates_count: &AggregatesCountMap<'data_block>,
        aggregates_path: &str,
        aggregates_delimiter: char,
        resolution: usize,
        protected: bool,
    ) -> Result<(), Error> {
        info!("writing file {}", aggregates_path);

        measure_time!(
            || {
                let mut file = std::fs::File::create(aggregates_path)?;

                file.write_all(
                    format!(
                        "selections{}{}\n",
                        aggregates_delimiter,
                        if protected {
                            "protected_count"
                        } else {
                            "count"
                        }
                    )
                    .as_bytes(),
                )?;
                file.write_all(
                    format!(
                        "selections{}{}\n",
                        aggregates_delimiter,
                        uround_down(self.data_block.records.len() as f64, resolution as f64)
                    )
                    .as_bytes(),
                )?;
                for aggregate in aggregates_count.keys() {
                    file.write_all(
                        format!(
                            "{}{}{}\n",
                            Aggregator::format_aggregate_str(&self.data_block.headers, aggregate),
                            aggregates_delimiter,
                            aggregates_count[aggregate].count
                        )
                        .as_bytes(),
                    )?
                }
                Ok(())
            },
            (self.durations.write_aggregates_count)
        )
    }

    /// Writes the records sensitivity to the file system in a csv/tsv like format
    /// # Arguments:
    /// * `records_sensitivity` - Calculated records sensitivity
    /// * `records_sensitivity_path` - File path to be written
    pub fn write_records_sensitivity(
        &mut self,
        records_sensitivity: &RecordsSensitivitySlice,
        records_sensitivity_path: &str,
    ) -> Result<(), Error> {
        info!("writing file {}", records_sensitivity_path);

        measure_time!(
            || {
                let mut file = std::fs::File::create(records_sensitivity_path)?;

                file.write_all("record_index\trecord_sensitivity\n".as_bytes())?;
                for (i, sensitivity) in records_sensitivity.iter().enumerate() {
                    file.write_all(format!("{}\t{}\n", i, sensitivity).as_bytes())?
                }
                Ok(())
            },
            (self.durations.write_aggregates_count)
        )
    }

    #[inline]
    fn update_aggregate_progress<T>(
        progress_reporter: &mut Option<T>,
        n_processed: usize,
        total: f64,
    ) where
        T: ReportProgress,
    {
        if let Some(r) = progress_reporter {
            r.report(calc_percentage(n_processed, total));
        }
    }
}

impl<'data_block> Drop for Aggregator<'data_block> {
    fn drop(&mut self) {
        trace!("aggregator durations: {:#?}", self.durations);
    }
}
