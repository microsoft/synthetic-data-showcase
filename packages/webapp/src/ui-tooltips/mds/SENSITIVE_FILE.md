### Input data format

Select the sensitive data file containing the microdata. The data should be a comma separated values (.csv) or tab separated values (.tsv) format.

For that data to be processed the microdata provided as input should be deidentified, i.e., a table in which each row contains all data (but no personally-identifiable information, PII) relating to an individual.

Single-valued attributes (e.g., gender) are represented as columns of categorical variables whose values are shared by multiple rows. Any continuous numeric variables (e.g., age) should be quantized in advance (e.g., into age ranges) to ensure there are sufficient instances of each value. For such task, there is an utility under **`Edit column`** when the table is loaded, this will allow columns to be organized into bins, binarized and also have its values recoded in place if necessary.

Multi-valued attributes (e.g., interests) are represented as multiple columns of binary variables (integer values of `0` and `1`) indicating the different values of that attribute (e.g., food, sports, politics).

In the loaded table, the **`Use columns`** dropdown may be used to specify which data columns should be included in the output. By default, all columns are included.

### Negative value interpretation

The pipeline distinguishes 'positive' attribute values that indicate the presence of specific sensitive data from 'negative' attribute values that indicate the absence of such data. By default, the integer zero (`0`) and the empty string (`""`) and not taken into account when creating and counting attribute combinations. Any columns where zero values are of interest (and thus sensitive) should be selected under the **`Sensitive zeros`** dropdown in the loaded table, the tool will then treat such 'sensitive zeros' in the same way as positive values.

### Subject ID

Each row is expected to identify a single subject, by default a column named `RowID` will be added to the table to meet this criteria. However, under the **`Subject ID`** dropdown, other columns might be set as ID.
