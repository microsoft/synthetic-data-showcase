use super::typedefs::ValueCombinationRefSet;
use serde::{
    de::{self, Visitor},
    Deserialize, Serialize,
};
use std::{fmt::Display, marker::PhantomData, ops::Deref, str::FromStr, sync::Arc};

use crate::data_block::{
    DataBlockHeaders, DataBlockHeadersSlice, DataBlockValue, ParseDataBlockValueError,
};

/// Delimiter between attributes that form a value combination
pub const COMBINATIONS_DELIMITER: char = ';';

#[derive(Eq, PartialEq, Hash, Clone, Debug)]
/// Wraps a vector of data block values representing a value
/// combination (sorted by `{header_name}:{block_value}`)
pub struct ValueCombination {
    combination: Vec<Arc<DataBlockValue>>,
}

impl ValueCombination {
    #[inline]
    /// Creates a new ValueCombination with default values
    pub fn default() -> ValueCombination {
        ValueCombination::new(Vec::default())
    }

    #[inline]
    /// Creates a new ValueCombination
    /// # Arguments
    /// * `combination` - raw vector of value combinations
    /// sorted by `{header_name}:{block_value}`
    pub fn new(combination: Vec<Arc<DataBlockValue>>) -> ValueCombination {
        ValueCombination { combination }
    }

    /// Formats a value combination as String using the headers.
    /// The result is formatted as:
    /// `{header_name}:{block_value};{header_name}:{block_value}...`
    /// # Arguments
    /// * `headers` - Data block headers
    /// * `combination_delimiter` - Delimiter used to join combinations
    #[inline]
    pub fn as_str_using_headers(
        &self,
        headers: &DataBlockHeadersSlice,
        combination_delimiter: &str,
    ) -> String {
        let mut str = String::default();

        if let Some(comb) = self.combination.get(0) {
            str.push_str(&comb.as_str_using_headers(headers));
        }
        for comb in self.combination.iter().skip(1) {
            str += combination_delimiter;
            str.push_str(&comb.as_str_using_headers(headers));
        }
        str
    }

    /// Creates a new set containing the combination values
    #[inline]
    pub fn build_ref_set(&self) -> ValueCombinationRefSet {
        self.combination.iter().collect()
    }

    /// Checks whether `other` is part of the value combination or not
    #[inline]
    pub fn contains_comb(&self, other: &ValueCombination) -> bool {
        ValueCombination::ref_set_contains_other(&self.build_ref_set(), other)
    }

    /// Checks whether there is any value for `column_index``in the combination
    #[inline]
    pub fn contains_column(&self, column_index: usize) -> bool {
        self.combination
            .iter()
            .any(|attr| attr.column_index == column_index)
    }

    /// Checks whether `other` is part of `value_set` or not
    #[inline]
    pub fn ref_set_contains_other(
        value_set: &ValueCombinationRefSet,
        other: &ValueCombination,
    ) -> bool {
        if other.len() > value_set.len() {
            return false;
        }
        other.iter().all(|v| value_set.contains(v))
    }

    /// Adds `value` to the value combination, keeping it sorted
    #[inline]
    pub fn extend(&mut self, value: Arc<DataBlockValue>, headers: &DataBlockHeaders) {
        self.combination.push(value);
        self.combination
            .sort_by_key(|k| k.as_str_using_headers(headers));
    }
}

impl Display for ValueCombination {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        if let Some(comb) = self.combination.get(0) {
            write!(f, "{}", comb)?;
        }
        for comb in self.combination.iter().skip(1) {
            write!(f, "{}{}", COMBINATIONS_DELIMITER, comb)?;
        }
        Ok(())
    }
}

impl FromStr for ValueCombination {
    type Err = ParseDataBlockValueError;

    /// Creates a new ValueCombination by parsing `str_value`
    fn from_str(str_value: &str) -> Result<Self, Self::Err> {
        Ok(ValueCombination::new(
            str_value
                .split(COMBINATIONS_DELIMITER)
                .map(|v| Ok(Arc::new(DataBlockValue::from_str(v)?)))
                .collect::<Result<Vec<Arc<DataBlockValue>>, Self::Err>>()?,
        ))
    }
}

impl Deref for ValueCombination {
    type Target = Vec<Arc<DataBlockValue>>;

    fn deref(&self) -> &Self::Target {
        &self.combination
    }
}

// Implementing a custom serializer, so this can
// be properly written to a json file
impl Serialize for ValueCombination {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&format!("{}", self))
    }
}

struct ValueCombinationVisitor {
    marker: PhantomData<fn() -> ValueCombination>,
}

impl ValueCombinationVisitor {
    fn new() -> Self {
        ValueCombinationVisitor {
            marker: PhantomData,
        }
    }
}

impl<'de> Visitor<'de> for ValueCombinationVisitor {
    type Value = ValueCombination;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a string representing the value combination")
    }

    fn visit_str<E: de::Error>(self, v: &str) -> Result<Self::Value, E> {
        ValueCombination::from_str(v).map_err(E::custom)
    }
}

// Implementing a custom deserializer, so this can
// be properly read from a json file
impl<'de> Deserialize<'de> for ValueCombination {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_string(ValueCombinationVisitor::new())
    }
}
