use super::errors::{
    INVALID_REPORTABLE_REPORTING_LENGTH_ERROR, MISSING_EVALUATE_RESULT_ERROR,
    MISSING_GENERATE_RESULT_ERROR, MISSING_NAVIGATE_RESULT_ERROR,
    MISSING_REPORTABLE_AGGREGATE_RESULT_ERROR, MISSING_SENSITIVE_AGGREGATE_RESULT_ERROR,
    MISSING_SENSITIVE_DATA_ERROR, MISSING_SYNTHETIC_AGGREGATE_RESULT_ERROR,
    MISSING_SYNTHETIC_PROCESSOR_ERROR,
};
use js_sys::Function;
use wasm_bindgen::{prelude::wasm_bindgen, JsCast, JsValue};

use crate::{
    processing::{
        aggregator::WasmAggregateResult,
        evaluator::WasmEvaluateResult,
        generator::WasmGenerateResult,
        navigator::WasmNavigateResult,
        sds_processor::{
            WasmBaseSynthesisParameters, WasmCsvDataParameters, WasmOversamplingParameters,
            WasmSdsProcessor,
        },
    },
    utils::js::{
        JsAggregateResult, JsAggregateStatistics, JsAttributesIntersectionByColumn,
        JsBaseSynthesisParameters, JsCsvDataParameters, JsDpParameters, JsEvaluateResult,
        JsGenerateResult, JsHeaderNames, JsNoisyCountThreshold, JsOversamplingParameters,
        JsProgressReporter, JsReportProgressCallback, JsResult, JsSelectedAttributesByColumn,
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
    pre_computed_aggregates: bool,
    evaluate_result: Option<WasmEvaluateResult>,
    navigate_result: Option<WasmNavigateResult>,
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
            pre_computed_aggregates: false,
            evaluate_result: None,
            navigate_result: None,
        }
    }

    #[wasm_bindgen(js_name = "clear")]
    pub fn clear(&mut self) {
        self.sensitive_data_params = None;
        self.sensitive_processor = None;
        self.sensitive_aggregate_result = None;
        self.generate_result = None;
        self.pre_computed_aggregates = false;
        self.clear_evaluate();
    }

    #[wasm_bindgen(js_name = "setSensitiveData")]
    pub fn set_sensitive_data(
        &mut self,
        csv_data: &str,
        csv_data_params: JsCsvDataParameters,
    ) -> JsResult<()> {
        self.clear();

        let params = WasmCsvDataParameters::try_from(csv_data_params)?;
        let processor = WasmSdsProcessor::new(csv_data, &params)?;

        self.sensitive_data_params = Some(params);
        self.sensitive_processor = Some(processor);

        Ok(())
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
        base_parameters: JsBaseSynthesisParameters,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        self.generate_result = Some(self.get_sensitive_processor()?.generate_unseeded(
            &WasmBaseSynthesisParameters::try_from(base_parameters)?,
            progress_callback,
        )?);
        self.pre_computed_aggregates = false;
        self.clear_evaluate();
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateRowSeeded")]
    pub fn generate_row_seeded(
        &mut self,
        base_parameters: JsBaseSynthesisParameters,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        self.generate_result = Some(self.get_sensitive_processor()?.generate_row_seeded(
            &WasmBaseSynthesisParameters::try_from(base_parameters)?,
            progress_callback,
        )?);
        self.pre_computed_aggregates = false;
        self.clear_evaluate();
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateValueSeeded")]
    pub fn generate_value_seeded(
        &mut self,
        base_parameters: JsBaseSynthesisParameters,
        reporting_length: usize,
        oversampling_parameters: Option<JsOversamplingParameters>,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        let base_params = WasmBaseSynthesisParameters::try_from(base_parameters)?;
        let oversampling_parameters = match oversampling_parameters {
            Some(params) => Some(WasmOversamplingParameters::try_from(params)?),
            _ => None,
        };
        let js_callback: Function = progress_callback.dyn_into()?;

        self.reportable_aggregate_result = Some(
            self.get_or_create_sensitive_aggregate_result(
                reporting_length,
                &mut Some(JsProgressReporter::new(&js_callback, &|p| 0.5 * p)),
            )?
            .protect_with_k_anonymity(base_params.resolution),
        );
        self.generate_result = Some(self.get_sensitive_processor()?._generate_value_seeded(
            &base_params,
            self.get_reportable_aggregate_result()?,
            oversampling_parameters,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| 50.0 + 0.5 * p)),
        )?);
        self.pre_computed_aggregates = true;
        self.clear_evaluate();
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateAggregateSeeded")]
    pub fn generate_aggregate_seeded(
        &mut self,
        base_parameters: JsBaseSynthesisParameters,
        reporting_length: usize,
        use_synthetic_counts: bool,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        let base_params = WasmBaseSynthesisParameters::try_from(base_parameters)?;
        let js_callback: Function = progress_callback.dyn_into()?;

        self.reportable_aggregate_result = Some(
            self.get_or_create_sensitive_aggregate_result(
                reporting_length,
                &mut Some(JsProgressReporter::new(&js_callback, &|p| 0.5 * p)),
            )?
            .protect_with_k_anonymity(base_params.resolution),
        );
        self.generate_result = Some(self.get_sensitive_processor()?._generate_aggregate_seeded(
            &base_params,
            self.get_reportable_aggregate_result()?,
            use_synthetic_counts,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| 50.0 + 0.5 * p)),
        )?);
        self.pre_computed_aggregates = true;
        self.clear_evaluate();
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateDp")]
    pub fn generate_dp(
        &mut self,
        base_parameters: JsBaseSynthesisParameters,
        reporting_length: usize,
        dp_parameters: JsDpParameters,
        threshold: JsNoisyCountThreshold,
        use_synthetic_counts: bool,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        let js_callback: Function = progress_callback.dyn_into()?;

        self.get_or_create_sensitive_aggregate_result(
            reporting_length,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| 0.25 * p)),
        )?;
        self.reportable_aggregate_result =
            Some(self.get_sensitive_processor()?._aggregate_with_dp(
                reporting_length,
                dp_parameters,
                threshold,
                &mut Some(JsProgressReporter::new(&js_callback, &|p| 25.0 + 0.25 * p)),
            )?);
        self.generate_result = Some(self.get_sensitive_processor()?._generate_aggregate_seeded(
            &WasmBaseSynthesisParameters::try_from(base_parameters)?,
            self.get_reportable_aggregate_result()?,
            use_synthetic_counts,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| 50.0 + 0.5 * p)),
        )?);
        self.pre_computed_aggregates = true;
        self.clear_evaluate();
        Ok(())
    }

    #[wasm_bindgen(js_name = "evaluate")]
    pub fn evaluate(
        &mut self,
        reporting_length: usize,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        let js_callback: Function = progress_callback.dyn_into()?;
        let resolution = self.get_generate_result()?.resolution();
        let mut params = (*self.get_sensitive_data_params()?).clone();

        if self.pre_computed_aggregates {
            self.check_reportable_aggregate_result(reporting_length)?;
        } else {
            self.reportable_aggregate_result = Some(
                self.get_or_create_sensitive_aggregate_result(
                    reporting_length,
                    &mut Some(JsProgressReporter::new(&js_callback, &|p| 0.5 * p)),
                )?
                .protect_with_k_anonymity(resolution),
            );
        }

        // always process all the synthetic data
        params.record_limit = 0;

        self.synthetic_processor = Some(WasmSdsProcessor::new(
            &self
                .get_generate_result()?
                .synthetic_data_to_js(params.delimiter)?,
            &params,
        )?);
        self.synthetic_aggregate_result = Some(self.get_synthetic_processor()?._aggregate(
            reporting_length,
            &mut Some(JsProgressReporter::new(&js_callback, &|p| 50.0 + 0.5 * p)),
        )?);
        self.evaluate_result = Some(WasmEvaluateResult::from_aggregate_results(
            self.get_sensitive_aggregate_result()?,
            self.get_reportable_aggregate_result()?,
            self.get_synthetic_aggregate_result()?,
            resolution,
            reporting_length,
        )?);
        self.clear_navigate();
        Ok(())
    }

    #[wasm_bindgen(js_name = "navigate")]
    pub fn navigate(&mut self) -> JsResult<()> {
        self.navigate_result = Some(WasmNavigateResult::from_synthetic_processor(
            self.get_synthetic_processor()?,
        ));
        Ok(())
    }

    #[wasm_bindgen(js_name = "selectAttributes")]
    pub fn select_attributes(&mut self, attributes: JsSelectedAttributesByColumn) -> JsResult<()> {
        self.get_navigate_result_mut()?
            .select_attributes(attributes)
    }

    #[wasm_bindgen(js_name = "attributesIntersectionsByColumn")]
    pub fn attributes_intersections_by_column(
        &self,
        columns: JsHeaderNames,
    ) -> JsResult<JsAttributesIntersectionByColumn> {
        self.get_navigate_result()?
            .attributes_intersections_by_column(columns, self.get_reportable_aggregate_result()?)
    }

    #[wasm_bindgen(js_name = "generateResultToJs")]
    pub fn generate_result_to_js(&self) -> JsResult<JsGenerateResult> {
        self.get_generate_result()?
            .to_js(self.get_sensitive_data_params()?.delimiter)
    }

    #[wasm_bindgen(js_name = "evaluateResultToJs")]
    pub fn evaluate_result_to_js(&self) -> JsResult<JsEvaluateResult> {
        self.get_evaluate_result()?.to_js()
    }

    #[wasm_bindgen(js_name = "sensitiveAggregateResultToJs")]
    pub fn sensitive_aggregate_result_to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
    ) -> JsResult<JsAggregateResult> {
        self.get_sensitive_aggregate_result()?.to_js(
            aggregates_delimiter,
            combination_delimiter,
            self.get_generate_result()?.resolution(),
            false,
        )
    }

    #[wasm_bindgen(js_name = "reportableAggregateResultToJs")]
    pub fn reportable_aggregate_result_to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
    ) -> JsResult<JsAggregateResult> {
        self.get_reportable_aggregate_result()?.to_js(
            aggregates_delimiter,
            combination_delimiter,
            self.get_generate_result()?.resolution(),
            true,
        )
    }

    #[wasm_bindgen(js_name = "syntheticAggregateResultToJs")]
    pub fn synthetic_aggregate_result_to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
    ) -> JsResult<JsAggregateResult> {
        self.get_synthetic_aggregate_result()?.to_js(
            aggregates_delimiter,
            combination_delimiter,
            self.get_generate_result()?.resolution(),
            false,
        )
    }
}

impl WasmSdsContext {
    #[inline]
    fn clear_evaluate(&mut self) {
        if !self.pre_computed_aggregates {
            self.reportable_aggregate_result = None;
        }
        self.synthetic_processor = None;
        self.synthetic_aggregate_result = None;
        self.evaluate_result = None;
        self.clear_navigate();
    }

    #[inline]
    fn clear_navigate(&mut self) {
        self.navigate_result = None;
    }

    #[inline]
    fn get_sensitive_data_params(&self) -> JsResult<&WasmCsvDataParameters> {
        self.sensitive_data_params
            .as_ref()
            .ok_or_else(|| JsValue::from_str(MISSING_SENSITIVE_DATA_ERROR))
    }

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
    fn get_sensitive_aggregate_result(&self) -> JsResult<&WasmAggregateResult> {
        self.sensitive_aggregate_result
            .as_ref()
            .ok_or_else(|| JsValue::from_str(MISSING_SENSITIVE_AGGREGATE_RESULT_ERROR))
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
        self.get_sensitive_aggregate_result()
    }

    #[inline]
    fn check_reportable_aggregate_result(&self, reporting_length: usize) -> JsResult<()> {
        let reportable_aggregate_result = self.get_reportable_aggregate_result()?;

        if reportable_aggregate_result.reporting_length != reporting_length {
            return Err(JsValue::from(
                INVALID_REPORTABLE_REPORTING_LENGTH_ERROR
                    .to_owned()
                    .replace(
                        "{0}",
                        &reportable_aggregate_result.reporting_length.to_string(),
                    )
                    .replace("{1}", &reporting_length.to_string()),
            ));
        }
        Ok(())
    }

    #[inline]
    fn get_generate_result(&self) -> JsResult<&WasmGenerateResult> {
        self.generate_result
            .as_ref()
            .ok_or_else(|| JsValue::from_str(MISSING_GENERATE_RESULT_ERROR))
    }

    #[inline]
    fn get_reportable_aggregate_result(&self) -> JsResult<&WasmAggregateResult> {
        self.reportable_aggregate_result
            .as_ref()
            .ok_or_else(|| JsValue::from_str(MISSING_REPORTABLE_AGGREGATE_RESULT_ERROR))
    }

    #[inline]
    fn get_synthetic_processor(&self) -> JsResult<&WasmSdsProcessor> {
        self.synthetic_processor
            .as_ref()
            .ok_or_else(|| JsValue::from_str(MISSING_SYNTHETIC_PROCESSOR_ERROR))
    }

    #[inline]
    fn get_synthetic_aggregate_result(&self) -> JsResult<&WasmAggregateResult> {
        self.synthetic_aggregate_result
            .as_ref()
            .ok_or_else(|| JsValue::from_str(MISSING_SYNTHETIC_AGGREGATE_RESULT_ERROR))
    }

    #[inline]
    fn get_evaluate_result(&self) -> JsResult<&WasmEvaluateResult> {
        self.evaluate_result
            .as_ref()
            .ok_or_else(|| JsValue::from_str(MISSING_EVALUATE_RESULT_ERROR))
    }

    #[inline]
    fn get_navigate_result_mut(&mut self) -> JsResult<&mut WasmNavigateResult> {
        self.navigate_result
            .as_mut()
            .ok_or_else(|| JsValue::from_str(MISSING_NAVIGATE_RESULT_ERROR))
    }

    #[inline]
    fn get_navigate_result(&self) -> JsResult<&WasmNavigateResult> {
        self.navigate_result
            .as_ref()
            .ok_or_else(|| JsValue::from_str(MISSING_NAVIGATE_RESULT_ERROR))
    }
}
