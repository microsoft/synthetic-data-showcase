use super::cache::{SynthesizerCache, SynthesizerCacheKey};
use super::typedefs::{
    AttributeCountMap, NotAllowedAttrSet, SynthesizedRecord, SynthesizerSeedSlice,
};
use rand::Rng;

use crate::data_block::typedefs::{AttributeRows, AttributeRowsMap, AttributeRowsSlice};
use crate::data_block::value::DataBlockValue;
use crate::utils::collections::ordered_vec_intersection;

/// Represents a synthesis context, containing the information
/// required to synthesize new records
/// (common to seeded and unseeded synthesis)
pub struct SynthesizerContext<'data_block, 'attr_rows_map> {
    /// Number of headers in the data block
    headers_len: usize,
    /// Number of records in the data block
    records_len: usize,
    /// Maps a data block value to all the rows where it occurs
    attr_rows_map: &'attr_rows_map AttributeRowsMap<'data_block>,
    /// Cache used to store the rows where value combinations occurs
    cache: SynthesizerCache<'data_block, AttributeRows>,
    /// Reporting resolution used for data synthesis
    resolution: usize,
}

impl<'data_block, 'attr_rows_map> SynthesizerContext<'data_block, 'attr_rows_map> {
    /// Returns a new SynthesizerContext
    /// # Arguments
    /// * `headers_len` - Number of headers in the data block
    /// * `records_len` - Number of records in the data block
    /// * `attr_rows_map` - Maps a data block value to all the rows where it occurs
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    #[inline]
    pub fn new(
        headers_len: usize,
        records_len: usize,
        attr_rows_map: &'attr_rows_map AttributeRowsMap<'data_block>,
        resolution: usize,
        cache_max_size: usize,
    ) -> SynthesizerContext<'data_block, 'attr_rows_map> {
        SynthesizerContext {
            headers_len,
            records_len,
            attr_rows_map,
            cache: SynthesizerCache::new(cache_max_size),
            resolution,
        }
    }

    /// Returns the configured mapping of a data block value to all
    /// the rows where it occurs
    #[inline]
    pub fn get_attr_rows_map(&self) -> &AttributeRowsMap<'data_block> {
        self.attr_rows_map
    }

    /// Returns the configured reporting resolution
    #[inline]
    pub fn get_resolution(&self) -> usize {
        self.resolution
    }

    /// Samples an attribute based on its count
    /// (the higher the count the greater the chance for the
    /// attribute to be selected).
    /// Returns `None` if all the counts are 0 or the map is empty
    /// # Arguments
    /// * `counts` - Maps an attribute to its count for sampling
    pub fn sample_from_attr_counts(
        counts: &AttributeCountMap<'data_block>,
    ) -> Option<&'data_block DataBlockValue> {
        let mut res: Option<&'data_block DataBlockValue> = None;
        let total: usize = counts.values().sum();

        if total != 0 {
            let random = if total == 1 {
                1
            } else {
                rand::thread_rng().gen_range(1..total)
            };
            let mut current_sim: usize = 0;

            for (value, count) in counts.iter() {
                current_sim += count;
                if current_sim < random {
                    res = Some(value);
                    break;
                }
                res = Some(value)
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
    pub fn sample_next_attr(
        &mut self,
        synthesized_record: &SynthesizedRecord<'data_block>,
        current_seed: &SynthesizerSeedSlice<'data_block>,
        not_allowed_attr_set: &NotAllowedAttrSet<'data_block>,
    ) -> Option<&'data_block DataBlockValue> {
        let counts =
            self.calc_next_attr_count(synthesized_record, current_seed, not_allowed_attr_set);
        SynthesizerContext::sample_from_attr_counts(&counts)
    }

    fn calc_current_attrs_rows(
        &mut self,
        cache_key: &SynthesizerCacheKey<'data_block>,
        synthesized_record: &SynthesizedRecord<'data_block>,
    ) -> AttributeRows {
        match self.cache.get(cache_key) {
            Some(cache_value) => cache_value.clone(),
            None => {
                let mut current_attrs_rows: AttributeRows = AttributeRows::new();

                if !synthesized_record.is_empty() {
                    for sr in synthesized_record.iter() {
                        current_attrs_rows = if current_attrs_rows.is_empty() {
                            self.attr_rows_map[sr].clone()
                        } else {
                            ordered_vec_intersection(&current_attrs_rows, &self.attr_rows_map[sr])
                        }
                    }
                } else {
                    current_attrs_rows = (0..self.records_len).collect();
                }
                self.cache
                    .insert(cache_key.clone(), current_attrs_rows.clone());
                current_attrs_rows
            }
        }
    }

    fn gen_attr_count_map(
        &mut self,
        cache_key: &mut SynthesizerCacheKey<'data_block>,
        current_seed: &SynthesizerSeedSlice<'data_block>,
        current_attrs_rows: &AttributeRowsSlice,
        not_allowed_attr_set: &NotAllowedAttrSet<'data_block>,
    ) -> AttributeCountMap<'data_block> {
        let mut attr_count_map: AttributeCountMap = AttributeCountMap::default();

        for value in current_seed.iter() {
            // if attribute has been already processed or is not
            // allowed, skip
            if !cache_key.has_column(value.column_index) && !not_allowed_attr_set.contains(value) {
                let new_cache_key = cache_key.new_with_value(value);
                let count = match self.cache.get(&new_cache_key) {
                    Some(cached_value) => cached_value.len(),
                    None => {
                        let intersection = ordered_vec_intersection(
                            current_attrs_rows,
                            self.attr_rows_map.get(value).unwrap(),
                        );
                        let count = intersection.len();

                        self.cache.insert(new_cache_key, intersection);
                        count
                    }
                };

                if count >= self.resolution {
                    attr_count_map.insert(value, count);
                }
            }
        }
        attr_count_map
    }

    fn calc_next_attr_count(
        &mut self,
        synthesized_record: &SynthesizedRecord<'data_block>,
        current_seed: &SynthesizerSeedSlice<'data_block>,
        not_allowed_attr_set: &NotAllowedAttrSet<'data_block>,
    ) -> AttributeCountMap<'data_block> {
        let mut cache_key = SynthesizerCacheKey::new(self.headers_len, synthesized_record);
        let current_attrs_rows = self.calc_current_attrs_rows(&cache_key, synthesized_record);

        self.gen_attr_count_map(
            &mut cache_key,
            current_seed,
            &current_attrs_rows,
            not_allowed_attr_set,
        )
    }
}
