use super::{
    attributes_intersection::{WasmAttributesIntersection, WasmAttributesIntersectionByColumn},
    selected_attributes::{WasmSelectedAttributes, WasmSelectedAttributesByColumn},
};
use js_sys::{Object, Reflect::set};
use sds_core::{
    data_block::{
        AttributeRows, AttributeRowsByColumnMap, AttributeRowsMap, ColumnIndexByName, CsvRecord,
        DataBlock, DataBlockValue,
    },
    processing::aggregator::ValueCombination,
    utils::{collections::ordered_vec_intersection, time::ElapsedDurationLogger},
};
use std::{cmp::Reverse, convert::TryFrom, sync::Arc};
use wasm_bindgen::{prelude::*, JsCast};

use crate::{
    processing::{
        aggregator::WasmAggregateResult,
        sds_processor::{HeaderNames, WasmSdsProcessor},
    },
    utils::js::{
        JsAttributesIntersectionByColumn, JsHeaderNames, JsNavigateResult, JsResult,
        JsSelectedAttributesByColumn,
    },
};

#[wasm_bindgen]
pub struct WasmNavigateResult {
    header_names: HeaderNames,
    synthetic_data_block: Arc<DataBlock>,
    attr_rows_by_column: AttributeRowsByColumnMap,
    selected_attributes: WasmSelectedAttributesByColumn,
    selected_attr_rows: AttributeRows,
    all_attr_rows: AttributeRows,
    column_index_by_name: ColumnIndexByName,
}

impl WasmNavigateResult {
    #[inline]
    pub fn default() -> WasmNavigateResult {
        WasmNavigateResult::new(
            HeaderNames::default(),
            Arc::new(DataBlock::default()),
            AttributeRowsByColumnMap::default(),
            WasmSelectedAttributesByColumn::default(),
            AttributeRows::default(),
            AttributeRows::default(),
            ColumnIndexByName::default(),
        )
    }

    #[inline]
    pub fn new(
        header_names: HeaderNames,
        synthetic_data_block: Arc<DataBlock>,
        attr_rows_by_column: AttributeRowsByColumnMap,
        selected_attributes: WasmSelectedAttributesByColumn,
        selected_attr_rows: AttributeRows,
        all_attr_rows: AttributeRows,
        column_index_by_name: ColumnIndexByName,
    ) -> WasmNavigateResult {
        WasmNavigateResult {
            header_names,
            synthetic_data_block,
            attr_rows_by_column,
            selected_attributes,
            selected_attr_rows,
            all_attr_rows,
            column_index_by_name,
        }
    }

    #[inline]
    fn intersect_attributes(&self, attributes: &WasmSelectedAttributesByColumn) -> AttributeRows {
        let default_empty_attr_rows = AttributeRowsMap::default();
        let default_empty_rows = AttributeRows::default();
        let mut result = self.all_attr_rows.clone();

        for (column_index, values) in attributes.iter() {
            let attr_rows = self
                .attr_rows_by_column
                .get(column_index)
                .unwrap_or(&default_empty_attr_rows);
            for value in values.iter() {
                result = ordered_vec_intersection(
                    &result,
                    attr_rows.get(value).unwrap_or(&default_empty_rows),
                );
            }
        }
        result
    }

    #[inline]
    fn get_sensitive_aggregates_count(
        &self,
        attributes: &WasmSelectedAttributesByColumn,
        sensitive_aggregate_result: &WasmAggregateResult,
    ) -> Option<usize> {
        let mut combination: Vec<Arc<DataBlockValue>> = attributes
            .values()
            .flat_map(|values| values.iter().cloned())
            .collect();

        combination.sort_by_key(|k| k.as_str_using_headers(&self.synthetic_data_block.headers));

        sensitive_aggregate_result
            .aggregates_count
            .get(&ValueCombination::new(combination))
            .map(|c| c.count)
    }

    #[inline]
    fn get_selected_but_current_column(
        &self,
        column_index: usize,
    ) -> (WasmSelectedAttributesByColumn, AttributeRows) {
        let mut selected_attributes_but_current_column = self.selected_attributes.clone();

        selected_attributes_but_current_column.remove(&column_index);

        let selected_attr_rows_but_current_column =
            self.intersect_attributes(&selected_attributes_but_current_column);

        (
            selected_attributes_but_current_column,
            selected_attr_rows_but_current_column,
        )
    }

    #[inline]
    fn selected_attributes_contains_value(
        &self,
        column_index: usize,
        value: &Arc<DataBlockValue>,
    ) -> bool {
        self.selected_attributes
            .get(&column_index)
            .map(|values| values.contains(value))
            .unwrap_or(false)
    }
}

#[wasm_bindgen]
impl WasmNavigateResult {
    #[wasm_bindgen(constructor)]
    pub fn from_synthetic_processor(synthetic_processor: &WasmSdsProcessor) -> WasmNavigateResult {
        WasmNavigateResult::new(
            synthetic_processor
                .data_block
                .headers
                .iter()
                .map(|h| (**h).clone())
                .collect(),
            synthetic_processor.data_block.clone(),
            synthetic_processor
                .data_block
                .calc_attr_rows_by_column_with_no_empty_values(),
            WasmSelectedAttributesByColumn::default(),
            AttributeRows::default(),
            (0..synthetic_processor.data_block.number_of_records()).collect(),
            synthetic_processor.data_block.calc_column_index_by_name(),
        )
    }

    #[wasm_bindgen(js_name = "selectAttributes")]
    pub fn select_attributes(&mut self, attributes: JsSelectedAttributesByColumn) -> JsResult<()> {
        self.selected_attributes = WasmSelectedAttributesByColumn::try_from(attributes)?;
        self.selected_attr_rows = self.intersect_attributes(&self.selected_attributes);
        Ok(())
    }

    #[wasm_bindgen(js_name = "attributesIntersectionsByColumn")]
    pub fn attributes_intersections_by_column(
        &self,
        columns: JsHeaderNames,
        sensitive_aggregate_result: &WasmAggregateResult,
    ) -> JsResult<JsAttributesIntersectionByColumn> {
        let column_indexes: AttributeRows = CsvRecord::try_from(columns)?
            .iter()
            .filter_map(|header_name| self.column_index_by_name.get(header_name))
            .cloned()
            .collect();
        let mut result = WasmAttributesIntersectionByColumn::default();

        for column_index in column_indexes {
            let result_column_entry = result.entry(column_index).or_insert_with(Vec::default);
            if let Some(attr_rows) = self.attr_rows_by_column.get(&column_index) {
                let (selected_attributes_but_current_column, selected_attr_rows_but_current_column) =
                    self.get_selected_but_current_column(column_index);

                for (value, rows) in attr_rows {
                    let current_selected_attr_rows;
                    let current_selected_attributes;

                    if self.selected_attributes_contains_value(column_index, value) {
                        // if the selected attributes contain the current value, we
                        // have already the selected attr rows cached
                        current_selected_attributes = &self.selected_attributes;
                        current_selected_attr_rows = &self.selected_attr_rows;
                    } else {
                        // if the selected attributes do not contain the current value
                        // use the intersection between all selected values, but the
                        // ones in the current column
                        current_selected_attributes = &selected_attributes_but_current_column;
                        current_selected_attr_rows = &selected_attr_rows_but_current_column;
                    };

                    let estimated_count =
                        ordered_vec_intersection(current_selected_attr_rows, rows).len();

                    if estimated_count > 0 {
                        let mut attributes = current_selected_attributes.clone();
                        let attributes_entry = attributes
                            .entry(column_index)
                            .or_insert_with(WasmSelectedAttributes::default);

                        attributes_entry.insert(value.clone());

                        result_column_entry.push(WasmAttributesIntersection::new(
                            value.value.clone(),
                            estimated_count,
                            self.get_sensitive_aggregates_count(
                                &attributes,
                                sensitive_aggregate_result,
                            ),
                        ));
                    }
                }
            }
        }

        // sort by estimated count in descending order
        for intersections in result.values_mut() {
            intersections.sort_by_key(|intersection| Reverse(intersection.estimated_count))
        }

        JsAttributesIntersectionByColumn::try_from(result)
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(&self) -> JsResult<JsNavigateResult> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("navigate result serialization"));
        let result = Object::new();

        set(
            &result,
            &"headerNames".into(),
            &JsValue::from_serde(&self.header_names)
                .map_err(|err| JsValue::from(err.to_string()))?,
        )?;

        Ok(JsValue::from(result).unchecked_into::<JsNavigateResult>())
    }
}
