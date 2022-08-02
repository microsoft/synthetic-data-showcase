use csv::ReaderBuilder;
use itertools::Itertools;
use sds_core::{
    data_block::{CsvDataBlockCreator, DataBlockCreator, RawData, RawDataMultiValueColumnJoiner},
    processing::generator::SynthesizerCacheKey,
};
use std::sync::Arc;

use crate::utils::get_path_on_resources;

const DELIMITER: u8 = b',';

const MISSING_ID_CSV_FILE_PATH: &str = "test_duplicated_id_missing_id.csv";

const VALID_CSV_FILE_PATH: &str = "test_duplicated_id_valid.csv";

#[test]
fn invalid_duplicated_id_missing_id() {
    let data_block = CsvDataBlockCreator::create(
        ReaderBuilder::new()
            .delimiter(DELIMITER)
            .from_path(get_path_on_resources(MISSING_ID_CSV_FILE_PATH)),
        Some("ID".to_owned()),
        &[],
        &[].iter().cloned().collect(),
        &[],
        0,
    );

    assert!(data_block.is_err());
    if let Err(err) = data_block {
        let s = err.to_string();
        assert!(s == "records with missing/empty Subject ID")
    }
}

#[test]
fn invalid_duplicated_id_missing_multi_value_cols() {
    let data_block = CsvDataBlockCreator::create(
        ReaderBuilder::new()
            .delimiter(DELIMITER)
            .from_path(get_path_on_resources(VALID_CSV_FILE_PATH)),
        Some("ID".to_owned()),
        &[],
        &[].iter().cloned().collect(),
        &[],
        0,
    );

    assert!(data_block.is_err());
    if let Err(err) = data_block {
        let s = err.to_string();
        assert!(s == "records with duplicated IDs, please set the following columns as multi value if you want to join records with duplicated IDs: A, B, C, D")
    }
}

#[test]
fn valid_duplicated_id() {
    let data_block = CsvDataBlockCreator::create(
        ReaderBuilder::new()
            .delimiter(DELIMITER)
            .from_path(get_path_on_resources(VALID_CSV_FILE_PATH)),
        Some("ID".to_owned()),
        &[],
        &[
            ("A".to_owned(), ";".to_owned()),
            ("B".to_owned(), ";".to_owned()),
            ("C".to_owned(), ";".to_owned()),
            ("D".to_owned(), "|".to_owned()),
        ]
        .iter()
        .cloned()
        .collect(),
        &[],
        0,
    )
    .unwrap();
    let mut raw_data = RawData::default();
    let empty_value = Arc::new("".to_owned());
    let expected = [
        ["ID", "A", "B", "C", "F", "G", "D"].map(|s| Arc::new(s.to_owned())),
        ["1", "a1", "b1;b3;b4", "c1;c2;c3", "", "", "d1|d3"].map(|s| Arc::new(s.to_owned())),
        ["2", "a1", "b1;b2;b3", "c2", "1", "", "d2"].map(|s| Arc::new(s.to_owned())),
        ["3", "a2", "b1", "c2", "", "", "d2"].map(|s| Arc::new(s.to_owned())),
        ["4", "a2", "b2;b3", "c1", "1", "", "d1|d4"].map(|s| Arc::new(s.to_owned())),
        ["5", "a2", "b2", "c2", "", "", "d3"].map(|s| Arc::new(s.to_owned())),
        ["6", "a2", "b2", "c1;c3;c4", "", "", "d2"].map(|s| Arc::new(s.to_owned())),
        ["7", "a2", "", "c2", "", "", "d2"].map(|s| Arc::new(s.to_owned())),
        ["8", "a3", "b2", "c2", "", "", "d2"].map(|s| Arc::new(s.to_owned())),
        ["9", "a1;a2;b2", "b1;b2", "c2", "", "1", "d1|d10|d3|d7"].map(|s| Arc::new(s.to_owned())),
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
