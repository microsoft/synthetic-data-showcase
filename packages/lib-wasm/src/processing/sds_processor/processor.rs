use csv::ReaderBuilder;
use js_sys::Function;
use sds_core::{
    data_block::{
        block::DataBlock, csv_block_creator::CsvDataBlockCreator,
        data_block_creator::DataBlockCreator, typedefs::CsvRecord,
    },
    processing::{
        aggregator::Aggregator,
        generator::{
            synthesizer::consolidate_parameters::ConsolidateParameters, Generator, SynthesisMode,
        },
    },
    utils::time::ElapsedDurationLogger,
};
use std::sync::Arc;
use std::{convert::TryFrom, io::Cursor};
use wasm_bindgen::{prelude::*, JsCast};

use crate::{
    utils::js::js_progress_reporter::JsProgressReporter,
    {
        processing::{
            aggregator::aggregate_result::WasmAggregateResult,
            generator::generate_result::WasmGenerateResult,
        },
        utils::js::ts_definitions::{JsHeaderNames, JsReportProgressCallback},
    },
};

#[wasm_bindgen]
pub struct SDSProcessor {
    pub(crate) data_block: Arc<DataBlock>,
}

#[wasm_bindgen]
impl SDSProcessor {
    pub fn default() -> SDSProcessor {
        SDSProcessor {
            data_block: Arc::new(DataBlock::default()),
        }
    }
}

#[wasm_bindgen]
impl SDSProcessor {
    #[wasm_bindgen(constructor)]
    pub fn new(
        csv_data: &str,
        delimiter: char,
        use_columns: JsHeaderNames,
        sensitive_zeros: JsHeaderNames,
        record_limit: usize,
    ) -> Result<SDSProcessor, JsValue> {
        let _duration_logger = ElapsedDurationLogger::new(String::from("sds processor creation"));
        let data_block = CsvDataBlockCreator::create(
            Ok(ReaderBuilder::new()
                .delimiter(delimiter as u8)
                .from_reader(Cursor::new(csv_data))),
            &CsvRecord::try_from(use_columns)?,
            &CsvRecord::try_from(sensitive_zeros)?,
            record_limit,
        )
        .map_err(|err| JsValue::from(err.to_string()))?;

        Ok(SDSProcessor { data_block })
    }

    #[wasm_bindgen(js_name = "numberOfRecords")]
    pub fn number_of_records(&self) -> usize {
        self.data_block.number_of_records()
    }

    #[wasm_bindgen(js_name = "protectedNumberOfRecords")]
    pub fn protected_number_of_records(&self, resolution: usize) -> usize {
        self.data_block.protected_number_of_records(resolution)
    }

    #[wasm_bindgen(js_name = "normalizeReportingLength")]
    pub fn normalize_reporting_length(&self, reporting_length: usize) -> usize {
        self.data_block.normalize_reporting_length(reporting_length)
    }

    pub fn aggregate(
        &self,
        reporting_length: usize,
        sensitivity_threshold: usize,
        progress_callback: JsReportProgressCallback,
    ) -> Result<WasmAggregateResult, JsValue> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("sds processor aggregation"));
        let js_callback: Function = progress_callback.dyn_into()?;
        let mut aggregator = Aggregator::new(self.data_block.clone());

        Ok(WasmAggregateResult::new(aggregator.aggregate(
            reporting_length,
            sensitivity_threshold,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )))
    }

    pub fn generate(
        &self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        seeded: bool,
        progress_callback: JsReportProgressCallback,
    ) -> Result<WasmGenerateResult, JsValue> {
        let _duration_logger = ElapsedDurationLogger::new(String::from("sds processor generation"));
        let js_callback: Function = progress_callback.dyn_into()?;
        let mut generator = Generator::new(self.data_block.clone());
        let mode = if seeded {
            SynthesisMode::Seeded
        } else {
            SynthesisMode::Unseeded
        };

        Ok(WasmGenerateResult::new(generator.generate(
            resolution,
            cache_max_size,
            empty_value,
            mode,
            ConsolidateParameters::default(),
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )))
    }
}
