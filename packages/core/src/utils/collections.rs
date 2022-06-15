use fnv::FnvHashMap;
use itertools::Itertools;
use rand::Rng;
use std::cmp::Ordering;
use std::fmt::Debug;
use std::hash::Hash;

/// Given two sorted vectors, calculates the intersection between them.
/// Returns the result intersection as a new vector
/// # Arguments
/// * `a` - first sorted vector
/// * `b` - second sorted vector
#[inline]
pub fn ordered_vec_intersection<T>(a: &[T], b: &[T]) -> Vec<T>
where
    T: Eq + Hash + Copy + Ord,
{
    let mut result: Vec<T> = Vec::new();
    let mut a_index: usize = 0;
    let mut b_index: usize = 0;

    while a_index < a.len() && b_index < b.len() {
        let a_val = &a[a_index];
        let b_val = &b[b_index];

        match a_val.cmp(b_val) {
            Ordering::Equal => {
                result.push(*a_val);
                a_index += 1;
                b_index += 1;
            }
            Ordering::Less => {
                a_index += 1;
            }
            Ordering::Greater => {
                b_index += 1;
            }
        }
    }
    result
}

/// Returns a new vector sorted by the given key.
/// The same as `.sort_by_key` on a vector, but returning a new vector
/// instead of doing the operation in place
#[inline]
pub fn sorted_by_key<T, K, F>(src: &[T], f: F) -> Vec<T>
where
    T: Clone,
    F: FnMut(&T) -> K,
    K: Ord,
{
    let mut cloned: Vec<T> = src.to_vec();
    cloned.sort_by_key(f);
    cloned
}

/// Sorts a f64 slice (unstable sort)
#[inline]
pub fn sort_unstable_f64(v: &mut [f64]) {
    v.sort_unstable_by(|a, b| a.partial_cmp(b).unwrap());
}

/// Samples a key from the map using its count
/// (the higher the count the greater the chance for the
/// key to be selected).
/// Returns `None` if all the counts are 0 or the map is empty
/// # Arguments
/// * `counts` - Maps a key to its count for sampling
#[inline]
pub fn sample_weighted<K>(counts: &FnvHashMap<K, usize>) -> Option<K>
where
    K: Clone,
{
    let mut res: Option<K> = None;
    let total: usize = counts.values().sum();

    if total != 0 {
        let random = rand::thread_rng().gen_range(1..=total);
        let mut current_sum: usize = 0;

        for (value, count) in counts.iter().sorted_by_key(|(_, c)| **c) {
            if *count > 0 {
                current_sum += count;
                res = Some(value.clone());
                if current_sum >= random {
                    break;
                }
            }
        }
    }
    res
}

/// Turns a Vec of Result into a Result of Vec if all results are Ok.
/// Otherwise, returns `E::default()`
#[inline]
pub fn map_unwrap_or_default<T, E>(mut results: Vec<Result<T, E>>) -> Result<Vec<T>, E>
where
    E: Default + Debug,
{
    if results.iter().any(|r| r.is_err()) {
        return Err(E::default());
    }
    Ok(results.drain(..).map(|r| r.unwrap()).collect())
}

/// Flattens a Vec of Result into a Result of Vec if all results are Ok.
/// Otherwise, returns `E::default()`
#[inline]
pub fn flat_map_unwrap_or_default<T, E>(mut results: Vec<Result<Vec<T>, E>>) -> Result<Vec<T>, E>
where
    E: Default + Debug,
{
    if results.iter().any(|r| r.is_err()) {
        return Err(E::default());
    }
    Ok(results.drain(..).flat_map(|r| r.unwrap()).collect())
}
