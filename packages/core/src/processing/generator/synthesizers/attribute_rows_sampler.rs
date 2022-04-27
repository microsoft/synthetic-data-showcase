use super::cache::{SynthesizerCache, SynthesizerCacheKey};
use super::typedefs::{
    AttributeCountMap, NotAllowedAttrSet, SynthesizedRecord, SynthesizerSeedSlice,
};
use std::sync::Arc;

use crate::data_block::{
    AttributeRows, AttributeRowsMap, AttributeRowsSlice, DataBlock, DataBlockValue,
};
use crate::utils::collections::{ordered_vec_intersection, sample_weighted};

/// Attributes rows samples. This will sample records from a seed,
/// respecting the attribute rows ids distributions
pub struct AttributeRowsSampler {
    /// Number of headers in the data block
    pub headers_len: usize,
    /// Number of records in the data block
    pub records_len: usize,
    /// Cache used to store the rows where value combinations occurs
    cache: SynthesizerCache<Arc<AttributeRows>>,
    /// Reporting resolution used for data synthesis
    resolution: usize,
}

impl AttributeRowsSampler {
    /// Returns a new AttributeRowsSampler
    /// # Arguments
    /// * `data_block` - Reference to the original data block
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache` - Cache to store attribute intersections and speedup the processing
    #[inline]
    pub fn new(
        data_block: Arc<DataBlock>,
        resolution: usize,
        cache: SynthesizerCache<Arc<AttributeRows>>,
    ) -> AttributeRowsSampler {
        AttributeRowsSampler {
            headers_len: data_block.headers.len(),
            records_len: data_block.records.len(),
            cache,
            resolution,
        }
    }

    /// Clears the content of the cache
    #[inline]
    pub fn clear_cache(&mut self) {
        self.cache.clear();
    }

    /// Samples the next attribute from the `current_seed` record.
    /// Returns `None` if nothing more can be sampled.
    /// # Arguments
    /// * `synthesized_record` - Record synthesized so far
    /// * `current_seed` - Current seed/record used for sampling
    /// * `not_allowed_attr_set` - Attributes not allowed to be sampled
    /// * `attr_rows_map` - Maps a data block value to all the rows where it occurs
    #[inline]
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
        sample_weighted(&counts)
    }

    #[inline]
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
                let current_attrs_rows_arc = Arc::new(current_attrs_rows);

                self.cache
                    .insert(cache_key.clone(), current_attrs_rows_arc.clone());
                current_attrs_rows_arc
            }
        }
    }

    #[inline]
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

    #[inline]
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
