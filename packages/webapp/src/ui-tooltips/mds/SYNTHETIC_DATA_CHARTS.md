This contains statistics collected directly from the sensitive data:

- **Mean sensitive count by length**: for each combinations of length 1, 2, up to the analysis length it is defined as the sum of all the combinations counts divided by the number of distinct combinations with that particular length - `sum(combination counts) / number of distinct combinations`
- **Rare combinations percentage by length**: for each combinations of length 1, 2, up to the analysis length it is defined as the percentage of combinations that are rare (`count < resolution`)
- **Distinct combinations by length**: for each combinations of length 1, 2, up to the analysis length it is defined as the number of distinct combinations, regardless of the counts

This also contains statistics comparing the synthetic and sensitive microdata:

- **Leakage count by length**: how many rare combinations (up to the analysis length) on the sensitive data are present on the synthetic data. By design this should always be zero
- **Fabricated count by length**: how many combinations (up to the analysis length) exist on the synthetic data but not on the sensitive data. By design this should always be zero
- **Preservation percentage by length**: for each combinations of length 1, 2, up to the analysis length it represents how many combinations of the sensitive data were preserved on the sensitive one - ratio between the distinct synthetic combinations and the distinct sensitive combinations
- **Count preservation percentage**: each aggregated combination can be organized into buckets based on their counts. For example, the bucket 10 contains the combinations that have counts from (0, 10], the bucket 20, from (10, 20], so the bucket number is the upper bound of range. For every bucket the preservation percentage can be computed, being it the ratio between the synthetic and sensitive count for each combination in the bucket (see the count preservation chart on the synthetic data charts below)
- **Mean length of combinations**: for the same buckets defined above, we define the mean of all combinations length present on the bucket
