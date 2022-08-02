### K-Anonymity

With k-anonymity, the main privacy control offered by the tool is based on the numbers of individuals described by different combinations of attributes. The **`privacy resolution`** determines the minimum group size that will be (a) reported explicitly in the aggregate data and (b) represented implicitly by the records of the synthetic data. This makes it possible to offer privacy guarantees in clearly understandable terms, e.g.:

"All attribute combinations in this synthetic dataset describe groups of 10 or more individuals in the original sensitive dataset, therefore may never be used to infer the presence of individuals or groups smaller than 10."

Under such guarantees, it is impossible for attackers to infer the presence of groups whose size is below the **`privacy resolution`**. For groups at or above this resolution, the 'safety in numbers' principle applies &ndash; the higher the limit, the harder it becomes to make inferences about the presence of known individuals.

### DP

With differential privacy, this parameter is only used for evaluation purposes. The aggregate counts are protected in a probabilistic way rather than through strict thresholding.
