### K-Anonymity

In general, this set of methods proceeds by sampling attributes until the addition of further attributes would create a rare combination (with its corresponding count smaller than the required **`resolution`**). These privacy-preserving subsets of sensitive records are collected for output as synthetic records.

Also, since precise attribute counts create a privacy risk, it is advisable to create some uncertainty over the actual counts by adding noise to the synthetic data. The same **`resolution`** is used again here to suppress attributes or synthesize additional records such that synthetic attribute counts are equal to the (already imprecise) reported count.

**`Row Seeded`**:
- synthetic records are seeded with a corresponding sensitive record
- attribute counts on the sensitive microdata drive the sampling process
- faster and better preserves statistics for visual analytics
- ensure 0 % fabrication for all combinations lengths

**`Unseeded`**:
- synthetic records are generated in an unseeded way by randomly sampling joint attribute distributions
- attribute counts on the sensitive microdata drive the sampling process
- creates longer records of more uniform length that may better preserve structure for machine learning
- ensure 0 % fabrication for all combinations lengths

**`Value Seeded`**:
- synthetic records are seeded from the single attribute counts on the sensitive microdata
- attribute counts on the sensitive microdata drive the sampling process
- preserves statistics for visual analytics
- ensure 0 % fabrication for all combinations lengths

**`Aggregate Seeded`**:
- synthetic records are seeded from the single attribute counts on the aggregated data
- aggregate counts on the aggregated data drive the sampling process
- preserves statistics for visual analytics
- ensure 0 % fabrication up to the reporting length
- does not need access to the original microdata, only to its aggregates

### DP

This does not provide K-Anonymity using the privacy resolution, instead, it protects the aggregate counts with differential privacy [**`(epsilon, delta)-DP`**] and uses those DP aggregate counts to create synthetic records.

**`Differential Privacy`**:
- based on the `Aggregate Seeded` method, but the aggregate counts are generated using a differential privacy approach