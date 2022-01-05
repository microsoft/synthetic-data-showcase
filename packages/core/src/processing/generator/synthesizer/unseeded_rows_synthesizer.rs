use super::{
    context::SynthesizerContext,
    typedefs::{SynthesizedRecord, SynthesizedRecords},
};
use crate::{
    data_block::typedefs::{AttributeRows, AttributeRowsByColumnMap},
    utils::reporting::{SendableProgressReporter, SendableProgressReporterRef},
};
use rand::{prelude::SliceRandom, thread_rng};
use std::sync::Arc;

#[cfg(feature = "rayon")]
use rayon::prelude::*;

#[cfg(feature = "rayon")]
use std::sync::Mutex;

use crate::utils::reporting::ReportProgress;

pub struct UnseededRowsSynthesizer {
    context: SynthesizerContext,
    chunk_size: usize,
    column_indexes: Vec<usize>,
    attr_rows_map_by_column: Arc<AttributeRowsByColumnMap>,
    empty_value: Arc<String>,
}

impl UnseededRowsSynthesizer {
    #[inline]
    pub fn new(
        context: SynthesizerContext,
        chunk_size: usize,
        attr_rows_map_by_column: Arc<AttributeRowsByColumnMap>,
        empty_value: Arc<String>,
    ) -> UnseededRowsSynthesizer {
        UnseededRowsSynthesizer {
            context,
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
    ) where
        T: ReportProgress,
    {
        let sendable_pr = Arc::new(Mutex::new(
            progress_reporter
                .as_mut()
                .map(|r| SendableProgressReporter::new(total, 1.0, r)),
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
        rows_synthesizers: &mut Vec<UnseededRowsSynthesizer>,
        progress_reporter: &mut Option<T>,
    ) where
        T: ReportProgress,
    {
        let mut sendable_pr = progress_reporter
            .as_mut()
            .map(|r| SendableProgressReporter::new(total, 1.0, r));

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

        for _ in 0..self.chunk_size {
            synthesized_records.push(self.synthesize_row());
            SendableProgressReporter::update_progress(progress_reporter, 1.0);
        }
        synthesized_records
    }

    #[inline]
    fn synthesize_row(&mut self) -> SynthesizedRecord {
        let mut synthesized_record = SynthesizedRecord::default();
        let mut current_attrs_rows: Arc<AttributeRows> =
            Arc::new((0..self.context.records_len).collect());

        self.column_indexes.shuffle(&mut thread_rng());

        for column_index in self.column_indexes.iter() {
            if let Some((next_attrs_rows, sample)) = self.context.sample_next_attr_from_column(
                &synthesized_record,
                *column_index,
                &self.attr_rows_map_by_column,
                &current_attrs_rows,
                &self.empty_value,
            ) {
                current_attrs_rows = next_attrs_rows;
                synthesized_record.insert(sample);
            }
        }
        synthesized_record
    }
}
