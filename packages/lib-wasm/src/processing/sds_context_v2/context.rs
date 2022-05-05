use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

use crate::{
    processing::{
        aggregator::WasmAggregateResult,
        sds_processor_v2::{WasmCsvDataParameters, WasmSdsProcessor},
    },
    utils::js::{JsAggregateStatistics, JsCsvDataParameters, JsReportProgressCallback, JsResult},
};

#[wasm_bindgen]
pub struct WasmSdsContext {
    sensitive_data_params: Option<WasmCsvDataParameters>,
    sensitive_processor: Option<WasmSdsProcessor>,
    sensitive_aggregate_result: Option<WasmAggregateResult>,
}

#[wasm_bindgen]
impl WasmSdsContext {
    #[wasm_bindgen(constructor)]
    pub fn default() -> Self {
        WasmSdsContext {
            sensitive_data_params: None,
            sensitive_processor: None,
            sensitive_aggregate_result: None,
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
        self.sensitive_aggregate_result = None;
    }

    #[wasm_bindgen(js_name = "sensitiveAggregate")]
    pub fn sensitive_aggregate(
        &mut self,
        reporting_length: usize,
        progress_callback: JsReportProgressCallback,
    ) -> JsResult<()> {
        // nothing to do, the data and the reporting length has not changed
        if let Some(sensitive_aggregate_result) = self.sensitive_aggregate_result.as_ref() {
            if sensitive_aggregate_result.reporting_length == reporting_length {
                return Ok(());
            }
        }

        self.sensitive_processor
            .as_ref()
            .ok_or_else(|| JsValue::from_str("sensitive data not set"))
            .and_then(|p| {
                p.aggregate(reporting_length, progress_callback).map(|r| {
                    self.sensitive_aggregate_result = Some(r);
                })
            })
    }

    #[wasm_bindgen(js_name = "sensitiveAggregateStatistics")]
    pub fn sensitive_aggregate_statistics(
        &mut self,
        resolution: usize,
    ) -> JsResult<JsAggregateStatistics> {
        self.sensitive_aggregate_result
            .as_ref()
            .ok_or_else(|| JsValue::from_str("sensitive aggregate did not run"))
            .and_then(|aggregate_result| aggregate_result.statistics(resolution).to_js())
    }
}
