use csv::ReaderBuilder;
use js_sys::Function;
use sds_core::{
    data_block::{CsvDataBlockCreator, CsvRecord, DataBlock, DataBlockCreator},
    dp::{DpParameters, NoisyCountThreshold},
    processing::{
        aggregator::Aggregator,
        generator::{Generator, OversamplingParameters},
    },
    utils::time::ElapsedDurationLogger,
};
use std::sync::Arc;
use std::{convert::TryFrom, io::Cursor};
use wasm_bindgen::{prelude::*, JsCast};

use crate::{
    utils::js::JsProgressReporter,
    {
        processing::{aggregator::WasmAggregateResult, generator::WasmGenerateResult},
        utils::js::{JsHeaderNames, JsReportProgressCallback},
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
        progress_callback: JsReportProgressCallback,
    ) -> Result<WasmAggregateResult, JsValue> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("sds processor aggregation"));
        let js_callback: Function = progress_callback.dyn_into()?;
        let mut aggregator = Aggregator::new(self.data_block.clone());

        Ok(WasmAggregateResult::new(Arc::new(aggregator.aggregate(
            reporting_length,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        ))))
    }

    #[inline]
    #[allow(clippy::too_many_arguments)]
    pub(crate) fn aggregate_with_dp(
        &self,
        reporting_length: usize,
        epsilon: f64,
        delta: f64,
        percentile_percentage: usize,
        percentile_epsilon_proportion: f64,
        sigma_proportions: Option<Vec<f64>>,
        threshold: NoisyCountThreshold,
        progress_callback: JsReportProgressCallback,
    ) -> Result<WasmAggregateResult, JsValue> {
        let _duration_logger = ElapsedDurationLogger::new(format!(
            "sds processor aggregation with dp and threshold = {:?}",
            threshold
        ));
        let js_callback: Function = progress_callback.dyn_into()?;
        let aggregator = Aggregator::new(self.data_block.clone());

        Ok(WasmAggregateResult::new(Arc::new(
            aggregator
                .aggregate_with_dp(
                    reporting_length,
                    &DpParameters::new(
                        epsilon,
                        delta,
                        percentile_percentage,
                        percentile_epsilon_proportion,
                        sigma_proportions,
                    ),
                    threshold,
                    &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
                )
                .map_err(|err| JsValue::from(err.to_string()))?,
        )))
    }

    #[wasm_bindgen(js_name = "aggregateWithDpFixedThreshold")]
    #[allow(clippy::too_many_arguments)]
    pub fn aggregate_with_dp_fixed_threshold(
        &self,
        reporting_length: usize,
        epsilon: f64,
        delta: f64,
        percentile_percentage: usize,
        percentile_epsilon_proportion: f64,
        sigma_proportions: Option<Vec<f64>>,
        threshold: f64,
        progress_callback: JsReportProgressCallback,
    ) -> Result<WasmAggregateResult, JsValue> {
        self.aggregate_with_dp(
            reporting_length,
            epsilon,
            delta,
            percentile_percentage,
            percentile_epsilon_proportion,
            sigma_proportions,
            NoisyCountThreshold::Fixed(threshold),
            progress_callback,
        )
    }

    #[wasm_bindgen(js_name = "aggregateWithDpAdaptiveThreshold")]
    #[allow(clippy::too_many_arguments)]
    pub fn aggregate_with_dp_adaptive_threshold(
        &self,
        reporting_length: usize,
        epsilon: f64,
        delta: f64,
        percentile_percentage: usize,
        percentile_epsilon_proportion: f64,
        sigma_proportions: Option<Vec<f64>>,
        threshold: f64,
        progress_callback: JsReportProgressCallback,
    ) -> Result<WasmAggregateResult, JsValue> {
        self.aggregate_with_dp(
            reporting_length,
            epsilon,
            delta,
            percentile_percentage,
            percentile_epsilon_proportion,
            sigma_proportions,
            NoisyCountThreshold::Adaptive(threshold),
            progress_callback,
        )
    }

    #[wasm_bindgen(js_name = "aggregateWithDpMaxFabricationThreshold")]
    #[allow(clippy::too_many_arguments)]
    pub fn aggregate_with_dp_max_fabrication_threshold(
        &self,
        reporting_length: usize,
        epsilon: f64,
        delta: f64,
        percentile_percentage: usize,
        percentile_epsilon_proportion: f64,
        sigma_proportions: Option<Vec<f64>>,
        threshold: f64,
        progress_callback: JsReportProgressCallback,
    ) -> Result<WasmAggregateResult, JsValue> {
        self.aggregate_with_dp(
            reporting_length,
            epsilon,
            delta,
            percentile_percentage,
            percentile_epsilon_proportion,
            sigma_proportions,
            NoisyCountThreshold::MaxFabrication(threshold),
            progress_callback,
        )
    }

    #[wasm_bindgen(js_name = "generateUnseeded")]
    pub fn generate_unseeded(
        &self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        progress_callback: JsReportProgressCallback,
    ) -> Result<WasmGenerateResult, JsValue> {
        let _duration_logger = ElapsedDurationLogger::new(String::from("generation unseeded"));
        let js_callback: Function = progress_callback.dyn_into()?;
        let generator = Generator::default();

        Ok(WasmGenerateResult::new(generator.generate_unseeded(
            &self.data_block,
            resolution,
            cache_max_size,
            &empty_value,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )))
    }

    #[wasm_bindgen(js_name = "generateRowSeeded")]
    pub fn generate_row_seeded(
        &self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        progress_callback: JsReportProgressCallback,
    ) -> Result<WasmGenerateResult, JsValue> {
        let _duration_logger = ElapsedDurationLogger::new(String::from("generation row seeded"));
        let js_callback: Function = progress_callback.dyn_into()?;
        let generator = Generator::default();

        Ok(WasmGenerateResult::new(generator.generate_row_seeded(
            &self.data_block,
            resolution,
            cache_max_size,
            &empty_value,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )))
    }

    #[wasm_bindgen(js_name = "generateValueSeeded")]
    #[allow(clippy::too_many_arguments)]
    pub fn generate_value_seeded(
        &self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        aggregated_result: &WasmAggregateResult,
        oversampling_ratio: Option<f64>,
        oversampling_tries: Option<usize>,
        progress_callback: JsReportProgressCallback,
    ) -> Result<WasmGenerateResult, JsValue> {
        let _duration_logger = ElapsedDurationLogger::new(String::from("generation value seeded"));
        let js_callback: Function = progress_callback.dyn_into()?;
        let generator = Generator::default();

        Ok(WasmGenerateResult::new(generator.generate_value_seeded(
            &self.data_block,
            resolution,
            cache_max_size,
            &empty_value,
            oversampling_ratio.map(|_| OversamplingParameters {
                aggregated_data: aggregated_result.aggregated_data.clone(),
                oversampling_ratio,
                oversampling_tries,
            }),
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )))
    }

    #[wasm_bindgen(js_name = "generateAggregateSeeded")]
    pub fn generate_aggregate_seeded(
        &self,
        empty_value: String,
        aggregated_result: &WasmAggregateResult,
        use_synthetic_counts: bool,
        progress_callback: JsReportProgressCallback,
    ) -> Result<WasmGenerateResult, JsValue> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("generation aggregate seeded"));
        let js_callback: Function = progress_callback.dyn_into()?;
        let generator = Generator::default();

        Ok(WasmGenerateResult::new(
            generator.generate_aggregate_seeded(
                &empty_value,
                aggregated_result.aggregated_data.clone(),
                use_synthetic_counts,
                &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
            ),
        ))
    }
}
