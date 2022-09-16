use crate::utils::js::{JsAggregateStatistics, JsResult};
use sds_core::processing::aggregator::AggregatedMetricByString;
use serde::{Deserialize, Serialize};
use wasm_bindgen::{prelude::wasm_bindgen, JsCast, JsValue};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[wasm_bindgen]
pub struct WasmAggregateStatistics {
    pub(crate) number_of_records_with_rare_combinations: usize,
    pub(crate) percentage_of_records_with_rare_combinations_per_column: AggregatedMetricByString,
    pub(crate) percentage_of_records_with_rare_combinations_per_attribute: AggregatedMetricByString,
    pub(crate) number_of_records: usize,
}

#[wasm_bindgen]
impl WasmAggregateStatistics {
    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(&self) -> JsResult<JsAggregateStatistics> {
        JsValue::from_serde(self)
            .map(|r| r.unchecked_into())
            .map_err(|err| JsValue::from(err.to_string()))
    }
}
