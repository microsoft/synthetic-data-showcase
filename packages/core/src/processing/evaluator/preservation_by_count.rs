use super::{preservation_bucket::PreservationBucket, typedefs::PreservationBucketsMap};
use itertools::Itertools;
use std::{
    io::{Error, Write},
    ops::{Deref, DerefMut},
};

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

use crate::{
    processing::aggregator::{AggregatedMetricByLenMap, AggregatesCountMap, ValueCombination},
    utils::time::ElapsedDurationLogger,
};

const INITIAL_BIN: usize = 10;
const BIN_RATIO: usize = 2;

#[cfg_attr(feature = "pyo3", pyclass)]
/// Wrapping struct mapping the max value allowed in the bucket
/// to its correspondent PreservationBucket.
/// In this context a PreservationBucket stores the preservation information
/// related to a particular bucket.
/// A bucket stores counts in a certain range value.
/// For example: (0, 10], (10, 20], (20, 40]...
pub struct PreservationByCountBuckets {
    buckets_map: PreservationBucketsMap,
}

impl PreservationByCountBuckets {
    /// Returns a new default PreservationByCountBuckets
    #[inline]
    pub fn default() -> PreservationByCountBuckets {
        PreservationByCountBuckets {
            buckets_map: PreservationBucketsMap::default(),
        }
    }

    #[inline]
    pub(super) fn populate(
        &mut self,
        bins: &PreservationByCountBucketBins,
        comb: &ValueCombination,
        sensitive_aggregates: &AggregatesCountMap,
        synthetic_aggregates: &AggregatesCountMap,
    ) {
        let sen_count = match sensitive_aggregates.get(comb) {
            Some(count) => count.count,
            _ => 0,
        };
        let syn_count = match synthetic_aggregates.get(comb) {
            Some(count) => count.count,
            _ => 0,
        };
        let preservation = if sen_count > 0 {
            // max value is 100%, so use min
            f64::min((syn_count as f64) / (sen_count as f64), 1.0)
        } else {
            0.0
        };
        let proportional_error = if sen_count > 0 {
            ((syn_count as f64) - (sen_count as f64)).abs() / (sen_count as f64)
        } else {
            1.0
        };

        self.buckets_map
            .entry(bins.find_bucket_max_val(syn_count))
            .or_insert_with(PreservationBucket::default)
            .add(preservation, comb.len(), syn_count, proportional_error);
    }
}

#[cfg_attr(feature = "pyo3", pymethods)]
impl PreservationByCountBuckets {
    /// Returns the actual buckets grouped by its max value.
    /// This method will clone the data, so its recommended to have its result stored
    /// in a local variable to avoid it being called multiple times
    pub fn get_buckets(&self) -> PreservationBucketsMap {
        self.buckets_map.clone()
    }

    /// Calculates the mean combination length by bucket
    pub fn calc_mean_combination_length_by_bucket(&self) -> AggregatedMetricByLenMap {
        let _duration_logger =
            ElapsedDurationLogger::new("mean combination length by bucket calculation");

        self.iter()
            .map(|(bucket_max, b)| (*bucket_max, b.get_mean_combination_length()))
            .collect::<AggregatedMetricByLenMap>()
    }

    /// Gets the mean proportional error between all buckets
    ///
    /// Proportional Error = `if sensitive_sensitive > 0
    /// (|synthetic_count - sensitive_sensitive| / sensitive_sensitive) else 1`
    pub fn calc_mean_proportional_error(&self) -> f64 {
        let _duration_logger = ElapsedDurationLogger::new("mean proportion error calculation");

        if !self.buckets_map.is_empty() {
            self.buckets_map
                .values()
                .map(|b| b.get_mean_proportional_error())
                .sum::<f64>()
                / (self.buckets_map.len() as f64)
        } else {
            0.0
        }
    }

    /// Calculates the mean proportional error by bucket.
    ///
    /// Proportional Error = `if sensitive_sensitive > 0
    /// (|synthetic_count - sensitive_sensitive| / sensitive_sensitive) else 1`
    pub fn calc_mean_proportional_error_by_bucket(&self) -> AggregatedMetricByLenMap {
        let _duration_logger =
            ElapsedDurationLogger::new("mean proportion error by bucket calculation");

        self.iter()
            .map(|(bucket_max, b)| (*bucket_max, b.get_mean_proportional_error()))
            .collect::<AggregatedMetricByLenMap>()
    }

    /// Writes the preservation grouped by counts to the file system in a csv/tsv like format
    /// # Arguments:
    /// * `preservation_by_count_path` - File path to be written
    /// * `preservation_by_count_delimiter` - Delimiter to use when writing to `preservation_by_count_path`
    pub fn write_preservation_by_count(
        &self,
        preservation_by_count_path: &str,
        preservation_by_count_delimiter: char,
    ) -> Result<(), Error> {
        let mut file = std::io::BufWriter::new(std::fs::File::create(preservation_by_count_path)?);

        file.write_all(
            format!(
                "syn_count_bucket{}mean_combo_count{}mean_combo_length{}count_preservation{}mean_proportional_error\n",
                preservation_by_count_delimiter,
                preservation_by_count_delimiter,
                preservation_by_count_delimiter,
                preservation_by_count_delimiter,
            )
            .as_bytes(),
        )?;
        for max_val in self.buckets_map.keys().sorted().rev() {
            let b = &self.buckets_map[max_val];

            file.write_all(
                format!(
                    "{}{}{}{}{}{}{}{}{}\n",
                    max_val,
                    preservation_by_count_delimiter,
                    b.get_mean_combination_count(),
                    preservation_by_count_delimiter,
                    b.get_mean_combination_length(),
                    preservation_by_count_delimiter,
                    b.get_mean_preservation(),
                    preservation_by_count_delimiter,
                    b.get_mean_proportional_error()
                )
                .as_bytes(),
            )?
        }
        Ok(())
    }
}

impl Deref for PreservationByCountBuckets {
    type Target = PreservationBucketsMap;

    fn deref(&self) -> &Self::Target {
        &self.buckets_map
    }
}

impl DerefMut for PreservationByCountBuckets {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.buckets_map
    }
}

/// Stores the bins for each bucket. For example:
/// [10, 20, 40, 80, 160...]
#[derive(Debug)]
pub struct PreservationByCountBucketBins {
    /// Bins where the index of the vector is the bin index,
    /// and the value is the max value count allowed on the bin
    bins: Vec<usize>,
}

impl PreservationByCountBucketBins {
    /// Generates a new PreservationByCountBucketBins with bins up to a `max_val`
    /// # Arguments
    /// * `max_val` - Max value allowed on the last bucket (inclusive)
    pub fn new(max_val: usize) -> PreservationByCountBucketBins {
        let mut bins: Vec<usize> = vec![INITIAL_BIN];
        loop {
            let last = *bins.last().unwrap();
            if last >= max_val {
                break;
            }
            bins.push(last * BIN_RATIO);
        }
        PreservationByCountBucketBins { bins }
    }

    /// Find the first `bucket_max_val` where `val >= bucket_max_val`
    /// # Arguments
    /// * `val` - Count to look in which bucket it will fit
    pub fn find_bucket_max_val(&self, val: usize) -> usize {
        // find first element x where x >= val
        self.bins[self.bins.partition_point(|x| *x < val)]
    }
}

impl Deref for PreservationByCountBucketBins {
    type Target = Vec<usize>;

    fn deref(&self) -> &Self::Target {
        &self.bins
    }
}

impl DerefMut for PreservationByCountBucketBins {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.bins
    }
}
