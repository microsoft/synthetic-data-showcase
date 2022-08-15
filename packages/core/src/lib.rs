/// Module with definitions related to data blocks.
/// Data block is a memory block to store csv/tsv data in memory,
/// including headers and records, this way we can work with references
/// to the data block to avoid copying and cloning memory
#[allow(clippy::borrow_deref_ref)]
pub mod data_block;

/// Module with helper functions and structures to handle with
/// differential privacy
#[allow(clippy::borrow_deref_ref)]
pub mod dp;

/// Module for data processing, including data aggregation, synthesis
/// and evaluation
#[allow(clippy::borrow_deref_ref)]
pub mod processing;

/// Module with some utilities useful to the project
#[allow(clippy::borrow_deref_ref)]
pub mod utils;
