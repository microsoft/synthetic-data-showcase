The record sensitivity is defined as the number of different combinations (of lengths 1 up to and including the **`aggregation limit`**) that can be generated from each record.

To reduce the maximimum noise added to reportable aggregate counts, we can artificially limit the number of combination counts that any one record is allowed to affect. This is achieved by randomly selecting which combinations to update, up to a given limit.

This parameter sets the percentile used to randomly filter attribute combinations from records. The lower the value, the more combinations might have their counts suppressed on the reportable aggregates.