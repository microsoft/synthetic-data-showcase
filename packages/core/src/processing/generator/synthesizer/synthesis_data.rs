use super::typedefs::AttributeCountMap;
use std::sync::Arc;

use crate::{
    data_block::block::DataBlock, processing::aggregator::aggregated_data::AggregatedData,
};

pub trait SynthesisData {
    fn get_data_block(&self) -> &Arc<DataBlock>;
    fn get_single_attr_counts(&self) -> &AttributeCountMap;
    fn get_resolution(&self) -> usize;
    fn get_aggregated_data(&self) -> &AggregatedData;
}
