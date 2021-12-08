use super::{block::DataBlockCreator, typedefs::CsvRecord};
use csv::{Error, Reader, StringRecord};
use std::fs::File;

/// Creates a data block by reading a CSV file
pub struct CsvDataBlockCreator;

impl DataBlockCreator for CsvDataBlockCreator {
    type InputType = Reader<File>;
    type ErrorType = Error;

    /// Reads the headers from the CSV file
    fn get_headers(reader: &mut Reader<File>) -> Result<CsvRecord, Error> {
        Ok(reader
            .headers()?
            .into_iter()
            .map(|h| h.to_string())
            .collect())
    }

    /// Reads the records from the CSV file
    fn get_records(reader: &mut Self::InputType) -> Result<Vec<CsvRecord>, Error> {
        reader
            .records()
            .into_iter()
            .map(|record_result: Result<StringRecord, Error>| {
                Ok(record_result?
                    .into_iter()
                    .map(|value| value.to_string())
                    .collect::<CsvRecord>())
            })
            .collect::<Result<Vec<CsvRecord>, Error>>()
    }
}
