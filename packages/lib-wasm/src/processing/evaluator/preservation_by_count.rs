use js_sys::{Object, Reflect::set};
use sds_core::{
    processing::evaluator::preservation_by_count::PreservationByCountBuckets,
    utils::time::ElapsedDurationLogger,
};
use std::ops::{Deref, DerefMut};
use wasm_bindgen::{prelude::*, JsCast};

use crate::utils::js::ts_definitions::{
    JsPreservationByCount, JsPreservationByCountBuckets, JsResult,
};

#[wasm_bindgen]
pub struct WasmPreservationByCount {
    preservation_by_count_buckets: PreservationByCountBuckets,
}

impl WasmPreservationByCount {
    #[inline]
    pub fn new(
        preservation_by_count_buckets: PreservationByCountBuckets,
    ) -> WasmPreservationByCount {
        WasmPreservationByCount {
            preservation_by_count_buckets,
        }
    }
}

#[wasm_bindgen]
impl WasmPreservationByCount {
    #[wasm_bindgen(js_name = "bucketsToJs")]
    pub fn buckets_to_js(&self) -> JsResult<JsPreservationByCountBuckets> {
        let result = Object::new();

        for (bucket_index, b) in self.preservation_by_count_buckets.iter() {
            let serialized_bucket = Object::new();

            set(&serialized_bucket, &"size".into(), &b.size.into())?;
            set(
                &serialized_bucket,
                &"preservationSum".into(),
                &b.preservation_sum.into(),
            )?;
            set(
                &serialized_bucket,
                &"lengthSum".into(),
                &b.length_sum.into(),
            )?;
            set(
                &serialized_bucket,
                &"combinationCountSum".into(),
                &b.combination_count_sum.into(),
            )?;

            set(&result, &(*bucket_index).into(), &serialized_bucket.into())?;
        }
        Ok(result.unchecked_into::<JsPreservationByCountBuckets>())
    }

    #[wasm_bindgen(js_name = "combinationLoss")]
    pub fn combination_loss(&self) -> f64 {
        self.preservation_by_count_buckets.calc_combination_loss()
    }

    #[wasm_bindgen(js_name = "toJs")]
    pub fn to_js(&self) -> JsResult<JsPreservationByCount> {
        let _duration_logger =
            ElapsedDurationLogger::new(String::from("preservation by count serialization"));
        let result = Object::new();

        set(&result, &"buckets".into(), &self.buckets_to_js()?.into())?;
        set(
            &result,
            &"combinationLoss".into(),
            &self.combination_loss().into(),
        )?;
        Ok(JsValue::from(result).unchecked_into::<JsPreservationByCount>())
    }
}

impl Deref for WasmPreservationByCount {
    type Target = PreservationByCountBuckets;

    fn deref(&self) -> &Self::Target {
        &self.preservation_by_count_buckets
    }
}

impl DerefMut for WasmPreservationByCount {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.preservation_by_count_buckets
    }
}
