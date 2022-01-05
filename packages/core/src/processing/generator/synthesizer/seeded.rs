use super::{
    context::SynthesizerContext,
    seeded_rows_synthesizer::SeededRowsSynthesizer,
    typedefs::{
        AvailableAttrsMap, NotAllowedAttrSet, SynthesizedRecord, SynthesizedRecords,
        SynthesizedRecordsSlice, SynthesizerSeed, SynthesizerSeedSlice,
    },
};
use fnv::FnvHashMap;
use itertools::{izip, Itertools};
use log::info;
use rand::{prelude::SliceRandom, thread_rng};
use std::sync::Arc;

use crate::{
    data_block::{block::DataBlock, typedefs::AttributeRowsMap, value::DataBlockValue},
    utils::{
        math::{calc_percentage, iround_down},
        reporting::ReportProgress,
        threading::get_number_of_threads,
        time::ElapsedDurationLogger,
    },
};

/// Represents all the information required to perform the seeded data synthesis
pub struct SeededSynthesizer {
    /// Reference to the original data block
    data_block: Arc<DataBlock>,
    /// Maps a data block value to all the rows where it occurs
    attr_rows_map: Arc<AttributeRowsMap>,
    /// Reporting resolution used for data synthesis
    resolution: usize,
    /// Maximum cache size allowed
    cache_max_size: usize,
    /// Percentage already completed on the row synthesis step
    synthesize_percentage: f64,
    /// Percentage already completed on the consolidation step
    consolidate_percentage: f64,
    /// Percentage already completed on the suppression step
    suppress_percentage: f64,
}

impl SeededSynthesizer {
    /// Returns a new SeededSynthesizer
    /// # Arguments
    /// * `data_block` - Sensitive data to be synthesized
    /// * `attr_rows_map` - Maps a data block value to all the rows where it occurs
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    #[inline]
    pub fn new(
        data_block: Arc<DataBlock>,
        attr_rows_map: Arc<AttributeRowsMap>,
        resolution: usize,
        cache_max_size: usize,
    ) -> SeededSynthesizer {
        SeededSynthesizer {
            data_block,
            attr_rows_map,
            resolution,
            cache_max_size,
            synthesize_percentage: 0.0,
            consolidate_percentage: 0.0,
            suppress_percentage: 0.0,
        }
    }

    /// Performs the row synthesis, consolidation and suppression.
    /// Returns the synthesized records
    /// # Arguments
    /// * `progress_reporter` - Will be used to report the processing
    /// progress (`ReportProgress` trait). If `None`, nothing will be reported
    pub fn run<T>(&mut self, progress_reporter: &mut Option<T>) -> SynthesizedRecords
    where
        T: ReportProgress,
    {
        let mut synthesized_records: SynthesizedRecords = SynthesizedRecords::new();

        if !self.data_block.records.is_empty() {
            let mut rows_synthesizers: Vec<SeededRowsSynthesizer> = self.build_rows_synthesizers();

            self.synthesize_percentage = 0.0;
            self.consolidate_percentage = 0.0;
            self.suppress_percentage = 0.0;

            self.synthesize_rows(
                &mut synthesized_records,
                &mut rows_synthesizers,
                progress_reporter,
            );
            self.consolidate(
                &mut synthesized_records,
                progress_reporter,
                // use the first context to leverage already cached intersections
                &mut rows_synthesizers[0].context,
            );
            self.suppress(&mut synthesized_records, progress_reporter);
        }
        synthesized_records
    }

    #[inline]
    fn build_rows_synthesizers(&self) -> Vec<SeededRowsSynthesizer> {
        let chunk_size = ((self.data_block.records.len() as f64) / (get_number_of_threads() as f64))
            .ceil() as usize;
        let mut rows_synthesizers: Vec<SeededRowsSynthesizer> = Vec::default();

        for c in &self.data_block.records.iter().chunks(chunk_size) {
            rows_synthesizers.push(SeededRowsSynthesizer::new(
                SynthesizerContext::new(
                    self.data_block.headers.len(),
                    self.data_block.records.len(),
                    self.resolution,
                    self.cache_max_size,
                ),
                c.cloned().collect(),
                self.attr_rows_map.clone(),
            ));
        }
        rows_synthesizers
    }

    #[inline]
    fn count_not_used_attrs(
        &mut self,
        synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap {
        let mut available_attrs: AvailableAttrsMap = AvailableAttrsMap::default();

        // go through the pairs (original_record, synthesized_record) and count how many
        // attributes were not used
        for (original_record, synthesized_record) in
            izip!(self.data_block.records.iter(), synthesized_records.iter())
        {
            for d in original_record.values.iter() {
                if !synthesized_record.contains(d) {
                    let attr = available_attrs.entry(d.clone()).or_insert(0);
                    *attr += 1;
                }
            }
        }
        available_attrs
    }

    fn calc_available_attrs(
        &mut self,
        synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap {
        let mut available_attrs = self.count_not_used_attrs(synthesized_records);
        let resolution_f64 = self.resolution as f64;

        // add attributes for consolidation
        for (attr, value) in self.attr_rows_map.iter() {
            let n_rows = value.len();

            if n_rows >= self.resolution {
                let target_attr_count = iround_down(n_rows as f64, resolution_f64)
                    - (n_rows as isize)
                    + match available_attrs.get(attr) {
                        None => 0,
                        Some(v) => *v,
                    };

                if target_attr_count > 0 {
                    // insert/update the final target count
                    available_attrs.insert(attr.clone(), target_attr_count);
                } else {
                    // remove negative and zero values
                    available_attrs.remove(attr);
                }
            } else {
                // count is smaller than resolution
                // let's not use it
                available_attrs.remove(attr);
            }
        }
        available_attrs
    }

    #[inline]
    fn calc_not_allowed_attrs(
        &mut self,
        available_attrs: &mut AvailableAttrsMap,
    ) -> NotAllowedAttrSet {
        self.attr_rows_map
            .keys()
            .filter_map(|attr| match available_attrs.get(attr) {
                // not on available attributes
                None => Some(attr.clone()),
                Some(at) => {
                    if *at <= 0 {
                        // on available attributes, but count <= 0
                        Some(attr.clone())
                    } else {
                        None
                    }
                }
            })
            .collect()
    }

    #[inline]
    fn consolidate_record(
        &mut self,
        available_attrs: &mut AvailableAttrsMap,
        current_seed: &SynthesizerSeedSlice,
        context: &mut SynthesizerContext,
    ) -> SynthesizedRecord {
        let mut not_allowed_attr_set: NotAllowedAttrSet =
            self.calc_not_allowed_attrs(available_attrs);
        let mut synthesized_record = SynthesizedRecord::default();

        loop {
            let next = context.sample_next_attr_from_seed(
                &synthesized_record,
                current_seed,
                &not_allowed_attr_set,
                &self.attr_rows_map,
            );

            match next {
                None => break,
                Some(value) => {
                    let next_count = *available_attrs.get(&value).unwrap();

                    if next_count <= 1 {
                        available_attrs.remove(&value);
                        not_allowed_attr_set.insert(value.clone());
                    } else {
                        available_attrs.insert(value.clone(), next_count - 1);
                    }
                    synthesized_record.insert(value);
                }
            }
        }
        synthesized_record
    }

    fn consolidate<T>(
        &mut self,
        synthesized_records: &mut SynthesizedRecords,
        progress_reporter: &mut Option<T>,
        context: &mut SynthesizerContext,
    ) where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("consolidation");
        info!("consolidating...");

        let mut available_attrs = self.calc_available_attrs(synthesized_records);
        let current_seed: SynthesizerSeed = available_attrs.keys().cloned().collect();
        let total = available_attrs.len();
        let total_f64 = total as f64;
        let mut n_processed = 0;

        while !available_attrs.is_empty() {
            self.update_consolidate_progress(n_processed, total_f64, progress_reporter);
            synthesized_records.push(self.consolidate_record(
                &mut available_attrs,
                &current_seed,
                context,
            ));
            n_processed = total - available_attrs.len();
        }
        self.update_consolidate_progress(n_processed, total_f64, progress_reporter);
    }

    #[inline]
    fn count_synthesized_records_attrs(
        &mut self,
        synthesized_records: &mut SynthesizedRecords,
    ) -> FnvHashMap<Arc<DataBlockValue>, isize> {
        let mut current_counts: FnvHashMap<Arc<DataBlockValue>, isize> = FnvHashMap::default();

        for r in synthesized_records.iter() {
            for v in r.iter() {
                let count = current_counts.entry(v.clone()).or_insert(0);
                *count += 1;
            }
        }
        current_counts
    }

    #[inline]
    fn calc_exceeded_count_attrs(
        &mut self,
        current_counts: &FnvHashMap<Arc<DataBlockValue>, isize>,
    ) -> FnvHashMap<Arc<DataBlockValue>, isize> {
        let mut targets: FnvHashMap<Arc<DataBlockValue>, isize> = FnvHashMap::default();

        for (attr, rows) in self.attr_rows_map.iter() {
            if rows.len() >= self.resolution {
                let t =
                    current_counts[attr] - iround_down(rows.len() as f64, self.resolution as f64);
                if t > 0 {
                    targets.insert(attr.clone(), t);
                }
            }
        }
        targets
    }

    fn suppress<T>(
        &mut self,
        synthesized_records: &mut SynthesizedRecords,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("suppression");
        info!("suppressing...");

        let current_counts: FnvHashMap<Arc<DataBlockValue>, isize> =
            self.count_synthesized_records_attrs(synthesized_records);
        let mut targets: FnvHashMap<Arc<DataBlockValue>, isize> =
            self.calc_exceeded_count_attrs(&current_counts);
        let total = synthesized_records.len() as f64;
        let mut n_processed = 0;

        synthesized_records.shuffle(&mut thread_rng());

        for r in synthesized_records.iter_mut() {
            let mut new_record = SynthesizedRecord::default();

            self.update_suppress_progress(n_processed, total, progress_reporter);
            n_processed += 1;
            for attr in r.iter() {
                match targets.get(attr).cloned() {
                    None => {
                        new_record.insert(attr.clone());
                    }
                    Some(attr_count) => {
                        if attr_count == 1 {
                            targets.remove(attr);
                        } else {
                            targets.insert(attr.clone(), attr_count - 1);
                        }
                    }
                }
            }
            *r = new_record;
        }
        synthesized_records.retain(|r| !r.is_empty());
        self.update_suppress_progress(n_processed, total, progress_reporter);
    }

    fn synthesize_rows<T>(
        &mut self,
        synthesized_records: &mut SynthesizedRecords,
        rows_synthesizers: &mut Vec<SeededRowsSynthesizer>,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("rows synthesis");

        info!(
            "synthesizing rows with {} thread(s)...",
            get_number_of_threads()
        );

        let total = self.data_block.records.len() as f64;

        SeededRowsSynthesizer::synthesize_all(
            total,
            synthesized_records,
            rows_synthesizers,
            progress_reporter,
        );

        self.update_synthesize_progress(self.data_block.records.len(), total, progress_reporter);
    }

    #[inline]
    fn update_synthesize_progress<T>(
        &mut self,
        n_processed: usize,
        total: f64,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        if let Some(r) = progress_reporter {
            self.synthesize_percentage = calc_percentage(n_processed as f64, total);
            r.report(self.calc_overall_progress());
        }
    }

    #[inline]
    fn update_consolidate_progress<T>(
        &mut self,
        n_processed: usize,
        total: f64,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        if let Some(r) = progress_reporter {
            self.consolidate_percentage = calc_percentage(n_processed as f64, total);
            r.report(self.calc_overall_progress());
        }
    }

    #[inline]
    fn update_suppress_progress<T>(
        &mut self,
        n_processed: usize,
        total: f64,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        if let Some(r) = progress_reporter {
            self.suppress_percentage = calc_percentage(n_processed as f64, total);
            r.report(self.calc_overall_progress());
        }
    }

    #[inline]
    fn calc_overall_progress(&self) -> f64 {
        self.synthesize_percentage * 0.5
            + self.consolidate_percentage * 0.3
            + self.suppress_percentage * 0.2
    }
}
