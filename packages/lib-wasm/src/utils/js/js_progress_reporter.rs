use js_sys::Function;
use log::error;
use sds_core::utils::reporting::ReportProgress;
use wasm_bindgen::JsValue;

type MutateProgressExpr = dyn Fn(f64) -> f64;

pub struct JsProgressReporter<'js_callback, 'mutate_expr> {
    progress: f64,
    js_callback: &'js_callback Function,
    mutate_expr: &'mutate_expr MutateProgressExpr,
}

impl<'js_callback, 'mutate_expr> JsProgressReporter<'js_callback, 'mutate_expr> {
    pub fn new(
        js_callback: &'js_callback Function,
        mutate_expr: &'mutate_expr MutateProgressExpr,
    ) -> JsProgressReporter<'js_callback, 'mutate_expr> {
        JsProgressReporter {
            progress: 0.0,
            js_callback,
            mutate_expr,
        }
    }
}

impl<'js_callback, 'mutate_expr> ReportProgress for JsProgressReporter<'js_callback, 'mutate_expr> {
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
