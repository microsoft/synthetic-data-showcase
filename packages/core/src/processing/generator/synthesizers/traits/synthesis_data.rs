use crate::{
    data_block::DataBlockHeaders, processing::generator::synthesizers::typedefs::AttributeCountMap,
};

pub trait SynthesisData {
    fn get_headers(&self) -> &DataBlockHeaders;
    fn get_single_attr_counts(&self) -> &AttributeCountMap;
    fn get_resolution(&self) -> usize;
}
