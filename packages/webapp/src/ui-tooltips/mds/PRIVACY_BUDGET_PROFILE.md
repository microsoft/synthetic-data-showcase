Choose how to split the privacy budget between the combination lengths

**`Flat`**:
Evenly split the budget between 1-counts, 2-counts... up to the aggregation limit

**`ProportionallyIncreasing`**:
Spend less privacy budget for the 1-counts and more for the (aggregation limit)-counts, in away that:

- 1-counts budget = `b`
- 2-counts budget = `2*b`
- 3-counts budget = `3*b`
...

**`ProportionallyDecreasing`**:
Spend more privacy budget for the 1-counts and less for the (aggregation limit)-counts, in away that:

- 1-counts budget = `b`
- 2-counts budget = `b/2`
- 3-counts budget = `b/3`
...