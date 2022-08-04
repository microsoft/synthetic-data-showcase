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

Let $X$ denote a record in the data, and $X_i$ the $i^{th}-column$ of the record. A $k-tuple$ is defined by a set of $k$ columns along with possible values for each of them, i.e. $(X_{i_1} = a_1, X_{i_2} = a_2, ..., X_{i_k} = a_k)$.

For a given tabular data input, the set of of all non-empty $k-tuples$ is denoted by $M_k$, and the maximum value that $k$ might assume by $R$ (_reporting length_). Therefore, the set of all possible $k-tuples$, starting from 1 up to and including $R$ ($k = 1 ... R$), along with their counts, defines the aggregate data for the given input - $A_r$.

For example, given the following dataset and a reporting length of 3 ($R = 3$):

| A   | B   | C   |
| --- | --- | --- |
| a1  | b1  | c1  |
| a1  | b2  | c1  |
| a2  |     | c2  |
| a2  | b2  | c1  |
| a1  | b2  |     |

Then $A_3$ is:

- $count(A = a1) = 3$
- $count(A = a2) = 2$
- $count(B = b1) = 1$
- $count(B = b2) = 3$
- $count(C = c1) = 3$
- $count(C = c2) = 1$
- $count(A = a1, B = b1) = 1$
- $count(A = a1, B = b2) = 2$
- $count(A = a1, C = c1) = 2$
- $count(A = a2, B = b2) = 1$
- $count(A = a2, C = c1) = 1$
- $count(A = a2, C = c2) = 1$
- $count(B = b1, C = c1) = 1$
- $count(B = b2, C = c1) = 2$
- $count(A = a1, B = b1, C = c1) = 1$
- $count(A = a1, B = b2, C = c1) = 1$
- $count(A = a2, B = b2, C = c1) = 1$

## Record sensitivity

> In the context of the aggregates, the sensitivity of a record is defined as the maximum number of $k-tuples$ that can br generated from that record.

Let $j$ be the index of a record, then the set of of all non-empty $k-tuples$ for this record can be denoted by $M_{k_j}$. Therefore sensitivity for record $j$ and a given $k$ is then $\Delta_{k_j} = |M_{k_j}|$.

The sensitivity can be interpreted as maximum number of contributions from a records to the aggregate data - thus, the maximum number of non-empty combinations with length $k$ that can be generated from the record.

This way, the overall sensitive $\Delta_{k}$ across all records is $\Delta_{k} = max |M_{k_j}|$.

For example, given the following dataset and $k = 2$:

| Record ID | A   | B   | C   |
| --------- | --- | --- | --- |
| 1         | a1  | b1  | c1  |
| 2         | a1  | b2  | c1  |
| 3         | a2  |     | c2  |

Then:

- $\Delta_{2_1} = \binom{3}{2} = |(A = a1, B = b1), (A = a1, C = c1), (B = b1, C = c1)| = 3$
- $\Delta_{2_2} = \binom{3}{2} = |(A = a1, B = b2), (A = a1, C = c1), (B = b2, C = c1)| = 3$
- $\Delta_{2_3} = \binom{2}{2} = |(A = a2, C = c2)| = 1$
- $\Delta_{2} = max |M_{2_j}| = max(3, 3, 1) = 3$

# Aggregation with differential privacy

## Adding noise and fabrication

In order to ensure differential privacy guarantees to the aggregate data, noise needs to be added to every single count reported. Furthermore, based on the dataset's domain, there might be some attribute combinations that do not exist in the original dataset. For example:

| Record ID | A   | B   | C   |
| --------- | --- | --- | --- |
| 1         | a1  | b1  | c1  |
| 2         | a1  | b2  | c1  |
| 3         | a2  |     | c2  |

$(A = a2, C = c1)$ does not appear in the dataset. Although, to ensure the DP guarantees in the reported aggregate data, we also need to give these kind of combinations a chance of being sampled - if they ever end being reported in the aggregates dataset, they will be called **spurious/fabricated attribute combinations**.

To illustrate the process of adding noise to the aggregate data, let's consider the example above and a reporting length of 2 ($R = 2$). The domain inferred from the dataset is:

- **Column A**: `a1, a2`
- **Column B**: `b1, b2`
- **Column C**: `c1, c2`

From this domain, we can infer the possible attribute combinations:

- $k = 1$:

  - $count(A = a1) = 2$
  - $count(A = a2) = 1$
  - $count(B = b1) = 1$
  - $count(B = b2) = 1$
  - $count(C = c1) = 2$
  - $count(C = c2) = 1$

- $k = 2$:
  - $count(A = a1, B = b1) = 1$
  - $count(A = a1, B = b2) = 1$
  - $count(A = a1, C = c1) = 2$
  - $count(A = a1, C = c2) = 0$
  - $count(B = b1, C = c1) = 1$
  - $count(B = b1, C = c2) = 0$
  - $count(B = b2, C = c1) = 1$
  - $count(B = b2, C = c2) = 0$

This means that noise needs to be added to every single attribute combination ($k-tuple$), and if $count(k-tuple) + noise > \rho_{k}$[1], where $\rho_{k}$ is a threshold value, then the $k-tuple$ is added to the aggregated data alongside its noisy count.

> Since the algorithm is iterative, starting with $k = 1$ up to and including $k = r$, where $R$ is the reporting length. We start by selecting combinations that satisfy the equation [1] for $k = 1$, then in the next iteration, only $k-tuples$ including the surviving $(k-1)-tuples$ from the previous iteration should be considered for sampling.

The [Differentially Private Marginals document](TODO) describes both how to calculate the necessary noise as well as how to define the threshold $\rho_{k}$. So this document will only present how SDS applies and uses such values.

## Calculating the required noise

The noise added to each attribute combination count ($k-tuple$) is sampled from $\sigma_{k} * \sqrt{\Delta_k} * \Nu(0, 1)$ [2], where $k$ defines each combination length from 1 up to and including the reporting length ($R$), and $\Nu(0, 1)$ is a Gaussian distribution.

### Computing sensitivity with DP-percentiles

Notice that the noise level is directly related to the overall sensitivity $\Delta_k$. So higher sensitivity values would result in higher levels of noise.

In order to decrease the noise, we can use a percentile technique with differential privacy to select $\Delta_k$, so instead of $\Delta_{k} = max |M_{k_j}|$ we could consume some privacy budget and compute $\Delta_{k} = Q^{th}-percentile(|M_{k_j}|,\varepsilon_Q)$, where $\varepsilon_Q$ is dedicated privacy budget to the percentile selection.

> As a result of lowering the sensitivity for a given combination length $k$, we also need to randomly drop `k-tuples`, to ensure that all records will meet the new sensitivity criteria.

### Computing noise scale

From the [Differentially Private Marginals document](TODO) we see that satisfy $(\varepsilon, \delta)-DP$, the following inequality needs to hold:

$0.5 * R\varepsilon_Q^2 + 0.5 *\sum_{1}^{R} 1/\sigma_i^2 \leq \sqrt{\varepsilon + \ln(2/\delta)} - \sqrt{\ln(2/\delta)}$

Lets call $\rho=\sqrt{\varepsilon + \ln(2/\delta)} - \sqrt{\ln(2/\delta)}$ and define $Q_{prop}$ as the proportion of the total privacy budget dedicated for finding $Q^{th}$ percentiles. Then, we need to find: (i) - $0.5 * R\varepsilon_Q^2  = \rho * Q_{prop}$' and (ii) $0.5 *\sum_{1}^{R} 1/\sigma_i^2 = \rho * (1 - Q_{prop})$

(i) directly tells us that: $\varepsilon_Q = \sqrt{(2 * \rho * Q_{prop}) / R}$ [3]

Then to solve (ii) and find the $\sigma_k$ values, SDS will proportionally split the privacy budget such that.

- $\sigma_1 = p_1 * \sigma$
- $\sigma_2 = p_2 * \sigma$
- ...
- $\sigma_k = p_k * \sigma$

Thus:

$(\frac{1}{\sigma_1^2} + \frac{1}{\sigma_2^2}+ ... + \frac{1}{\sigma_k^2}) = 2 * \rho * (1 - Q_{prop})$

$(\frac{1}{p_1^2*\sigma^2} + \frac{1}{p_2^2*\sigma^2} + ... + \frac{1}{p_k^2*\sigma^2}) = 2 * \rho * (1 - Q_{prop})$

$\frac{1}{\sigma^2} * (\frac{1}{p_1^2} + \frac{1}{p_2^2} + ... + \frac{1}{p_k^2}) = 2 * \rho * (1 - Q_{prop})$

$\frac{1}{\sigma^2} = \frac{2 * \rho * (1 - Q_{prop})}{(\frac{1}{p_1^2} + \frac{1}{p_2^2} + ... + \frac{1}{p_k^2})}$

$\sigma = \sqrt{\frac{(\frac{1}{p_1^2} + \frac{1}{p_2^2} + ... + \frac{1}{p_k^2})}{2 * \rho * (1 - Q_{prop})}}$

$\sigma_k = p_k * \sigma = p_k * \sqrt{\frac{(\frac{1}{p_1^2} + \frac{1}{p_2^2} + ... + \frac{1}{p_k^2})}{2 * \rho * (1 - Q_{prop})}}$ [4]

## Noise threshold types
