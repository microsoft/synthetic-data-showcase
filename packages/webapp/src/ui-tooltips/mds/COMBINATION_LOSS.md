Each aggregated combination can be organized into buckets based on their counts. For example, the bucket 10 contains the combinations that have counts from (0, 10], the bucket 20, from (10, 20], so the bucket number is the upper bound of range.

For every bucket the preservation percentage can be computed, being it the ratio between the synthetic and sensitive count for each combination in the bucket (see the count preservation chart on the synthetic data charts below).

The average of `100% - preservation for each bucket` defines the combination loss.
