use super::bucket::PreservationByCountBucket;
use fnv::FnvHashMap;

/// Maps the max value allowed in the bucket to its
/// correspondent PreservationByCountBucket
pub type PreservationByCountBuckets = FnvHashMap<usize, PreservationByCountBucket>;
