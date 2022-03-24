use fnv::FnvHashMap;
use std::sync::Arc;

use crate::processing::aggregator::value_combination::ValueCombination;

/// Maps the record index to the combinations that should
/// have its contribution removed
pub type CombinationsToRemoveByRecord = FnvHashMap<usize, Vec<Arc<ValueCombination>>>;

/// Maps the combination length to the allowed sensitivity for each
/// length
pub type AllowedSensitivityByLen = FnvHashMap<usize, usize>;

/// Maps the record index to the initial combinations
/// generated from the record
pub type CombinationsByRecord = Vec<Vec<Arc<ValueCombination>>>;
