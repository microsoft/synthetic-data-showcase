use super::{
    context::SynthesizerContext,
    synthesis_data::SynthesisData,
    typedefs::{
        AvailableAttrsMap, NotAllowedAttrSet, SynthesizedRecord, SynthesizedRecords,
        SynthesizedRecordsSlice, SynthesizerSeedSlice,
    },
};
use log::info;

use crate::{
    processing::generator::synthesizer::typedefs::SynthesizerSeed,
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
        for (attr, value) in self.get_attr_rows_map().iter() {
            let n_rows = value.len();

            if n_rows >= self.get_resolution() {
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
    fn calc_not_allowed_attrs(&self, available_attrs: &mut AvailableAttrsMap) -> NotAllowedAttrSet {
        self.get_attr_rows_map()
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
        &self,
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
                self.get_attr_rows_map(),
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

    fn get_not_used_attrs(
        &self,
        synthesized_records: &SynthesizedRecordsSlice,
    ) -> AvailableAttrsMap;

    fn update_consolidate_progress<T>(
        &mut self,
        n_processed: usize,
        total: f64,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress;
}
