use itertools::Itertools;
use sds_core::{
    data_block::{RawData, RawDataMultiValueColumnJoiner},
    processing::generator::SynthesizerCacheKey,
};
use std::sync::Arc;

use crate::utils::read_test_data_block;

const DELIMITER: u8 = b',';

const TEST_FILE_PATH: &str = "test_multi_value_column_joiner.csv";

#[test]
fn validate_multi_value_column_joiner() {
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
        &["B".to_owned()],
        0,
    );
    let mut raw_data = RawData::default();
    let empty_value = Arc::new("".to_owned());
    let expected = [
        ["ID", "A", "B", "C", "F", "G", "D"].map(|s| Arc::new(s.to_owned())),
        ["1", "a1", "0;b1;b3;b4", "c1;c2;c3", "", "", "d1|d3"].map(|s| Arc::new(s.to_owned())),
        ["2", "a1", "b1", "c1", "", "", "d1"].map(|s| Arc::new(s.to_owned())),
        ["3", "a1", "b1", "c1", "", "", "d1"].map(|s| Arc::new(s.to_owned())),
        ["4", "a1", "b1;b2;b3", "c2", "1", "", "d2"].map(|s| Arc::new(s.to_owned())),
        ["5", "a2", "b1", "c2", "", "", "d2"].map(|s| Arc::new(s.to_owned())),
        ["6", "a2", "b2;b3", "c1", "", "", "d1|d4"].map(|s| Arc::new(s.to_owned())),
        ["7", "a2", "b2", "c2", "1", "", "d2"].map(|s| Arc::new(s.to_owned())),
        ["8", "a2", "b2", "c2", "", "", "d3"].map(|s| Arc::new(s.to_owned())),
        ["9", "a2", "b2", "c1;c3;c4", "", "", "d2"].map(|s| Arc::new(s.to_owned())),
        ["10", "a2", "", "c2", "", "", "d2"].map(|s| Arc::new(s.to_owned())),
        ["11", "a3", "b2", "c2", "", "", "d2"].map(|s| Arc::new(s.to_owned())),
    ]
    .iter()
    .cloned()
    .collect_vec();

    raw_data.push(data_block.headers.to_vec());
    raw_data.extend(data_block.records.iter().map(|r| {
        SynthesizerCacheKey::new(data_block.headers.len(), &r.values).format_record(&empty_value)
    }));

    assert!(
        RawDataMultiValueColumnJoiner::new(
            &raw_data,
            &data_block.multi_value_column_metadata_map,
            &empty_value,
        )
        .join()
            == expected
    );
}

#[test]
fn validate_multi_value_column_joiner_with_different_empty_values() {
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
        &["B".to_owned()],
        0,
    );
    let mut raw_data = RawData::default();
    let empty_value = Arc::new("empty".to_owned());
    let expected = [
        ["ID", "A", "B", "C", "F", "G", "D"].map(|s| Arc::new(s.to_owned())),
        [
            "1",
            "a1",
            "0;b1;b3;b4",
            "c1;c2;c3",
            "empty",
            "empty",
            "d1|d3",
        ]
        .map(|s| Arc::new(s.to_owned())),
        ["2", "a1", "b1", "c1", "empty", "empty", "d1"].map(|s| Arc::new(s.to_owned())),
        ["3", "a1", "b1", "c1", "empty", "empty", "d1"].map(|s| Arc::new(s.to_owned())),
        ["4", "a1", "b1;b2;b3", "c2", "1", "empty", "d2"].map(|s| Arc::new(s.to_owned())),
        ["5", "a2", "b1", "c2", "empty", "empty", "d2"].map(|s| Arc::new(s.to_owned())),
        ["6", "a2", "b2;b3", "c1", "empty", "empty", "d1|d4"].map(|s| Arc::new(s.to_owned())),
        ["7", "a2", "b2", "c2", "1", "empty", "d2"].map(|s| Arc::new(s.to_owned())),
        ["8", "a2", "b2", "c2", "empty", "empty", "d3"].map(|s| Arc::new(s.to_owned())),
        ["9", "a2", "b2", "c1;c3;c4", "empty", "empty", "d2"].map(|s| Arc::new(s.to_owned())),
        ["10", "a2", "empty_multi", "c2", "empty", "empty", "d2"].map(|s| Arc::new(s.to_owned())),
        ["11", "a3", "b2", "c2", "empty", "empty", "d2"].map(|s| Arc::new(s.to_owned())),
    ]
    .iter()
    .cloned()
    .collect_vec();

    raw_data.push(data_block.headers.to_vec());
    raw_data.extend(data_block.records.iter().map(|r| {
        SynthesizerCacheKey::new(data_block.headers.len(), &r.values).format_record(&empty_value)
    }));

    assert!(
        RawDataMultiValueColumnJoiner::new(
            &raw_data,
            &data_block.multi_value_column_metadata_map,
            &Arc::new("empty_multi".to_owned()),
        )
        .join()
            == expected
    );
}
