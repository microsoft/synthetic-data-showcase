# Differentially private aggregation and synthesis

The goal of this document is to describe the differential privacy approach taken by SDS to aggregate and synthesize data.

> Approach based in the [Differentially Private Marginals document](TODO).

# High level approach

To produce synthetic data, SDS (i) generates differently-private marginals (also called differently-private aggregates in this document); and from these aggregates, (ii) derives synthetic records that retain the same differential privacy guarantees under the post-processing property.

```
|--------------|  (i)   |---------------|  (ii)   |-------------------|
| Tabular data | -----> | DP aggregates | ------> | DP synthetic data |
|--------------|        |---------------|         |-------------------|
```

# Definitions

## Aggregate counts

> Aggregate counts or marginals are the counts of _k-tuples_ in the data representing certain combinations of attributes.

Let $X$ denote a record in the data, and $X_i$ the $i^{th}-column$ of the record. A $k-tuple$ is defined by a set of $k$ columns along with possible values for each of them, i.e. $(X_{i_1} = a_1, X_{i_2} = a_2, ..., X_{i_k} = a_3)$.

For a given tabular data input, the set of of all non-empty _k-tuples_ is denoted by **_M<sub>k</sub>_**, and the maximum value that _k_ might assume by **_r_** (_reporting length_). Therefore, the set of all possible _k-tuples_, starting from 1 up to and including _r_ (_k = 1 ... r_), along with their counts, defines the aggregate data for the given input - **_A<sub>r</sub>_**.

For example, given the following dataset and a reporting length of 3 (_r = 3_):

| A   | B   | C   |
| --- | --- | --- |
| a1  | b1  | c1  |
| a1  | b2  | c1  |
| a2  |     | c2  |
| a2  | b2  | c1  |
| a1  | b2  |     |

Then _A<sub>3</sub>_ is:

- `count(A = a1)` = 3
- `count(A = a2)` = 2
- `count(B = b1)` = 1
- `count(B = b2)` = 3
- `count(C = c1)` = 3
- `count(C = c2)` = 1
- `count(A = a1, B = b1)` = 1
- `count(A = a1, B = b2)` = 2
- `count(A = a1, C = c1)` = 2
- `count(A = a2, B = b2)` = 1
- `count(A = a2, C = c1)` = 1
- `count(A = a2, C = c2)` = 1
- `count(B = b1, C = c1)` = 1
- `count(B = b2, C = c1)` = 2
- `count(A = a1, B = b1, C = c1)` = 1
- `count(A = a1, B = b2, C = c1)` = 1
- `count(A = a2, B = b2, C = c1)` = 1

## Record sensitivity

> In the context of the aggregates, the sensitivity of a record is defined as the maximum number of _k-tuples_ that can br generated from that record.

Let _j_ be the index of a record, then the set of of all non-empty _k-tuples_ for this record can be denoted by _M<sub>k<sub>j</sub></sub>_. Therefore sensitivity for record _j_ and a given _k_ is then **_&Delta;<sub>k<sub>j</sub></sub> = |M<sub>k<sub>j</sub></sub>|_**.

The sensitivity can be interpreted as maximum number of contributions from a records to the aggregate data - thus, the maximum number of non-empty combinations with length `k` that can be generated from the record.

This way, the overall sensitive _&Delta;<sub>k</sub>_ across all records is **_&Delta;<sub>k</sub> = max |M<sub>k<sub>j</sub></sub>|_**.

For example, given the following dataset and _r = 2_:

| Record ID | A   | B   | C   |
| --------- | --- | --- | --- |
| 1         | a1  | b1  | c1  |
| 2         | a1  | b2  | c1  |
| 3         | a2  |     | c2  |

Then:

- &Delta;<sub>k<sub>j</sub></sub> = $\binom{3}{2}$ = `|(A = a1, B = b1), (A = a1, C = c1), (B = b1, C = c1)|` = 3
- &Delta;<sub>k<sub>j</sub></sub> = $\binom{3}{2}$ = `|(A = a1, B = b2), (A = a1, C = c1), (B = b2, C = c1)|` = 3
- &Delta;<sub>k<sub>j</sub></sub> = $\binom{2}{2}$ = `|(A = a2, C = c2)|` = 1
- &Delta;<sub>k</sub> = max |M<sub>k<sub>j</sub></sub>| = `max(3, 3, 1)` = 3

# Aggregation with differential privacy

## Adding noise and fabrication

In order to ensure differential privacy guarantees to the aggregate data, noise needs to be added to every single count reported. Furthermore, based on the dataset's domain, there might be some attribute combinations that do not exist in the original dataset. For example:

| Record ID | A   | B   | C   |
| --------- | --- | --- | --- |
| 1         | a1  | b1  | c1  |
| 2         | a1  | b2  | c1  |
| 3         | a2  |     | c2  |

`(A = a2, C = c1)` does not appear in the dataset. Although, to ensure the DP guarantees in the reported aggregate data, we also need to give these kind of combinations a chance of being sampled - if they ever end being reported in the aggregates dataset, they will be called **spurious/fabricated attribute combinations**.

To illustrate the process of adding noise to the aggregate data, let's consider the example above and a reporting length of 2 (`r = 2`). The domain inferred from the dataset is:

- **Column A**: `a1, a2`
- **Column B**: `b1, b2`
- **Column C**: `c1, c2`

From this domain, we can infer the possible attribute combinations:

- _k = 1_:

  - `count(A = a1)` = 2
  - `count(A = a2)` = 1
  - `count(B = b1)` = 1
  - `count(B = b2)` = 1
  - `count(C = c1)` = 2
  - `count(C = c2)` = 1

- _k = 2_:
  - `count(A = a1, B = b1)` = 1
  - `count(A = a1, B = b2)` = 1
  - `count(A = a1, C = c1)` = 2
  - `count(A = a1, C = c2)` = 0
  - `count(B = b1, C = c1)` = 1
  - `count(B = b1, C = c2)` = 0
  - `count(B = b2, C = c1)` = 1
  - `count(B = b2, C = c2)` = 0

This means that noise needs to be added to every single attribute combination (_k-tuple_), and if **_count(k-tuple) + noise > &rho;<sub>k</sub>_** [1], where **_&rho;<sub>k</sub>_** is a threshold value, then the _k-tuple_ is added to the aggregated data alongside its noisy count.

> Since the algorithm is iterative, starting with `k = 1` up to and including `k = r`, where `r` is the reporting length. We start by selecting combinations that satisfy the equation [1] for `k = 1`, then in the next iteration, only `k-tuples` including the `surviving` `(k-1)-tuples` from the previous iteration should be considered for sampling.

The [Differentially Private Marginals document](TODO) describes both how to calculate the necessary noise as well as how to define the threshold **_&rho;<sub>k</sub>_**. So this document will only present how SDS applies and uses such values.

## Calculating the required noise

The noise added to each attribute combination count(_k-tuple_) is sampled from **_&sigma;<sub>k</sub> \* $\sqrt{\Delta_k}$ \* &Nu;(0, 1)_**, where k defines each combination length from 1 up to and including the reporting length (`r`).

## Noise threshold types
