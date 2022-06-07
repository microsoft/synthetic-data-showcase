use csv::ReaderBuilder;
use fnv::FnvHashMap;
use sds_core::{
    data_block::{CsvDataBlockCreator, DataBlock, DataBlockCreator, DataBlockValue},
    dp::CombinationsCountMap,
    processing::aggregator::{ValueCombination, COMBINATIONS_DELIMITER},
};
use std::{
    collections::HashMap,
    hash::Hash,
    path::{Path, PathBuf},
    sync::Arc,
};

pub fn get_path_on_resources<S: AsRef<Path>>(suffix: S) -> PathBuf {
    let mut ret = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    ret.push("tests/resources");
    ret.push(suffix);
    ret
}

pub fn read_test_data_block<S: AsRef<Path>>(
    path: S,
    delimiter: u8,
    subject_id: Option<String>,
    use_columns: &[String],
    multi_value_columns: &HashMap<String, String>,
    sensitive_zeros: &[String],
    record_limit: usize,
) -> Arc<DataBlock> {
    CsvDataBlockCreator::create(
        ReaderBuilder::new()
            .delimiter(delimiter)
            .from_path(get_path_on_resources(path)),
        subject_id,
        use_columns,
        multi_value_columns,
        sensitive_zeros,
        record_limit,
    )
    .unwrap()
}

pub fn gen_value_combination(combination_str: &str) -> ValueCombination {
    ValueCombination::new(
        combination_str
            .split(COMBINATIONS_DELIMITER)
            .map(|attr| {
                Arc::new(DataBlockValue::new(
                    (attr.chars().next().unwrap() as usize) - ('a' as usize),
                    Arc::new(String::from(attr)),
                ))
            })
            .collect(),
    )
}

pub fn gen_combinations_count_map(tuples: &[(&str, f64)]) -> CombinationsCountMap {
    tuples
        .iter()
        .map(|(value_str, count)| (Arc::new(gen_value_combination(value_str)), *count))
        .collect()
}

pub fn assert_map_equals<K, V>(a: &FnvHashMap<K, V>, b: &FnvHashMap<K, V>)
where
    K: Hash + Eq,
    V: PartialEq,
{
    assert!(
        a.len() == b.len()
            && a.iter()
                .all(|(k, v)| b.contains_key(k) && *b.get(k).unwrap() == *v)
    );
}
