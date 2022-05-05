use js_sys::Array;
use wasm_bindgen::JsCast;

use crate::utils::js::JsHeaderNames;

impl JsHeaderNames {
    #[inline]
    pub fn default() -> JsHeaderNames {
        Array::default().unchecked_into()
    }
}
