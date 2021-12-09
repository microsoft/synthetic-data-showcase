use fnv::FnvHashMap;
use itertools::Itertools;

use crate::{
    data_block::{typedefs::AttributeRowsMap, value::DataBlockValue},
    processing::generator::synthesizer::{
        context::SynthesizerContext, typedefs::AttributeCountMap,
    },
    utils::math::calc_n_combinations_range,
};

/// Selects values in a record respecting a `sensitivity_threshold`.
/// Sensitivity in this context means the number of combinations that
/// can be generated based on the number of non-empty values on the record.
/// So attributes will suppressed from the record until record sensitivity <= `sensitivity_threshold`
pub struct RecordAttrsSelector<'length_range, 'data_block> {
    /// Cache for how many values should be suppressed based of the number
    /// of non-empty attributes on the record
    cache: FnvHashMap<usize, usize>,
    /// Range to compute the number of combinations [1...reporting_length]
    length_range: &'length_range [usize],
    /// Maximum sensitivity allowed for each record
    sensitivity_threshold: usize,
    /// Map with a data block value as key and all the attribute row indexes where it occurs as value
    attr_rows_map: AttributeRowsMap<'data_block>,
}

impl<'length_range, 'data_block> RecordAttrsSelector<'length_range, 'data_block> {
    /// Returns a new RecordAttrsSelector
    /// # Arguments
    /// * `length_range` - Range to compute the number of combinations [1...reporting_length]
    /// * `sensitivity_threshold` - Maximum sensitivity allowed for each record
    /// * `attr_rows_map` - Map with a data block value as key and all the attribute row
    /// indexes where it occurs as value
    #[inline]
    pub fn new(
        length_range: &'length_range [usize],
        sensitivity_threshold: usize,
        attr_rows_map: AttributeRowsMap<'data_block>,
    ) -> RecordAttrsSelector<'length_range, 'data_block> {
        RecordAttrsSelector {
            cache: FnvHashMap::default(),
            length_range,
            sensitivity_threshold,
            attr_rows_map,
        }
    }

    /// Returns a new record with attributes suppressed to meet the sensitivity
    /// threshold.
    ///
    /// Attributes will be suppressed randomly, but the higher the attribute count across
    /// all records, higher the chance for it **not** to be suppressed
    ///
    /// # Arguments
    /// * `record`: record to select attributes from
    pub fn select_from_record(
        &mut self,
        record: &'data_block [DataBlockValue],
    ) -> Vec<&'data_block DataBlockValue> {
        let n_attributes = record.len();
        let selected_attrs_count = n_attributes - self.get_suppressed_count(n_attributes);

        if selected_attrs_count < n_attributes {
            let mut attr_count_map: AttributeCountMap = record
                .iter()
                .map(|r| (r, self.attr_rows_map.get(r).unwrap().len()))
                .collect();
            let mut res: Vec<&DataBlockValue> = Vec::default();

            for _ in 0..selected_attrs_count {
                if let Some(sample) = SynthesizerContext::sample_from_attr_counts(&attr_count_map) {
                    res.push(sample);
                    attr_count_map.remove(sample);
                }
            }
            res
        } else {
            record.iter().collect_vec()
        }
    }

    #[inline]
    fn get_suppressed_count(&mut self, n_attributes: usize) -> usize {
        if self.sensitivity_threshold == 0 {
            0
        } else {
            let length_range = self.length_range;
            let sensitivity_threshold = self.sensitivity_threshold as u64;

            *self.cache.entry(n_attributes).or_insert_with(|| {
                let mut suppressed_count = 0_usize;

                loop {
                    let n_combs =
                        calc_n_combinations_range(n_attributes - suppressed_count, length_range);

                    if n_combs > sensitivity_threshold {
                        suppressed_count += 1;
                    } else {
                        break;
                    }
                }
                suppressed_count
            })
        }
    }
}
