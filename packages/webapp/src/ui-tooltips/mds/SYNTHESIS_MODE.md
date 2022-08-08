### K-Anonymity

In general, this set of methods proceeds by sampling attributes until the addition of further attributes would create a rare combination (with its corresponding count smaller than the required **`privacy resolution`**). These extended attribute combinations are then collected for output as synthetic records.

Since precise attribute counts constitute a privacy risk, it is advisable to create some uncertainty over the actual counts by adding noise to the synthetic data. The same **`privacy resolution`** is used again here to suppress attributes or synthesize additional records such that synthetic attribute counts are equal to the (already imprecise) reported aggregate count.

Use of k-anonymity synthesizers is recommended for **one-off data releases** where the accuracy of attribute counts is critical.

These methods are designed to offer strong group-level protection against **membership inference**, i.e., preventing an adversary from inferring whether a known individual or small group of individuals is present in the sensitive dataset.

They should not be used in situations where **attribute inference** from **homogeneity attacks** are a concern, i.e., when an adversary knows that a certain individual is present in the sensitive dataset, identifies them as part of a group sharing known attributes, and then infers previously unknown attributes of the individual because those attributes are common to the group.

**`Row Seeded`**:

- the fastest method to try out the tool and prototype a synthetic data release
- synthetic records are seeded with a corresponding sensitive record
- attribute counts in the sensitive data drive the sampling process
- preserves statistics for visual analytics
- ensures 0% fabrication for all combinations lengths

**`Value Seeded`**:

- synthetic records are seeded from the counts of individual attributes in the sensitive data
- attribute counts in the sensitive data drive the sampling process
- preserves statistics for visual analytics
- ensure 0% fabrication for all combinations lengths

**`Aggregate Seeded`**:

- synthetic records are seeded from the counts of individual attributes in the sensitive data
- combination counts in the aggregate data drive the sampling process
- preserves statistics for visual analytics
- ensure 0% fabrication for all combinations lengths up to the aggregation limit
- does not need access to the original sensitive data, only to its aggregates

**`Unseeded`**:

- synthetic records are generated in an unconstrained way by randomly sampling joint attribute distributions
- attribute counts in the sensitive data drive the sampling process
- creates longer records of more uniform length that may better preserve structure for machine learning
- ensure 0% fabrication for all combinations lengths

### Differential Privacy

This method protects aggregate counts with differential privacy [**`(epsilon, delta)-DP`**] and then uses the resulting DP aggregate counts to derive synthetic records that retain differential privacy under the post-processing property.

Use of differential privacy synthesizers is recommended for **repeated data releases** where cumulative privacy loss must be quantified and controlled, where **attribute inference** from **homogeneity attacks** is a concern, or where provable guarantees against all possible privacy attacks are desired.

They should be used with caution, however, whenever missing, fabricated, or inaccurate counts of attribute combinations could trigger inappropriate downstream decisions or actions.

**`DP Aggregate Seeded`**:

- based on the `Aggregate Seeded` method, but with aggregate counts generated using a differential privacy approach
