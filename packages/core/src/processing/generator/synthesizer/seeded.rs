use super::{
    context::SynthesizerContext,
    typedefs::{
        AvailableAttrsMap, NotAllowedAttrSet, SynthesizedRecord, SynthesizedRecords,
        SynthesizedRecordsSlice, SynthesizerSeed, SynthesizerSeedSlice,
    },
};
use fnv::FnvHashMap;
use itertools::izip;
use log::Level::Trace;
use log::{info, log_enabled, trace};
use rand::{prelude::SliceRandom, thread_rng};
use std::time::Duration;

use crate::{
    data_block::{
        block::DataBlock,
        record::DataBlockRecord,
        typedefs::{AttributeRowsMap, DataBlockRecords},
        value::DataBlockValue,
    },
    measure_time,
    utils::{
        math::{calc_percentage, iround_down},
        reporting::ReportProgress,
        time::ElapsedDuration,
    },
};

#[derive(Debug)]
struct SeededSynthesizerDurations {
    consolidate: Duration,
    suppress: Duration,
    synthesize_rows: Duration,
}

/// Represents all the information required to perform the seeded data synthesis
pub struct SeededSynthesizer<'data_block, 'attr_rows_map> {
    /// Records to be synthesized
    pub records: &'data_block DataBlockRecords,
    /// Context used for the synthesis process
    pub context: SynthesizerContext<'data_block, 'attr_rows_map>,
    /// Percentage already completed on the row synthesis step
    synthesize_percentage: f64,
    /// Percentage already completed on the consolidation step
    consolidate_percentage: f64,
    /// Percentage already completed on the suppression step
    suppress_percentage: f64,
    /// Elapsed durations on each step for benchmarking
    durations: SeededSynthesizerDurations,
}

impl<'data_block, 'attr_rows_map> SeededSynthesizer<'data_block, 'attr_rows_map> {
    /// Returns a new SeededSynthesizer
    /// # Arguments
    /// * `data_block` - Sensitive data to be synthesized
    /// * `attr_rows_map` - Maps a data block value to all the rows where it occurs
    /// * `resolution` - Reporting resolution used for data synthesis
    /// * `cache_max_size` - Maximum cache size allowed
    #[inline]
    pub fn new(
        data_block: &'data_block DataBlock,
        attr_rows_map: &'attr_rows_map AttributeRowsMap<'data_block>,
        resolution: usize,
        cache_max_size: usize,
    ) -> SeededSynthesizer<'data_block, 'attr_rows_map> {
        SeededSynthesizer {
            records: &data_block.records,
            context: SynthesizerContext::new(
                data_block.headers.len(),
                data_block.records.len(),
                attr_rows_map,
                resolution,
                cache_max_size,
            ),
            synthesize_percentage: 0.0,
            consolidate_percentage: 0.0,
            suppress_percentage: 0.0,
            durations: SeededSynthesizerDurations {
                consolidate: Duration::default(),
                suppress: Duration::default(),
                synthesize_rows: Duration::default(),
            },
        }
    }

    /// Performs the row synthesis, consolidation and suppression.
    /// Returns the synthesized records
    /// # Arguments
    /// * `progress_reporter` - Will be used to report the processing
    /// progress (`ReportProgress` trait). If `None`, nothing will be reported
    pub fn run<T>(&mut self, progress_reporter: &mut Option<T>) -> SynthesizedRecords<'data_block>
    where
        T: ReportProgress,
    {
        let mut synthesized_records: SynthesizedRecords<'data_block> = SynthesizedRecords::new();

        self.synthesize_percentage = 0.0;
        self.consolidate_percentage = 0.0;
        self.suppress_percentage = 0.0;

        self.synthesize_rows(&mut synthesized_records, progress_reporter);
        self.consolidate(&mut synthesized_records, progress_reporter);
        self.suppress(&mut synthesized_records, progress_reporter);

        synthesized_records
    }

    #[inline]
    fn synthesize_row(
        &mut self,
        seed: &'data_block DataBlockRecord,
    ) -> SynthesizedRecord<'data_block> {
        let current_seed: SynthesizerSeed = seed.values.iter().collect();
        let mut synthesized_record = SynthesizedRecord::default();
        let not_allowed_attr_set = NotAllowedAttrSet::default();

        loop {
            let next = self.context.sample_next_attr(
                &synthesized_record,
                &current_seed,
                &not_allowed_attr_set,
            );

            match next {
                Some(value) => {
                    synthesized_record.insert(value);
                }
                None => break,
            }
        }
        synthesized_record
    }

    #[inline]
    fn count_not_used_attrs(
        &mut self,
        synthesized_records: &SynthesizedRecordsSlice<'data_block>,
    ) -> AvailableAttrsMap<'data_block> {
        let mut available_attrs: AvailableAttrsMap = AvailableAttrsMap::default();

        // go through the pairs (original_record, synthesized_record) and count how many
        // attributes were not used
        for (original_record, synthesized_record) in
            izip!(self.records.iter(), synthesized_records.iter())
        {
            for d in original_record.values.iter() {
                if !synthesized_record.contains(d) {
                    let attr = available_attrs.entry(d).or_insert(0);
                    *attr += 1;
                }
            }
        }
        available_attrs
    }

    fn calc_available_attrs(
        &mut self,
        synthesized_records: &SynthesizedRecordsSlice<'data_block>,
    ) -> AvailableAttrsMap<'data_block> {
        let mut available_attrs = self.count_not_used_attrs(synthesized_records);
        let resolution_f64 = self.context.get_resolution() as f64;

        // add attributes for consolidation
        for (attr, value) in self.context.get_attr_rows_map().iter() {
            let n_rows = value.len();

            if n_rows >= self.context.get_resolution() {
                let target_attr_count = iround_down(n_rows as f64, resolution_f64)
                    - (n_rows as isize)
                    + match available_attrs.get(attr) {
                        None => 0,
                        Some(v) => *v,
                    };

                if target_attr_count > 0 {
                    // insert/update the final target count
                    available_attrs.insert(attr, target_attr_count);
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
        available_attrs: &mut AvailableAttrsMap<'data_block>,
    ) -> NotAllowedAttrSet<'data_block> {
        self.context
            .get_attr_rows_map()
            .keys()
            .filter_map(|attr| match available_attrs.get(attr) {
                // not on available attributes
                None => Some(*attr),
                Some(at) => {
                    if *at <= 0 {
                        // on available attributes, but count <= 0
                        Some(*attr)
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
        available_attrs: &mut AvailableAttrsMap<'data_block>,
        current_seed: &SynthesizerSeedSlice<'data_block>,
    ) -> SynthesizedRecord<'data_block> {
        let mut not_allowed_attr_set: NotAllowedAttrSet =
            self.calc_not_allowed_attrs(available_attrs);
        let mut synthesized_record = SynthesizedRecord::default();

        loop {
            let next = self.context.sample_next_attr(
                &synthesized_record,
                current_seed,
                &not_allowed_attr_set,
            );

            match next {
                None => break,
                Some(value) => {
                    let next_count = *available_attrs.get(&value).unwrap();

                    if next_count <= 1 {
                        available_attrs.remove(&value);
                        not_allowed_attr_set.insert(value);
                    } else {
                        available_attrs.insert(value, next_count - 1);
                    }
                    synthesized_record.insert(value);
                }
            }
        }
        synthesized_record
    }

    fn consolidate<T>(
        &mut self,
        synthesized_records: &mut SynthesizedRecords<'data_block>,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        measure_time!(
            || {
                info!("consolidating...");

                let mut available_attrs = self.calc_available_attrs(synthesized_records);
                let current_seed: SynthesizerSeed = available_attrs.keys().cloned().collect();
                let total = available_attrs.len();
                let total_f64 = total as f64;
                let mut n_processed = 0;

                while !available_attrs.is_empty() {
                    self.update_consolidate_progress(n_processed, total_f64, progress_reporter);
                    synthesized_records
                        .push(self.consolidate_record(&mut available_attrs, &current_seed));
                    n_processed = total - available_attrs.len();
                }
                self.update_consolidate_progress(n_processed, total_f64, progress_reporter);
            },
            (self.durations.consolidate)
        );
    }

    #[inline]
    fn count_synthesized_records_attrs(
        &mut self,
        synthesized_records: &mut SynthesizedRecords<'data_block>,
    ) -> FnvHashMap<&'data_block DataBlockValue, isize> {
        let mut current_counts: FnvHashMap<&'data_block DataBlockValue, isize> =
            FnvHashMap::default();

        for r in synthesized_records.iter() {
            for v in r.iter() {
                let count = current_counts.entry(v).or_insert(0);
                *count += 1;
            }
        }
        current_counts
    }

    #[inline]
    fn calc_exceeded_count_attrs(
        &mut self,
        current_counts: &FnvHashMap<&'data_block DataBlockValue, isize>,
    ) -> FnvHashMap<&'data_block DataBlockValue, isize> {
        let mut targets: FnvHashMap<&'data_block DataBlockValue, isize> = FnvHashMap::default();

        for (attr, rows) in self.context.get_attr_rows_map().iter() {
            if rows.len() >= self.context.get_resolution() {
                let t = current_counts[attr]
                    - iround_down(rows.len() as f64, self.context.get_resolution() as f64);
                if t > 0 {
                    targets.insert(attr, t);
                }
            }
        }
        targets
    }

    fn suppress<T>(
        &mut self,
        synthesized_records: &mut SynthesizedRecords<'data_block>,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        measure_time!(
            || {
                info!("suppressing...");

                let current_counts: FnvHashMap<&'data_block DataBlockValue, isize> =
                    self.count_synthesized_records_attrs(synthesized_records);
                let mut targets: FnvHashMap<&'data_block DataBlockValue, isize> =
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
                                new_record.insert(attr);
                            }
                            Some(attr_count) => {
                                if attr_count == 1 {
                                    targets.remove(attr);
                                } else {
                                    targets.insert(attr, attr_count - 1);
                                }
                            }
                        }
                    }
                    *r = new_record;
                }
                synthesized_records.retain(|r| !r.is_empty());
                self.update_suppress_progress(n_processed, total, progress_reporter);
            },
            (self.durations.suppress)
        );
    }

    fn synthesize_rows<T>(
        &mut self,
        synthesized_records: &mut SynthesizedRecords<'data_block>,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        measure_time!(
            || {
                info!("synthesizing rows...");

                let mut n_processed = 0;
                let records = self.records;
                let total = records.len() as f64;

                for seed in records.iter() {
                    self.update_synthesize_progress(n_processed, total, progress_reporter);
                    n_processed += 1;
                    synthesized_records.push(self.synthesize_row(seed));
                }
                self.update_synthesize_progress(n_processed, total, progress_reporter);
            },
            (self.durations.synthesize_rows)
        );
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
            self.synthesize_percentage = calc_percentage(n_processed, total);
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
            self.consolidate_percentage = calc_percentage(n_processed, total);
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
            self.suppress_percentage = calc_percentage(n_processed, total);
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

impl<'data_block, 'attr_rows_map> Drop for SeededSynthesizer<'data_block, 'attr_rows_map> {
    fn drop(&mut self) {
        trace!("seed synthesizer durations: {:#?}", self.durations);
    }
}
