use serde::{Deserialize, Serialize};

/// Metadata about a column originated from
/// parsing a column in the original input dataset
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct MultiValueColumnMetadata {
    /// Column name in the original dataset
    pub src_header_name: String,
    /// Attribute name the originates the new column in the
    /// parsed dataset
    pub attribute_name: String,
    /// Delimiter for the attributes in the original column
    pub delimiter: String,
}

impl MultiValueColumnMetadata {
    /// Creates a new MultiValueColumnMetadata
    /// # Arguments
    /// * `src_header_name` - Column name in the original dataset
    /// * `attribute_name` - Attribute name the originates the new column in the
    /// parsed dataset
    /// * `delimiter` - Delimiter for the attributes in the original column
    #[inline]
    pub fn new(src_header_name: String, attribute_name: String, delimiter: String) -> Self {
        MultiValueColumnMetadata {
            src_header_name,
            attribute_name,
            delimiter,
        }
    }
}
