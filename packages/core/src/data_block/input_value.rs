use std::sync::Arc;

/// Input Value parsed from the CSV/TSV file
/// (can be either a single value or a multi value attribute)
#[derive(Debug)]
pub enum DataBlockInputValue {
    SingleValue(Arc<String>),
    MultiValue(Vec<Arc<String>>),
}
