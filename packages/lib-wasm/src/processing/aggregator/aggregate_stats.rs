use crate::utils::js::{JsAggregateStatistics, JsResult};
use sds_core::processing::aggregator::RecordsCountByColumn;
use serde::{Deserialize, Serialize};
use wasm_bindgen::{prelude::wasm_bindgen, JsCast, JsValue};

use super::SingleAttributeCounts;

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[wasm_bindgen]
pub struct WasmAggregateStatistics {
    pub(crate) number_of_distinct_attributes: usize,
    pub(crate) single_attribute_counts: SingleAttributeCounts,
    pub(crate) number_of_unique_combinations: usize,
    pub(crate) number_of_records_with_unique_combinations: usize,
    pub(crate) number_of_records_with_unique_combinations_per_column: RecordsCountByColumn,
    pub(crate) number_of_rare_combinations: usize,
    pub(crate) number_of_records_with_rare_combinations: usize,
    pub(crate) number_of_records_with_rare_combinations_per_column: RecordsCountByColumn,
    pub(crate) number_of_records: usize,
    pub(crate) number_of_distinct_combinations: usize,
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
