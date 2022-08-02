use super::{MultiValueColumnMetadata, MultiValueColumnMetadataMap, RawData};
use itertools::Itertools;
use std::sync::Arc;

use crate::data_block::CsvRecordRef;

struct MultiValueEntry {
    start_index: usize,
    end_index: usize,
    attributes: Vec<Arc<String>>,
    delimiter: String,
}

enum JoinSpec {
    SingleValue(usize),
    MultiValue(MultiValueEntry),
}

/// Helper to join columns in the raw data that were spread using multiple values
pub struct RawDataMultiValueColumnJoiner<'raw_data, 'multi_value_column_metadata_map, 'empty_value>
{
    raw_data: &'raw_data [CsvRecordRef],
    multi_value_column_metadata_map: &'multi_value_column_metadata_map MultiValueColumnMetadataMap,
    empty_value: &'empty_value Arc<String>,
}

impl<'raw_data, 'multi_value_column_metadata_map, 'empty_value>
    RawDataMultiValueColumnJoiner<'raw_data, 'multi_value_column_metadata_map, 'empty_value>
{
    /// Creates a new joiner
    /// # Arguments
    /// * `raw_data` - Reference to the raw data to be joined
    /// * `multi_value_column_metadata_map` - Metadata about the multi columns to be joined
    #[inline]
    pub fn new(
        raw_data: &'raw_data [CsvRecordRef],
        multi_value_column_metadata_map: &'multi_value_column_metadata_map MultiValueColumnMetadataMap,
        empty_value: &'empty_value Arc<String>,
    ) -> Self {
        RawDataMultiValueColumnJoiner {
            raw_data,
            multi_value_column_metadata_map,
            empty_value,
        }
    }

    #[inline]
    fn try_process_multi_value_column(
        &self,
        curr_header_metadata: &MultiValueColumnMetadata,
        next_header: &Arc<String>,
        attributes: &mut Vec<Arc<String>>,
    ) -> bool {
        if let Some(next_header_metadata) = self.multi_value_column_metadata_map.get(next_header) {
            if next_header_metadata.src_header_name == curr_header_metadata.src_header_name {
                attributes.push(next_header_metadata.attribute_name.clone());
                return true;
            }
        }
        false
    }

    fn append_new_headers_and_gen_join_specs(&self, result: &mut RawData) -> Vec<JoinSpec> {
        let mut join_specs: Vec<JoinSpec> = Vec::new();
        let original_headers = &self.raw_data[0];
        let new_headers = &mut result[0];
        let mut i = 0;

        while i < original_headers.len() {
            let curr_header = &original_headers[i];

            if let Some(curr_header_metadata) =
                self.multi_value_column_metadata_map.get(curr_header)
            {
                let start_index = i;
                let mut attributes = Vec::default();

                new_headers.push(curr_header_metadata.src_header_name.clone());
                attributes.push(curr_header_metadata.attribute_name.clone());
                i += 1;

                // consume headers while we are in the same original one
                while i < original_headers.len() {
                    if self.try_process_multi_value_column(
                        curr_header_metadata,
                        &original_headers[i],
                        &mut attributes,
                    ) {
                        i += 1;
                    } else {
                        break;
                    }
                }

                join_specs.push(JoinSpec::MultiValue(MultiValueEntry {
                    start_index,
                    end_index: i - 1,
                    attributes,
                    delimiter: curr_header_metadata.delimiter.clone(),
                }));
            } else {
                new_headers.push(curr_header.clone());
                join_specs.push(JoinSpec::SingleValue(i));
                i += 1;
            }
        }
        join_specs
    }

    fn append_new_records(&self, result: &mut RawData, join_specs: &[JoinSpec]) {
        for (record_index, record) in self.raw_data.iter().enumerate().skip(1) {
            let new_record = &mut result[record_index];

            for join_spec in join_specs.iter() {
                match join_spec {
                    JoinSpec::SingleValue(value_index) => {
                        new_record.push(record[*value_index].clone());
                    }
                    JoinSpec::MultiValue(entry) => {
                        let new_value = record
                            .iter()
                            .take(entry.end_index + 1)
                            .skip(entry.start_index)
                            .enumerate()
                            .filter_map(|(attr_index, value)| {
                                if **value == "1" {
                                    Some(entry.attributes[attr_index].clone())
                                } else {
                                    None
                                }
                            })
                            .join(&entry.delimiter);

                        new_record.push(if !new_value.is_empty() {
                            Arc::new(new_value)
                        } else {
                            self.empty_value.clone()
                        });
                    }
                }
            }
        }
    }

    /// Performs the actual join and returned the new raw data with
    /// the columns joined
    #[inline]
    pub fn join(&self) -> RawData {
        if self.raw_data.is_empty() {
            return RawData::default();
        }
        let mut result = RawData::with_capacity(self.raw_data.len());

        result.resize_with(self.raw_data.len(), CsvRecordRef::default);

        let join_specs = self.append_new_headers_and_gen_join_specs(&mut result);

        self.append_new_records(&mut result, &join_specs);

        result
    }
}
