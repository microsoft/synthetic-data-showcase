use super::value::DataBlockValue;
use serde::{Deserialize, Serialize};
use std::sync::Arc;

/// Represents all the values of a given row in a data block
#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct DataBlockRecord {
    /// Vector of data block values for a given row indexed by column
    pub values: Vec<Arc<DataBlockValue>>,
}

impl DataBlockRecord {
    /// Returns a new DataBlockRecord
    /// # Arguments
    /// * `values` - Vector of data block values for a given row indexed by column
    #[inline]
    pub fn new(values: Vec<Arc<DataBlockValue>>) -> DataBlockRecord {
        DataBlockRecord { values }
    }
}
