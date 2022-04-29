use sds_core::data_block::{DataBlockHeaders, DataBlockValue};
use std::{str::FromStr, sync::Arc};

fn get_headers() -> DataBlockHeaders {
    ["A", "B"].map(|h| Arc::new(String::from(h))).to_vec()
}

fn get_value_0() -> DataBlockValue {
    DataBlockValue::new(0, Arc::new(String::from("a1")))
}

fn get_value_1() -> DataBlockValue {
    DataBlockValue::new(1, Arc::new(String::from("b2")))
}

#[test]
fn valid_as_str_using_headers() {
    assert!(get_value_0().as_str_using_headers(&get_headers()) == "A:a1");
    assert!(get_value_1().as_str_using_headers(&get_headers()) == "B:b2");
}

#[test]
fn valid_as_str() {
    assert!(get_value_0().to_string() == "0:a1");
    assert!(get_value_1().to_string() == "1:b2");
}

#[test]
fn valid_from_str() {
    assert!(DataBlockValue::from_str(&get_value_0().to_string()).unwrap() == get_value_0());
    assert!(DataBlockValue::from_str(&get_value_1().to_string()).unwrap() == get_value_1());
    assert!(DataBlockValue::from_str("invalid").is_err());
    assert!(DataBlockValue::from_str("invalid:a1").is_err());
}

#[test]
fn invalid_from_str() {
    assert!(DataBlockValue::from_str("invalid").is_err());
    assert!(DataBlockValue::from_str("invalid:a1").is_err());
}
