use sds_core::data_block::{
    DataBlock, DataBlockRecord, DataBlockValue, MultiValueColumnMetadata,
    MultiValueColumnMetadataMap,
};
use std::{str::FromStr, sync::Arc};

use crate::utils::read_test_data_block;

const DELIMITER: u8 = b',';

const TEST_FILE_PATH: &str = "test_data_block_multi_value.csv";

#[test]
fn valid_all_columns_no_sensitive_zeros() {
    let data_block = read_test_data_block(
        TEST_FILE_PATH,
        DELIMITER,
        None,
        &[],
        &[
            ("B".to_owned(), ";".to_owned()),
            ("C".to_owned(), ";".to_owned()),
            ("D".to_owned(), "|".to_owned()),
        ]
        .iter()
        .cloned()
        .collect(),
        &[],
        0,
    );
    let expected_headers = [
        "RowID",
        "A",
        "B_b1",
        "B_b3",
        "B_b4",
        "C_c1",
        "C_c2",
        "C_c3",
        "F<colon>SenseZeros",
        "G<colon>SenseZeros",
        "D_d1",
        "D_d3",
        "D_d4",
    ]
    .map(|h| Arc::new(String::from(h)))
    .to_vec();
    let expected_records = vec![
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:1").unwrap()),
            Arc::new(DataBlockValue::from_str("1:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("2:1").unwrap()),
            Arc::new(DataBlockValue::from_str("3:1").unwrap()),
            Arc::new(DataBlockValue::from_str("4:1").unwrap()),
            Arc::new(DataBlockValue::from_str("5:1").unwrap()),
            Arc::new(DataBlockValue::from_str("6:1").unwrap()),
            Arc::new(DataBlockValue::from_str("7:1").unwrap()),
            Arc::new(DataBlockValue::from_str("10:1").unwrap()),
            Arc::new(DataBlockValue::from_str("11:1").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:2").unwrap()),
            Arc::new(DataBlockValue::from_str("1:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("5:1").unwrap()),
            Arc::new(DataBlockValue::from_str("10:1").unwrap()),
            Arc::new(DataBlockValue::from_str("12:1").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:3").unwrap()),
            Arc::new(DataBlockValue::from_str("1:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("2:1").unwrap()),
            Arc::new(DataBlockValue::from_str("9:Value<semicolon>ToNormalize").unwrap()),
            Arc::new(DataBlockValue::from_str("10:1").unwrap()),
        ])),
    ];
    let multi_value_column_metadata_map: MultiValueColumnMetadataMap = [
        (
            Arc::new("B_b1".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("B".to_owned()),
                Arc::new("b1".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("B_b3".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("B".to_owned()),
                Arc::new("b3".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("B_b4".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("B".to_owned()),
                Arc::new("b4".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("C_c1".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("C".to_owned()),
                Arc::new("c1".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("C_c2".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("C".to_owned()),
                Arc::new("c2".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("C_c3".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("C".to_owned()),
                Arc::new("c3".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("D_d1".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("D".to_owned()),
                Arc::new("d1".to_owned()),
                "|".to_owned(),
            ),
        ),
        (
            Arc::new("D_d3".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("D".to_owned()),
                Arc::new("d3".to_owned()),
                "|".to_owned(),
            ),
        ),
        (
            Arc::new("D_d4".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("D".to_owned()),
                Arc::new("d4".to_owned()),
                "|".to_owned(),
            ),
        ),
    ]
    .iter()
    .cloned()
    .collect();

    assert!(
        *data_block
            == DataBlock::new(
                expected_headers,
                multi_value_column_metadata_map,
                expected_records
            )
    );
}

#[test]
fn valid_selected_columns_no_sensitive_zeros() {
    let data_block = read_test_data_block(
        TEST_FILE_PATH,
        DELIMITER,
        None,
        &["A".to_owned(), "C".to_owned(), "D".to_owned()],
        &[
            ("B".to_owned(), ";".to_owned()),
            ("C".to_owned(), ";".to_owned()),
            ("D".to_owned(), "|".to_owned()),
        ]
        .iter()
        .cloned()
        .collect(),
        &[],
        0,
    );
    let expected_headers = ["A", "C_c1", "C_c2", "C_c3", "D_d1", "D_d3", "D_d4"]
        .map(|h| Arc::new(String::from(h)))
        .to_vec();
    let expected_records = vec![
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("1:1").unwrap()),
            Arc::new(DataBlockValue::from_str("2:1").unwrap()),
            Arc::new(DataBlockValue::from_str("3:1").unwrap()),
            Arc::new(DataBlockValue::from_str("4:1").unwrap()),
            Arc::new(DataBlockValue::from_str("5:1").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("1:1").unwrap()),
            Arc::new(DataBlockValue::from_str("4:1").unwrap()),
            Arc::new(DataBlockValue::from_str("6:1").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("4:1").unwrap()),
        ])),
    ];
    let multi_value_column_metadata_map: MultiValueColumnMetadataMap = [
        (
            Arc::new("C_c1".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("C".to_owned()),
                Arc::new("c1".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("C_c2".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("C".to_owned()),
                Arc::new("c2".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("C_c3".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("C".to_owned()),
                Arc::new("c3".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("D_d1".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("D".to_owned()),
                Arc::new("d1".to_owned()),
                "|".to_owned(),
            ),
        ),
        (
            Arc::new("D_d3".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("D".to_owned()),
                Arc::new("d3".to_owned()),
                "|".to_owned(),
            ),
        ),
        (
            Arc::new("D_d4".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("D".to_owned()),
                Arc::new("d4".to_owned()),
                "|".to_owned(),
            ),
        ),
    ]
    .iter()
    .cloned()
    .collect();

    assert!(
        *data_block
            == DataBlock::new(
                expected_headers,
                multi_value_column_metadata_map,
                expected_records
            )
    );
}

#[test]
fn valid_selected_columns_with_sensitive_zeros() {
    let data_block = read_test_data_block(
        TEST_FILE_PATH,
        DELIMITER,
        None,
        &[
            "A".to_owned(),
            "B".to_owned(),
            "  g:senseZeros ".to_owned(),
            "D".to_owned(),
        ],
        &[
            ("B".to_owned(), ";".to_owned()),
            ("d".to_owned(), "|".to_owned()),
        ]
        .iter()
        .cloned()
        .collect(),
        &["b".to_owned(), "  g:senseZeros ".to_owned()],
        0,
    );
    let expected_headers = [
        "A",
        "B_0",
        "B_b1",
        "B_b3",
        "B_b4",
        "G<colon>SenseZeros",
        "D_d1",
        "D_d3",
        "D_d4",
    ]
    .map(|h| Arc::new(String::from(h)))
    .to_vec();
    let expected_records = vec![
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("2:1").unwrap()),
            Arc::new(DataBlockValue::from_str("3:1").unwrap()),
            Arc::new(DataBlockValue::from_str("4:1").unwrap()),
            Arc::new(DataBlockValue::from_str("5:0").unwrap()),
            Arc::new(DataBlockValue::from_str("6:1").unwrap()),
            Arc::new(DataBlockValue::from_str("7:1").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("1:1").unwrap()),
            Arc::new(DataBlockValue::from_str("5:0").unwrap()),
            Arc::new(DataBlockValue::from_str("6:1").unwrap()),
            Arc::new(DataBlockValue::from_str("8:1").unwrap()),
        ])),
        Arc::new(DataBlockRecord::new(vec![
            Arc::new(DataBlockValue::from_str("0:a1").unwrap()),
            Arc::new(DataBlockValue::from_str("1:1").unwrap()),
            Arc::new(DataBlockValue::from_str("2:1").unwrap()),
            Arc::new(DataBlockValue::from_str("5:Value<semicolon>ToNormalize").unwrap()),
            Arc::new(DataBlockValue::from_str("6:1").unwrap()),
        ])),
    ];
    let multi_value_column_metadata_map: MultiValueColumnMetadataMap = [
        (
            Arc::new("B_0".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("B".to_owned()),
                Arc::new("0".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("B_b1".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("B".to_owned()),
                Arc::new("b1".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("B_b3".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("B".to_owned()),
                Arc::new("b3".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("B_b4".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("B".to_owned()),
                Arc::new("b4".to_owned()),
                ";".to_owned(),
            ),
        ),
        (
            Arc::new("D_d1".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("D".to_owned()),
                Arc::new("d1".to_owned()),
                "|".to_owned(),
            ),
        ),
        (
            Arc::new("D_d3".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("D".to_owned()),
                Arc::new("d3".to_owned()),
                "|".to_owned(),
            ),
        ),
        (
            Arc::new("D_d4".to_owned()),
            MultiValueColumnMetadata::new(
                Arc::new("D".to_owned()),
                Arc::new("d4".to_owned()),
                "|".to_owned(),
            ),
        ),
    ]
    .iter()
    .cloned()
    .collect();

    assert!(
        *data_block
            == DataBlock::new(
                expected_headers,
                multi_value_column_metadata_map,
                expected_records
            )
    );
}
