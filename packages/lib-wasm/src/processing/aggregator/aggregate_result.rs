use js_sys::{Object, Reflect::set};
use sds_core::{
    processing::aggregator::aggregated_data::AggregatedData, utils::time::ElapsedDurationLogger,
};
use std::ops::{Deref, DerefMut};
use wasm_bindgen::{prelude::*, JsCast};

use crate::utils::js::ts_definitions::{
    JsAggregateCountByLen, JsAggregateResult, JsPrivacyRiskSummary, JsResult,
};

#[wasm_bindgen]
pub struct WasmAggregateResult {
    aggregated_data: AggregatedData,
}

impl WasmAggregateResult {
    #[inline]
    pub fn default() -> WasmAggregateResult {
        WasmAggregateResult {
            aggregated_data: AggregatedData::default(),
        }
    }

    #[inline]
    pub fn new(aggregated_data: AggregatedData) -> WasmAggregateResult {
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

    #[wasm_bindgen(js_name = "rareCombinationsCountByLenToJs")]
    pub fn rare_combinations_count_by_len_to_js(
        &self,
        resolution: usize,
    ) -> JsResult<JsAggregateCountByLen> {
        let count = self
            .aggregated_data
            .calc_rare_combinations_count_by_len(resolution);

        Ok(JsValue::from_serde(&count)
            .map_err(|err| JsValue::from(err.to_string()))?
            .unchecked_into::<JsAggregateCountByLen>())
    }

    #[wasm_bindgen(js_name = "combinationsCountByLenToJs")]
    pub fn combinations_count_by_len_to_js(&self) -> JsResult<JsAggregateCountByLen> {
        let count = self.aggregated_data.calc_combinations_count_by_len();

        Ok(JsValue::from_serde(&count)
            .map_err(|err| JsValue::from(err.to_string()))?
            .unchecked_into::<JsAggregateCountByLen>())
    }

    #[wasm_bindgen(js_name = "combinationsSumByLenToJs")]
    pub fn combinations_sum_by_len_to_js(&self) -> JsResult<JsAggregateCountByLen> {
        let count = self.aggregated_data.calc_combinations_sum_by_len();

        Ok(JsValue::from_serde(&count)
            .map_err(|err| JsValue::from(err.to_string()))?
            .unchecked_into::<JsAggregateCountByLen>())
    }

    #[wasm_bindgen(js_name = "privacyRiskToJs")]
    pub fn privacy_risk_to_js(&self, resolution: usize) -> JsResult<JsPrivacyRiskSummary> {
        let pr = self.aggregated_data.calc_privacy_risk(resolution);
        let result = Object::new();

        set(
            &result,
            &"totalNumberOfRecords".into(),
            &pr.total_number_of_records.into(),
        )?;
        set(
            &result,
            &"totalNumberOfCombinations".into(),
            &pr.total_number_of_combinations.into(),
        )?;
        set(
            &result,
            &"recordsWithUniqueCombinationsCount".into(),
            &pr.records_with_unique_combinations_count.into(),
        )?;
        set(
            &result,
            &"recordsWithRareCombinationsCount".into(),
            &pr.records_with_rare_combinations_count.into(),
        )?;
        set(
            &result,
            &"uniqueCombinationsCount".into(),
            &pr.unique_combinations_count.into(),
        )?;
        set(
            &result,
            &"rareCombinationsCount".into(),
            &pr.rare_combinations_count.into(),
        )?;
        set(
            &result,
            &"recordsWithUniqueCombinationsProportion".into(),
            &pr.records_with_unique_combinations_proportion.into(),
        )?;
        set(
            &result,
            &"recordsWithRareCombinationsProportion".into(),
            &pr.records_with_rare_combinations_proportion.into(),
        )?;
        set(
            &result,
            &"uniqueCombinationsProportion".into(),
            &pr.unique_combinations_proportion.into(),
        )?;
        set(
            &result,
            &"rareCombinationsProportion".into(),
            &pr.rare_combinations_proportion.into(),
        )?;

        Ok(result.unchecked_into::<JsPrivacyRiskSummary>())
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(
        &self,
        aggregates_delimiter: char,
        combination_delimiter: &str,
        resolution: usize,
        counts_are_protected: bool,
        include_aggregates_data: bool,
    ) -> JsResult<JsAggregateResult> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("aggregate result serialization"));
        let result = Object::new();

        set(
            &result,
            &"reportingLength".into(),
            &self.reporting_length().into(),
        )?;
        if include_aggregates_data {
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
        }
        set(
            &result,
            &"rareCombinationsCountByLen".into(),
            &self
                .rare_combinations_count_by_len_to_js(resolution)?
                .into(),
        )?;
        set(
            &result,
            &"combinationsCountByLen".into(),
            &self.combinations_count_by_len_to_js()?.into(),
        )?;
        set(
            &result,
            &"combinationsSumByLen".into(),
            &self.combinations_sum_by_len_to_js()?.into(),
        )?;
        set(
            &result,
            &"privacyRisk".into(),
            &self.privacy_risk_to_js(resolution)?.into(),
        )?;

        Ok(JsValue::from(result).unchecked_into::<JsAggregateResult>())
    }

    #[wasm_bindgen(js_name = "protectAggregatesCount")]
    pub fn protect_aggregates_count(&mut self, resolution: usize) {
        self.aggregated_data.protect_aggregates_count(resolution)
    }
}

impl Deref for WasmAggregateResult {
    type Target = AggregatedData;

    fn deref(&self) -> &Self::Target {
        &self.aggregated_data
    }
}

impl DerefMut for WasmAggregateResult {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.aggregated_data
    }
}
