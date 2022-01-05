use js_sys::{Array, Object, Reflect::set};
use std::{collections::HashMap, convert::TryFrom, sync::Arc};
use wasm_bindgen::{JsCast, JsValue};

use crate::utils::js::ts_definitions::{
    JsAttributesIntersection, JsAttributesIntersectionByColumn,
};

pub struct WasmAttributesIntersection {
    pub(crate) value: Arc<String>,
    pub(crate) estimated_count: usize,
    pub(crate) actual_count: Option<usize>,
}

impl WasmAttributesIntersection {
    #[inline]
    pub fn new(
        value: Arc<String>,
        estimated_count: usize,
        actual_count: Option<usize>,
    ) -> WasmAttributesIntersection {
        WasmAttributesIntersection {
            value,
            estimated_count,
            actual_count,
        }
    }
}

impl TryFrom<WasmAttributesIntersection> for JsAttributesIntersection {
    type Error = JsValue;

    fn try_from(attributes_intersection: WasmAttributesIntersection) -> Result<Self, Self::Error> {
        let result = Object::new();

        set(
            &result,
            &"value".into(),
            &attributes_intersection.value.as_str().into(),
        )?;
        set(
            &result,
            &"estimatedCount".into(),
            &attributes_intersection.estimated_count.into(),
        )?;
        if let Some(actual_count) = attributes_intersection.actual_count {
            set(&result, &"actualCount".into(), &actual_count.into())?;
        }

        Ok(result.unchecked_into::<JsAttributesIntersection>())
    }
}

pub type WasmAttributesIntersectionByColumn = HashMap<usize, Vec<WasmAttributesIntersection>>;

impl TryFrom<WasmAttributesIntersectionByColumn> for JsAttributesIntersectionByColumn {
    type Error = JsValue;

    fn try_from(
        mut intersections_by_column: WasmAttributesIntersectionByColumn,
    ) -> Result<Self, Self::Error> {
        let result = Object::new();

        for (column_index, mut attrs_intersections) in intersections_by_column.drain() {
            let intersections: Array = Array::default();

            for intersection in attrs_intersections.drain(..) {
                intersections.push(&JsAttributesIntersection::try_from(intersection)?.into());
            }
            set(&result, &column_index.into(), &intersections)?;
        }

        Ok(result.unchecked_into::<JsAttributesIntersectionByColumn>())
    }
}
