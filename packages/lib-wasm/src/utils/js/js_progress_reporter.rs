use js_sys::Function;
use log::error;
use sds_core::utils::reporting::ReportProgress;
use wasm_bindgen::JsValue;

type MutateProgressExpr = dyn Fn(f64) -> f64;

pub struct JsProgressReporter<'mutate_expr, 'js_callback> {
    progress: f64,
    js_callback: &'js_callback Function,
    mutate_expr: &'mutate_expr MutateProgressExpr,
}

impl<'mutate_expr, 'js_callback> JsProgressReporter<'mutate_expr, 'js_callback> {
    pub fn new(
        js_callback: &'js_callback Function,
        mutate_expr: &'mutate_expr MutateProgressExpr,
    ) -> JsProgressReporter<'mutate_expr, 'js_callback> {
        JsProgressReporter {
            progress: 0.0,
            js_callback,
            mutate_expr,
        }
    }
}

impl<'mutate_expr, 'js_callback> ReportProgress for JsProgressReporter<'mutate_expr, 'js_callback> {
    fn report(&mut self, new_progress: f64) -> bool {
        let p = (self.mutate_expr)(new_progress);

        if p.floor() > self.progress {
            self.progress = p;
            match self
                .js_callback
                .call1(&JsValue::NULL, &JsValue::from_f64(p))
            {
                Ok(continue_processing) => continue_processing.as_bool().unwrap_or(false),
                Err(_) => {
                    error!("error reporting progress to js");
                    false
                }
            }
        } else {
            true
        }
    }
}
