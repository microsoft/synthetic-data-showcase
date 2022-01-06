use serde::Serialize;
use std::convert::TryFrom;
use wasm_bindgen::{JsCast, JsValue};

use crate::utils::js::ts_definitions::JsAggregateCountAndLength;

#[derive(Serialize)]
pub struct WasmAggregateCountAndLength {
    count: usize,
    length: usize,
}

impl WasmAggregateCountAndLength {
    #[inline]
    pub fn new(count: usize, length: usize) -> WasmAggregateCountAndLength {
        WasmAggregateCountAndLength { count, length }
    }
}

impl TryFrom<WasmAggregateCountAndLength> for JsAggregateCountAndLength {
    type Error = JsValue;

    #[inline]
    fn try_from(
        aggregate_count_and_length: WasmAggregateCountAndLength,
    ) -> Result<Self, Self::Error> {
        JsValue::from_serde(&aggregate_count_and_length)
            .map_err(|err| JsValue::from(err.to_string()))
            .map(|c| c.unchecked_into())
    }
}
