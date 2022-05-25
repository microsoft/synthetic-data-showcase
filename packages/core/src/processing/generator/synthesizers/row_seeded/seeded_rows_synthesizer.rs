use std::sync::Arc;

use crate::{
    data_block::{AttributeRowsMap, DataBlockRecord, DataBlockRecords},
    processing::generator::{
        synthesizers::attribute_rows_sampler::AttributeRowsSampler,
        synthesizers::typedefs::{
            NotAllowedAttrSet, SynthesizedRecord, SynthesizedRecords, SynthesizerSeed,
        },
    },
    utils::{
        collections::flat_map_unwrap_or_default,
        reporting::{
            ReportProgress, SendableProgressReporter, SendableProgressReporterRef, StoppableResult,
        },
    },
};

#[cfg(feature = "rayon")]
use rayon::prelude::*;

#[cfg(feature = "rayon")]
use std::sync::Mutex;

pub struct SeededRowsSynthesizer {
    pub sampler: AttributeRowsSampler,
    pub records: DataBlockRecords,
    pub attr_rows_map: Arc<AttributeRowsMap>,
}

impl SeededRowsSynthesizer {
    #[inline]
    pub fn new(
        sampler: AttributeRowsSampler,
        records: DataBlockRecords,
        attr_rows_map: Arc<AttributeRowsMap>,
    ) -> SeededRowsSynthesizer {
        SeededRowsSynthesizer {
            sampler,
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
    ) -> StoppableResult<()>
    where
        T: ReportProgress,
    {
        let sendable_pr = Arc::new(Mutex::new(
            progress_reporter
                .as_mut()
                .map(|r| SendableProgressReporter::new(total, 0.5, r)),
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
        rows_synthesizers: &mut Vec<SeededRowsSynthesizer>,
        progress_reporter: &mut Option<T>,
    ) -> StoppableResult<()>
    where
        T: ReportProgress,
    {
        let mut sendable_pr = progress_reporter
            .as_mut()
            .map(|r| SendableProgressReporter::new(total, 0.5, r));

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
        let records = self.records.clone();

        for seed in records.iter() {
            synthesized_records.push(self.synthesize_row(seed));
            SendableProgressReporter::update_progress(progress_reporter, 1.0)?;
        }
        Ok(synthesized_records)
    }

    #[inline]
    fn synthesize_row(&mut self, seed: &DataBlockRecord) -> SynthesizedRecord {
        let current_seed: &SynthesizerSeed = &seed.values;
        let mut synthesized_record = SynthesizedRecord::default();
        let not_allowed_attr_set = NotAllowedAttrSet::default();

        loop {
            let next = self.sampler.sample_next_attr_from_seed(
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
