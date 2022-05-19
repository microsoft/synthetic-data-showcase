The record sensitivity is defined as the number of different combinations (from 1 up the **`aggregation limit`**) that can be generated from each record.

To lower the sensitivity of each record, leading to less noise added to the reportable aggregate counts, the tool randomly removes contributions of attribute combinations when performing the data aggregations.

This sets the percentile used to randomly filter attribute combinations from records. The lower the value, more combinations might have their counts suppressed on the reportable aggregates.