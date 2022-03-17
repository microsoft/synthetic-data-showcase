use super::{
    aggregator::aggregate_result::WasmAggregateResult,
    evaluator::evaluate_result::WasmEvaluateResult, generator::generate_result::WasmGenerateResult,
    navigator::navigate_result::WasmNavigateResult, sds_processor::SDSProcessor,
};
use log::debug;
use wasm_bindgen::{prelude::*, JsCast};

use crate::utils::js::ts_definitions::{
    JsAggregateResult, JsAttributesIntersectionByColumn, JsEvaluateResult, JsGenerateResult,
    JsHeaderNames, JsReportProgressCallback, JsResult, JsSelectedAttributesByColumn,
};

#[wasm_bindgen]
pub struct SDSContext {
    delimiter: char,
    use_columns: JsHeaderNames,
    sensitive_zeros: JsHeaderNames,
    record_limit: usize,
    sensitive_processor: SDSProcessor,
    generate_result: WasmGenerateResult,
    resolution: usize,
    synthetic_processor: SDSProcessor,
    sensitive_aggregate_result: WasmAggregateResult,
    reportable_aggregate_result: WasmAggregateResult,
    synthetic_aggregate_result: WasmAggregateResult,
    evaluate_result: WasmEvaluateResult,
    navigate_result: WasmNavigateResult,
    pre_computed_aggregates: bool,
}

#[wasm_bindgen]
impl SDSContext {
    #[wasm_bindgen(constructor)]
    pub fn default() -> SDSContext {
        SDSContext {
            delimiter: ',',
            use_columns: JsHeaderNames::default(),
            sensitive_zeros: JsHeaderNames::default(),
            record_limit: 0,
            sensitive_processor: SDSProcessor::default(),
            generate_result: WasmGenerateResult::default(),
            resolution: 0,
            synthetic_processor: SDSProcessor::default(),
            sensitive_aggregate_result: WasmAggregateResult::default(),
            reportable_aggregate_result: WasmAggregateResult::default(),
            synthetic_aggregate_result: WasmAggregateResult::default(),
            evaluate_result: WasmEvaluateResult::default(),
            navigate_result: WasmNavigateResult::default(),
            pre_computed_aggregates: false,
        }
    }

    #[wasm_bindgen(js_name = "clearSensitiveData")]
    pub fn clear_sensitive_data(&mut self) {
        self.delimiter = ',';
        self.use_columns = JsHeaderNames::default();
        self.sensitive_zeros = JsHeaderNames::default();
        self.record_limit = 0;
        self.sensitive_processor = SDSProcessor::default();
        self.clear_generate();
    }

    #[wasm_bindgen(js_name = "clearGenerate")]
    pub fn clear_generate(&mut self) {
        self.generate_result = WasmGenerateResult::default();
        self.resolution = 0;

        // if this is true, the sensitive and reportable aggregates
        // have already been calculated (value-seeded or aggregate-seeded mode)
        // and need to be cleaned up
        if self.pre_computed_aggregates {
            self.sensitive_aggregate_result = WasmAggregateResult::default();
            self.reportable_aggregate_result = WasmAggregateResult::default();
        }
        self.pre_computed_aggregates = false;

        self.clear_evaluate()
    }

    #[wasm_bindgen(js_name = "clearEvaluate")]
    pub fn clear_evaluate(&mut self) {
        self.synthetic_processor = SDSProcessor::default();

        // if this is true, the sensitive and reportable aggregates
        // have already been calculated (value-seeded or aggregate-seeded mode)
        if !self.pre_computed_aggregates {
            self.sensitive_aggregate_result = WasmAggregateResult::default();
            self.reportable_aggregate_result = WasmAggregateResult::default();
        }

        self.synthetic_aggregate_result = WasmAggregateResult::default();
        self.evaluate_result = WasmEvaluateResult::default();
        self.clear_navigate()
    }

    #[wasm_bindgen(js_name = "clearNavigate")]
    pub fn clear_navigate(&mut self) {
        self.navigate_result = WasmNavigateResult::default();
    }

    #[wasm_bindgen(js_name = "setSensitiveData")]
    pub fn set_sensitive_data(
        &mut self,
        csv_data: &str,
        delimiter: char,
        use_columns: JsHeaderNames,
        sensitive_zeros: JsHeaderNames,
        record_limit: usize,
    ) -> JsResult<()> {
        debug!("setting sensitive data...");

        self.delimiter = delimiter;
        self.use_columns = use_columns;
        self.sensitive_zeros = sensitive_zeros;
        self.record_limit = record_limit;
        self.sensitive_processor = SDSProcessor::new(
            csv_data,
            self.delimiter,
            self.use_columns.clone().unchecked_into(),
            self.sensitive_zeros.clone().unchecked_into(),
            self.record_limit,
        )?;
        self.clear_generate();
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateUnseeded")]
    pub fn generate_unseeded(
        &mut self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        debug!("generating synthetic data using unseeded approach...");

        self.pre_computed_aggregates = false;
        self.generate_result = self.sensitive_processor.generate_unseeded(
            cache_max_size,
            resolution,
            empty_value,
            progress_callback,
        )?;
        self.resolution = resolution;

        self.clear_evaluate();
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
        debug!("generating synthetic data using row-seeded approach...");

        self.pre_computed_aggregates = false;
        self.generate_result = self.sensitive_processor.generate_row_seeded(
            cache_max_size,
            resolution,
            empty_value,
            progress_callback,
        )?;
        self.resolution = resolution;

        self.clear_evaluate();
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateValueSeeded")]
    #[allow(clippy::too_many_arguments)]
    pub fn generate_value_seeded(
        &mut self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        reporting_length: usize,
        oversampling_ratio: Option<f64>,
        oversampling_tries: Option<usize>,
        aggregates_progress_callback: JsReportProgressCallback,
        synthesis_progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        self.pre_computed_aggregates = true;

        debug!("aggregating sensitive data...");

        self.sensitive_aggregate_result = self
            .sensitive_processor
            .aggregate(reporting_length, aggregates_progress_callback)?;

        debug!("calculating reportable aggregate data...");

        self.reportable_aggregate_result = self
            .sensitive_aggregate_result
            .protect_with_k_anonymity(self.resolution);

        debug!("generating synthetic data using value-seeded approach...");

        self.generate_result = self.sensitive_processor.generate_value_seeded(
            cache_max_size,
            resolution,
            empty_value,
            &self.reportable_aggregate_result,
            oversampling_ratio,
            oversampling_tries,
            synthesis_progress_callback,
        )?;
        self.resolution = resolution;

        self.clear_evaluate();
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateAggregateSeeded")]
    #[allow(clippy::too_many_arguments)]
    pub fn generate_aggregate_seeded(
        &mut self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        reporting_length: usize,
        use_synthetic_counts: bool,
        aggregates_progress_callback: JsReportProgressCallback,
        synthesis_progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        self.pre_computed_aggregates = true;

        debug!("aggregating sensitive data...");

        self.sensitive_aggregate_result = self
            .sensitive_processor
            .aggregate(reporting_length, aggregates_progress_callback)?;

        debug!("calculating reportable aggregate data...");

        self.reportable_aggregate_result = self
            .sensitive_aggregate_result
            .protect_with_k_anonymity(self.resolution);

        debug!("generating synthetic data using aggregate-seeded approach...");

        self.generate_result = self.sensitive_processor.generate_aggregate_seeded(
            cache_max_size,
            resolution,
            empty_value,
            &self.reportable_aggregate_result,
            use_synthetic_counts,
            synthesis_progress_callback,
        )?;
        self.resolution = resolution;

        self.clear_evaluate();
        Ok(())
    }

    #[wasm_bindgen(js_name = "generateDp")]
    #[allow(clippy::too_many_arguments)]
    pub fn generate_dp(
        &mut self,
        cache_max_size: usize,
        resolution: usize,
        empty_value: String,
        reporting_length: usize,
        percentile_percentage: usize,
        sensitivity_filter_epsilon: f64,
        noise_epsilon: f64,
        noise_delta: f64,
        use_synthetic_counts: bool,
        aggregates_progress_callback: JsReportProgressCallback,
        synthesis_progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        self.pre_computed_aggregates = true;

        debug!("aggregating sensitive data...");

        self.sensitive_aggregate_result = self
            .sensitive_processor
            .aggregate(reporting_length, aggregates_progress_callback)?;

        debug!("calculating reportable aggregate data with differential privacy...");

        self.reportable_aggregate_result = self.sensitive_aggregate_result.protect_with_dp(
            percentile_percentage,
            sensitivity_filter_epsilon,
            noise_epsilon,
            noise_delta,
        )?;

        debug!("generating synthetic data using aggregate-seeded approach...");

        self.generate_result = self.sensitive_processor.generate_aggregate_seeded(
            cache_max_size,
            resolution,
            empty_value,
            &self.reportable_aggregate_result,
            use_synthetic_counts,
            synthesis_progress_callback,
        )?;
        self.resolution = resolution;

        self.clear_evaluate();
        Ok(())
    }

    pub fn evaluate(
        &mut self,
        reporting_length: usize,
        sensitive_progress_callback: JsReportProgressCallback,
        synthetic_progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        if self.pre_computed_aggregates {
            if self.sensitive_aggregate_result.reporting_length != reporting_length {
                return Err(
                    JsValue::from(
                        format!(
                            "reportable aggregates computed with reporting length of {}, trying to evaluate with {}",
                            self.sensitive_aggregate_result.reporting_length,
                            reporting_length
                        )
                    )
                );
            }
        } else {
            debug!("aggregating sensitive data...");

            self.sensitive_aggregate_result = self
                .sensitive_processor
                .aggregate(reporting_length, sensitive_progress_callback)?;

            debug!("calculating reportable aggregate data...");

            self.reportable_aggregate_result = self
                .sensitive_aggregate_result
                .protect_with_k_anonymity(self.resolution);
        }

        debug!("aggregating synthetic data...");

        self.synthetic_processor = SDSProcessor::new(
            &self.generate_result.synthetic_data_to_js(self.delimiter)?,
            self.delimiter,
            self.use_columns.clone().unchecked_into(),
            self.sensitive_zeros.clone().unchecked_into(),
            0, // always process all the synthetic data
        )?;

        self.synthetic_aggregate_result = self
            .synthetic_processor
            .aggregate(reporting_length, synthetic_progress_callback)?;

        debug!("evaluating synthetic data based on sensitive data...");

        self.evaluate_result = WasmEvaluateResult::from_aggregate_results(
            &self.sensitive_aggregate_result,
            &self.reportable_aggregate_result,
            &self.synthetic_aggregate_result,
            self.resolution,
            reporting_length,
        )?;

        self.clear_navigate();

        Ok(())
    }

    pub fn navigate(&mut self) {
        debug!("creating navigate result...");

        self.navigate_result =
            WasmNavigateResult::from_synthetic_processor(&self.synthetic_processor);
    }

    #[wasm_bindgen(js_name = "selectAttributes")]
    pub fn select_attributes(&mut self, attributes: JsSelectedAttributesByColumn) -> JsResult<()> {
        self.navigate_result.select_attributes(attributes)
    }

    #[wasm_bindgen(js_name = "attributesIntersectionsByColumn")]
    pub fn attributes_intersections_by_column(
        &mut self,
        columns: JsHeaderNames,
    ) -> JsResult<JsAttributesIntersectionByColumn> {
        self.navigate_result
            .attributes_intersections_by_column(columns, &self.sensitive_aggregate_result)
    }

    #[wasm_bindgen(js_name = "generateResultToJs")]
    pub fn generate_result_to_js(&self) -> JsResult<JsGenerateResult> {
        self.generate_result.to_js(self.delimiter)
    }

    #[wasm_bindgen(js_name = "evaluateResultToJs")]
    pub fn evaluate_result_to_js(&self) -> JsResult<JsEvaluateResult> {
        self.evaluate_result.to_js()
    }

    #[wasm_bindgen(js_name = "sensitiveAggregateResultToJs")]
    pub fn sensitive_aggregate_result_to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
    ) -> JsResult<JsAggregateResult> {
        self.sensitive_aggregate_result.to_js(
            aggregates_delimiter,
            combination_delimiter,
            self.resolution,
            false,
        )
    }

    #[wasm_bindgen(js_name = "reportableAggregateResultToJs")]
    pub fn reportable_aggregate_result_to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
    ) -> JsResult<JsAggregateResult> {
        self.reportable_aggregate_result.to_js(
            aggregates_delimiter,
            combination_delimiter,
            self.resolution,
            true,
        )
    }

    #[wasm_bindgen(js_name = "syntheticAggregateResultToJs")]
    pub fn synthetic_aggregate_result_to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
    ) -> JsResult<JsAggregateResult> {
        self.synthetic_aggregate_result.to_js(
            aggregates_delimiter,
            combination_delimiter,
            self.resolution,
            false,
        )
    }
}
