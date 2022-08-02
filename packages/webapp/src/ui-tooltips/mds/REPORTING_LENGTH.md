To complement the synthetic data, the tool also pre-computes reportable counts of sensitive records containing all short combinations of attributes. The **`aggregation limit`** parameter specifies the maximum combination length that should be used to compute aggregate counts (e.g., an aggregation limit of 3 will lead to 1, 2 and 3 length attribute combinations being computed).

Some synthesis modes, such as **`Value Seeded`**, **`Aggregate Seeded`** and **`DP Aggregate Seeded`**, require such pre-computed aggregates counts as the foundations of data synthesis.
