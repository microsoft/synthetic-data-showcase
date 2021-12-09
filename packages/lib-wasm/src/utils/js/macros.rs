#[doc(hidden)]
#[macro_export]
macro_rules! match_or_return_undefined {
    ($result_to_match: expr) => {
        match $result_to_match {
            Ok(result) => result,
            Err(err) => {
                error!("{}", err);
                return JsValue::undefined();
            }
        }
    };
}

#[doc(hidden)]
#[macro_export]
macro_rules! set_or_return_undefined {
    ($($arg:tt)*) => {
        match set($($arg)*) {
            Ok(has_been_set) => {
                if !has_been_set {
                    error!("unable to set object value from wasm");
                    return JsValue::undefined();
                }
            }
            _ => {
                error!("unable to set object value from wasm");
                return JsValue::undefined();
            }
        };
    };
}
