use super::{
    records_analysis_data::RecordsAnalysis, value_combination::ValueCombination, AggregatedCount,
};
use fnv::{FnvHashMap, FnvHashSet};
use std::sync::Arc;

use crate::data_block::{DataBlockRecord, DataBlockValue};

/// Set of records where the key is the record index starting in 0
pub type RecordsSet = FnvHashSet<usize>;

/// Maps a value combination to its aggregated count
pub type AggregatesCountMap = FnvHashMap<Arc<ValueCombination>, AggregatedCount>;

/// Maps a value combination represented as a string to its aggregated count
pub type AggregatesCountStringMap = FnvHashMap<String, usize>;

/// Maps a length (1,2,3... up to reporting length) to a determined count
pub type AggregatedCountByLenMap = FnvHashMap<usize, usize>;

/// Maps a length (1,2,3... up to reporting length) to a determined metric
pub type AggregatedMetricByLenMap = FnvHashMap<usize, f64>;

/// Maps a length (1,2,3... up to reporting length) to a record set
pub type RecordsByLenMap = FnvHashMap<usize, RecordsSet>;

/// Maps a string key to a record set
pub type RecordsByStringKey = FnvHashMap<String, RecordsSet>;

/// Maps a string key to a record count
pub type RecordsCountByStringKey = FnvHashMap<String, usize>;

/// A vector of sensitivities for each record (the vector index is the record index)
pub type RecordsSensitivity = Vec<usize>;

/// The record sensitivity calculated grouped by combination length
/// Index ALL_SENSITIVITIES_INDEX means the sum for all lengths
pub type RecordsSensitivityByLen = Vec<RecordsSensitivity>;

/// First index meaning the sum for all lengths in RecordsSensitivityByLen
pub const ALL_SENSITIVITIES_INDEX: usize = 0;

/// Slice of RecordsSensitivity
pub type RecordsSensitivitySlice = [usize];

/// Vector of tuples:
/// (index of the original record, reference to the original record)
pub type EnumeratedDataBlockRecords = Vec<(usize, Arc<DataBlockRecord>)>;

/// Map of records analysis grouped by combination len
pub type RecordsAnalysisByLenMap = FnvHashMap<usize, RecordsAnalysis>;

pub type ValueCombinationRefSet<'value> = FnvHashSet<&'value Arc<DataBlockValue>>;
