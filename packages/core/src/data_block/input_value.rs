use fnv::FnvHashSet;
use std::sync::Arc;

/// Input Value parsed from the CSV/TSV file
/// (can be either a single value or a multi value attribute)
#[derive(Debug, Clone)]
pub enum DataBlockInputValue {
    /// Represents a single value
    SingleValue(Arc<String>),
    /// Represents multi values split using a delimiter
    MultiValue(FnvHashSet<Arc<String>>),
}
