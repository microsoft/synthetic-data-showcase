use std::ops::{Deref, DerefMut};

const INITIAL_BIN: usize = 10;
const BIN_RATIO: usize = 2;

/// Stores the preservation information related to a particular bucket.
/// A bucket stores count in a certain range value.
/// For example: (0, 10], (10, 20], (20, 40]...
#[derive(Debug)]
pub struct PreservationByCountBucket {
    /// How many elements are stored in the bucket
    pub size: usize,
    /// Preservation sum of all elements in the bucket
    pub preservation_sum: f64,
    /// Combination length sum of all elements in the bucket
    pub length_sum: usize,
}

impl PreservationByCountBucket {
    /// Return a new PreservationByCountBucket with default values
    pub fn default() -> PreservationByCountBucket {
        PreservationByCountBucket {
            size: 0,
            preservation_sum: 0.0,
            length_sum: 0,
        }
    }

    /// Adds a new value to the bucket
    /// # Arguments
    /// * `preservation` - Preservation related to the value
    /// * `length` - Combination length related to the value
    pub fn add(&mut self, preservation: f64, length: usize) {
        self.size += 1;
        self.preservation_sum += preservation;
        self.length_sum += length;
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
