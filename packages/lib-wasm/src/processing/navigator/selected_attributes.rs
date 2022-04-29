use js_sys::{Array, Object, Set};
use sds_core::data_block::DataBlockValue;
use std::{
    collections::{HashMap, HashSet},
    convert::TryFrom,
    sync::Arc,
};
use wasm_bindgen::{JsCast, JsValue};

use crate::utils::js::JsSelectedAttributesByColumn;

pub type WasmSelectedAttributes = HashSet<Arc<DataBlockValue>>;

pub type WasmSelectedAttributesByColumn = HashMap<usize, WasmSelectedAttributes>;

impl TryFrom<JsSelectedAttributesByColumn> for WasmSelectedAttributesByColumn {
    type Error = JsValue;

    fn try_from(js_selected_attributes: JsSelectedAttributesByColumn) -> Result<Self, Self::Error> {
        let mut result = WasmSelectedAttributesByColumn::default();

        for entry_res in Object::entries(&js_selected_attributes.dyn_into::<Object>()?).values() {
            let entry = entry_res?.dyn_into::<Array>()?;
            let column_index = entry
                .get(0)
                .as_string()
                .ok_or_else(|| {
                    JsValue::from("invalid column index on selected attributes by column")
                })?
                .parse::<usize>()
                .map_err(|err| JsValue::from(err.to_string()))?;
            let result_entry = result.entry(column_index).or_insert_with(HashSet::default);

            for value_res in entry.get(1).dyn_into::<Set>()?.keys() {
                let value = value_res?;
                let value_str = value.as_string().ok_or_else(|| {
                    JsValue::from("invalid value on selected attributes by column")
                })?;

                result_entry.insert(Arc::new(DataBlockValue::new(
                    column_index,
                    Arc::new(value_str),
                )));
            }
        }
        Ok(result)
    }
}
