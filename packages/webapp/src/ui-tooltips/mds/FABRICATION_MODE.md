Possible options to control fabrication (reported combinations that do not exist in the sensitive dataset) during DP aggregation/synthesis:

**`Uncontrolled`**:
Does not try to control fabrication (this might result in lower errors in the final counts but a higher fabrication ratio).

e.g. for a aggregation limit of 4, this is equivalent to a custom threshold of:

- 2-counts: 1.0
- 3-counts: 1.0
- 4-counts: 1.0

**`Progressive`**:
Linearly balances fabrication according to combination length (2-counts allow less fabrication than 3-counts, for example).

e.g. for a aggregation limit of 4, this is equivalent to a custom threshold of:

- 2-counts: 0.1
- 3-counts: 0.55
- 4-counts: 1.0

**`Balanced`**:
Controls fabrication only for the 2-counts and leaves the larger combination lengths uncontrolled. Sometimes, only controlling the fabrication for the 2-counts is enough to avoid fabricated combinations to propagate for longer combinations lengths.

e.g. for a aggregation limit of 4, this is equivalent to a custom threshold of:

- 2-counts: 0.55
- 3-counts: 1.0
- 4-counts: 1.0

**`Minimize`**:
Tries to minimize the overall fabrication combination per combination length (this might result in a higher suppression of combinations and higher errors in the final counts).

e.g. for a aggregation limit of 4, this is equivalent to a custom threshold of:

- 2-counts: 0.01
- 3-counts: 0.01
- 4-counts: 0.01

**`Custom`**:
Allows a threshold value between 0 and 1.0 to be specified per combination length:

- **0**: Minimizes fabrication, resulting in the minimum possible fabrication.

- **1.0**: Does not control fabrication.
