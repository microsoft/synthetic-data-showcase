/// Normalizes reserved delimiters required by SDS to work
#[inline]
pub fn normalize_reserved_delimiters(value: &str) -> String {
    value
        .trim()
        // replace reserved delimiters
        .replace(';', "<semicolon>")
        .replace(':', "<colon>")
}

/// Transforms a string to used in a case insensitive comparison
#[inline]
pub fn transform_for_insensitive_cmp(value: &str) -> String {
    value.trim().to_lowercase()
}
