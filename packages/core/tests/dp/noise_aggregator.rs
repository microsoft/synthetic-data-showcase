use sds_core::{
    dp::{CombinationsCountMapByLen, NoiseAggregator},
    processing::aggregator::AggregatedData,
};

use crate::utils::{
    assert_map_equals, gen_aggregated_data, gen_combinations_count_map, gen_value_combination,
    read_test_data_block,
};

const DELIMITER: u8 = b',';

const TEST_FILE_PATH: &str = "test_noise_aggregator.csv";

fn get_aggregated_data() -> AggregatedData {
    gen_aggregated_data(
        read_test_data_block(TEST_FILE_PATH, DELIMITER, &[], &[], 0),
        3,
    )
}

#[test]
pub fn validate_gen_all_current_aggregates() {
    let mut aggregated_data = get_aggregated_data();
    let na = NoiseAggregator::new(&mut aggregated_data);
    let mut noisy_aggregates_by_len = CombinationsCountMapByLen::default();

    noisy_aggregates_by_len.insert(
        1,
        na.gen_all_current_aggregates(&noisy_aggregates_by_len, 1),
    );
    assert_map_equals(
        &noisy_aggregates_by_len[&1],
        &gen_combinations_count_map(&[
            ("a1", 2.0),
            ("a2", 1.0),
            ("b1", 1.0),
            ("b2", 1.0),
            ("c1", 2.0),
            ("d1", 1.0),
            ("d2", 1.0),
        ]),
    );

    noisy_aggregates_by_len.insert(
        2,
        na.gen_all_current_aggregates(&noisy_aggregates_by_len, 2),
    );
    assert_map_equals(
        &noisy_aggregates_by_len[&2],
        &gen_combinations_count_map(&[
            ("a1;b1", 1.0),
            ("a1;b2", 0.0),
            ("a1;c1", 2.0),
            ("a1;d1", 1.0),
            ("a1;d2", 0.0),
            ("a2;b1", 0.0),
            ("a2;b2", 1.0),
            ("a2;c1", 0.0),
            ("a2;d1", 0.0),
            ("a2;d2", 1.0),
            ("b1;c1", 1.0),
            ("b1;d1", 1.0),
            ("b1;d2", 0.0),
            ("b2;c1", 0.0),
            ("b2;d1", 0.0),
            ("b2;d2", 1.0),
            ("c1;d1", 1.0),
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
            ("a1;b1;c1", 1.0),
            ("a1;b1;d1", 1.0),
            ("a1;b1;d2", 0.0),
            ("a1;b2;c1", 0.0),
            ("a1;b2;d1", 0.0),
            ("a1;b2;d2", 0.0),
            ("a1;c1;d1", 1.0),
            ("a1;c1;d2", 0.0),
            ("a2;b1;c1", 0.0),
            ("a2;b1;d1", 0.0),
            ("a2;b1;d2", 0.0),
            ("a2;b2;c1", 0.0),
            ("a2;b2;d1", 0.0),
            ("a2;b2;d2", 1.0),
            ("a2;c1;d1", 0.0),
            ("a2;c1;d2", 0.0),
            ("b1;c1;d1", 1.0),
            ("b1;c1;d2", 0.0),
            ("b2;c1;d1", 0.0),
            ("b2;c1;d2", 0.0),
        ]),
    );
}

#[test]
pub fn validate_gen_all_current_aggregates_with_removed_combs() {
    let mut aggregated_data = get_aggregated_data();
    let mut noisy_aggregates_by_len = CombinationsCountMapByLen::default();

    noisy_aggregates_by_len.insert(
        1,
        NoiseAggregator::new(&mut aggregated_data)
            .gen_all_current_aggregates(&noisy_aggregates_by_len, 1),
    );
    assert_map_equals(
        &noisy_aggregates_by_len[&1],
        &gen_combinations_count_map(&[
            ("a1", 2.0),
            ("a2", 1.0),
            ("b1", 1.0),
            ("b2", 1.0),
            ("c1", 2.0),
            ("d1", 1.0),
            ("d2", 1.0),
        ]),
    );

    let original_sensitivities = aggregated_data.records_sensitivity_by_len.clone();
    {
        let mut na = NoiseAggregator::new(&mut aggregated_data);

        na.decrement_record_sensitivity_and_set_count_to_zero(&[
            &gen_value_combination("a1;b1"),
            &gen_value_combination("a2;b2"),
        ]);
        // call it twice to test if the sensitivity will only get decremented once
        na.decrement_record_sensitivity_and_set_count_to_zero(&[
            &gen_value_combination("a1;b1"),
            &gen_value_combination("a2;b2"),
        ]);
        noisy_aggregates_by_len.insert(
            2,
            na.gen_all_current_aggregates(&noisy_aggregates_by_len, 2),
        );
    }

    assert!(original_sensitivities[2][0] == aggregated_data.records_sensitivity_by_len[2][0] + 1);
    assert!(original_sensitivities[3][0] == aggregated_data.records_sensitivity_by_len[3][0] + 2);
    assert!(original_sensitivities[2][1] == aggregated_data.records_sensitivity_by_len[2][1] + 1);
    assert!(original_sensitivities[3][1] == aggregated_data.records_sensitivity_by_len[3][1] + 1);
    assert_map_equals(
        &noisy_aggregates_by_len[&2],
        &gen_combinations_count_map(&[
            ("a1;b2", 0.0),
            ("a1;c1", 2.0),
            ("a1;d1", 1.0),
            ("a1;d2", 0.0),
            ("a2;b1", 0.0),
            ("a2;c1", 0.0),
            ("a2;d1", 0.0),
            ("a2;d2", 1.0),
            ("b1;c1", 1.0),
            ("b1;d1", 1.0),
            ("b1;d2", 0.0),
            ("b2;c1", 0.0),
            ("b2;d1", 0.0),
            ("b2;d2", 1.0),
            ("c1;d1", 1.0),
            ("c1;d2", 0.0),
        ]),
    );

    noisy_aggregates_by_len.insert(
        3,
        NoiseAggregator::new(&mut aggregated_data)
            .gen_all_current_aggregates(&noisy_aggregates_by_len, 3),
    );
    // a1;b1;d2, a2;b2;c1 and a2;b2;d1 won't get removed because
    // they do not exist on the sensitive data
    assert_map_equals(
        &noisy_aggregates_by_len[&3],
        &gen_combinations_count_map(&[
            ("a1;b1;d2", 0.0),
            ("a1;b2;c1", 0.0),
            ("a1;b2;d1", 0.0),
            ("a1;b2;d2", 0.0),
            ("a1;c1;d1", 1.0),
            ("a1;c1;d2", 0.0),
            ("a2;b1;c1", 0.0),
            ("a2;b1;d1", 0.0),
            ("a2;b1;d2", 0.0),
            ("a2;b2;c1", 0.0),
            ("a2;b2;d1", 0.0),
            ("a2;c1;d1", 0.0),
            ("a2;c1;d2", 0.0),
            ("b1;c1;d1", 1.0),
            ("b1;c1;d2", 0.0),
            ("b2;c1;d1", 0.0),
            ("b2;c1;d2", 0.0),
        ]),
    );
}
