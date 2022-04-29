use sds_core::dp::InputValueByLen;
use wasm_bindgen::JsValue;

use crate::utils::js::JsInputNumberByLength;

impl TryFrom<JsInputNumberByLength> for InputValueByLen<f64> {
    type Error = JsValue;

    fn try_from(input_number_by_length: JsInputNumberByLength) -> Result<Self, Self::Error> {
        input_number_by_length
            .into_serde::<InputValueByLen<f64>>()
            .map_err(|err| JsValue::from(err.to_string()))
    }
}
