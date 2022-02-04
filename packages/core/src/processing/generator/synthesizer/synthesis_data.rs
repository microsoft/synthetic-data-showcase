use std::sync::Arc;

use crate::data_block::{block::DataBlock, typedefs::AttributeRowsMap};

pub trait SynthesisData {
    fn get_data_block(&self) -> &Arc<DataBlock>;
    fn get_attr_rows_map_mut(&mut self) -> &mut AttributeRowsMap;
    fn get_attr_rows_map(&self) -> &AttributeRowsMap;
    fn get_resolution(&self) -> usize;
}
