/// Input Value parsed from the CSV/TSV file
/// (can be either a single value or a multi value attribute)
#[derive(Debug)]
pub enum DataBlockInputValue {
    SingleValue(String),
    MultiValue(Vec<String>),
}
