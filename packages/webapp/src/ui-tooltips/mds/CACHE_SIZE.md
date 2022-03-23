The data synthesis process computes how many times attribute combinations happens in the sensitive data and uses this information to generate the synthetic data. The **`cache size`** parameter indicates the maximum number of attribute combinations that will have its count cached to speed up the processing time. If a certain combination is not part of the cache, its count would have to be recomputed.

Naturally there is a balance between performance and memory utilization - the bigger the cache, the quicker the data synthesis will be perform, although, more memory will be required.

The default value is `100000` which is generally a good balance between performance and memory usage, but this **can and should** be tuned depending on the input dataset.
