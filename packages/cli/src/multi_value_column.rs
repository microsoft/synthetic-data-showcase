use std::str::FromStr;

const DELIMITER: char = ',';

#[derive(Debug)]
pub struct MultiValueColumn {
    pub column_name: String,
    pub attr_delimiter: String,
}

impl FromStr for MultiValueColumn {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if let Some((column_name, delimiter)) = s.split_once(DELIMITER) {
            if !column_name.is_empty() && !delimiter.is_empty() {
                return Ok(MultiValueColumn {
                    column_name: column_name.to_owned(),
                    attr_delimiter: delimiter.to_owned(),
                });
            }
        }
        Err("wrong format, expected: <column name>,<delimiter>".to_owned())
    }
}
