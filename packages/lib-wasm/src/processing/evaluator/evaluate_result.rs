use super::preservation_by_count::WasmPreservationByCount;
use js_sys::{Object, Reflect::set};
use sds_core::{processing::evaluator::Evaluator, utils::time::ElapsedDurationLogger};
use wasm_bindgen::{prelude::*, JsCast};

use crate::{
    processing::aggregator::aggregate_result::WasmAggregateResult,
    utils::js::ts_definitions::{
        JsAggregateCountByLen, JsAggregateResult, JsEvaluateResult, JsResult,
    },
};

#[wasm_bindgen]
pub struct WasmEvaluateResult {
    pub(crate) sensitive_aggregate_result: WasmAggregateResult,
    pub(crate) synthetic_aggregate_result: WasmAggregateResult,
    evaluator: Evaluator,
}

impl WasmEvaluateResult {
    #[inline]
    pub fn default() -> WasmEvaluateResult {
        WasmEvaluateResult {
            sensitive_aggregate_result: WasmAggregateResult::default(),
            synthetic_aggregate_result: WasmAggregateResult::default(),
            evaluator: Evaluator::default(),
        }
    }

    #[inline]
    pub fn new(
        sensitive_aggregate_result: WasmAggregateResult,
        synthetic_aggregate_result: WasmAggregateResult,
    ) -> WasmEvaluateResult {
        WasmEvaluateResult {
            sensitive_aggregate_result,
            synthetic_aggregate_result,
            evaluator: Evaluator::default(),
        }
    }
}

#[wasm_bindgen]
impl WasmEvaluateResult {
    #[wasm_bindgen(constructor)]
    pub fn from_aggregate_results(
        sensitive_aggregate_result: WasmAggregateResult,
        synthetic_aggregate_result: WasmAggregateResult,
    ) -> WasmEvaluateResult {
        WasmEvaluateResult::new(sensitive_aggregate_result, synthetic_aggregate_result)
    }

    #[wasm_bindgen(js_name = "sensitiveAggregateResultToJs")]
    pub fn sensitive_aggregate_result_to_js(
        &self,
        combination_delimiter: &str,
        resolution: usize,
        include_aggregates_count: bool,
    ) -> JsResult<JsAggregateResult> {
        self.sensitive_aggregate_result.to_js(
            combination_delimiter,
            resolution,
            include_aggregates_count,
        )
    }

    #[wasm_bindgen(js_name = "syntheticAggregateResultToJs")]
    pub fn synthetic_aggregate_result_to_js(
        &self,
        combination_delimiter: &str,
        resolution: usize,
        include_aggregates_count: bool,
    ) -> JsResult<JsAggregateResult> {
        self.synthetic_aggregate_result.to_js(
            combination_delimiter,
            resolution,
            include_aggregates_count,
        )
    }

    #[wasm_bindgen(js_name = "leakageCountByLenToJs")]
    pub fn leakage_count_by_len_to_js(&self, resolution: usize) -> JsResult<JsAggregateCountByLen> {
        let count = self.evaluator.calc_leakage_count(
            &self.sensitive_aggregate_result,
            &self.synthetic_aggregate_result,
            resolution,
        );

        Ok(JsValue::from_serde(&count)
            .map_err(|err| JsValue::from(err.to_string()))?
            .unchecked_into::<JsAggregateCountByLen>())
    }

    #[wasm_bindgen(js_name = "fabricatedCountByLenToJs")]
    pub fn fabricated_count_by_len_to_js(&self) -> JsResult<JsAggregateCountByLen> {
        let count = self.evaluator.calc_fabricated_count(
            &self.sensitive_aggregate_result,
            &self.synthetic_aggregate_result,
        );

        Ok(JsValue::from_serde(&count)
            .map_err(|err| JsValue::from(err.to_string()))?
            .unchecked_into::<JsAggregateCountByLen>())
    }

    #[wasm_bindgen(js_name = "preservationByCount")]
    pub fn preservation_by_count(&self, resolution: usize) -> WasmPreservationByCount {
        WasmPreservationByCount::new(self.evaluator.calc_preservation_by_count(
            &self.sensitive_aggregate_result,
            &self.synthetic_aggregate_result,
            resolution,
        ))
    }

    #[wasm_bindgen(js_name = "recordExpansion")]
    pub fn record_expansion(&self) -> f64 {
        (self
            .synthetic_aggregate_result
            .data_block
            .number_of_records() as f64)
            / (self
                .sensitive_aggregate_result
                .data_block
                .number_of_records() as f64)
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(
        &self,
        combination_delimiter: &str,
        resolution: usize,
        include_aggregates_count: bool,
    ) -> JsResult<JsEvaluateResult> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("evaluate result serialization"));
        let result = Object::new();

        set(
            &result,
            &"sensitiveAggregateResult".into(),
            &self
                .sensitive_aggregate_result_to_js(
                    combination_delimiter,
                    resolution,
                    include_aggregates_count,
                )?
                .into(),
        )?;
        set(
            &result,
            &"syntheticAggregateResult".into(),
            &self
                .synthetic_aggregate_result_to_js(
                    combination_delimiter,
                    resolution,
                    include_aggregates_count,
                )?
                .into(),
        )?;

        set(
            &result,
            &"leakageCountByLen".into(),
            &self.leakage_count_by_len_to_js(resolution)?.into(),
        )?;
        set(
            &result,
            &"fabricatedCountByLen".into(),
            &self.fabricated_count_by_len_to_js()?.into(),
        )?;
        set(
            &result,
            &"preservationByCount".into(),
            &self.preservation_by_count(resolution).to_js()?.into(),
        )?;
        set(
            &result,
            &"recordExpansion".into(),
            &self.record_expansion().into(),
        )?;

        Ok(JsValue::from(result).unchecked_into::<JsEvaluateResult>())
    }
}
