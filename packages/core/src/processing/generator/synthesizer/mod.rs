/// Module defining the cache used during the synthesis process
pub mod cache;

/// Module defining the context used for data synthesis
pub mod context;

/// Module defining the seeded synthesis process
pub mod seeded;

/// Module defining the unseeded synthesis process
pub mod unseeded;

/// Module defining data synthesis purely from counts
/// (consolidate and suppression only)
pub mod from_counts;

/// Type definitions related to the synthesis process
pub mod typedefs;

mod seeded_rows_synthesizer;

mod unseeded_rows_synthesizer;

mod consolidate;

mod suppress;

mod synthesis_data;
