use super::{
    context::SynthesizerContext,
    synthesis_data::SynthesisData,
    typedefs::{
        AvailableAttrsMap, NotAllowedAttrSet, RawCombinationsSet, SynthesizedRecord,
        SynthesizedRecords, SynthesizedRecordsSlice, SynthesizerSeedSlice,
    },
};
use itertools::Itertools;
use log::info;
use std::{rc::Rc, sync::Arc};

use crate::{
    data_block::value::DataBlockValue,
    processing::{
        aggregator::value_combination::ValueCombination,
        generator::synthesizer::typedefs::{RawCombinationsCountMap, SynthesizerSeed},
    },
    utils::{math::iround_down, reporting::ReportProgress, time::ElapsedDurationLogger},
};

pub trait Consolidate: SynthesisData {
    #[inline]
    fn calc_available_attrs(
        &self,
        synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap {
        let mut available_attrs = self.get_not_used_attrs(synthesized_records);
        let resolution_f64 = self.get_resolution() as f64;

        // add attributes for consolidation
        for (attr, n_rows) in self.get_single_attr_counts().iter() {
            if *n_rows >= self.get_resolution() {
                let target_attr_count = iround_down(*n_rows as f64, resolution_f64)
                    - (*n_rows as isize)
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
    fn calc_not_allowed_attrs(&self, available_attrs: &mut AvailableAttrsMap) -> NotAllowedAttrSet {
        self.get_single_attr_counts()
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
    fn add_value_to_synthetic_record(
        &self,
        synthesized_record: &mut SynthesizedRecord,
        value: Arc<DataBlockValue>,
        synthetic_counts: &mut RawCombinationsCountMap,
        last_processed: &mut ValueCombination,
        processed_combinations: &mut RawCombinationsSet,
        oversampling_ratio: &Option<f64>,
    ) -> bool {
        // add the new sampled value to the combination
        last_processed.extend(value.clone(), &self.get_data_block().headers);

        // if we need to keep a certain ratio for oversampling
        if let Some(ratio) = oversampling_ratio {
            let mut local_synthetic_counts = RawCombinationsCountMap::default();

            // process all combinations lengths up the reporting length
            for l in 1..=self.get_aggregated_data().reporting_length {
                for mut comb in last_processed.iter().combinations(l) {
                    // this will be already sorted, since last_processed is
                    let value_combination =
                        Rc::new(ValueCombination::new(comb.drain(..).cloned().collect()));

                    if !processed_combinations.contains(&value_combination) {
                        if let Some(sensitive_count) = self
                            .get_aggregated_data()
                            .aggregates_count
                            .get(&(*value_combination))
                        {
                            let synthetic_count =
                                synthetic_counts.get(&value_combination).unwrap_or(&0);

                            if ((*synthetic_count + 1) as f64)
                                <= ((sensitive_count.count as f64) * (1.0 + *ratio))
                            {
                                *local_synthetic_counts
                                    .entry(value_combination.clone())
                                    .or_insert(0) += 1;
                            } else {
                                // the synthetic count as exceeded the allowed ratio, let stop
                                // the sampling process right here for this record
                                return false;
                            }
                        }
                    }
                }
            }

            // update synthetic counts if the value is going to be used
            local_synthetic_counts
                .drain()
                .for_each(|(value_combination, count)| {
                    *synthetic_counts
                        .entry(value_combination.clone())
                        .or_insert(0) += count;
                    // mark this combination as processed, so we wont
                    // increment its synthetic count again
                    processed_combinations.insert(value_combination);
                })
        }
        synthesized_record.insert(value);
        true
    }

    #[inline]
    fn consolidate_record(
        &self,
        available_attrs: &mut AvailableAttrsMap,
        current_seed: &SynthesizerSeedSlice,
        context: &mut SynthesizerContext,
        synthetic_counts: &mut RawCombinationsCountMap,
        oversampling_ratio: &Option<f64>,
    ) -> SynthesizedRecord {
        let mut not_allowed_attr_set: NotAllowedAttrSet =
            self.calc_not_allowed_attrs(available_attrs);
        let mut synthesized_record = SynthesizedRecord::default();
        let mut last_processed = ValueCombination::default();
        let mut processed_combinations = RawCombinationsSet::default();

        loop {
            let next = self.sample_next_attr(
                context,
                &last_processed,
                current_seed,
                &synthesized_record,
                available_attrs,
                &not_allowed_attr_set,
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

                    if !self.add_value_to_synthetic_record(
                        &mut synthesized_record,
                        value,
                        synthetic_counts,
                        &mut last_processed,
                        &mut processed_combinations,
                        oversampling_ratio,
                    ) {
                        break;
                    }
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
        oversampling_ratio: Option<f64>,
    ) where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("consolidation");

        info!("consolidating...");

        let mut available_attrs = self.calc_available_attrs(synthesized_records);
        let current_seed: SynthesizerSeed = available_attrs.keys().cloned().collect();
        let mut synthetic_counts = RawCombinationsCountMap::default();
        let total = available_attrs.len();
        let total_f64 = total as f64;
        let mut n_processed = 0;

        while !available_attrs.is_empty() {
            self.update_consolidate_progress(n_processed, total_f64, progress_reporter);
            synthesized_records.push(self.consolidate_record(
                &mut available_attrs,
                &current_seed,
                context,
                &mut synthetic_counts,
                &oversampling_ratio,
            ));
            n_processed = total - available_attrs.len();
        }
        self.update_consolidate_progress(n_processed, total_f64, progress_reporter);
    }

    fn get_not_used_attrs(
        &self,
        synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap;

    fn sample_next_attr(
        &self,
        context: &mut SynthesizerContext,
        last_processed: &ValueCombination,
        current_seed: &SynthesizerSeedSlice,
        synthesized_record: &SynthesizedRecord,
        available_attrs: &AvailableAttrsMap,
        not_allowed_attr_set: &NotAllowedAttrSet,
    ) -> Option<Arc<DataBlockValue>>;

    fn update_consolidate_progress<T>(
        &mut self,
        n_processed: usize,
        total: f64,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress;
}
