use super::{
    context::SynthesizerContext,
    synthesis_data::SynthesisData,
    typedefs::{
        AvailableAttrsMap, NotAllowedAttrSet, RawCombinationsSet, SynthesizedRecord,
        SynthesizedRecords, SynthesizedRecordsSlice,
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

pub struct ConsolidateContext {
    pub current_seed: SynthesizerSeed,
    pub available_attrs: AvailableAttrsMap,
    pub synthetic_counts: RawCombinationsCountMap,
}

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
    fn calc_not_allowed_attrs(&self, available_attrs: &AvailableAttrsMap) -> NotAllowedAttrSet {
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
    #[allow(clippy::too_many_arguments)]
    fn add_value_to_synthetic_record(
        &self,
        synthesized_record: &mut SynthesizedRecord,
        value: Arc<DataBlockValue>,
        synthetic_counts: &mut RawCombinationsCountMap,
        last_processed: &mut ValueCombination,
        processed_combinations: &mut RawCombinationsSet,
        oversampling_ratio: &Option<f64>,
        calc_synthetic_counts: bool,
    ) -> bool {
        let mut current_comb = last_processed.clone();
        let mut local_synthetic_counts = RawCombinationsCountMap::default();

        // add the new sampled value to the combination
        current_comb.extend(value.clone(), &self.get_data_block().headers);

        if calc_synthetic_counts {
            // process all combinations lengths up the reporting length
            for l in 1..=self.get_aggregated_data().reporting_length {
                for mut comb in current_comb.iter().combinations(l) {
                    // this will be already sorted, since current_comb is
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

                            // if we need to keep a certain ratio for oversampling
                            if let Some(ratio) = oversampling_ratio {
                                if ((*synthetic_count + 1) as f64)
                                    > ((sensitive_count.count as f64) * (1.0 + *ratio))
                                {
                                    // the synthetic count as exceeded the allowed ratio, let stop
                                    // the sampling process right here for this record
                                    return false;
                                }
                            }
                        }

                        *local_synthetic_counts
                            .entry(value_combination.clone())
                            .or_insert(0) += 1;
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
                });
        }

        *last_processed = current_comb;
        synthesized_record.insert(value);
        true
    }

    #[inline]
    fn consolidate_record(
        &self,
        synthesizer_context: &mut SynthesizerContext,
        consolidate_context: &mut ConsolidateContext,
        oversampling_ratio: &Option<f64>,
        oversampling_tries: usize,
        calc_synthetic_counts: bool,
    ) -> SynthesizedRecord {
        let mut not_allowed_attr_set: NotAllowedAttrSet =
            self.calc_not_allowed_attrs(&consolidate_context.available_attrs);
        let mut synthesized_record = SynthesizedRecord::default();
        let mut last_processed = ValueCombination::default();
        let mut processed_combinations = RawCombinationsSet::default();
        let mut n_tries = oversampling_tries;

        loop {
            let next = self.sample_next_attr(
                synthesizer_context,
                consolidate_context,
                &last_processed,
                &synthesized_record,
                &not_allowed_attr_set,
            );

            match next {
                None => break,
                Some(value) => {
                    if self.add_value_to_synthetic_record(
                        &mut synthesized_record,
                        value.clone(),
                        &mut consolidate_context.synthetic_counts,
                        &mut last_processed,
                        &mut processed_combinations,
                        oversampling_ratio,
                        calc_synthetic_counts,
                    ) {
                        let next_count = *consolidate_context.available_attrs.get(&value).unwrap();

                        if next_count <= 1 {
                            consolidate_context.available_attrs.remove(&value);
                            not_allowed_attr_set.insert(value.clone());
                        } else {
                            consolidate_context
                                .available_attrs
                                .insert(value.clone(), next_count - 1);
                        }
                        n_tries = oversampling_tries;
                    } else {
                        n_tries -= 1;
                        if n_tries == 0 {
                            break;
                        }
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
        synthesizer_context: &mut SynthesizerContext,
        oversampling_ratio: Option<f64>,
        oversampling_tries: Option<usize>,
        calc_synthetic_counts: bool,
    ) where
        T: ReportProgress,
    {
        let _duration_logger = ElapsedDurationLogger::new("consolidation");

        info!("consolidating...");

        let available_attrs = self.calc_available_attrs(synthesized_records);
        let current_seed: SynthesizerSeed = available_attrs.keys().cloned().collect();
        let total = available_attrs.values().sum::<isize>();
        let total_f64 = total as f64;
        let mut n_processed = 0;
        let mut consolidate_context = ConsolidateContext {
            current_seed,
            available_attrs,
            synthetic_counts: RawCombinationsCountMap::default(),
        };

        while !consolidate_context.available_attrs.is_empty() {
            self.update_consolidate_progress(n_processed, total_f64, progress_reporter);
            synthesized_records.push(self.consolidate_record(
                synthesizer_context,
                &mut consolidate_context,
                &oversampling_ratio,
                oversampling_tries.unwrap_or(1),
                calc_synthetic_counts,
            ));
            n_processed =
                (total - consolidate_context.available_attrs.values().sum::<isize>()) as usize;
        }
        self.update_consolidate_progress(n_processed, total_f64, progress_reporter);
    }

    fn get_not_used_attrs(
        &self,
        synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap;

    fn sample_next_attr(
        &self,
        synthesizer_context: &mut SynthesizerContext,
        consolidate_context: &ConsolidateContext,
        last_processed: &ValueCombination,
        synthesized_record: &SynthesizedRecord,
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
