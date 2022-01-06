use super::{
    context::SynthesizerContext,
    typedefs::{NotAllowedAttrSet, SynthesizedRecord, SynthesizedRecords, SynthesizerSeed},
};
use crate::{
    data_block::typedefs::AttributeRowsMap,
    utils::reporting::{SendableProgressReporter, SendableProgressReporterRef},
};
use std::sync::Arc;

#[cfg(feature = "rayon")]
use rayon::prelude::*;

#[cfg(feature = "rayon")]
use std::sync::Mutex;

use crate::{
    data_block::{record::DataBlockRecord, typedefs::DataBlockRecords},
    utils::reporting::ReportProgress,
};

pub struct SeededRowsSynthesizer {
    pub context: SynthesizerContext,
    pub records: DataBlockRecords,
    pub attr_rows_map: Arc<AttributeRowsMap>,
}

impl SeededRowsSynthesizer {
    #[inline]
    pub fn new(
        context: SynthesizerContext,
        records: DataBlockRecords,
        attr_rows_map: Arc<AttributeRowsMap>,
    ) -> SeededRowsSynthesizer {
        SeededRowsSynthesizer {
            context,
            records,
            attr_rows_map,
        }
    }

    #[cfg(feature = "rayon")]
    #[inline]
    pub fn synthesize_all<T>(
        total: f64,
        synthesized_records: &mut SynthesizedRecords,
        rows_synthesizers: &mut Vec<SeededRowsSynthesizer>,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        let sendable_pr = Arc::new(Mutex::new(
            progress_reporter
                .as_mut()
                .map(|r| SendableProgressReporter::new(total, 0.5, r)),
        ));

        synthesized_records.par_extend(
            rows_synthesizers
                .par_iter_mut()
                .flat_map(|rs| rs.synthesize_rows(&mut sendable_pr.clone())),
        );
    }

    #[cfg(not(feature = "rayon"))]
    #[inline]
    pub fn synthesize_all<T>(
        total: f64,
        synthesized_records: &mut SynthesizedRecords,
        rows_synthesizers: &mut Vec<SeededRowsSynthesizer>,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        let mut sendable_pr = progress_reporter
            .as_mut()
            .map(|r| SendableProgressReporter::new(total, 0.5, r));

        synthesized_records.extend(
            rows_synthesizers
                .iter_mut()
                .flat_map(|rs| rs.synthesize_rows(&mut sendable_pr)),
        );
    }

    #[inline]
    fn synthesize_rows<T>(
        &mut self,
        progress_reporter: &mut SendableProgressReporterRef<T>,
    ) -> SynthesizedRecords
    where
        T: ReportProgress,
    {
        let mut synthesized_records = SynthesizedRecords::default();
        let records = self.records.clone();

        for seed in records.iter() {
            synthesized_records.push(self.synthesize_row(seed));
            SendableProgressReporter::update_progress(progress_reporter, 1.0);
        }
        synthesized_records
    }

    #[inline]
    fn synthesize_row(&mut self, seed: &DataBlockRecord) -> SynthesizedRecord {
        let current_seed: &SynthesizerSeed = &seed.values;
        let mut synthesized_record = SynthesizedRecord::default();
        let not_allowed_attr_set = NotAllowedAttrSet::default();

        loop {
            let next = self.context.sample_next_attr_from_seed(
                &synthesized_record,
                current_seed,
                &not_allowed_attr_set,
                &self.attr_rows_map,
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
}
