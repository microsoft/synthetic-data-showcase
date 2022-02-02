This will run an analysis both on the sensitive microdata and the synthesized data, enabling a comparison between both.

The **`analysis length`** determines the maximum length of attribute combination for which aggregate counts are precomputed and reported. In the **`navigate`** step, this value determines how many attribute value selections an user may make while retaining the ability to compare estimated (synthetic) vs actual values.

The output of this step will be:

1. The sensitive aggregate counts from 1 up to the the configured **`analysis length`**, which can be downloaded as csv
2. A summary of metrics about the privacy risk of the sensitive data and the utility cost of the synthesized one
3. Charts about the sensitive and synthetic data, including some comparisons between both
