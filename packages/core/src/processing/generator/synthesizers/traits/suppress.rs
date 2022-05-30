use super::SynthesisData;
use fnv::FnvHashMap;
use log::info;
use rand::{prelude::SliceRandom, thread_rng};
use std::sync::Arc;

use crate::{
    data_block::DataBlockValue,
    processing::generator::synthesizers::typedefs::{SynthesizedRecord, SynthesizedRecords},
    utils::{
        math::iround_down,
        reporting::{ReportProgress, StoppableResult},
        time::ElapsedDurationLogger,
    },
};

pub trait Suppress: SynthesisData {
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

        for (attr, n_rows) in self.get_single_attr_counts().iter() {
            if *n_rows >= self.get_resolution() {
                let t = current_counts.get(attr).unwrap_or(&0)
                    - iround_down(*n_rows as f64, self.get_resolution() as f64);
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
    ) -> StoppableResult<()>
    where
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

            self.update_suppress_progress(n_processed, total, progress_reporter)?;
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
        self.update_suppress_progress(n_processed, total, progress_reporter)?;

        Ok(())
    }

    fn update_suppress_progress<T>(
        &mut self,
        n_processed: usize,
        total: f64,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<()>
    where
        T: ReportProgress;
}
