use itertools::Itertools;
use sds_core::dp::DpPercentile;

#[test]
pub fn validate_quality_score_iter() {
    assert!(
        DpPercentile::new([0, 1, 4, 5, 5, 8, 11, 12, 12, 15].to_vec())
            .kth_percentile_quality_scores_iter(60)
            .eq([-5, -4, -4, -4, -3, -1, -1, -1, 0, -1, -1, -1, -3, -3, -3, -4])
    );
    assert!(
        DpPercentile::new([15, 1, 4, 5, 7, 8, 11, 12, 13, 0].to_vec())
            .kth_percentile_quality_scores_iter(60)
            .eq([-5, -4, -4, -4, -3, -2, -2, -1, 0, -1, -1, -1, -2, -3, -3, -4])
    );
    assert!(DpPercentile::new([4, 4, 4, 4, 4, 4, 4, 4, 4, 4].to_vec())
        .kth_percentile_quality_scores_iter(60)
        .eq([-6, -6, -6, -6, 0]));
    assert!(DpPercentile::new([4, 4, 4, 4, 4, 4, 4, 4, 5, 5].to_vec())
        .kth_percentile_quality_scores_iter(60)
        .eq([-6, -6, -6, -6, 0, -4]));
    assert!(DpPercentile::new([2, 3, 4, 5, 6, 7, 8, 9, 10, 11].to_vec())
        .kth_percentile_quality_scores_iter(60)
        .eq([-6, -6, -5, -4, -3, -2, -1, 0, -1, -2, -3, -4]));
    assert!(DpPercentile::new([5, 4].to_vec())
        .kth_percentile_quality_scores_iter(60)
        .eq([-2, -2, -2, -2, 0, -1]));
    assert!(DpPercentile::new([4].to_vec())
        .kth_percentile_quality_scores_iter(60)
        .eq([-1, -1, -1, -1, 0]));
    assert!(DpPercentile::new([].to_vec())
        .kth_percentile_quality_scores_iter(60)
        .collect_vec()
        .is_empty());
}
