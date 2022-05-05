use csv::ReaderBuilder;
use js_sys::Function;
use sds_core::{
    data_block::{CsvDataBlockCreator, DataBlock, DataBlockCreator},
    processing::aggregator::Aggregator,
    utils::time::ElapsedDurationLogger,
};
use std::io::Cursor;
use std::sync::Arc;
use wasm_bindgen::{prelude::*, JsCast};

use crate::{
    processing::sds_context_v2::WasmCsvDataParameters,
    utils::js::{JsProgressReporter, JsResult},
    {processing::aggregator::WasmAggregateResult, utils::js::JsReportProgressCallback},
};

#[wasm_bindgen]
pub struct WasmSdsProcessor {
    pub(crate) data_block: Arc<DataBlock>,
}

impl WasmSdsProcessor {
    pub fn default() -> WasmSdsProcessor {
        WasmSdsProcessor {
            data_block: Arc::new(DataBlock::default()),
        }
    }
}

#[wasm_bindgen(constructor)]
impl WasmSdsProcessor {
    #[inline]
    #[wasm_bindgen(constructor)]
    pub fn new(
        csv_data: &str,
        csv_data_params: &WasmCsvDataParameters,
    ) -> JsResult<WasmSdsProcessor> {
        let _duration_logger = ElapsedDurationLogger::new(String::from("sds processor creation"));
        let data_block = CsvDataBlockCreator::create(
            Ok(ReaderBuilder::new()
                .delimiter(csv_data_params.delimiter as u8)
                .from_reader(Cursor::new(csv_data))),
            &csv_data_params.use_columns,
            &csv_data_params.sensitive_zeros,
            csv_data_params.record_limit,
        )
        .map_err(|err| JsValue::from(err.to_string()))?;

        Ok(WasmSdsProcessor { data_block })
    }

    #[inline]
    pub fn aggregate(
        &self,
        reporting_length: usize,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<WasmAggregateResult> {
        let js_callback: Function = progress_callback.dyn_into()?;

        self._aggregate(
            reporting_length,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )
    }
}

impl WasmSdsProcessor {
    #[inline]
    pub(crate) fn _aggregate(
        &self,
        reporting_length: usize,
        progress_callback: &mut Option<JsProgressReporter>,
    ) -> JsResult<WasmAggregateResult> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("sds processor aggregation"));

        Aggregator::new(self.data_block.clone())
            .aggregate(reporting_length, progress_callback)
            .map(|aggregated_data| WasmAggregateResult::new(Arc::new(aggregated_data)))
            .map_err(|err| JsValue::from(err.to_string()))
    }
}
