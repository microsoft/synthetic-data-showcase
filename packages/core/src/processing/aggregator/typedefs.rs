use super::AggregatedCount;
use fnv::{FnvHashMap, FnvHashSet};

use crate::data_block::value::DataBlockValue;

/// Set of records where the key is the record index starting in 0
pub type RecordsSet = FnvHashSet<usize>;

/// Vector of data block values representing a value combination (sorted by `{header_name}:{block_value}`)
pub type ValueCombination<'data_block_value> = Vec<&'data_block_value DataBlockValue>;

/// Slice of ValueCombination
pub type ValueCombinationSlice<'data_block_value> = [&'data_block_value DataBlockValue];

/// Maps a value combination to its aggregated count
pub type AggregatesCountMap<'data_block_value> =
    FnvHashMap<ValueCombination<'data_block_value>, AggregatedCount>;

/// Maps a length (1,2,3... up to reporting length) to a determined count
pub type AggregatedCountByLenMap = FnvHashMap<usize, usize>;

/// A vector of sensitivities for each record (the vector index is the record index)
pub type RecordsSensitivity = Vec<usize>;

/// Slice of RecordsSensitivity
pub type RecordsSensitivitySlice = [usize];
