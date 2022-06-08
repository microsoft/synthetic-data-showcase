use super::{data_block_creator::DataBlockCreator, typedefs::CsvRecord, DataBlockCreatorError};
use csv::{Error, Reader, StringRecord};
use std::{io::Read, marker::PhantomData};

/// Creates a data block by reading a CSV file
pub struct CsvDataBlockCreator<T: Read> {
    phantom: PhantomData<T>,
}

impl<T: Read> DataBlockCreator for CsvDataBlockCreator<T> {
    type InputType = Reader<T>;
    type ErrorType = Error;

    /// Reads the headers from the CSV reader
    fn get_headers(reader: &mut Self::InputType) -> Result<CsvRecord, Error> {
        Ok(reader
            .headers()?
            .into_iter()
            .map(|h| h.to_string())
            .collect())
    }

    /// Reads the records from the CSV reader
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

/// Error that could be generated when creating a data block
/// from a CSV file
pub type CsvDataBlockCreatorError = DataBlockCreatorError<Error>;
