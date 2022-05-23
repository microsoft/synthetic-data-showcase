Possible options to control fabrication (reported combinations that do not exist on the sensitive dataset) during the DP aggregation/synthesis:

**`Balanced`**:
Linearly balances fabrication according to the combination length (1-counts allow less fabrication than 2-counts for example).

**`Minimize`**:
Tries to minimize the overall fabrication combination per combination length (this might result in a higher suppression of combinations and higher errors in the final counts).

**`Uncontrolled`**:
Does not try to control fabrication (this might result in lower errors in the final counts but a higher fabrication ratio).

**`Custom`**:
Allows a threshold value between 0 and 1.0 to be specified per combination length:

- **0**: Minimizes fabrication, resulting in the minimum possible fabrication.

- **1.0**: Does not control fabrication.