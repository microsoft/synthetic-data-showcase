use js_sys::{Object, Reflect::set};
use sds_core::{processing::aggregator::AggregatedData, utils::time::ElapsedDurationLogger};
use std::{ops::Deref, sync::Arc};
use wasm_bindgen::{prelude::*, JsCast};

use crate::{
    processing::aggregator::{SingleAttributeCounts, WasmAggregateStatistics},
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
        resolution: usize,
        counts_are_protected: bool,
    ) -> JsResult<String> {
        self.aggregated_data
            .write_aggregates_to_string(
                aggregates_delimiter,
                combination_delimiter,
                resolution,
                counts_are_protected,
            )
            .map_err(|err| JsValue::from(err.to_string()))
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
        resolution: usize,
        counts_are_protected: bool,
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
                    resolution,
                    counts_are_protected,
                )?
                .into(),
        )?;

        Ok(JsValue::from(result).unchecked_into::<JsAggregateResult>())
    }

    #[wasm_bindgen(js_name = "protectWithKAnonymity")]
    pub fn protect_with_k_anonymity(&mut self, resolution: usize) -> WasmAggregateResult {
        let mut new_aggregated_data = (*self.aggregated_data).clone();

        new_aggregated_data.protect_with_k_anonymity(resolution);

        WasmAggregateResult::new(Arc::new(new_aggregated_data))
    }

    #[wasm_bindgen(js_name = "statistics")]
    pub fn statistics(&self, resolution: usize) -> WasmAggregateStatistics {
        let single_attribute_counts: SingleAttributeCounts = self
            .aggregated_data
            .calc_single_attribute_counts()
            .drain()
            .map(|(attr, count)| {
                (
                    attr.as_str_using_headers(&self.aggregated_data.headers),
                    count,
                )
            })
            .collect();

        WasmAggregateStatistics {
            number_of_distinct_attributes: single_attribute_counts.len(),
            single_attribute_counts,
            number_of_unique_combinations: self
                .aggregated_data
                .calc_number_of_unique_combinations(),
            number_of_records_with_unique_combinations: self
                .aggregated_data
                .calc_number_of_records_with_unique_combinations(),
            number_of_rare_combinations: self
                .aggregated_data
                .calc_number_of_rare_combinations(resolution),
            number_of_records_with_rare_combinations: self
                .aggregated_data
                .calc_number_of_records_with_rare_combinations(resolution),
            number_of_records: self.aggregated_data.number_of_records,
            number_of_distinct_combinations: self.aggregated_data.number_of_distinct_combinations(),
        }
    }
}

impl Deref for WasmAggregateResult {
    type Target = AggregatedData;

    fn deref(&self) -> &Self::Target {
        &self.aggregated_data
    }
}
