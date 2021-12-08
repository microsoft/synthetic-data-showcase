//! This crate will generate wasm bindings for the main features
//! of the `sds_core` library:
//!
//! # Init Logger
//! ```typescript
//! init_logger(
//!     level_str: string
//! ): boolean
//! ```
//!
//! Initializes logging using a particular log level.
//! Returns `true` if successfully initialized, `false` otherwise
//!
//! ## Arguments:
//! * `level_str` - String containing a valid log level
//! (`off`, `error`, `warn`, `info`, `debug` or `trace`)
//!
//! # Generate
//! ```typescript
//! generate(
//!     csv_data: string[][],
//!     use_columns: string[],
//!     sensitive_zeros: string[],
//!     record_limit: number,
//!     resolution: number,
//!     cache_size: number,
//!     progress_callback: (progress: value) => void
//! ): string[][]
//! ```
//!
//! Synthesizes the `csv_data` using the configured parameters and returns it
//!
//! ## Arguments
//! * `csv_data` - Data to be synthesized
//!     * `csv_data[0]` - Should be the headers
//!     * `csv_data[1...]` - Should be the records
//! * `use_columns` - Column names to be used (if `[]` use all columns)
//! * `sensitive_zeros` - Column names containing sensitive zeros
//! (if `[]` no columns are considered to have sensitive zeros)
//! * `record_limit` - Use only the first `record_limit` records (if `0` use all records)
//! * `resolution` - Reporting resolution to be used
//! * `cache_size` - Maximum cache size used during the synthesis process
//! * `progress_callback` - Callback that informs the processing percentage (0.0 % - 100.0 %)
//!
//! # Evaluate
//! ```typescript
//! interface IAggregatedCombination {
//!     combination_key: number
//!     count: number
//!     length: number
//! }
//!
//! interface IAggregatedCombinations {
//!     [name: string]: IAggregatedCombination
//! }
//!
//! interface IAggregatedCountByLen {
//!     [length: number]: number
//! }
//!
//! interface IPrivacyRiskSummary {
//!     totalNumberOfRecords: number
//!     totalNumberOfCombinations: number
//!     recordsWithUniqueCombinationsCount: number
//!     recordsWithRareCombinationsCount: number
//!     uniqueCombinationsCount: number
//!     rareCombinationsCount: number
//!     recordsWithUniqueCombinationsProportion: number
//!     recordsWithRareCombinationsProportion: number
//!     uniqueCombinationsProportion: number
//!     rareCombinationsProportion: number
//! }
//!
//! interface IAggregatedResult {
//!     aggregatedCombinations?: IAggregatedCombinations
//!     rareCombinationsCountByLen?: IAggregatedCountByLen
//!     combinationsCountByLen?: IAggregatedCountByLen
//!     combinationsSumByLen?: IAggregatedCountByLen
//!     privacyRisk?: IPrivacyRiskSummary
//! }
//!
//! interface IPreservationByCountBucket {
//!     size: number
//!     preservationSum: number
//!     lengthSum: number
//! }
//!
//! interface IPreservationByCountBuckets {
//!     [bucket_index: number]: IPreservationByCountBucket
//! }
//!
//! interface IEvaluatedResult {
//!     sensitiveAggregatedResult?: IAggregatedResult
//!     syntheticAggregatedResult?: IAggregatedResult
//!     leakageCountByLen?: IAggregatedCountByLen
//!     fabricatedCountByLen?: IAggregatedCountByLen
//!     preservationByCountBuckets?: IPreservationByCountBuckets
//!     combinationLoss?: number
//!     recordExpansion?: number
//! }
//!
//! evaluate(
//!     sensitive_csv_data: string[][],
//!     synthetic_csv_data: string[][],
//!     use_columns: string[],
//!     sensitive_zeros: string[],
//!     record_limit: number,
//!     reporting_length: number,
//!     resolution: number,
//!     progress_callback: (progress: value) => void
//! ): IEvaluatedResult
//! ```
//! Evaluates the synthetic data based on the sensitive data and produces a `IEvaluatedResult`
//!
//! ## Arguments
//! * `sensitive_csv_data` - Sensitive data to be evaluated
//!     * `sensitive_csv_data[0]` - Should be the headers
//!     * `sensitive_csv_data[1...]` - Should be the records
//! * `synthetic_csv_data` - Synthetic data produced from the synthetic data
//!     * `synthetic_csv_data[0]` - Should be the headers
//!     * `synthetic_csv_data[1...]` - Should be the records
//! * `use_columns` - Column names to be used (if `[]` use all columns)
//! * `sensitive_zeros` - Column names containing sensitive zeros
//! (if `[]` no columns are considered to have sensitive zeros)
//! * `record_limit` - Use only the first `record_limit` records (if `0` use all records)
//! * `reporting_length` - Maximum length to compute attribute combinations
//! for analysis
//! * `resolution` - Reporting resolution to be used
//! * `progress_callback` - Callback that informs the processing percentage (0.0 % - 100.0 %)

#[doc(hidden)]
pub mod aggregator;

#[doc(hidden)]
pub mod evaluator;

#[doc(hidden)]
pub mod generator;

#[doc(hidden)]
pub mod utils;
