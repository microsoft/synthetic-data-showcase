use super::input_value::DataBlockInputValue;

/// A record from a CSV file mapped to a vector of input values
#[derive(Clone)]
pub struct CsvRecordInputValues {
    /// ID for the given record (could be an empty string if not set)
    pub id: String,
    /// Input values for the given record (indexed by header index)
    pub values: Vec<DataBlockInputValue>,
}

impl CsvRecordInputValues {
    /// Creates a new CsvRecordInputValues
    /// # Arguments
    /// * `id`- ID for the given record (could be an empty string if not set)
    /// * `values` - Input values for the given record (indexed by header index)
    #[inline]
    pub fn new(id: String, values: Vec<DataBlockInputValue>) -> Self {
        CsvRecordInputValues { id, values }
    }
}
