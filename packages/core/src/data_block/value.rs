use super::typedefs::DataBlockHeadersSlice;
use serde::{Deserialize, Serialize};
use std::{fmt::Display, str::FromStr, sync::Arc};

const VALUE_DELIMITER: char = ':';

/// Represents a value of a given data block for a particular row and column
#[derive(Debug, PartialEq, Eq, Hash, PartialOrd, Ord, Serialize, Deserialize)]
pub struct DataBlockValue {
    /// Column index this value belongs to starting in '0'
    pub column_index: usize,
    /// Value stored on the CSV file for a given row at `column_index`
    pub value: Arc<String>,
}

impl DataBlockValue {
    /// Returns a new DataBlockValue
    /// # Arguments
    /// * `column_index` - Column index this value belongs to starting in '0'
    /// * `value` - Value stored on the CSV file for a given row at `column_index`
    #[inline]
    pub fn new(column_index: usize, value: Arc<String>) -> DataBlockValue {
        DataBlockValue {
            column_index,
            value,
        }
    }

    /// Formats a data block value as String using the
    /// corresponding header name
    /// The result is formatted as: `{header_name}:{block_value}`
    /// # Arguments
    /// * `headers` - data block headers
    /// * `value` - value to be formatted
    #[inline]
    pub fn format_str_using_headers(&self, headers: &DataBlockHeadersSlice) -> String {
        format!(
            "{}{}{}",
            headers[self.column_index], VALUE_DELIMITER, self.value
        )
    }
}

/// Error that can happen when parsing a data block from
/// a string
pub struct ParseDataBlockValueError {
    error_message: String,
}

impl ParseDataBlockValueError {
    #[inline]
    /// Creates a new ParseDataBlockValueError with `error_message`
    pub fn new(error_message: String) -> ParseDataBlockValueError {
        ParseDataBlockValueError { error_message }
    }
}

impl Display for ParseDataBlockValueError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.error_message)
    }
}

impl FromStr for DataBlockValue {
    type Err = ParseDataBlockValueError;

    /// Creates a new DataBlockValue by parsing `str_value`
    fn from_str(str_value: &str) -> Result<Self, Self::Err> {
        if let Some(pos) = str_value.find(VALUE_DELIMITER) {
            Ok(DataBlockValue::new(
                str_value[..pos]
                    .parse::<usize>()
                    .map_err(|err| ParseDataBlockValueError::new(err.to_string()))?,
                Arc::new(str_value[pos + 1..].into()),
            ))
        } else {
            Err(ParseDataBlockValueError::new(format!(
                "data block value missing '{}'",
                VALUE_DELIMITER
            )))
        }
    }
}

impl Display for DataBlockValue {
    /// Formats the DataBlockValue as a string
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        Ok(write!(f, "{}:{}", self.column_index, self.value)?)
    }
}
