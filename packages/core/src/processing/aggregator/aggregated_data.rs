use super::{
    privacy_risk_summary::PrivacyRiskSummary,
    records_analysis_data::RecordsAnalysisData,
    typedefs::{
        AggregatedCountByLenMap, AggregatesCountMap, AggregatesCountStringMap, RecordsByLenMap,
        RecordsSensitivity,
    },
};
use itertools::Itertools;
use log::info;
use serde::{Deserialize, Serialize};
use std::{
    io::{BufReader, BufWriter, Error, Write},
    sync::Arc,
};

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

use crate::{
    data_block::block::DataBlock,
    processing::aggregator::typedefs::RecordsSet,
    utils::{math::uround_down, time::ElapsedDurationLogger},
};

/// Aggregated data produced by the Aggregator
#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Serialize, Deserialize)]
pub struct AggregatedData {
    /// Data block from where this aggregated data was generated
    pub data_block: Arc<DataBlock>,
    /// Maps a value combination to its aggregated count
    pub aggregates_count: AggregatesCountMap,
    /// A vector of sensitivities for each record (the vector index is the record index)
    pub records_sensitivity: RecordsSensitivity,
    /// Maximum length used to compute attribute combinations
    pub reporting_length: usize,
}

impl AggregatedData {
    /// Creates a new AggregatedData struct with default values
    #[inline]
    pub fn default() -> AggregatedData {
        AggregatedData {
            data_block: Arc::new(DataBlock::default()),
            aggregates_count: AggregatesCountMap::default(),
            records_sensitivity: RecordsSensitivity::default(),
            reporting_length: 0,
        }
    }

    /// Creates a new AggregatedData struct
    /// # Arguments:
    /// * `data_block` - Data block with the original data
    /// * `aggregates_count` - Computed aggregates count map
    /// * `records_sensitivity` - Computed sensitivity for the records
    /// * `reporting_length` - Maximum length used to compute attribute combinations
    #[inline]
    pub fn new(
        data_block: Arc<DataBlock>,
        aggregates_count: AggregatesCountMap,
        records_sensitivity: RecordsSensitivity,
        reporting_length: usize,
    ) -> AggregatedData {
        AggregatedData {
            data_block,
            aggregates_count,
            records_sensitivity,
            reporting_length,
        }
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
        let _duration_logger = ElapsedDurationLogger::new("aggregated count json read");

        Ok(serde_json::from_reader(BufReader::new(
            std::fs::File::open(file_path)?,
        ))?)
    }

    #[inline]
    pub fn _write_aggregates_count<T: Write>(
        &self,
        writer: &mut T,
        aggregates_delimiter: char,
        combination_delimiter: &str,
        resolution: usize,
        protected: bool,
    ) -> Result<(), Error> {
        writer.write_all(
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
        writer.write_all(
            format!(
                "selections{}{}\n",
                aggregates_delimiter,
                uround_down(self.data_block.records.len() as f64, resolution as f64)
            )
            .as_bytes(),
        )?;
        for aggregate in self.aggregates_count.keys() {
            writer.write_all(
                format!(
                    "{}{}{}\n",
                    aggregate
                        .format_str_using_headers(&self.data_block.headers, combination_delimiter),
                    aggregates_delimiter,
                    self.aggregates_count[aggregate].count
                )
                .as_bytes(),
            )?
        }
        Ok(())
    }
}

#[cfg_attr(feature = "pyo3", pymethods)]
impl AggregatedData {
    /// Builds a map from value combinations formatted as string to its aggregated count
    /// This method will clone the data, so its recommended to have its result stored
    /// in a local variable to avoid it being called multiple times
    /// # Arguments:
    /// * `combination_delimiter` - Delimiter used to join combinations
    pub fn get_formatted_aggregates_count(
        &self,
        combination_delimiter: &str,
    ) -> AggregatesCountStringMap {
        self.aggregates_count
            .iter()
            .map(|(key, value)| {
                (
                    key.format_str_using_headers(&self.data_block.headers, combination_delimiter),
                    value.clone(),
                )
            })
            .collect()
    }

    #[cfg(feature = "pyo3")]
    /// A vector of sensitivities for each record (the vector index is the record index)
    /// This method will clone the data, so its recommended to have its result stored
    /// in a local variable to avoid it being called multiple times
    pub fn get_records_sensitivity(&self) -> RecordsSensitivity {
        self.records_sensitivity.clone()
    }

    /// Round the aggregated counts down to the nearest multiple of resolution
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn protect_aggregates_count(&mut self, resolution: usize) {
        let _duration_logger = ElapsedDurationLogger::new("aggregates count protect");

        info!(
            "protecting aggregates counts with resolution {}",
            resolution
        );

        for count in self.aggregates_count.values_mut() {
            count.count = uround_down(count.count as f64, resolution as f64);
        }
        // remove 0 counts from response
        self.aggregates_count.retain(|_, count| count.count > 0);
    }

    /// Calculates the records that contain rare combinations grouped by length.
    /// This might contain duplicated records on different lengths if the record
    /// contains more than one rare combination. Unique combinations are also contained
    /// in this.
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_all_rare_combinations_records_by_len(&self, resolution: usize) -> RecordsByLenMap {
        let _duration_logger =
            ElapsedDurationLogger::new("all rare combinations records by len calculation");
        let mut rare_records_by_len: RecordsByLenMap = RecordsByLenMap::default();

        for (agg, count) in self.aggregates_count.iter() {
            if count.count < resolution {
                rare_records_by_len
                    .entry(agg.len())
                    .or_insert_with(RecordsSet::default)
                    .extend(&count.contained_in_records);
            }
        }
        rare_records_by_len
    }

    /// Calculates the records that contain unique combinations grouped by length.
    /// This might contain duplicated records on different lengths if the record
    /// contains more than one unique combination.
    pub fn calc_all_unique_combinations_records_by_len(&self) -> RecordsByLenMap {
        let _duration_logger =
            ElapsedDurationLogger::new("all unique combinations records by len calculation");
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

    /// Calculate the records that contain unique and rare combinations grouped by length.
    /// A tuple with the `(unique, rare)` is returned.
    /// Both returned maps are ensured to only contain the records on the shortest length,
    /// so each record will appear only on the shortest combination length that isolates it
    /// within a rare group. Also, if the record has a unique combination, it will not
    /// be present on the rare map, only on the unique one.
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_unique_rare_combinations_records_by_len(
        &self,
        resolution: usize,
    ) -> (RecordsByLenMap, RecordsByLenMap) {
        let _duration_logger =
            ElapsedDurationLogger::new("unique/rare combinations records by len calculation");
        let mut unique_records_by_len = self.calc_all_unique_combinations_records_by_len();
        let mut rare_records_by_len = self.calc_all_rare_combinations_records_by_len(resolution);

        AggregatedData::keep_records_only_on_shortest_len(&mut unique_records_by_len);
        AggregatedData::keep_records_only_on_shortest_len(&mut rare_records_by_len);

        // remove records with unique combinations from the rare map
        rare_records_by_len.values_mut().for_each(|records| {
            records.retain(|r| !AggregatedData::records_by_len_contains(&unique_records_by_len, r));
        });

        (unique_records_by_len, rare_records_by_len)
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
        let _duration_logger = ElapsedDurationLogger::new("records analysis by len");
        let (unique_records_by_len, rare_records_by_len) =
            self.calc_unique_rare_combinations_records_by_len(resolution);

        RecordsAnalysisData::from_unique_rare_combinations_records_by_len(
            &unique_records_by_len,
            &rare_records_by_len,
            self.data_block.records.len(),
            self.reporting_length,
            resolution,
            protect,
        )
    }

    /// Calculates the number of rare combinations grouped by combination length
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_rare_combinations_count_by_len(
        &self,
        resolution: usize,
    ) -> AggregatedCountByLenMap {
        let _duration_logger =
            ElapsedDurationLogger::new("rare combinations count by len calculation");
        let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

        info!(
            "calculating rare combinations counts by length with resolution {}",
            resolution
        );

        for (agg, count) in self.aggregates_count.iter() {
            if count.count < resolution {
                let curr_count = result.entry(agg.len()).or_insert(0);
                *curr_count += 1;
            }
        }
        result
    }

    /// Calculates the number of combinations grouped by combination length
    pub fn calc_combinations_count_by_len(&self) -> AggregatedCountByLenMap {
        let _duration_logger = ElapsedDurationLogger::new("combination count by len calculation");
        let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

        info!("calculating combination counts by length");

        for agg in self.aggregates_count.keys() {
            let curr_count = result.entry(agg.len()).or_insert(0);
            *curr_count += 1;
        }
        result
    }

    /// Calculates the sum of all combination counts grouped by combination length
    pub fn calc_combinations_sum_by_len(&self) -> AggregatedCountByLenMap {
        let _duration_logger = ElapsedDurationLogger::new("combinations sum by len calculation");
        let mut result: AggregatedCountByLenMap = AggregatedCountByLenMap::default();

        info!("calculating combination counts sums by length");

        for (agg, count) in self.aggregates_count.iter() {
            let curr_sum = result.entry(agg.len()).or_insert(0);
            *curr_sum += count.count;
        }
        result
    }

    /// Calculates the privacy risk related with data block and the generated
    /// aggregates counts
    /// # Arguments:
    /// * `resolution` - Reporting resolution used for data synthesis
    pub fn calc_privacy_risk(&self, resolution: usize) -> PrivacyRiskSummary {
        let _duration_logger = ElapsedDurationLogger::new("privacy risk calculation");

        info!("calculating privacy risk...");

        PrivacyRiskSummary::from_aggregates_count(
            self.data_block.records.len(),
            &self.aggregates_count,
            resolution,
        )
    }

    /// Writes the aggregates counts to the file system in a csv/tsv like format
    /// # Arguments:
    /// * `aggregates_path` - File path to be written
    /// * `aggregates_delimiter` - Delimiter to use when writing to `aggregates_path`
    /// * `combination_delimiter` - Delimiter used to join combinations and format then
    /// as strings
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `protected` - Whether or not the counts were protected before calling this
    pub fn write_aggregates_count(
        &self,
        aggregates_path: &str,
        aggregates_delimiter: char,
        combination_delimiter: &str,
        resolution: usize,
        protected: bool,
    ) -> Result<(), Error> {
        let _duration_logger = ElapsedDurationLogger::new("write aggregates count");

        info!("writing file {}", aggregates_path);

        self._write_aggregates_count(
            &mut std::io::BufWriter::new(std::fs::File::create(aggregates_path)?),
            aggregates_delimiter,
            combination_delimiter,
            resolution,
            protected,
        )
    }

    /// Writes the aggregates counts to a string in a csv/tsv like format
    /// # Arguments:
    /// * `aggregates_delimiter` - Delimiter to used for the CSV file
    /// * `combination_delimiter` - Delimiter used to join combinations and format then
    /// as strings
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `protected` - Whether or not the counts were protected before calling this
    pub fn write_aggregates_to_string(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
        resolution: usize,
        protected: bool,
    ) -> Result<String, Error> {
        let mut csv_aggregates = Vec::default();

        self._write_aggregates_count(
            &mut csv_aggregates,
            aggregates_delimiter,
            combination_delimiter,
            resolution,
            protected,
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
        let _duration_logger = ElapsedDurationLogger::new("write records sensitivity");

        info!("writing file {}", records_sensitivity_path);

        let mut file = std::io::BufWriter::new(std::fs::File::create(records_sensitivity_path)?);

        file.write_all(
            format!(
                "record_index{}record_sensitivity\n",
                records_sensitivity_delimiter
            )
            .as_bytes(),
        )?;
        for (i, sensitivity) in self.records_sensitivity.iter().enumerate() {
            file.write_all(
                format!("{}{}{}\n", i, records_sensitivity_delimiter, sensitivity).as_bytes(),
            )?
        }
        Ok(())
    }

    /// Serializes the aggregated data to a json file
    /// # Arguments:
    /// * `file_path` - File path to be written
    pub fn write_to_json(&self, file_path: &str) -> Result<(), Error> {
        let _duration_logger = ElapsedDurationLogger::new("aggregated count json write");

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

#[cfg(feature = "pyo3")]
pub fn register(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_class::<AggregatedData>()?;
    Ok(())
}
