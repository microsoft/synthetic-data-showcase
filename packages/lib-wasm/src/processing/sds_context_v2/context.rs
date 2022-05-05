use js_sys::Function;
use wasm_bindgen::{prelude::wasm_bindgen, JsCast, JsValue};

use crate::{
    processing::{
        aggregator::WasmAggregateResult,
        generator::WasmGenerateResult,
        sds_context_v2::MISSING_SENSITIVE_DATA_ERROR,
        sds_processor_v2::{WasmCsvDataParameters, WasmOversamplingParameters, WasmSdsProcessor},
    },
    utils::js::{
        JsAggregateStatistics, JsCsvDataParameters, JsDpParameters, JsNoisyCountThreshold,
        JsOversamplingParameters, JsProgressReporter, JsReportProgressCallback, JsResult,
    },
};

#[wasm_bindgen]
pub struct WasmSdsContext {
    sensitive_data_params: Option<WasmCsvDataParameters>,
    sensitive_processor: Option<WasmSdsProcessor>,
    synthetic_processor: Option<WasmSdsProcessor>,
    sensitive_aggregate_result: Option<WasmAggregateResult>,
    reportable_aggregate_result: Option<WasmAggregateResult>,
    synthetic_aggregate_result: Option<WasmAggregateResult>,
    generate_result: Option<WasmGenerateResult>,
}

#[wasm_bindgen]
impl WasmSdsContext {
    #[wasm_bindgen(constructor)]
    pub fn default() -> Self {
        WasmSdsContext {
            sensitive_data_params: None,
            sensitive_processor: None,
            synthetic_processor: None,
            sensitive_aggregate_result: None,
            reportable_aggregate_result: None,
            synthetic_aggregate_result: None,
            generate_result: None,
        }
    }

    #[wasm_bindgen(js_name = "setSensitiveData")]
    pub fn set_sensitive_data(
        &mut self,
        csv_data: &str,
        csv_data_params: JsCsvDataParameters,
    ) -> JsResult<()> {
        self.clear_sensitive_data();

        let params = WasmCsvDataParameters::try_from(csv_data_params)?;
        let processor = WasmSdsProcessor::new(csv_data, &params)?;

        self.sensitive_data_params = Some(params);
        self.sensitive_processor = Some(processor);

        Ok(())
    }

    #[wasm_bindgen(js_name = "clearSensitiveData")]
    pub fn clear_sensitive_data(&mut self) {
        self.sensitive_data_params = None;
        self.sensitive_processor = None;
        self.synthetic_processor = None;
        self.sensitive_aggregate_result = None;
        self.reportable_aggregate_result = None;
        self.synthetic_aggregate_result = None;
        self.generate_result = None;
    }

    #[wasm_bindgen(js_name = "sensitiveAggregateStatistics")]
    pub fn sensitive_aggregate_statistics(
        &mut self,
        reporting_length: usize,
        resolution: usize,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<JsAggregateStatistics> {
        let js_callback: Function = progress_callback.dyn_into()?;

        self.get_or_create_sensitive_aggregate_result(
            reporting_length,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| p)),
        )?
        .statistics(resolution)
        .to_js()
    }

    #[wasm_bindgen(js_name = "generateUnseeded")]
    pub fn generate_unseeded(
        &mut self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        self.generate_result = Some(self.get_sensitive_processor()?.generate_unseeded(
            cache_max_size,
            resolution,
            empty_value,
            progress_callback,
        )?);
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateRowSeeded")]
    pub fn generate_row_seeded(
        &mut self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        self.generate_result = Some(self.get_sensitive_processor()?.generate_row_seeded(
            cache_max_size,
            resolution,
            empty_value,
            progress_callback,
        )?);
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateValueSeeded")]
    pub fn generate_value_seeded(
        &mut self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        reporting_length: usize,
        oversampling_parameters: Option<JsOversamplingParameters>,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        let oversampling_parameters = match oversampling_parameters {
            Some(params) => Some(WasmOversamplingParameters::try_from(params)?),
            _ => None,
        };
        let js_callback: Function = progress_callback.dyn_into()?;
        let reportable_aggregate_result = self
            .get_or_create_sensitive_aggregate_result(
                reporting_length,
                &mut Some(JsProgressReporter::new(&js_callback, &|p| 0.5 * p)),
            )?
            .protect_with_k_anonymity(resolution);

        self.generate_result = Some(self.get_sensitive_processor()?._generate_value_seeded(
            cache_max_size,
            resolution,
            empty_value,
            &reportable_aggregate_result,
            oversampling_parameters,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| 50.0 + 0.5 * p)),
        )?);
        self.reportable_aggregate_result = Some(reportable_aggregate_result);
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateAggregateSeeded")]
    pub fn generate_aggregate_seeded(
        &mut self,
        resolution: usize,
        empty_value: String,
        reporting_length: usize,
        use_synthetic_counts: bool,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        let js_callback: Function = progress_callback.dyn_into()?;
        let reportable_aggregate_result = self
            .get_or_create_sensitive_aggregate_result(
                reporting_length,
                &mut Some(JsProgressReporter::new(&js_callback, &|p| 0.5 * p)),
            )?
            .protect_with_k_anonymity(resolution);

        self.generate_result = Some(self.get_sensitive_processor()?._generate_aggregate_seeded(
            resolution,
            empty_value,
            &reportable_aggregate_result,
            use_synthetic_counts,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| 50.0 + 0.5 * p)),
        )?);
        self.reportable_aggregate_result = Some(reportable_aggregate_result);
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateDp")]
    pub fn generate_dp(
        &mut self,
        resolution: usize,
        empty_value: String,
        reporting_length: usize,
        dp_parameters: JsDpParameters,
        threshold: JsNoisyCountThreshold,
        use_synthetic_counts: bool,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        let js_callback: Function = progress_callback.dyn_into()?;
        let sensitive_processor = self.get_sensitive_processor()?;
        let reportable_aggregate_result = sensitive_processor._aggregate_with_dp(
            reporting_length,
            dp_parameters,
            threshold,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| 0.5 * p)),
        )?;

        self.generate_result = Some(sensitive_processor._generate_aggregate_seeded(
            resolution,
            empty_value,
            &reportable_aggregate_result,
            use_synthetic_counts,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| 50.0 + 0.5 * p)),
        )?);
        self.reportable_aggregate_result = Some(reportable_aggregate_result);
        Ok(())
    }
}

impl WasmSdsContext {
    #[inline]
    fn get_sensitive_processor(&self) -> JsResult<&WasmSdsProcessor> {
        self.sensitive_processor
            .as_ref()
            .ok_or_else(|| JsValue::from_str(MISSING_SENSITIVE_DATA_ERROR))
    }

    #[inline]
    fn should_create_sensitive_aggregates(&self, reporting_length: usize) -> bool {
        if let Some(current_reporting_length) = self
            .sensitive_aggregate_result
            .as_ref()
            .map(|r| r.reporting_length)
        {
            if current_reporting_length == reporting_length {
                // nothing to do, the reporting length has not changed
                return false;
            }
        }
        true
    }

    #[inline]
    fn get_or_create_sensitive_aggregate_result(
        &mut self,
        reporting_length: usize,
        progress_reporter: &mut Option<JsProgressReporter>,
    ) -> JsResult<&WasmAggregateResult> {
        if self.should_create_sensitive_aggregates(reporting_length) {
            self.sensitive_aggregate_result = Some(
                self.get_sensitive_processor()?
                    ._aggregate(reporting_length, progress_reporter)?,
            );
        }
        Ok(self.sensitive_aggregate_result.as_ref().unwrap())
    }
}
