use super::preservation_bucket::PreservationBucket;
use fnv::FnvHashMap;

/// Maps a value to its correspondent PreservationBucket
pub type PreservationBucketsMap = FnvHashMap<usize, PreservationBucket>;
