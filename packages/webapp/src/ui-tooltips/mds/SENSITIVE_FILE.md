### Input data format

Select the sensitive data file containing the input data. The data should be a comma separated values (.csv) or tab separated values (.tsv) format.

Input data should be de-identified prior to loading (i.e., contain no personally-identifiable information, PII). It should either be in a microdata format already (with one row per individual) or convertable to one through standard data transformations available in the tool.

For such tasks, a series of data transformation **`Steps`** can be specified that allow input column values to be binned, binarized, recoded, etc.

Single-valued attributes (e.g., gender) can be represented as columns of categorical variables whose values are shared by multiple rows. Any continuous numeric variables (e.g., age) should be quantized (e.g., into age ranges) to ensure there are sufficient instances of each value.

Multi-valued attributes (e.g., interests) are represented as multiple columns of binary indicator variables (integer values of `0` and `1`) indicating the different values of that attribute (e.g., food, sports, politics).

In the loaded table, the **`Use columns`** dropdown may be used to specify which data columns should be included in the output. By default, all columns are included.

### Negative value interpretation

The tool distinguishes 'positive' attribute values that indicate the presence of specific sensitive data from 'negative' attribute values that indicate the absence of such data. By default, the integer zero (`0`) and the empty string (`""`) and not taken into account when creating and counting attribute combinations. Any columns where zero values are of interest (and thus sensitive) should be selected under the **`Sensitive zeros`** dropdown in the loaded table. The tool will then treat such 'sensitive zeros' in the same way as positive values.

### Subject ID

Each row is expected to identify a single subject. Under the **`Subject ID`** dropdown, select the column representing the unique identifier. If there are multiple records with the same ID, the tool will try to join records automatically using multi-value columns.
