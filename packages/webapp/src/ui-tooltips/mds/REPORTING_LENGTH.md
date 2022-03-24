To complement the synthetic microdata, the tool also pre-computes reportable counts of sensitive records containing all short combinations of attributes. The **`reporting length`** parameter specifies the maximum combination length that should be used to compute aggregate counts. (e.g. a reporting length of 3, will lead to 1, 2 and 3 length attribute combinations being computed)

Some synthesis modes as **`Value Seeded`**, **`Aggregate Seeded`** and **`Differential Privacy`** rely on aggregates counts being pre-computed.
