use super::{
    records_analysis_data::RecordsAnalysisData,
    typedefs::{
        AggregatedCountByLenMap, AggregatedMetricByLenMap, AggregatesCountMap,
        AggregatesCountStringMap, RecordsByLenMap, RecordsSensitivityByLen,
        ALL_SENSITIVITIES_INDEX,
    },
    RecordsByStringKey, RecordsCountByStringKey,
};
use fnv::FnvHashMap;
use itertools::Itertools;
use log::info;
use serde::{Deserialize, Serialize};
use std::{
    fmt::Write as FmtWrite,
    io::{BufReader, BufWriter, Error, Write},
    sync::Arc,
};

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

use crate::{
    data_block::{
        DataBlockHeaders, DataBlockValue, MultiValueColumnMetadataMap, COLUMN_VALUE_DELIMITER,
    },
    processing::{
        aggregator::{typedefs::RecordsSet, value_combination::ValueCombination, AggregatedCount},
        generator::AttributeCountMap,
    },
    utils::{math::uround_down, time::ElapsedDurationLogger},
};

/// Aggregated data produced by the Aggregator
#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Serialize, Deserialize, Clone)]
pub struct AggregatedData {
    /// Vector of strings representing the data headers
    pub headers: DataBlockHeaders,
    /// Maps a normalized multi-value header name (such as A_a1) to its corresponding metadata
    pub multi_value_column_metadata_map: MultiValueColumnMetadataMap,
    /// Number of records present on the original data
    pub number_of_records: usize,
    /// Number of records protected with K-Anonymity or DP (if any)
    pub protected_number_of_records: Option<usize>,
    /// Maps a value combination to its aggregated count
    pub aggregates_count: AggregatesCountMap,
    /// A vector of sensitivities for each record (the vector index is the record index)
    /// grouped by combination length
    pub records_sensitivity_by_len: RecordsSensitivityByLen,
    /// Maximum length used to compute attribute combinations
    pub reporting_length: usize,
}

impl AggregatedData {
    /// Creates a new AggregatedData struct with default values
    #[inline]
    pub fn default() -> AggregatedData {
        AggregatedData {
            headers: DataBlockHeaders::default(),
            multi_value_column_metadata_map: MultiValueColumnMetadataMap::default(),
            number_of_records: 0,
            protected_number_of_records: None,
            aggregates_count: AggregatesCountMap::default(),
            records_sensitivity_by_len: RecordsSensitivityByLen::default(),
            reporting_length: 0,
        }
    }

    /// Creates a new AggregatedData struct
    /// # Arguments:
    /// * `headers` - Vector of strings representing the data headers
    /// * `multi_value_column_metadata_map` - Maps a normalized multi-value header name (such as A_a1)
    /// to its corresponding metadata
    /// * `number_of_records` - Number of records present on the original data
    /// * `protected_number_of_records` - Number of records protected with K-Anonymity or DP (if any)
    /// * `aggregates_count` - Computed aggregates count map
    /// * `records_sensitivity` - Computed sensitivity for the records
    /// * `reporting_length` - Maximum length used to compute attribute combinations
    #[inline]
    pub fn new(
        headers: DataBlockHeaders,
        multi_value_column_metadata_map: MultiValueColumnMetadataMap,
        number_of_records: usize,
        protected_number_of_records: Option<usize>,
        aggregates_count: AggregatesCountMap,
        records_sensitivity_by_len: RecordsSensitivityByLen,
        reporting_length: usize,
    ) -> AggregatedData {
        AggregatedData {
            headers,
            multi_value_column_metadata_map,
            number_of_records,
            protected_number_of_records,
            aggregates_count,
            records_sensitivity_by_len,
            reporting_length,
        }
    }

    /// Single attribute counts map
    #[inline]
    pub fn calc_single_attribute_counts(&self) -> AttributeCountMap {
        self.aggregates_count
            .iter()
            .filter_map(|(comb, count)| {
                if comb.len() == 1 {
                    Some((comb[0].clone(), count.count))
                } else {
                    None
                }
            })
            .collect()
    }

    #[inline]
    /// Check if the records len map contains a value across all lengths
    fn records_by_len_contains(records_by_len: &RecordsByLenMap, value: &usize) -> bool {
        records_by_len
            .values()
            .any(|records| records.contains(value))
    }

    #[inline]
    /// Whe first generated the RecordsByLenMap might contain
    /// the same records appearing in different combination lengths.
    /// This will keep only the record on the shortest length key
    /// and remove the other occurrences
    fn keep_records_only_on_shortest_len(records_by_len: &mut RecordsByLenMap) {
        let lengths: Vec<usize> = records_by_len.keys().cloned().sorted().collect();
        let max_len = lengths.last().copied().unwrap_or(0);

        // make sure the record will be only present in the shortest len
        // start on the shortest length
        for l in lengths {
            for r in records_by_len.get(&l).unwrap().clone() {
                // search all lengths > l and remove the record from there
                for n in l + 1..=max_len {
                    if let Some(records) = records_by_len.get_mut(&n) {
                        records.remove(&r);
                    }
                }
            }
        }
        // retain only non-empty record lists
        records_by_len.retain(|_, records| !records.is_empty());
    }

    #[inline]
    fn _read_from_json(file_path: &str) -> Result<AggregatedData, Error> {
        info!("reading file: {}", file_path);

        let _duration_logger = ElapsedDurationLogger::new("read from json");

        Ok(serde_json::from_reader(BufReader::new(
            std::fs::File::open(file_path)?,
        ))?)
    }

    #[inline]
    fn _write_aggregates_count<T: Write>(
        &self,
        writer: &mut T,
        aggregates_delimiter: char,
        combination_delimiter: &str,
    ) -> Result<(), Error> {
        let n_records;
        let n_records_label;

        if let Some(protected_number_of_records) = self.protected_number_of_records {
            n_records = protected_number_of_records;
            n_records_label = "protected_count";
        } else {
            n_records = self.number_of_records;
            n_records_label = "count";
        }

        writer.write_all(
            format!("selections{}{}\n", aggregates_delimiter, n_records_label).as_bytes(),
        )?;
        writer
            .write_all(format!("record_count{}{}\n", aggregates_delimiter, n_records).as_bytes())?;

        for aggregate in self.aggregates_count.keys() {
            writer.write_all(
                format!(
                    "{}{}{}\n",
                    aggregate.as_str_using_headers(&self.headers, combination_delimiter),
                    aggregates_delimiter,
                    self.aggregates_count[aggregate].count
                )
                .as_bytes(),
            )?
        }
        Ok(())
    }

    #[inline]
    fn gen_records_sensitivity_headers(&self, records_sensitivity_delimiter: char) -> String {
        let mut headers = format!(
            "record_index{}record_sensitivity_all_lengths",
            records_sensitivity_delimiter
        );

        for l in 1..=self.reporting_length {
            assert!(
                write!(
                    &mut headers,
                    "{}record_sensitivity_length_{}",
                    records_sensitivity_delimiter, l
                )
                .is_ok(),
                "error writing records sensitivity headers"
            );
        }
        headers.push('\n');
        headers
    }

    #[inline]
    fn gen_records_sensitivity_line(
        &self,
        record_index: usize,
        records_sensitivity_delimiter: char,
    ) -> String {
        let mut line = format!(
            "{}{}{}",
            record_index,
            records_sensitivity_delimiter,
            self.records_sensitivity_by_len[ALL_SENSITIVITIES_INDEX][record_index]
        );

        for l in 1..=self.reporting_length {
            assert!(
                write!(
                    &mut line,
                    "{}{}",
                    records_sensitivity_delimiter, self.records_sensitivity_by_len[l][record_index]
                )
                .is_ok(),
                "error writing records sensitivity line"
            );
        }
        line.push('\n');
        line
    }

    #[inline]
    fn get_original_header_name(&self, index: usize) -> String {
        let output_header_name = &self.headers[index];
        if let Some(metadata) = self.multi_value_column_metadata_map.get(output_header_name) {
            (*metadata.src_header_name).clone()
        } else {
            (**output_header_name).clone()
        }
    }

    #[inline]
    fn get_original_attribute_as_str(&self, value: &DataBlockValue) -> String {
        if let Some(metadata) = self
            .multi_value_column_metadata_map
            .get(&self.headers[value.column_index])
        {
            format!(
                "{}{}{}",
                metadata.src_header_name, COLUMN_VALUE_DELIMITER, metadata.attribute_name
            )
        } else {
            value.as_str_using_headers(&self.headers)
        }
    }
}

#[cfg_attr(feature = "pyo3", pymethods)]
impl AggregatedData {
    #[cfg(feature = "pyo3")]
    #[getter]
    /// Returns the number of records
    pub fn number_of_records(&self) -> usize {
        self.number_of_records
    }

    #[cfg(feature = "pyo3")]
    #[getter]
    /// Returns the reporting length
    pub fn reporting_length(&self) -> usize {
        self.reporting_length
    }

    #[inline]
    /// Returns the number of records on the data block protected by `resolution`
    pub fn number_of_records_protected_with_k_anonymity(&self, resolution: usize) -> usize {
        uround_down(self.number_of_records as f64, resolution as f64)
    }

    #[inline]
    /// Total number of distinct combinations
    pub fn number_of_distinct_combinations(&self) -> usize {
        self.aggregates_count.len()
    }

    /// Builds a map from value combinations formatted as string to its aggregated count
    /// This method will clone the data, so its recommended to have its result stored
    /// in a local variable to avoid it being called multiple times
    /// # Arguments:
    /// * `combination_delimiter` - Delimiter used to join combinations
    pub fn aggregates_count_as_str(&self, combination_delimiter: &str) -> AggregatesCountStringMap {
        self.aggregates_count
            .iter()
            .map(|(key, value)| {
                (
                    key.as_str_using_headers(&self.headers, combination_delimiter),
                    value.count,
                )
            })
            .collect()
    }

    #[cfg(feature = "pyo3")]
    /// A vector of sensitivities for each record (the vector index is the record index)
    /// grouped by combination length
    /// This method will clone the data, so its recommended to have its result stored
    /// in a local variable to avoid it being called multiple times
    pub fn get_records_sensitivity_by_len(&self) -> RecordsSensitivityByLen {
        self.records_sensitivity_by_len.clone()
    }

    /// Removed aggregate counts equals to zero (`0`) from the final result
    pub fn remove_zero_counts(&mut self) {
        info!("removing zero counts from aggregates");
        let _duration_logger = ElapsedDurationLogger::new("remove zero counts");

        // remove 0 counts from response
        self.aggregates_count.retain(|_, count| count.count > 0);
    }

    /// Add missing parent combinations which have higher order combinations reported
    pub fn add_missing_parent_combinations(&mut self) {
        info!("adding missing parent combinations");
        let _duration_logger = ElapsedDurationLogger::new("add missing parent combinations");
        let mut missing_combs = AggregatesCountMap::default();

        for (comb, count) in self.aggregates_count.iter() {
            for l in 2..comb.len() {
                for mut sub_comb in comb.iter().combinations(l) {
                    let value_combination =
                        ValueCombination::new(sub_comb.drain(..).cloned().collect());

                    if !self.aggregates_count.contains_key(&value_combination) {
                        let max_count = missing_combs
                            .entry(Arc::new(value_combination))
                            .or_insert_with(AggregatedCount::default);

                        (*max_count).count = max_count.count.max(count.count);
                    }
                }
            }
        }

        for (comb, count) in missing_combs.drain() {
            self.aggregates_count.insert(comb, count);
        }
    }

    /// Normalize noisy combinations, so lower order combinations will always have a bigger
    /// count than higher order combinations that contains them
    ///
    /// For example (this scenario can happen when noise is added):
    ///     - A:a1;B:b1 -> 25
    ///     - A:a1;B:b1;C:c1 -> 30
    ///     - A:a1;B:b1;C:c2 -> 40
    ///
    /// Would be normalized to:
    ///     - A:a1;B:b1 -> 25
    ///     - A:a1;B:b1;C:c1 -> **25**
    ///     - A:a1;B:b1;C:c2 -> **25**
    pub fn normalize_noisy_combinations(&mut self) {
        info!("normalizing noisy combinations");
        let _duration_logger = ElapsedDurationLogger::new("normalize noisy combinations");
        let mut noisy_combs: FnvHashMap<Arc<ValueCombination>, usize> = FnvHashMap::default();

        for (comb, count) in self.aggregates_count.iter() {
            for l in 1..comb.len() {
                for mut lower_len_comb in comb.iter().combinations(l) {
                    let value_combination =
                        ValueCombination::new(lower_len_comb.drain(..).cloned().collect());

                    if let Some(lower_len_comb_count) =
                        self.aggregates_count.get(&value_combination)
                    {
                        if lower_len_comb_count.count < count.count {
                            let min_count = noisy_combs
                                .entry(comb.clone())
                                .or_insert_with(|| lower_len_comb_count.count);

                            (*min_count) = (*min_count).min(lower_len_comb_count.count);
                        }
                    }
                }
            }
        }

        for (comb, count) in noisy_combs.drain() {
            self.aggregates_count.get_mut(&comb).unwrap().count = count;
        }
    }

    /// Round the aggregated counts down to the nearest multiple of resolution
    /// and remove combinations rounded to a zero count.
    /// (protecting aggregates with k-anon)
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn protect_with_k_anonymity(&mut self, resolution: usize) {
        info!(
            "protecting aggregates with k-anonymity: resolution {}",
            resolution
        );
        let _duration_logger = ElapsedDurationLogger::new("protect with k-anonymity");

        for count in self.aggregates_count.values_mut() {
            count.count = uround_down(count.count as f64, resolution as f64);
        }
        self.remove_zero_counts();
        self.protected_number_of_records = Some(uround_down(
            self.number_of_records as f64,
            resolution as f64,
        ));
    }

    /// Calculates the records that contain rare combinations grouped by length.
    /// This might contain duplicated records on different lengths if the record
    /// contains more than one rare combination. Unique combinations are also contained
    /// in this.
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_records_with_rare_combinations_by_len(&self, resolution: usize) -> RecordsByLenMap {
        let mut records_with_rare_combs_by_len: RecordsByLenMap = RecordsByLenMap::default();

        for (agg, count) in self.aggregates_count.iter() {
            if count.count < resolution {
                records_with_rare_combs_by_len
                    .entry(agg.len())
                    .or_insert_with(RecordsSet::default)
                    .extend(&count.contained_in_records);
            }
        }
        records_with_rare_combs_by_len
    }

    /// Calculates the number of records that contain rare combinations.
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_number_of_records_with_rare_combinations(&self, resolution: usize) -> usize {
        let mut rare_records: RecordsSet = RecordsSet::default();

        for (_l, records) in self
            .calc_records_with_rare_combinations_by_len(resolution)
            .drain()
        {
            rare_records.extend(records);
        }
        rare_records.len()
    }

    /// Calculates the records that contain rare combinations grouped by column name.
    /// This might contain duplicated records on different column names.
    /// Unique combinations are also contained in this.
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_records_with_rare_combinations_per_column(
        &self,
        resolution: usize,
    ) -> RecordsByStringKey {
        let mut rare_records_per_column = RecordsByStringKey::default();

        for (agg, count) in self.aggregates_count.iter() {
            if count.count < resolution {
                for value in agg.iter() {
                    rare_records_per_column
                        .entry(self.get_original_header_name(value.column_index))
                        .or_insert_with(RecordsSet::default)
                        .extend(&count.contained_in_records);
                }
            }
        }
        rare_records_per_column
    }

    /// Calculates the number of records that contain rare combinations grouped by column name.
    /// This might contain duplicated records on different column names.
    /// Unique combinations are also contained in this.
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_number_of_records_with_rare_combinations_per_column(
        &self,
        resolution: usize,
    ) -> RecordsCountByStringKey {
        self.calc_records_with_rare_combinations_per_column(resolution)
            .drain()
            .map(|(h, records)| (h, records.len()))
            .collect()
    }

    /// Calculates the records that contain rare combinations grouped by attribute.
    /// This might contain duplicated records for different attribute names.
    /// Unique combinations are also contained in this.
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_records_with_rare_combinations_per_attribute(
        &self,
        resolution: usize,
    ) -> RecordsByStringKey {
        let mut rare_records_per_attribute = RecordsByStringKey::default();

        for (agg, count) in self.aggregates_count.iter() {
            if count.count < resolution {
                for value in agg.iter() {
                    rare_records_per_attribute
                        .entry(self.get_original_attribute_as_str(value))
                        .or_insert_with(RecordsSet::default)
                        .extend(&count.contained_in_records);
                }
            }
        }
        rare_records_per_attribute
    }

    /// Calculates the number of records that contain rare combinations grouped by attribute.
    /// This might contain duplicated records for different attribute names.
    /// Unique combinations are also contained in this.
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_number_of_records_with_rare_combinations_per_attribute(
        &self,
        resolution: usize,
    ) -> RecordsCountByStringKey {
        self.calc_records_with_rare_combinations_per_attribute(resolution)
            .drain()
            .map(|(h, records)| (h, records.len()))
            .collect()
    }

    /// Calculates the percentage of records that contain rare combinations.
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_percentage_of_records_with_rare_combinations(&self, resolution: usize) -> f64 {
        if self.number_of_records > 0 {
            ((self.calc_number_of_records_with_rare_combinations(resolution) as f64)
                / (self.number_of_records as f64))
                * 100.0
        } else {
            0.0
        }
    }

    /// Calculates the number of rare combinations grouped by combination length
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_number_of_rare_combinations_by_len(
        &self,
        resolution: usize,
    ) -> AggregatedCountByLenMap {
        let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

        for (agg, count) in self.aggregates_count.iter() {
            if count.count < resolution {
                let curr_count = result.entry(agg.len()).or_insert(0);
                *curr_count += 1;
            }
        }
        result
    }

    /// Calculates the total number of rare combinations
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_number_of_rare_combinations(&self, resolution: usize) -> usize {
        self.calc_number_of_rare_combinations_by_len(resolution)
            .values()
            .sum()
    }

    /// Calculates the percentage of rare combinations grouped by combination length
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_percentage_of_rare_combinations_by_len(
        &self,
        resolution: usize,
    ) -> AggregatedMetricByLenMap {
        let total_by_len = self.calc_total_number_of_combinations_by_len();

        self.calc_number_of_rare_combinations_by_len(resolution)
            .iter()
            .filter_map(|(l, c)| {
                total_by_len
                    .get(l)
                    .map(|total_count| (*l, ((*c as f64) / (*total_count as f64)) * 100.0))
            })
            .collect::<AggregatedMetricByLenMap>()
    }

    /// Calculates the total percentage of rare combinations
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_percentage_of_rare_combinations(&self, resolution: usize) -> f64 {
        let total = self.number_of_distinct_combinations();

        if total > 0 {
            ((self.calc_number_of_rare_combinations(resolution) as f64) / (total as f64)) * 100.0
        } else {
            0.0
        }
    }

    /// Calculates the records that contain unique combinations grouped by length.
    /// This might contain duplicated records on different lengths if the record
    /// contains more than one unique combination
    pub fn calc_records_with_unique_combinations_by_len(&self) -> RecordsByLenMap {
        let mut unique_records_by_len: RecordsByLenMap = RecordsByLenMap::default();

        for (agg, count) in self.aggregates_count.iter() {
            if count.count == 1 {
                unique_records_by_len
                    .entry(agg.len())
                    .or_insert_with(RecordsSet::default)
                    .extend(&count.contained_in_records);
            }
        }
        unique_records_by_len
    }

    /// Calculates the number of records that contain unique combinations
    pub fn calc_number_of_records_with_unique_combinations(&self) -> usize {
        let mut unique_records: RecordsSet = RecordsSet::default();

        for (_l, records) in self.calc_records_with_unique_combinations_by_len().drain() {
            unique_records.extend(records);
        }
        unique_records.len()
    }

    /// Calculates the records that contain unique combinations grouped by column name.
    /// This might contain duplicated records on different column names.
    pub fn calc_records_with_unique_combinations_per_column(&self) -> RecordsByStringKey {
        let mut unique_records_per_column = RecordsByStringKey::default();

        for (agg, count) in self.aggregates_count.iter() {
            if count.count == 1 {
                for value in agg.iter() {
                    unique_records_per_column
                        .entry(self.get_original_header_name(value.column_index))
                        .or_insert_with(RecordsSet::default)
                        .extend(&count.contained_in_records);
                }
            }
        }
        unique_records_per_column
    }

    /// Calculates the number of records that contain unique combinations grouped by column name.
    /// This might contain duplicated records on different column names.
    pub fn calc_number_of_records_with_unique_combinations_per_column(
        &self,
    ) -> RecordsCountByStringKey {
        self.calc_records_with_unique_combinations_per_column()
            .drain()
            .map(|(h, records)| (h, records.len()))
            .collect()
    }

    /// Calculates the percentage of records that contain unique combinations
    pub fn calc_percentage_of_records_with_unique_combinations(&self) -> f64 {
        if self.number_of_records > 0 {
            ((self.calc_number_of_records_with_unique_combinations() as f64)
                / (self.number_of_records as f64))
                * 100.0
        } else {
            0.0
        }
    }

    /// Calculates the number of unique combinations grouped by combination length
    pub fn calc_number_of_unique_combinations_by_len(&self) -> AggregatedCountByLenMap {
        let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

        for (agg, count) in self.aggregates_count.iter() {
            if count.count == 1 {
                let curr_count = result.entry(agg.len()).or_insert(0);
                *curr_count += 1;
            }
        }
        result
    }

    /// Calculates the total number of unique combinations
    pub fn calc_number_of_unique_combinations(&self) -> usize {
        self.calc_number_of_unique_combinations_by_len()
            .values()
            .sum()
    }

    /// Calculates the percentage of unique combinations grouped by combination length
    pub fn calc_percentage_of_unique_combinations_by_len(&self) -> AggregatedMetricByLenMap {
        let total_by_len = self.calc_total_number_of_combinations_by_len();

        self.calc_number_of_unique_combinations_by_len()
            .iter()
            .filter_map(|(l, c)| {
                total_by_len
                    .get(l)
                    .map(|total_count| (*l, ((*c as f64) / (*total_count as f64)) * 100.0))
            })
            .collect::<AggregatedMetricByLenMap>()
    }

    /// Calculates the total percentage of unique combinations
    pub fn calc_percentage_of_unique_combinations(&self) -> f64 {
        let total = self.number_of_distinct_combinations();

        if total > 0 {
            ((self.calc_number_of_unique_combinations() as f64) / (total as f64)) * 100.0
        } else {
            0.0
        }
    }

    /// Calculate the records that contain unique and rare combinations grouped by length.
    /// A tuple with the `(unique, rare)` is returned.
    /// Both returned maps are ensured to only contain the records on the shortest length,
    /// so each record will appear only on the shortest combination length that isolates it
    /// within a rare group. Also, if the record has a unique combination, it will not
    /// be present on the rare map, only on the unique one.
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_records_with_unique_rare_combinations_by_len(
        &self,
        resolution: usize,
    ) -> (RecordsByLenMap, RecordsByLenMap) {
        let mut records_with_unique_combs_by_len =
            self.calc_records_with_unique_combinations_by_len();
        let mut records_with_rare_combs_by_len =
            self.calc_records_with_rare_combinations_by_len(resolution);

        AggregatedData::keep_records_only_on_shortest_len(&mut records_with_unique_combs_by_len);
        AggregatedData::keep_records_only_on_shortest_len(&mut records_with_rare_combs_by_len);

        // remove records with unique combinations from the rare map
        records_with_rare_combs_by_len
            .values_mut()
            .for_each(|records| {
                records.retain(|r| {
                    !AggregatedData::records_by_len_contains(&records_with_unique_combs_by_len, r)
                });
            });

        (
            records_with_unique_combs_by_len,
            records_with_rare_combs_by_len,
        )
    }

    /// Perform the records analysis and returns the data containing
    /// unique, rare and risky information grouped per length.
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `protect` - Whether or not the counts should be rounded to the
    /// nearest smallest multiple of resolution
    pub fn calc_records_analysis_by_len(
        &self,
        resolution: usize,
        protect: bool,
    ) -> RecordsAnalysisData {
        let (records_with_unique_combs_by_len, records_with_rare_combs_by_len) =
            self.calc_records_with_unique_rare_combinations_by_len(resolution);

        RecordsAnalysisData::from_records_with_unique_rare_combinations_by_len(
            &records_with_unique_combs_by_len,
            &records_with_rare_combs_by_len,
            self.number_of_records,
            self.reporting_length,
            resolution,
            protect,
        )
    }

    /// Calculates the number of distinct combinations grouped by combination length
    pub fn calc_total_number_of_combinations_by_len(&self) -> AggregatedCountByLenMap {
        let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

        for agg in self.aggregates_count.keys() {
            let curr_count = result.entry(agg.len()).or_insert(0);
            *curr_count += 1;
        }
        result
    }

    /// Calculates the sum of all combination counts grouped by combination length
    pub fn calc_combinations_count_sum_by_len(&self) -> AggregatedCountByLenMap {
        let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

        for (agg, count) in self.aggregates_count.iter() {
            let curr_sum = result.entry(agg.len()).or_insert(0);
            *curr_sum += count.count;
        }
        result
    }

    /// Calculates the mean of all combination counts grouped by combination length
    pub fn calc_combinations_count_mean_by_len(&self) -> AggregatedMetricByLenMap {
        let mut result = AggregatedMetricByLenMap::default();
        let comb_sums = self.calc_combinations_count_sum_by_len();
        let comb_counts = self.calc_total_number_of_combinations_by_len();

        for (l, s) in comb_sums.iter() {
            let c = comb_counts.get(l).cloned().unwrap_or(0);

            if c > 0 {
                result.insert(*l, (*s as f64) / (c as f64));
            }
        }
        result
    }

    /// Calculates the mean of all combination counts
    pub fn calc_combinations_count_mean(&self) -> f64 {
        let comb_sum: usize = self.calc_combinations_count_sum_by_len().values().sum();
        let comb_count: usize = self
            .calc_total_number_of_combinations_by_len()
            .values()
            .sum();

        if comb_count > 0 {
            (comb_sum as f64) / (comb_count as f64)
        } else {
            0.0
        }
    }

    /// Writes the aggregates counts to the file system in a csv/tsv like format
    /// # Arguments:
    /// * `aggregates_path` - File path to be written
    /// * `aggregates_delimiter` - Delimiter to use when writing to `aggregates_path`
    /// * `combination_delimiter` - Delimiter used to join combinations and format then
    /// as strings
    pub fn write_aggregates_count(
        &self,
        aggregates_path: &str,
        aggregates_delimiter: char,
        combination_delimiter: &str,
    ) -> Result<(), Error> {
        info!("writing file {}", aggregates_path);

        let _duration_logger = ElapsedDurationLogger::new("write aggregates count");

        self._write_aggregates_count(
            &mut std::io::BufWriter::new(std::fs::File::create(aggregates_path)?),
            aggregates_delimiter,
            combination_delimiter,
        )
    }

    /// Writes the aggregates counts to a string in a csv/tsv like format
    /// # Arguments:
    /// * `aggregates_delimiter` - Delimiter to used for the CSV file
    /// * `combination_delimiter` - Delimiter used to join combinations and format then
    /// as strings
    pub fn write_aggregates_to_string(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
    ) -> Result<String, Error> {
        let mut csv_aggregates = Vec::default();

        self._write_aggregates_count(
            &mut csv_aggregates,
            aggregates_delimiter,
            combination_delimiter,
        )?;

        Ok(String::from_utf8_lossy(&csv_aggregates).to_string())
    }

    /// Writes the records sensitivity to the file system in a csv/tsv like format
    /// # Arguments:
    /// * `records_sensitivity_path` - File path to be written
    /// * `records_sensitivity_delimiter` - Delimiter to use when writing to `records_sensitivity_path`
    pub fn write_records_sensitivity(
        &self,
        records_sensitivity_path: &str,
        records_sensitivity_delimiter: char,
    ) -> Result<(), Error> {
        info!("writing file: {}", records_sensitivity_path);

        let _duration_logger = ElapsedDurationLogger::new("write records sensitivity");

        let mut file = std::io::BufWriter::new(std::fs::File::create(records_sensitivity_path)?);

        file.write_all(
            self.gen_records_sensitivity_headers(records_sensitivity_delimiter)
                .as_bytes(),
        )?;

        for record_index in 0..self.number_of_records {
            file.write_all(
                self.gen_records_sensitivity_line(record_index, records_sensitivity_delimiter)
                    .as_bytes(),
            )?
        }
        Ok(())
    }

    /// Serializes the aggregated data to a json file
    /// # Arguments:
    /// * `file_path` - File path to be written
    pub fn write_to_json(&self, file_path: &str) -> Result<(), Error> {
        info!("writing file: {}", file_path);

        let _duration_logger = ElapsedDurationLogger::new("write to json");

        Ok(serde_json::to_writer(
            BufWriter::new(std::fs::File::create(file_path)?),
            &self,
        )?)
    }

    #[cfg(feature = "pyo3")]
    #[staticmethod]
    /// Deserializes the aggregated data from a json file
    /// # Arguments:
    /// * `file_path` - File path to read from
    pub fn read_from_json(file_path: &str) -> Result<AggregatedData, Error> {
        AggregatedData::_read_from_json(file_path)
    }

    #[cfg(not(feature = "pyo3"))]
    /// Deserializes the aggregated data from a json file
    /// # Arguments:
    /// * `file_path` - File path to read from
    pub fn read_from_json(file_path: &str) -> Result<AggregatedData, Error> {
        AggregatedData::_read_from_json(file_path)
    }
}
