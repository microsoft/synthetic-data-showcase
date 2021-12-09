use super::value::DataBlockValue;

/// Represents all the values of a given row in a data block
#[derive(Debug)]
pub struct DataBlockRecord {
    /// Vector of data block values for a given row indexed by column
    pub values: Vec<DataBlockValue>,
}

impl DataBlockRecord {
    /// Returns a new DataBlockRecord
    /// # Arguments
    /// * `values` - Vector of data block values for a given row indexed by column
    #[inline]
    pub fn new(values: Vec<DataBlockValue>) -> DataBlockRecord {
        DataBlockRecord { values }
    }
}
