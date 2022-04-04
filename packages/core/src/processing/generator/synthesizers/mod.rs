/// Module defining data synthesis purely from aggregate counts
/// (useful in the differential privacy context)
/// (consolidate and suppression only)
pub mod aggregate_seeded;

/// Module defining the row-seeded synthesis process
pub mod row_seeded;

/// Module defining the unseeded synthesis process
pub mod unseeded;

/// Module defining data synthesis purely from counts
/// (consolidate and suppression only)
pub mod value_seeded;

/// Consolidate process input parameters definitions
pub mod consolidate_parameters;

/// Type definitions related to the synthesis process
pub mod typedefs;

/// Module defining the cache used during the synthesis process
pub mod cache;

mod attribute_rows_sampler;

mod traits;
