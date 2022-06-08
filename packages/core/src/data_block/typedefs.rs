use super::{record::DataBlockRecord, value::DataBlockValue, MultiValueColumnMetadata};
use fnv::FnvHashMap;
use std::sync::Arc;

use crate::processing::evaluator::CombinationComparison;

/// Ordered vector of rows where a particular value combination is present
pub type AttributeRows = Vec<usize>;

/// Slice of AttributeRows
pub type AttributeRowsSlice = [usize];

/// Row read from a CSV file, indexed by column index
pub type CsvRecord = Vec<String>;

/// The same as CsvRecord, but keeping a reference to the string value, so data does not have to be duplicated
pub type CsvRecordRef = Vec<Arc<String>>;

/// Slice of CsvRecord
pub type CsvRecordSlice = [String];

/// Slice of CsvRecord
pub type CsvRecordRefSlice = [Arc<String>];

/// Vector of strings representing the data block headers
pub type DataBlockHeaders = CsvRecordRef;

/// Slice of DataBlockHeaders
pub type DataBlockHeadersSlice = CsvRecordRefSlice;

/// Maps a normalized multi-value header name (such as A_a1) to its corresponding metadata
pub type MultiValueColumnMetadataMap = FnvHashMap<Arc<String>, MultiValueColumnMetadata>;

/// Vector of data block records, where each record represents a row
pub type DataBlockRecords = Vec<Arc<DataBlockRecord>>;

/// HashMap with a data block value as key and all the attribute row indexes where it occurs as value
pub type AttributeRowsMap = FnvHashMap<Arc<DataBlockValue>, AttributeRows>;

/// HashMap with a data block value as key and attribute row indexes as value
pub type AttributeRowsRefMap = FnvHashMap<Arc<DataBlockValue>, Arc<AttributeRows>>;

/// Maps the column index -> data block value -> rows where the value appear
pub type AttributeRowsByColumnMap = FnvHashMap<usize, AttributeRowsMap>;

/// Raw data (vector of csv record references to the original data block)
pub type RawData = Vec<CsvRecordRef>;

/// A vector of combination comparisons
/// (between sensitive and synthetic data)
pub type CombinationsComparisons = Vec<CombinationComparison>;

/// Maps a column name to the corresponding column index
pub type ColumnIndexByName = FnvHashMap<String, usize>;
