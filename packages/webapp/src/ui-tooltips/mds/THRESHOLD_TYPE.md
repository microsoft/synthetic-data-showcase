Possible thresholds when adding noise with DP:

**`Fixed`**:
Filter combinations based on a fixed threshold (keep only noisy counts that are `> threshold`)

**`Adaptive`**:
Filter combinations based on a fraction of the fabricated counts distribution (this should be a value between 0 and 1)

**`MaxFabrication`**:
The threshold value will be the maximum fabrication percentage (considering the original aggregate counts) allowed by combination length (this should be a value between 0 and 1)

