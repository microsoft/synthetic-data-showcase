use super::{preservation_bucket::PreservationBucket, typedefs::PreservationBucketsMap};
use itertools::Itertools;
use std::{
    io::{Error, Write},
    ops::{Deref, DerefMut},
};

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

use crate::processing::aggregator::{AggregatesCountMap, ValueCombination};

#[cfg_attr(feature = "pyo3", pyclass)]
/// Wrapping to store the preservation buckets grouped
/// by length
pub struct PreservationByLengthBuckets {
    buckets_map: PreservationBucketsMap,
}

impl PreservationByLengthBuckets {
    /// Returns a new default PreservationByLengthBuckets
    #[inline]
    pub fn default() -> PreservationByLengthBuckets {
        PreservationByLengthBuckets {
            buckets_map: PreservationBucketsMap::default(),
        }
    }

    #[inline]
    pub(super) fn populate(
        &mut self,
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
            // max value is 100%, so use min as syn count might be > sen_count
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
            .entry(comb.len())
            .or_insert_with(PreservationBucket::default)
            .add(preservation, comb.len(), syn_count, proportional_error);
    }
}

#[cfg_attr(feature = "pyo3", pymethods)]
impl PreservationByLengthBuckets {
    /// Returns the actual buckets grouped by length.
    /// This method will clone the data, so its recommended to have its result stored
    /// in a local variable to avoid it being called multiple times
    pub fn get_buckets(&self) -> PreservationBucketsMap {
        self.buckets_map.clone()
    }

    /// Writes the preservation grouped by length to the file system in a csv/tsv like format
    /// # Arguments:
    /// * `preservation_by_length_path` - File path to be written
    /// * `preservation_by_length_delimiter` - Delimiter to use when writing to `preservation_by_length_path`
    pub fn write_preservation_by_length(
        &mut self,
        preservation_by_length_path: &str,
        preservation_by_length_delimiter: char,
    ) -> Result<(), Error> {
        let mut file = std::io::BufWriter::new(std::fs::File::create(preservation_by_length_path)?);

        file.write_all(
            format!(
                "syn_combo_length{}mean_combo_count{}count_preservation{}mean_proportional_error\n",
                preservation_by_length_delimiter,
                preservation_by_length_delimiter,
                preservation_by_length_delimiter
            )
            .as_bytes(),
        )?;
        for length in self.buckets_map.keys().sorted() {
            let b = &self.buckets_map[length];

            file.write_all(
                format!(
                    "{}{}{}{}{}{}{}\n",
                    length,
                    preservation_by_length_delimiter,
                    b.get_mean_combination_count(),
                    preservation_by_length_delimiter,
                    b.get_mean_preservation(),
                    preservation_by_length_delimiter,
                    b.get_mean_proportional_error()
                )
                .as_bytes(),
            )?
        }
        Ok(())
    }
}

impl Deref for PreservationByLengthBuckets {
    type Target = PreservationBucketsMap;

    fn deref(&self) -> &Self::Target {
        &self.buckets_map
    }
}

impl DerefMut for PreservationByLengthBuckets {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.buckets_map
    }
}
