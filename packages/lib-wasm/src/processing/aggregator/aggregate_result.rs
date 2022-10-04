use js_sys::{Object, Reflect::set};
use sds_core::{processing::aggregator::AggregatedData, utils::time::ElapsedDurationLogger};
use std::{ops::Deref, sync::Arc};
use wasm_bindgen::{prelude::*, JsCast};

use crate::{
    processing::aggregator::WasmAggregateStatistics,
    utils::js::{JsAggregateResult, JsResult},
};

#[wasm_bindgen]
#[derive(Clone)]
pub struct WasmAggregateResult {
    pub(crate) aggregated_data: Arc<AggregatedData>,
}

impl WasmAggregateResult {
    #[inline]
    pub fn default() -> WasmAggregateResult {
        WasmAggregateResult {
            aggregated_data: Arc::new(AggregatedData::default()),
        }
    }

    #[inline]
    pub fn new(aggregated_data: Arc<AggregatedData>) -> WasmAggregateResult {
        WasmAggregateResult { aggregated_data }
    }
}

#[wasm_bindgen]
impl WasmAggregateResult {
    #[wasm_bindgen(js_name = "protectWithKAnonymity")]
    pub fn protect_with_k_anonymity(&self, resolution: usize) -> WasmAggregateResult {
        let mut new_aggregated_data = (*self.aggregated_data).clone();

        new_aggregated_data.protect_with_k_anonymity(resolution);
        WasmAggregateResult::new(Arc::new(new_aggregated_data))
    }

    #[wasm_bindgen(js_name = "statistics")]
    pub fn statistics(&self, resolution: usize) -> WasmAggregateStatistics {
        WasmAggregateStatistics {
            number_of_records_with_rare_combinations: self
                .aggregated_data
                .calc_number_of_records_with_rare_combinations(resolution),
            percentage_of_records_with_rare_combinations_per_column: self
                .aggregated_data
                .calc_percentage_of_records_with_rare_combinations_per_column_str(resolution),
            percentage_of_records_with_rare_combinations_per_attribute: self
                .aggregated_data
                .calc_percentage_of_records_with_rare_combinations_per_attribute_str(resolution),
            number_of_records: self.aggregated_data.number_of_records,
        }
    }

    #[wasm_bindgen(getter)]
    #[wasm_bindgen(js_name = "reportingLength")]
    pub fn reporting_length(&self) -> usize {
        self.aggregated_data.reporting_length
    }

    #[wasm_bindgen(js_name = "aggregatesCountToJs")]
    pub fn aggregates_count_to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
        case_insensitive_combinations_order: Option<bool>,
    ) -> JsResult<String> {
        self.aggregated_data
            .write_aggregates_to_string(
                aggregates_delimiter,
                combination_delimiter,
                case_insensitive_combinations_order,
            )
            .map_err(|err| JsValue::from(err.to_string()))
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
        case_insensitive_combinations_order: Option<bool>,
    ) -> JsResult<JsAggregateResult> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("aggregate result serialization"));
        let result = Object::new();

        set(
            &result,
            &"reportingLength".into(),
            &self.reporting_length().into(),
        )?;
        set(
            &result,
            &"aggregatesData".into(),
            &self
                .aggregates_count_to_js(
                    aggregates_delimiter,
                    combination_delimiter,
                    case_insensitive_combinations_order,
                )?
                .into(),
        )?;

        Ok(JsValue::from(result).unchecked_into::<JsAggregateResult>())
    }
}

impl Deref for WasmAggregateResult {
    type Target = AggregatedData;

    fn deref(&self) -> &Self::Target {
        &self.aggregated_data
    }
}
