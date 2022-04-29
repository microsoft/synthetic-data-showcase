use fnv::{FnvHashMap, FnvHashSet};
use std::{collections::BTreeSet, rc::Rc, sync::Arc};

use crate::{data_block::DataBlockValue, processing::aggregator::ValueCombination};

/// If the data block value were added to the synthesized record, this maps to the
/// number of rows the resulting attribute combination will be part of
pub type AttributeCountMap = FnvHashMap<Arc<DataBlockValue>, usize>;

/// The seeds used for the current synthesis step (aka current record being processed)
pub type SynthesizerSeed = Vec<Arc<DataBlockValue>>;

/// Slice of SynthesizerSeed
pub type SynthesizerSeedSlice = [Arc<DataBlockValue>];

/// Attributes not allowed to be sampled in a particular data synthesis stage
pub type NotAllowedAttrSet = FnvHashSet<Arc<DataBlockValue>>;

/// Record synthesized at a particular stage
pub type SynthesizedRecord = BTreeSet<Arc<DataBlockValue>>;

/// Vector of synthesized records
pub type SynthesizedRecords = Vec<SynthesizedRecord>;

/// Slice of SynthesizedRecords
pub type SynthesizedRecordsSlice = [SynthesizedRecord];

/// How many attributes (of the ones available) should be added during the
/// consolidation step for the count to match the a multiple of reporting resolution
/// (rounded down)
pub type AvailableAttrsMap = FnvHashMap<Arc<DataBlockValue>, isize>;

/// Raw count for attribute combinations
pub type RawCombinationsCountMap = FnvHashMap<Rc<ValueCombination>, usize>;

/// Raw combinations set
pub type RawCombinationsSet = FnvHashSet<Rc<ValueCombination>>;
