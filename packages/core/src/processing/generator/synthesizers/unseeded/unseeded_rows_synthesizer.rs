use rand::{prelude::SliceRandom, thread_rng};
use std::sync::Arc;

use crate::{
    data_block::{
        AttributeRows, AttributeRowsByColumnMap, AttributeRowsRefMap, AttributeRowsSlice,
        DataBlock, DataBlockValue,
    },
    processing::{
        aggregator::RecordsSet,
        generator::synthesizers::{
            cache::{SynthesizerCache, SynthesizerCacheKey},
            typedefs::{AttributeCountMap, SynthesizedRecord, SynthesizedRecords},
        },
    },
    utils::{
        collections::{flat_map_unwrap_or_default, ordered_vec_intersection, sample_weighted},
        reporting::{SendableProgressReporter, SendableProgressReporterRef, StoppableResult},
    },
};

#[cfg(feature = "rayon")]
use rayon::prelude::*;

#[cfg(feature = "rayon")]
use std::sync::Mutex;

use crate::utils::reporting::ReportProgress;

pub struct UnseededRowsSynthesizer {
    cache: SynthesizerCache<Arc<AttributeRows>>,
    data_block: Arc<DataBlock>,
    resolution: usize,
    chunk_size: usize,
    column_indexes: Vec<usize>,
    attr_rows_map_by_column: Arc<AttributeRowsByColumnMap>,
    empty_value: Arc<String>,
}

impl UnseededRowsSynthesizer {
    #[inline]
    pub fn new(
        cache: SynthesizerCache<Arc<AttributeRows>>,
        data_block: Arc<DataBlock>,
        resolution: usize,
        chunk_size: usize,
        attr_rows_map_by_column: Arc<AttributeRowsByColumnMap>,
        empty_value: Arc<String>,
    ) -> UnseededRowsSynthesizer {
        UnseededRowsSynthesizer {
            cache,
            data_block,
            resolution,
            chunk_size,
            column_indexes: attr_rows_map_by_column.keys().cloned().collect(),
            attr_rows_map_by_column,
            empty_value,
        }
    }

    #[cfg(feature = "rayon")]
    #[inline]
    pub fn synthesize_all<T>(
        total: f64,
        synthesized_records: &mut SynthesizedRecords,
        rows_synthesizers: &mut Vec<UnseededRowsSynthesizer>,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<()>
    where
        T: ReportProgress,
    {
        let sendable_pr = Arc::new(Mutex::new(
            progress_reporter
                .as_mut()
                .map(|r| SendableProgressReporter::new(total, 1.0, r)),
        ));

        synthesized_records.extend(flat_map_unwrap_or_default(
            rows_synthesizers
                .par_iter_mut()
                .map(|rs| rs.synthesize_rows(&mut sendable_pr.clone()))
                .collect(),
        )?);

        Ok(())
    }

    #[cfg(not(feature = "rayon"))]
    #[inline]
    pub fn synthesize_all<T>(
        total: f64,
        synthesized_records: &mut SynthesizedRecords,
        rows_synthesizers: &mut Vec<UnseededRowsSynthesizer>,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<()>
    where
        T: ReportProgress,
    {
        let mut sendable_pr = progress_reporter
            .as_mut()
            .map(|r| SendableProgressReporter::new(total, 1.0, r));

        synthesized_records.extend(flat_map_unwrap_or_default(
            rows_synthesizers
                .iter_mut()
                .map(|rs| rs.synthesize_rows(&mut sendable_pr))
                .collect(),
        )?);

        Ok(())
    }

    #[inline]
    fn synthesize_rows<T>(
        &mut self,
        progress_reporter: &mut SendableProgressReporterRef<T>,
    ) -> StoppableResult<SynthesizedRecords>
    where
        T: ReportProgress,
    {
        let mut synthesized_records = SynthesizedRecords::default();
        let mut shuffled_column_indexes = self.column_indexes.clone();

        for _ in 0..self.chunk_size {
            shuffled_column_indexes.shuffle(&mut thread_rng());
            synthesized_records.push(self.synthesize_row(&shuffled_column_indexes));
            SendableProgressReporter::update_progress(progress_reporter, 1.0)?;
        }
        Ok(synthesized_records)
    }

    #[inline]
    fn synthesize_row(&mut self, shuffled_column_indexes: &[usize]) -> SynthesizedRecord {
        let mut synthesized_record = SynthesizedRecord::default();
        let mut current_attrs_rows: Arc<AttributeRows> =
            Arc::new((0..self.data_block.number_of_records()).collect());

        for column_index in shuffled_column_indexes.iter() {
            if let Some((next_attrs_rows, sample)) = self.sample_next_attr_from_column(
                &synthesized_record,
                *column_index,
                &current_attrs_rows,
            ) {
                current_attrs_rows = next_attrs_rows;
                synthesized_record.insert(sample);
            }
        }
        synthesized_record
    }

    #[inline]
    fn sample_next_attr_from_column(
        &mut self,
        synthesized_record: &SynthesizedRecord,
        column_index: usize,
        current_attrs_rows: &AttributeRowsSlice,
    ) -> Option<(Arc<AttributeRows>, Arc<DataBlockValue>)> {
        let cache_key = SynthesizerCacheKey::new(self.data_block.headers.len(), synthesized_record);
        let empty_block_value =
            Arc::new(DataBlockValue::new(column_index, self.empty_value.clone()));
        let mut values_to_sample: AttributeRowsRefMap = AttributeRowsRefMap::default();
        let mut counts = AttributeCountMap::default();

        // calculate the row intersections for each value in the column
        for (value, rows) in self.attr_rows_map_by_column[&column_index].iter() {
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

        sample_weighted(&counts).map(|sampled_value| {
            (
                values_to_sample.remove(&sampled_value).unwrap(),
                sampled_value,
            )
        })
    }
}
