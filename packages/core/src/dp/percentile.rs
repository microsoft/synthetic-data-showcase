use fnv::FnvHashMap;
use itertools::Itertools;
use rand::prelude::Distribution;
use statrs::{
    distribution::Exp,
    statistics::{Data, OrderStatistics},
};
use std::{cmp::Ordering, ops::RangeInclusive};

/// Structure to select positive integers based on a vector using
/// differential privacy percentiles.
///
/// The vector contains `n` numbers in a range of `[0, M]`. The k-th percentile is defined as
/// the smallest number in the range `[0, M]` that at last `k %` of all numbers are less than or equal to it.
///
/// For every number in the range `[0,M]`, it's quality score is defined as `-1 * ` { number of elements in the original
/// vector that need to change their values for the current element to became the k-th percentile }`.
pub struct DpPercentile {
    data: Vec<usize>,
}

impl DpPercentile {
    #[inline]
    /// Creates a new `DpPercentile` for the vector `data` given as parameter
    pub fn new(mut data: Vec<usize>) -> DpPercentile {
        data.sort_unstable();
        DpPercentile { data }
    }

    /// Calculates the raw quality scores for the k-th percentile and returns an iterator
    /// to them.
    /// # Arguments
    /// * `percentage` - percentage used to calculate the percentile
    pub fn kth_percentile_quality_scores_iter(&self, percentage: usize) -> QualityScoreIter {
        if self.data.is_empty() {
            return QualityScoreIter::default();
        }

        // since we are only working with integers it is safe to take the floor
        let percentile = Data::new(self.data.iter().map(|d| *d as f64).collect_vec())
            .percentile(percentage)
            .floor() as usize;
        // in the sorted vector, find the last element index where element <= percentile
        let percentile_index = self.data.partition_point(|d| *d <= percentile) - 1;
        let percentile_value = self.data[percentile_index];

        self.build_quality_scores_iter(
            percentage as f64 / 100.0,
            percentile_value,
            percentile_index as isize,
        )
    }

    /// Returns a map of a value in input vector for the maximum index (last index)
    /// there the value occurs
    fn build_max_index_map(&self) -> FnvHashMap<usize, isize> {
        let mut max_indexes: FnvHashMap<usize, isize> = FnvHashMap::default();

        for (i, value) in self.data.iter().enumerate() {
            let entry = max_indexes.entry(*value).or_default();
            *entry = i as isize;
        }
        max_indexes
    }

    fn build_quality_scores_iter(
        &self,
        percentage_proportion: f64,
        percentile_value: usize,
        percentile_index: isize,
    ) -> QualityScoreIter {
        let last_index = *self.data.iter().max().unwrap();
        let data_len_float = self.data.len() as f64;
        let max_indexes = self.build_max_index_map();

        QualityScoreIter {
            last_index,
            indexes_range_opt: Some(0..=last_index),
            data_len_float,
            percentage_proportion,
            percentile_value,
            percentile_index,
            max_indexes,
            last_processed_opt: None,
        }
    }
}

/// Iterator for Quality scores. This should allow iterating through the
/// quality scores for a given input vector.
///
/// `.enumerate()` should return `(relative_value, score)`:
/// * `relative_value`: value in the range `[0, M]`
/// * `score`: score related to the `relative_value`
pub struct QualityScoreIter {
    last_index: usize,
    indexes_range_opt: Option<RangeInclusive<usize>>,
    data_len_float: f64,
    percentage_proportion: f64,
    percentile_value: usize,
    percentile_index: isize,
    max_indexes: FnvHashMap<usize, isize>,
    last_processed_opt: Option<isize>,
}

impl Default for QualityScoreIter {
    fn default() -> Self {
        Self {
            last_index: 0,
            indexes_range_opt: None,
            data_len_float: 0.0,
            percentage_proportion: 0.0,
            percentile_value: 0,
            percentile_index: 0,
            max_indexes: FnvHashMap::default(),
            last_processed_opt: None,
        }
    }
}

impl QualityScoreIter {
    /// Consumes the quality iterator, applying exponential noise with scale of
    /// `epsilon / 2` and selecting the `relative_value` with highest `score + noise`.
    pub fn get_noisy_max(&mut self, epsilon: f64) -> Option<usize> {
        let noise = Exp::new(epsilon / 2.0).ok()?;
        let mut r = rand::thread_rng();
        let mut max_score: Option<(usize, f64)> = None;

        for (i, score) in self.enumerate() {
            let noisy_score = (score as f64) + noise.sample(&mut r);

            max_score = Some(if let Some((related_value, score)) = max_score {
                if noisy_score > score {
                    // if the current element has a bigger noisy score, select it
                    (i, noisy_score)
                } else {
                    // otherwise, keep using the last found max
                    (related_value, score)
                }
            } else {
                // if no max was set yet, use the current value
                (i, noisy_score)
            })
        }

        max_score.map(|(related_value, _)| related_value)
    }
}

impl Iterator for QualityScoreIter {
    type Item = isize;

    /// Returns the next quality score for the element in the range `[0, M]`
    fn next(&mut self) -> Option<Self::Item> {
        if let Some(indexes_range) = &mut self.indexes_range_opt {
            if let Some(i) = indexes_range.next() {
                self.last_processed_opt = Some(match i.cmp(&self.percentile_value) {
                    // items before the percentile element
                    Ordering::Less => {
                        if let Some(max_index) = self.max_indexes.get(&i) {
                            // the value is present on the input vector
                            // the `percentile_index - max_index` on the sorted
                            // input will be the base quality score
                            self.percentile_index - max_index
                        } else if let Some(last_processed) = self.last_processed_opt {
                            // the value is not present on the input vector
                            // and we already processed something, the quality
                            // score will be the same as the last processed
                            isize::max(last_processed, 1)
                        } else {
                            // the value is the first processed and is not present on the input
                            // vector, the quality score will be `input_len * percentile %`
                            (self.data_len_float * self.percentage_proportion).ceil() as isize
                        }
                    }
                    // the percentile element has quality score of zero by design
                    Ordering::Equal => 0,
                    // items after the percentile element
                    Ordering::Greater => {
                        if i == self.last_index {
                            // the last element has always a quality score of `input_len * (100 - percentile)%`
                            (self.data_len_float * (1.0 - self.percentage_proportion)).ceil()
                                as isize
                        } else if let Some(max_index) = self.max_indexes.get(&i) {
                            // the value is present on the input vector
                            // the `max_index - percentile_index` on the sorted
                            // input will be the base quality score
                            max_index - self.percentile_index
                        } else {
                            // the value is not present on the input vector
                            // and we already processed something, the quality
                            // score will be the same as the last processed
                            // this is never the first element, so it is safe to unwrap
                            isize::max(self.last_processed_opt.unwrap(), 1)
                        }
                    }
                });
                // the quality score is actually negative
                // (as far away from the percentile element, worst the score)
                return self.last_processed_opt.map(|v| -v);
            }
        }
        None
    }
}
