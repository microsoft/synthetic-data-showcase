/// Represents a value of a given data block for a particular row and column
#[derive(Debug, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub struct DataBlockValue {
    /// Column index this value belongs to starting in '0'
    pub column_index: usize,
    /// Value stored on the CSV file for a given row at `column_index`
    pub value: String,
}

impl DataBlockValue {
    /// Returns a new DataBlockValue
    /// # Arguments
    /// * `column_index` - Column index this value belongs to starting in '0'
    /// * `value` - Value stored on the CSV file for a given row at `column_index`
    #[inline]
    pub fn new(column_index: usize, value: String) -> DataBlockValue {
        DataBlockValue {
            column_index,
            value,
        }
    }
}
