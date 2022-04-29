use fnv::{FnvHashMap, FnvHashSet};
use std::sync::Arc;

use crate::processing::aggregator::ValueCombination;

/// Maps the record index to the combinations that should
/// have its contribution removed
pub type CombinationsToRemoveByRecord = FnvHashMap<usize, FnvHashSet<Arc<ValueCombination>>>;

/// Maps the combination length to the allowed sensitivity for each
/// length
pub type AllowedSensitivityByLen = FnvHashMap<usize, usize>;

/// Maps the record index to the initial combinations
/// generated from the record
pub type CombinationsByRecord = Vec<Vec<Arc<ValueCombination>>>;

/// Maps a value combination to its count
pub type CombinationsCountMap = FnvHashMap<Arc<ValueCombination>, f64>;

/// Maps a value combination to its count but grouped by combination
/// length
pub type CombinationsCountMapByLen = FnvHashMap<usize, CombinationsCountMap>;

/// Specifies an input value by combination length
pub type InputValueByLen<T> = FnvHashMap<usize, T>;
