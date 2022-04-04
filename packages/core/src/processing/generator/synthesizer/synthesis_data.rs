use super::typedefs::AttributeCountMap;

use crate::data_block::block::DataBlock;

pub trait SynthesisData {
    fn get_data_block(&self) -> &DataBlock;
    fn get_single_attr_counts(&self) -> &AttributeCountMap;
    fn get_resolution(&self) -> usize;
}
