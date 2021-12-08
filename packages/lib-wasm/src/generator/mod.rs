use js_sys::{Array, Function};
use log::error;
use sds_core::{processing::generator::Generator, utils::time::ElapsedDurationLogger};
use wasm_bindgen::prelude::*;

use crate::{
    match_or_return_undefined,
    utils::js::{
        deserializers::{
            deserialize_csv_data, deserialize_sensitive_zeros, deserialize_use_columns,
        },
        js_progress_reporter::JsProgressReporter,
    },
};

#[wasm_bindgen]
pub fn generate(
    csv_data: Array,
    use_columns: Array,
    sensitive_zeros: Array,
    record_limit: usize,
    resolution: usize,
    cache_size: usize,
    progress_callback: Function,
) -> JsValue {
    let _duration_logger = ElapsedDurationLogger::new(String::from("generation process"));
    let data_block = match_or_return_undefined!(deserialize_csv_data(
        csv_data,
        &match_or_return_undefined!(deserialize_use_columns(use_columns)),
        &match_or_return_undefined!(deserialize_sensitive_zeros(sensitive_zeros)),
        record_limit,
    ));
    let mut generator = Generator::new(&data_block);

    match_or_return_undefined!(JsValue::from_serde(
        &generator
            .generate(
                resolution,
                cache_size,
                "",
                &mut Some(JsProgressReporter::new(&progress_callback, &|p| p))
            )
            .synthetic_data
    ))
}
