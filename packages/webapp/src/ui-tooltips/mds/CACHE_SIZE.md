The data synthesis process computes how many times attribute combinations occur in the sensitive data and uses this information to generate the synthetic data. The **`cache size`** parameter indicates the maximum number of attribute combinations that will have their count cached to speed up the processing time. If a certain combination is not part of the cache, its count will be recomputed.

Naturally, there is a balance between performance and memory utilization &ndash; the bigger the cache, the faster the data synthesis at the cost of greater memory use.

The default value is `100000`, which is generally a good balance between performance and memory usage, but this **can and should** be tuned depending on the input dataset.
