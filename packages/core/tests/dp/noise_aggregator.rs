use sds_core::dp::{
    CombinationsCountMapByLen, DpParameters, InputValueByLen, NoiseAggregator, NoisyCountThreshold,
};
use std::collections::HashMap;

use crate::utils::{
    assert_map_equals, gen_combinations_count_map, gen_value_combination, read_test_data_block,
};

const DELIMITER: u8 = b',';

const TEST_FILE_PATH: &str = "test_noise_aggregator.csv";

fn get_noise_aggregator() -> NoiseAggregator {
    NoiseAggregator::new(
        read_test_data_block(
            TEST_FILE_PATH,
            DELIMITER,
            None,
            &[],
            &HashMap::default(),
            &[],
            0,
        ),
        3,
        &DpParameters::new(1.0, 0.001, 99, 0.1, None, None),
        NoisyCountThreshold::Fixed(InputValueByLen::default()),
    )
}

#[test]
pub fn validate_gen_all_current_aggregates() {
    let na = get_noise_aggregator();
    let mut noisy_aggregates_by_len = CombinationsCountMapByLen::default();

    noisy_aggregates_by_len.insert(
        1,
        na.gen_all_current_aggregates(&noisy_aggregates_by_len, 1),
    );
    assert_map_equals(
        &noisy_aggregates_by_len[&1],
        &gen_combinations_count_map(&[
            ("a1", 0.0),
            ("a2", 0.0),
            ("b1", 0.0),
            ("b2", 0.0),
            ("c1", 0.0),
            ("d1", 0.0),
            ("d2", 0.0),
        ]),
    );

    noisy_aggregates_by_len.insert(
        2,
        na.gen_all_current_aggregates(&noisy_aggregates_by_len, 2),
    );
    assert_map_equals(
        &noisy_aggregates_by_len[&2],
        &gen_combinations_count_map(&[
            ("a1;b1", 0.0),
            ("a1;b2", 0.0),
            ("a1;c1", 0.0),
            ("a1;d1", 0.0),
            ("a1;d2", 0.0),
            ("a2;b1", 0.0),
            ("a2;b2", 0.0),
            ("a2;c1", 0.0),
            ("a2;d1", 0.0),
            ("a2;d2", 0.0),
            ("b1;c1", 0.0),
            ("b1;d1", 0.0),
            ("b1;d2", 0.0),
            ("b2;c1", 0.0),
            ("b2;d1", 0.0),
            ("b2;d2", 0.0),
            ("c1;d1", 0.0),
            ("c1;d2", 0.0),
        ]),
    );

    noisy_aggregates_by_len.insert(
        3,
        na.gen_all_current_aggregates(&noisy_aggregates_by_len, 3),
    );
    assert_map_equals(
        &noisy_aggregates_by_len[&3],
        &gen_combinations_count_map(&[
            ("a1;b1;c1", 0.0),
            ("a1;b1;d1", 0.0),
            ("a1;b1;d2", 0.0),
            ("a1;b2;c1", 0.0),
            ("a1;b2;d1", 0.0),
            ("a1;b2;d2", 0.0),
            ("a1;c1;d1", 0.0),
            ("a1;c1;d2", 0.0),
            ("a2;b1;c1", 0.0),
            ("a2;b1;d1", 0.0),
            ("a2;b1;d2", 0.0),
            ("a2;b2;c1", 0.0),
            ("a2;b2;d1", 0.0),
            ("a2;b2;d2", 0.0),
            ("a2;c1;d1", 0.0),
            ("a2;c1;d2", 0.0),
            ("b1;c1;d1", 0.0),
            ("b1;c1;d2", 0.0),
            ("b2;c1;d1", 0.0),
            ("b2;c1;d2", 0.0),
        ]),
    );
}

#[test]
pub fn validate_gen_all_current_aggregates_with_removed_combs() {
    let na = get_noise_aggregator();
    let mut noisy_aggregates_by_len = CombinationsCountMapByLen::default();

    noisy_aggregates_by_len.insert(
        1,
        na.gen_all_current_aggregates(&noisy_aggregates_by_len, 1),
    );
    assert_map_equals(
        &noisy_aggregates_by_len[&1],
        &gen_combinations_count_map(&[
            ("a1", 0.0),
            ("a2", 0.0),
            ("b1", 0.0),
            ("b2", 0.0),
            ("c1", 0.0),
            ("d1", 0.0),
            ("d2", 0.0),
        ]),
    );

    noisy_aggregates_by_len.insert(
        2,
        na.gen_all_current_aggregates(&noisy_aggregates_by_len, 2),
    );
    assert_map_equals(
        &noisy_aggregates_by_len[&2],
        &gen_combinations_count_map(&[
            ("a1;b1", 0.0),
            ("a1;b2", 0.0),
            ("a1;c1", 0.0),
            ("a1;d1", 0.0),
            ("a1;d2", 0.0),
            ("a2;b1", 0.0),
            ("a2;b2", 0.0),
            ("a2;c1", 0.0),
            ("a2;d1", 0.0),
            ("a2;d2", 0.0),
            ("b1;c1", 0.0),
            ("b1;d1", 0.0),
            ("b1;d2", 0.0),
            ("b2;c1", 0.0),
            ("b2;d1", 0.0),
            ("b2;d2", 0.0),
            ("c1;d1", 0.0),
            ("c1;d2", 0.0),
        ]),
    );

    noisy_aggregates_by_len
        .get_mut(&2)
        .unwrap()
        .remove(&gen_value_combination("a1;b1"));
    noisy_aggregates_by_len
        .get_mut(&2)
        .unwrap()
        .remove(&gen_value_combination("a2;d1"));

    noisy_aggregates_by_len.insert(
        3,
        na.gen_all_current_aggregates(&noisy_aggregates_by_len, 3),
    );
    assert_map_equals(
        &noisy_aggregates_by_len[&3],
        &gen_combinations_count_map(&[
            ("a1;b2;c1", 0.0),
            ("a1;b2;d1", 0.0),
            ("a1;b2;d2", 0.0),
            ("a1;c1;d1", 0.0),
            ("a1;c1;d2", 0.0),
            ("a2;b1;c1", 0.0),
            ("a2;b1;d2", 0.0),
            ("a2;b2;c1", 0.0),
            ("a2;b2;d2", 0.0),
            ("a2;c1;d2", 0.0),
            ("b1;c1;d1", 0.0),
            ("b1;c1;d2", 0.0),
            ("b2;c1;d1", 0.0),
            ("b2;c1;d2", 0.0),
        ]),
    );
}
