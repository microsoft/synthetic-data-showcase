use fnv::FnvBuildHasher;
use lru::LruCache;
use std::sync::Arc;

use crate::data_block::{CsvRecordRef, DataBlockValue};

/// Represents a key that will be stored in the cache.
/// (`columns[{column_index}] = `value` if value exists,
/// or `columns[{column_index}] = None` otherwise)
#[derive(Debug, PartialEq, Eq, Hash, Clone)]
pub struct SynthesizerCacheKey {
    /// Values for a given synthesized record are indexed by `column_index`
    /// on this vector
    columns: Vec<Option<Arc<String>>>,
}

impl SynthesizerCacheKey {
    /// Returns a new SynthesizerCacheKey
    /// # Arguments
    /// * `num_columns` - Number of columns in the data block
    /// * `records` - Synthesized record to build the key for
    #[inline]
    pub fn new<'value, I>(num_columns: usize, values: I) -> SynthesizerCacheKey
    where
        I: IntoIterator<Item = &'value Arc<DataBlockValue>>,
    {
        let mut key = SynthesizerCacheKey {
            columns: Vec::with_capacity(num_columns),
        };
        key.columns.resize_with(num_columns, || None);

        for v in values.into_iter() {
            key.columns[v.column_index] = Some(v.value.clone());
        }
        key
    }

    /// Returns a new SynthesizerCacheKey by copying the current one
    /// and adding an extra value to it
    /// # Arguments
    /// * `value` - New data block value to be added in the new key
    #[inline]
    pub fn new_with_value(&self, value: &Arc<DataBlockValue>) -> SynthesizerCacheKey {
        let mut new_key = self.clone();
        new_key.columns[value.column_index] = Some(value.value.clone());
        new_key
    }

    /// Returns whether the key contains a value for a given
    /// `column_index` or not
    /// # Arguments
    /// * `column_index` - Column index to be checked
    #[inline]
    pub fn has_column(&self, column_index: usize) -> bool {
        self.columns[column_index].is_some()
    }

    /// Maps the cache key to a CsvRecordRef
    /// # Arguments
    /// * `empty_value` - String to be used in case the `columns[column_index] == None`
    #[inline]
    pub fn format_record(&self, empty_value: &Arc<String>) -> CsvRecordRef {
        self.columns
            .iter()
            .map(|c_opt| match c_opt {
                Some(c) => (*c).clone(),
                None => empty_value.clone(),
            })
            .collect()
    }
}

/// Cache to store keys-values used during the synthesis process
pub struct SynthesizerCache<T> {
    /// LruCache to store the keys mapping to a generic type T
    cache: LruCache<SynthesizerCacheKey, T, FnvBuildHasher>,
}

impl<T> SynthesizerCache<T> {
    /// Returns a new SynthesizerCache
    /// # Arguments
    /// * `cache_max_size` - Maximum cache size allowed for the LRU
    #[inline]
    pub fn new(cache_max_size: usize) -> SynthesizerCache<T> {
        SynthesizerCache {
            cache: LruCache::with_hasher(cache_max_size, FnvBuildHasher::default()),
        }
    }

    /// Returns a reference to the value associate with key in the cache
    /// or `None` if it the key is not
    /// present
    /// # Arguments
    /// * `key` - Key to look for the value
    #[inline]
    pub fn get(&mut self, key: &SynthesizerCacheKey) -> Option<&T> {
        self.cache.get(key)
    }

    /// Inserts the value associate with key in the cache.
    /// If the key already exists in the cache, it is updated with the new value
    /// and the old value is returned. Otherwise, `None` is returned.
    /// # Arguments
    /// * `key` - Key to be inserted
    /// * `value` - Value to associated with the key
    #[inline]
    pub fn insert(&mut self, key: SynthesizerCacheKey, value: T) -> Option<T> {
        self.cache.put(key, value)
    }

    /// Clears the content of the cache
    #[inline]
    pub fn clear(&mut self) {
        self.cache.clear();
    }
}
