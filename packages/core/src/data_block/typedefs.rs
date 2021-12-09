use super::{record::DataBlockRecord, value::DataBlockValue};
use fnv::FnvHashMap;

/// Ordered vector of rows where a particular value combination is present
pub type AttributeRows = Vec<usize>;

/// Slice of AttributeRows
pub type AttributeRowsSlice = [usize];

/// Row read from a CSV file, indexed by column index
pub type CsvRecord = Vec<String>;

/// The same as CsvRecord, but keeping a reference to the string value, so data does not have to be duplicated
pub type CsvRecordRef<'data_block_value> = Vec<&'data_block_value str>;

/// Slice of CsvRecord
pub type CsvRecordSlice = [String];

/// Vector of strings representhing the data block headers
pub type DataBlockHeaders = CsvRecord;

/// Slice of DataBlockHeaders
pub type DataBlockHeadersSlice = CsvRecordSlice;

/// Vector of data block records, where each record represents a row
pub type DataBlockRecords = Vec<DataBlockRecord>;

/// Slice of DataBlockRecords
pub type DataBlockRecordsSlice = [DataBlockRecord];

/// HashMap with a data block value as key and all the attribute row indexes where it occurs as value
pub type AttributeRowsMap<'data_block_value> =
    FnvHashMap<&'data_block_value DataBlockValue, AttributeRows>;
