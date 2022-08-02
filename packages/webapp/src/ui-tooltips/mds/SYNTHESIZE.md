Runs the data synthesis based on the configured parameters. The resulting synthetic records will be presented as a table sorted by the number of non-empty attribute values.

Processing time ranges from a few seconds up to several minutes, depending on the size of the dataset, number of columns, and configured parameters.

There is also a **`download button`** on the table, so the synthetic data can be downloaded as a csv file.

This will also run an analysis both on the sensitive data and the synthesized data, enabling a comparison between the two.

The **`aggregation limit`** determines the maximum length of attribute combination for which aggregate counts are precomputed and reported. In the **`navigate`** step, this value determines how many attribute value selections a user may make while retaining the ability to compare estimated (synthetic) vs actual (sensitive) values.

**Caution**: analysis results may contain metrics and information directly related to the sensitive data, and if shared, may violate the intended privacy guarantee.
