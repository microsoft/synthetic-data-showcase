use sds_core::data_block::{
    DataBlock, DataBlockRecord, DataBlockValue, MultiValueColumnMetadataMap,
};
use std::{collections::HashMap, str::FromStr, sync::Arc};

use crate::utils::read_test_data_block;

const DELIMITER: u8 = b',';

const TEST_FILE_PATH: &str = "test_data_block.csv";

#[test]
fn valid_all_columns_no_sensitive_zeros_no_record_limit() {
    let data_block = read_test_data_block(
        TEST_FILE_PATH,
        DELIMITER,
        None,
        &[],
        &HashMap::default(),
        &[],
        0,
    );
    let expected_headers = ["A", "B", "C", "D<semicolon>h", "E<colon>h"]
        .map(|h| Arc::new(String::from(h)))
        .to_vec();
    let expected_records = vec![
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("2:c1").unwrap()),
            Arc::new(DataBlockValue::from_str("3:d1").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a2").unwrap()),
            Arc::new(DataBlockValue::from_str("1:b2").unwrap()),
            Arc::new(DataBlockValue::from_str("3:d3<semicolon>D").unwrap()),
            Arc::new(DataBlockValue::from_str("4:e2").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a3<colon>A").unwrap()),
            Arc::new(DataBlockValue::from_str("1:b3").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![Arc::new(
            DataBlockValue::from_str("3:d4").unwrap(),
        )])),
    ];

    assert!(
        *data_block
            == DataBlock::new(
                expected_headers,
                MultiValueColumnMetadataMap::default(),
                expected_records,
            )
    );
}

#[test]
fn valid_selected_columns_with_sensitive_zeros_no_record_limit() {
    let data_block = read_test_data_block(
        TEST_FILE_PATH,
        DELIMITER,
        None,
        &[String::from("A"), String::from("B"), String::from("D;h")],
        &HashMap::default(),
        &[String::from("B")],
        0,
    );
    let expected_headers = ["A", "B", "D<semicolon>h"]
        .map(|h| Arc::new(String::from(h)))
        .to_vec();
    let expected_records = vec![
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("1:0").unwrap()),
            Arc::new(DataBlockValue::from_str("2:d1").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a2").unwrap()),
            Arc::new(DataBlockValue::from_str("1:b2").unwrap()),
            Arc::new(DataBlockValue::from_str("2:d3<semicolon>D").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a3<colon>A").unwrap()),
            Arc::new(DataBlockValue::from_str("1:b3").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("1:0").unwrap()),
            Arc::new(DataBlockValue::from_str("2:d4").unwrap()),
        ])),
    ];

    assert!(
        *data_block
            == DataBlock::new(
                expected_headers,
                MultiValueColumnMetadataMap::default(),
                expected_records
            )
    );
}

#[test]
fn valid_selected_columns_with_sensitive_zeros_and_record_limit() {
    let data_block = read_test_data_block(
        TEST_FILE_PATH,
        DELIMITER,
        None,
        &[String::from("A"), String::from("B"), String::from("D;h")],
        &HashMap::default(),
        &[String::from("B")],
        2,
    );
    let expected_headers = ["A", "B", "D<semicolon>h"]
        .map(|h| Arc::new(String::from(h)))
        .to_vec();
    let expected_records = vec![
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("1:0").unwrap()),
            Arc::new(DataBlockValue::from_str("2:d1").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a2").unwrap()),
            Arc::new(DataBlockValue::from_str("1:b2").unwrap()),
            Arc::new(DataBlockValue::from_str("2:d3<semicolon>D").unwrap()),
        ])),
    ];

    assert!(
        *data_block
            == DataBlock::new(
                expected_headers,
                MultiValueColumnMetadataMap::default(),
                expected_records
            )
    );
}
