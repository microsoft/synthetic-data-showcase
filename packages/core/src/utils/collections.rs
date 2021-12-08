use std::cmp::Ordering;
use std::hash::Hash;

/// Given two sorted vectors, calculates the intersection between them.
/// Returns the result intersection as a new vector
/// # Arguments
/// - `a`: first sorted vector
/// - `b`: second sorted vector
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
