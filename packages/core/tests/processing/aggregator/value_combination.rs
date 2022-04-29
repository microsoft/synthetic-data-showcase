use sds_core::{data_block::DataBlockValue, processing::aggregator::ValueCombination};
use std::sync::Arc;

#[test]
pub fn validate_contains_comb() {
    assert!(
        !ValueCombination::new(vec![]).contains_comb(&ValueCombination::new(vec![Arc::new(
            DataBlockValue::new(0, Arc::new("a1".into()))
        )]))
    );
    assert!(ValueCombination::new(vec![Arc::new(DataBlockValue::new(
        0,
        Arc::new("a1".into())
    ))])
    .contains_comb(&ValueCombination::new(vec![Arc::new(DataBlockValue::new(
        0,
        Arc::new("a1".into())
    ))])));
    assert!(!ValueCombination::new(vec![Arc::new(DataBlockValue::new(
        0,
        Arc::new("a1".into())
    ))])
    .contains_comb(&ValueCombination::new(vec![Arc::new(DataBlockValue::new(
        1,
        Arc::new("a1".into())
    ))])));
    assert!(ValueCombination::new(vec![
        Arc::new(DataBlockValue::new(0, Arc::new("a1".into()))),
        Arc::new(DataBlockValue::new(1, Arc::new("b1".into()))),
        Arc::new(DataBlockValue::new(2, Arc::new("c1".into()))),
        Arc::new(DataBlockValue::new(3, Arc::new("d1".into()))),
        Arc::new(DataBlockValue::new(4, Arc::new("e1".into()))),
        Arc::new(DataBlockValue::new(5, Arc::new("f1".into()))),
    ])
    .contains_comb(&ValueCombination::new(vec![
        Arc::new(DataBlockValue::new(1, Arc::new("b1".into()))),
        Arc::new(DataBlockValue::new(3, Arc::new("d1".into()))),
        Arc::new(DataBlockValue::new(4, Arc::new("e1".into()))),
        Arc::new(DataBlockValue::new(5, Arc::new("f1".into()))),
    ])));
    assert!(!ValueCombination::new(vec![
        Arc::new(DataBlockValue::new(0, Arc::new("a1".into()))),
        Arc::new(DataBlockValue::new(1, Arc::new("b1".into()))),
        Arc::new(DataBlockValue::new(2, Arc::new("c1".into()))),
        Arc::new(DataBlockValue::new(3, Arc::new("d1".into()))),
        Arc::new(DataBlockValue::new(4, Arc::new("e1".into()))),
        Arc::new(DataBlockValue::new(5, Arc::new("f1".into()))),
    ])
    .contains_comb(&ValueCombination::new(vec![
        Arc::new(DataBlockValue::new(1, Arc::new("b1".into()))),
        Arc::new(DataBlockValue::new(3, Arc::new("d1".into()))),
        Arc::new(DataBlockValue::new(4, Arc::new("e1".into()))),
        Arc::new(DataBlockValue::new(5, Arc::new("f2".into()))),
    ])));
}
