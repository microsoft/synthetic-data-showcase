use super::typedefs::RecordsSet;
use serde::{Deserialize, Serialize};

#[cfg(feature = "pyo3")]
use pyo3::prelude::*;

/// Result of data aggregation for each combination
#[cfg_attr(feature = "pyo3", pyclass)]
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct AggregatedCount {
    /// How many times the combination appears on the records
    pub count: usize,
    /// Which records this combinations is part of
    pub contained_in_records: RecordsSet,
}

#[cfg(feature = "pyo3")]
#[cfg_attr(feature = "pyo3", pymethods)]
impl AggregatedCount {
    /// How many times the combination appears on the records
    #[getter]
    fn count(&self) -> usize {
        self.count
    }

    /// Which records this combinations is part of
    /// This method will clone the data, so its recommended to have its result stored
    /// in a local variable to avoid it being called multiple times
    fn get_contained_in_records(&self) -> RecordsSet {
        self.contained_in_records.clone()
    }
}
