use super::cache::{SynthesizerCache, SynthesizerCacheKey};
use super::typedefs::{
    AttributeCountMap, NotAllowedAttrSet, SynthesizedRecord, SynthesizerSeedSlice,
};
use itertools::Itertools;
use rand::Rng;
use std::sync::Arc;

use crate::data_block::typedefs::{
    AttributeRows, AttributeRowsByColumnMap, AttributeRowsMap, AttributeRowsRefMap,
    AttributeRowsSlice,
};
use crate::data_block::value::DataBlockValue;
use crate::processing::aggregator::typedefs::RecordsSet;
use crate::utils::collections::ordered_vec_intersection;

/// Represents a synthesis context, containing the information
/// required to synthesize new records
/// (common to seeded and unseeded synthesis)
pub struct SynthesizerContext {
    /// Number of headers in the data block
    pub headers_len: usize,
    /// Number of records in the data block
    pub records_len: usize,
    /// Cache used to store the rows where value combinations occurs
    cache: SynthesizerCache<Arc<AttributeRows>>,
    /// Reporting resolution used for data synthesis
    resolution: usize,
}

impl SynthesizerContext {
    /// Returns a new SynthesizerContext
    /// # Arguments
    /// * `headers_len` - Number of headers in the data block
    /// * `records_len` - Number of records in the data block
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    #[inline]
    pub fn new(
        headers_len: usize,
        records_len: usize,
        resolution: usize,
        cache_max_size: usize,
    ) -> SynthesizerContext {
        SynthesizerContext {
            headers_len,
            records_len,
            cache: SynthesizerCache::new(cache_max_size),
            resolution,
        }
    }

    /// Samples an attribute based on its count
    /// (the higher the count the greater the chance for the
    /// attribute to be selected).
    /// Returns `None` if all the counts are 0 or the map is empty
    /// # Arguments
    /// * `counts` - Maps an attribute to its count for sampling
    pub fn sample_from_attr_counts(counts: &AttributeCountMap) -> Option<Arc<DataBlockValue>> {
        let mut res: Option<Arc<DataBlockValue>> = None;
        let total: usize = counts.values().sum();

        if total != 0 {
            let random = rand::thread_rng().gen_range(1..=total);
            let mut current_sum: usize = 0;

            for (value, count) in counts.iter().sorted_by_key(|(_, c)| **c) {
                if *count > 0 {
                    current_sum += count;
                    res = Some(value.clone());
                    if current_sum >= random {
                        break;
                    }
                }
            }
        }
        res
    }

    /// Samples the next attribute from the `current_seed` record.
    /// Returns `None` if nothing more can be sampled.
    /// # Arguments
    /// * `synthesized_record` - Record synthesized so far
    /// * `current_seed` - Current seed/record used for sampling
    /// * `not_allowed_attr_set` - Attributes not allowed to be sampled
    /// * `attr_rows_map` - Maps a data block value to all the rows where it occurs
    pub fn sample_next_attr_from_seed(
        &mut self,
        synthesized_record: &SynthesizedRecord,
        current_seed: &SynthesizerSeedSlice,
        not_allowed_attr_set: &NotAllowedAttrSet,
        attr_rows_map: &AttributeRowsMap,
    ) -> Option<Arc<DataBlockValue>> {
        let counts = self.calc_next_attr_count(
            synthesized_record,
            current_seed,
            not_allowed_attr_set,
            attr_rows_map,
        );
        SynthesizerContext::sample_from_attr_counts(&counts)
    }

    /// Samples the next attribute from the column at `column_index`.
    /// Returns a tuple with
    /// (intersection of `current_attrs_rows` and rows that sampled value appear, sampled value)
    /// # Arguments
    /// * `synthesized_record` - Record synthesized so far
    /// * `column_index` - Index of the column to sample from
    /// * `attr_rows_map_by_column` - Maps the column index -> data block value -> rows where the value appear
    /// * `current_attrs_rows` - Rows where the so far sampled combination appear
    /// * `empty_value` - Empty values on the synthetic data will be represented by this
    pub fn sample_next_attr_from_column(
        &mut self,
        synthesized_record: &SynthesizedRecord,
        column_index: usize,
        attr_rows_map_by_column: &AttributeRowsByColumnMap,
        current_attrs_rows: &AttributeRowsSlice,
        empty_value: &Arc<String>,
    ) -> Option<(Arc<AttributeRows>, Arc<DataBlockValue>)> {
        let cache_key = SynthesizerCacheKey::new(self.headers_len, synthesized_record);
        let empty_block_value = Arc::new(DataBlockValue::new(column_index, empty_value.clone()));
        let mut values_to_sample: AttributeRowsRefMap = AttributeRowsRefMap::default();
        let mut counts = AttributeCountMap::default();

        // calculate the row intersections for each value in the column
        for (value, rows) in attr_rows_map_by_column[&column_index].iter() {
            let new_cache_key = cache_key.new_with_value(value);
            let rows_intersection = match self.cache.get(&new_cache_key) {
                Some(cached_value) => cached_value.clone(),
                None => {
                    let intersection = Arc::new(ordered_vec_intersection(current_attrs_rows, rows));
                    self.cache.insert(new_cache_key, intersection.clone());
                    intersection
                }
            };
            values_to_sample.insert(value.clone(), rows_intersection);
        }

        // store the rows with empty values
        let mut rows_with_empty_values: RecordsSet = values_to_sample[&empty_block_value]
            .iter()
            .cloned()
            .collect();

        for (value, rows) in values_to_sample.iter() {
            if rows.len() < self.resolution {
                // if the combination containing the attribute appears in less
                // than resolution rows, we can't use it so we tag it as an empty value
                rows_with_empty_values.extend(rows.iter());
            } else if **value != *empty_block_value {
                // if we can use the combination containing the attribute
                // gather its count for sampling
                counts.insert(value.clone(), rows.len());
            }
        }

        // if there are empty values that can be sampled, add them for sampling
        if !rows_with_empty_values.is_empty() {
            counts.insert(empty_block_value, rows_with_empty_values.len());
        }

        Self::sample_from_attr_counts(&counts).map(|sampled_value| {
            (
                values_to_sample.remove(&sampled_value).unwrap(),
                sampled_value,
            )
        })
    }

    fn calc_current_attrs_rows(
        &mut self,
        cache_key: &SynthesizerCacheKey,
        synthesized_record: &SynthesizedRecord,
        attr_rows_map: &AttributeRowsMap,
    ) -> Arc<AttributeRows> {
        match self.cache.get(cache_key) {
            Some(cache_value) => cache_value.clone(),
            None => {
                let mut current_attrs_rows: AttributeRows = AttributeRows::new();
                let current_attrs_rows_arc: Arc<AttributeRows>;

                if !synthesized_record.is_empty() {
                    for sr in synthesized_record.iter() {
                        current_attrs_rows = if current_attrs_rows.is_empty() {
                            attr_rows_map[sr].clone()
                        } else {
                            ordered_vec_intersection(&current_attrs_rows, &attr_rows_map[sr])
                        }
                    }
                } else {
                    current_attrs_rows = (0..self.records_len).collect();
                }
                current_attrs_rows_arc = Arc::new(current_attrs_rows);

                self.cache
                    .insert(cache_key.clone(), current_attrs_rows_arc.clone());
                current_attrs_rows_arc
            }
        }
    }

    fn gen_attr_count_map(
        &mut self,
        cache_key: &SynthesizerCacheKey,
        current_seed: &SynthesizerSeedSlice,
        current_attrs_rows: &AttributeRowsSlice,
        not_allowed_attr_set: &NotAllowedAttrSet,
        attr_rows_map: &AttributeRowsMap,
    ) -> AttributeCountMap {
        let mut attr_count_map: AttributeCountMap = AttributeCountMap::default();

        for value in current_seed.iter() {
            // if attribute has been already processed or is not
            // allowed, skip
            if !cache_key.has_column(value.column_index) && !not_allowed_attr_set.contains(value) {
                let new_cache_key = cache_key.new_with_value(value);
                let count = match self.cache.get(&new_cache_key) {
                    Some(cached_value) => cached_value.len(),
                    None => {
                        let intersection = Arc::new(ordered_vec_intersection(
                            current_attrs_rows,
                            attr_rows_map.get(value).unwrap(),
                        ));
                        let count = intersection.len();

                        self.cache.insert(new_cache_key, intersection);
                        count
                    }
                };

                if count >= self.resolution {
                    attr_count_map.insert(value.clone(), count);
                }
            }
        }
        attr_count_map
    }

    fn calc_next_attr_count(
        &mut self,
        synthesized_record: &SynthesizedRecord,
        current_seed: &SynthesizerSeedSlice,
        not_allowed_attr_set: &NotAllowedAttrSet,
        attr_rows_map: &AttributeRowsMap,
    ) -> AttributeCountMap {
        let cache_key = SynthesizerCacheKey::new(self.headers_len, synthesized_record);
        let current_attrs_rows =
            self.calc_current_attrs_rows(&cache_key, synthesized_record, attr_rows_map);

        self.gen_attr_count_map(
            &cache_key,
            current_seed,
            &current_attrs_rows,
            not_allowed_attr_set,
            attr_rows_map,
        )
    }
}
