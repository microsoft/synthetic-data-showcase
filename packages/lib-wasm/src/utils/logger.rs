use super::js::set_panic_hook;
use log::{set_boxed_logger, set_max_level, LevelFilter, Log, Metadata, Record};
use std::str::FromStr;
use wasm_bindgen::prelude::*;
use web_sys::console;

pub struct ConsoleLogger {
    pub level: LevelFilter,
}

impl ConsoleLogger {
    pub fn new(level: LevelFilter) -> ConsoleLogger {
        ConsoleLogger { level }
    }
}

impl Log for ConsoleLogger {
    #[inline]
    fn enabled(&self, metadata: &Metadata) -> bool {
        metadata.level() <= self.level
    }

    #[inline]
    fn log(&self, record: &Record) {
        if self.enabled(record.metadata()) {
            let l_str = format!("[{}] - {}", record.level(), record.args());
            console::log_1(&l_str.into());
        }
    }

    fn flush(&self) {}
}

#[wasm_bindgen]
pub fn init_logger(level_str: &str) -> bool {
    set_panic_hook();
    if let Ok(level) = LevelFilter::from_str(level_str) {
        return match set_boxed_logger(Box::new(ConsoleLogger::new(level))) {
            Ok(_) => {
                set_max_level(level);
                true
            }
            _ => false,
        };
    }
    false
}
