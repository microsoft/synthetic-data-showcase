use fnv::{FnvHashMap, FnvHashSet};
use std::collections::BTreeSet;

use crate::data_block::value::DataBlockValue;

/// If the data block value were added to the synthesized record, this maps to the
/// number of rows the resulting attribute combination will be part of
pub type AttributeCountMap<'data_block_value> =
    FnvHashMap<&'data_block_value DataBlockValue, usize>;

/// The seeds used for the current synthesis step (aka current record being processed)
pub type SynthesizerSeed<'data_block_value> = Vec<&'data_block_value DataBlockValue>;

/// Slice of SynthesizerSeed
pub type SynthesizerSeedSlice<'data_block_value> = [&'data_block_value DataBlockValue];

/// Attributes not allowed to be sampled in a particular data synthesis stage
pub type NotAllowedAttrSet<'data_block_value> = FnvHashSet<&'data_block_value DataBlockValue>;

/// Record synthesized at a particular stage
pub type SynthesizedRecord<'data_block_value> = BTreeSet<&'data_block_value DataBlockValue>;

/// Vector of synthesized records
pub type SynthesizedRecords<'data_block_value> = Vec<SynthesizedRecord<'data_block_value>>;

/// Slice of SynthesizedRecords
pub type SynthesizedRecordsSlice<'data_block_value> = [SynthesizedRecord<'data_block_value>];

/// How many attributes (of the ones available) should be added during the
/// consolidation step for the count to match the a multiple of reporting resolution
/// (rounded down)
pub type AvailableAttrsMap<'data_block_value> =
    FnvHashMap<&'data_block_value DataBlockValue, isize>;
