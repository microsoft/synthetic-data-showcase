use super::{WasmBaseSynthesisParameters, WasmOversamplingParameters};
use csv::ReaderBuilder;
use js_sys::Function;
use sds_core::{
    data_block::{CsvDataBlockCreator, DataBlock, DataBlockCreator},
    dp::{DpParameters, NoisyCountThreshold},
    processing::{
        aggregator::Aggregator,
        generator::{Generator, OversamplingParameters},
    },
    utils::time::ElapsedDurationLogger,
};
use std::io::Cursor;
use std::sync::Arc;
use wasm_bindgen::{prelude::*, JsCast};

use crate::{
    processing::{generator::WasmGenerateResult, sds_processor::WasmCsvDataParameters},
    utils::js::{JsDpParameters, JsNoisyCountThreshold, JsProgressReporter, JsResult},
    {processing::aggregator::WasmAggregateResult, utils::js::JsReportProgressCallback},
};

const DEFAULT_CACHE_MAX_SIZE: usize = 100000;

const DEFAULT_EMPTY_VALUE: &str = "";

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
        let _duration_logger = ElapsedDurationLogger::new("sds processor creation");
        let data_block = CsvDataBlockCreator::create(
            Ok(ReaderBuilder::new()
                .delimiter(csv_data_params.delimiter as u8)
                .from_reader(Cursor::new(csv_data))),
            csv_data_params.subject_id.clone(),
            &csv_data_params.use_columns,
            &csv_data_params.multi_value_columns,
            &csv_data_params.sensitive_zeros,
            csv_data_params.record_limit,
        )
        .map_err(|err| JsValue::from(err.to_string()))?;

        Ok(WasmSdsProcessor { data_block })
    }

    #[inline]
    #[wasm_bindgen(js_name = "aggregate")]
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

    #[inline]
    #[wasm_bindgen(js_name = "aggregateWithDp")]
    pub fn aggregate_with_dp(
        &self,
        reporting_length: usize,
        dp_parameters: JsDpParameters,
        threshold: JsNoisyCountThreshold,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<WasmAggregateResult> {
        let js_callback: Function = progress_callback.dyn_into()?;

        self._aggregate_with_dp(
            reporting_length,
            dp_parameters,
            threshold,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )
    }

    #[inline]
    #[wasm_bindgen(js_name = "generateUnseeded")]
    pub fn generate_unseeded(
        &self,
        base_parameters: &WasmBaseSynthesisParameters,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<WasmGenerateResult> {
        let js_callback: Function = progress_callback.dyn_into()?;

        self._generate_unseeded(
            base_parameters,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )
    }

    #[inline]
    #[wasm_bindgen(js_name = "generateRowSeeded")]
    pub fn generate_row_seeded(
        &self,
        base_parameters: &WasmBaseSynthesisParameters,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<WasmGenerateResult> {
        let js_callback: Function = progress_callback.dyn_into()?;

        self._generate_row_seeded(
            base_parameters,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )
    }

    #[inline]
    #[wasm_bindgen(js_name = "generateValueSeeded")]
    pub fn generate_value_seeded(
        &self,
        base_parameters: &WasmBaseSynthesisParameters,
        aggregated_result: &WasmAggregateResult,
        oversampling_parameters: Option<WasmOversamplingParameters>,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<WasmGenerateResult> {
        let js_callback: Function = progress_callback.dyn_into()?;

        self._generate_value_seeded(
            base_parameters,
            aggregated_result,
            oversampling_parameters,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )
    }

    #[inline]
    #[wasm_bindgen(js_name = "generateAggregateSeeded")]
    pub fn generate_aggregate_seeded(
        &self,
        base_parameters: &WasmBaseSynthesisParameters,
        aggregated_result: &WasmAggregateResult,
        use_synthetic_counts: bool,
        weight_selection_percentile: Option<usize>,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<WasmGenerateResult> {
        let js_callback: Function = progress_callback.dyn_into()?;

        self._generate_aggregate_seeded(
            base_parameters,
            aggregated_result,
            use_synthetic_counts,
            weight_selection_percentile,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )
    }
}

impl WasmSdsProcessor {
    #[inline]
    fn unwrap_base_synthesis_parameters_or_default(
        base_parameters: &WasmBaseSynthesisParameters,
    ) -> (usize, usize, String) {
        (
            base_parameters.resolution,
            base_parameters
                .cache_max_size
                .unwrap_or(DEFAULT_CACHE_MAX_SIZE),
            base_parameters
                .empty_value
                .clone()
                .unwrap_or_else(|| DEFAULT_EMPTY_VALUE.to_owned()),
        )
    }

    #[inline]
    pub(crate) fn _aggregate(
        &self,
        reporting_length: usize,
        progress_reporter: &mut Option<JsProgressReporter>,
    ) -> JsResult<WasmAggregateResult> {
        Aggregator::new(self.data_block.clone())
            .aggregate(reporting_length, progress_reporter)
            .map(|aggregated_data| WasmAggregateResult::new(Arc::new(aggregated_data)))
            .map_err(|err| JsValue::from(err.to_string()))
    }

    #[inline]
    pub(crate) fn _aggregate_with_dp(
        &self,
        reporting_length: usize,
        dp_parameters: JsDpParameters,
        threshold: JsNoisyCountThreshold,
        progress_reporter: &mut Option<JsProgressReporter>,
    ) -> JsResult<WasmAggregateResult> {
        let aggregator = Aggregator::new(self.data_block.clone());

        Ok(WasmAggregateResult::new(Arc::new(
            aggregator
                .aggregate_with_dp(
                    reporting_length,
                    &DpParameters::try_from(dp_parameters)?,
                    NoisyCountThreshold::try_from(threshold)?,
                    progress_reporter,
                )
                .map_err(|err| JsValue::from(err.to_string()))?,
        )))
    }

    #[inline]
    pub(crate) fn _generate_unseeded(
        &self,
        base_parameters: &WasmBaseSynthesisParameters,
        progress_reporter: &mut Option<JsProgressReporter>,
    ) -> JsResult<WasmGenerateResult> {
        let generator = Generator::default();
        let (resolution, cache_max_size, empty_value) =
            WasmSdsProcessor::unwrap_base_synthesis_parameters_or_default(base_parameters);

        Ok(WasmGenerateResult::new(
            generator
                .generate_unseeded(
                    &self.data_block,
                    resolution,
                    cache_max_size,
                    &empty_value,
                    progress_reporter,
                )
                .map_err(|err| JsValue::from(err.to_string()))?,
            resolution,
        ))
    }

    #[inline]
    pub(crate) fn _generate_row_seeded(
        &self,
        base_parameters: &WasmBaseSynthesisParameters,
        progress_reporter: &mut Option<JsProgressReporter>,
    ) -> JsResult<WasmGenerateResult> {
        let generator = Generator::default();
        let (resolution, cache_max_size, empty_value) =
            WasmSdsProcessor::unwrap_base_synthesis_parameters_or_default(base_parameters);

        Ok(WasmGenerateResult::new(
            generator
                .generate_row_seeded(
                    &self.data_block,
                    resolution,
                    cache_max_size,
                    &empty_value,
                    progress_reporter,
                )
                .map_err(|err| JsValue::from(err.to_string()))?,
            resolution,
        ))
    }

    #[inline]
    pub(crate) fn _generate_value_seeded(
        &self,
        base_parameters: &WasmBaseSynthesisParameters,
        aggregated_result: &WasmAggregateResult,
        oversampling_parameters: Option<WasmOversamplingParameters>,
        progress_reporter: &mut Option<JsProgressReporter>,
    ) -> JsResult<WasmGenerateResult> {
        let generator = Generator::default();
        let (resolution, cache_max_size, empty_value) =
            WasmSdsProcessor::unwrap_base_synthesis_parameters_or_default(base_parameters);

        Ok(WasmGenerateResult::new(
            generator
                .generate_value_seeded(
                    &self.data_block,
                    resolution,
                    cache_max_size,
                    &empty_value,
                    oversampling_parameters.map(|params| {
                        OversamplingParameters::new(
                            aggregated_result.aggregated_data.clone(),
                            params.oversampling_ratio,
                            params.oversampling_tries,
                        )
                    }),
                    progress_reporter,
                )
                .map_err(|err| JsValue::from(err.to_string()))?,
            resolution,
        ))
    }

    #[inline]
    pub(crate) fn _generate_aggregate_seeded(
        &self,
        base_parameters: &WasmBaseSynthesisParameters,
        aggregated_result: &WasmAggregateResult,
        use_synthetic_counts: bool,
        weight_selection_percentile: Option<usize>,
        progress_reporter: &mut Option<JsProgressReporter>,
    ) -> JsResult<WasmGenerateResult> {
        let generator = Generator::default();
        let (resolution, _, empty_value) =
            WasmSdsProcessor::unwrap_base_synthesis_parameters_or_default(base_parameters);

        Ok(WasmGenerateResult::new(
            generator
                .generate_aggregate_seeded(
                    &empty_value,
                    aggregated_result.aggregated_data.clone(),
                    use_synthetic_counts,
                    weight_selection_percentile,
                    // for now, the UI does not allow setting this
                    None,
                    // for now, the UI does not allow setting this
                    None,
                    progress_reporter,
                )
                .map_err(|err| JsValue::from(err.to_string()))?,
            resolution,
        ))
    }
}
