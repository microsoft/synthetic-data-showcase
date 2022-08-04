# Differentially private aggregation and synthesis

The goal of this document is to describe the differential privacy approach taken by SDS to aggregate and synthesize data.

> Approach based on the [Differentially Private Marginals document](./dp_marginals.pdf).

# Table of contents

- [1. High level approach](#1-high-level-approach)
- [2. Definitions](#2-definitions)
  - [2.1. Aggregate counts](#21-aggregate-counts)
  - [2.2. Record sensitivity](#22-record-sensitivity)
- [3. Aggregation with differential privacy](#3-aggregation-with-differential-privacy)
  - [3.1. Adding noise and fabrication](#31-adding-noise-and-fabrication)
  - [3.2. Calculating the required noise](#32-calculating-the-required-noise)
    - [3.2.1. Computing sensitivity with DP-percentiles](#321-computing-sensitivity-with-dp-percentiles)
    - [3.2.2. Computing noise scale](#322-computing-noise-scale)
  - [3.3. Noise threshold types](#33-noise-threshold-types)
    - [3.3.1. Fixed threshold](#331-fixed-threshold)
    - [3.3.2. Adaptive threshold](#332-adaptive-threshold)
  - [3.4. Normalization](#34-normalization)
  - [3.5. Algorithm description](#35-algorithm-description)
- [4. Data synthesis](#4-data-synthesis)

# 1. High level approach

To produce synthetic data, SDS (i) generates differently-private marginals (also called differently-private aggregates in this document); and from these aggregates, (ii) derives synthetic records that retain the same differential privacy guarantees under the post-processing property.

```
|--------------|  (i)   |---------------|  (ii)   |-------------------|
| Tabular data | -----> | DP aggregates | ------> | DP synthetic data |
|--------------|        |---------------|         |-------------------|
```

# 2. Definitions

## 2.1. Aggregate counts

> Aggregate counts or marginals are the counts of _k-tuples_ in the data representing certain combinations of attributes.

Let $X$ denote a record in the data, and $X_i$ the $i^{th}-column$ of the record. A $k-tuple$ is defined by a set of $k$ columns along with possible values for each of them, i.e. $(X_{i_1} = a_1, X_{i_2} = a_2, ..., X_{i_k} = a_k)$.

For a given tabular data input, the set of of all non-empty $k-tuples$ is denoted by $M_k$, and the maximum value that $k$ might assume by $R$ (_reporting length_). Therefore, the set of all possible $k-tuples$, starting from 1 up to and including $R$ $(k=1...R)$, along with their counts, defines the aggregate data for the given input - $A_r$.

For example, given the following dataset and a reporting length of 3 $(R=3)$:

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

## 2.2. Record sensitivity

> In the context of the aggregates, the sensitivity of a record is defined as the maximum number of $k-tuples$ that can br generated from that record.

Let $j$ be the index of a record, then the set of of all non-empty $k-tuples$ for this record can be denoted by $M_{k_j}$. Therefore sensitivity for record $j$ and a given $k$ is then $\Delta_{k_j} = |M_{k_j}|$.

The sensitivity can be interpreted as the maximum number of contributions from a records to the aggregate data - thus, the maximum number of non-empty combinations with length $k$ that can be generated from the record.

This way, the overall sensitive $\Delta_{k}$ across all records is $\Delta_{k} = max |M_{k_j}|$.

For example, given the following dataset and $k=2$:

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

# 3. Aggregation with differential privacy

## 3.1. Adding noise and fabrication

In order to ensure differential privacy guarantees to the aggregate data, noise needs to be added to every single count reported. Furthermore, based on the dataset's domain, there might be some attribute combinations that do not exist in the original dataset. For example:

| Record ID | A   | B   | C   |
| --------- | --- | --- | --- |
| 1         | a1  | b1  | c1  |
| 2         | a1  | b2  | c1  |
| 3         | a2  |     | c2  |

$(A = a2, C = c1)$ does not appear in the dataset. Although, to ensure the DP guarantees in the reported aggregate data, we also need to give these kind of combinations a chance of being sampled - if they ever end being reported in the aggregates dataset, they will be called **spurious/fabricated attribute combinations**.

To illustrate the process of adding noise to the aggregate data, let's consider the example above and a reporting length of 2 $(R=2)$. The domain inferred from the dataset is:

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

This means that noise needs to be added to every single attribute combination $(k-tuple)$, and if $count(k-tuple) + noise > \rho_{k}$[1], where $\rho_{k}$ is a threshold value, then the $k-tuple$ is added to the aggregated data alongside its noisy count.

> Since the algorithm is iterative, starting with $k = 1$ up to and including $k = r$, where $R$ is the reporting length. We start by selecting combinations that satisfy the equation [1] for $k = 1$, then in the next iteration, only $k-tuples$ including the surviving $(k-1)-tuples$ from the previous iteration should be considered for sampling.

The [Differentially Private Marginals document](./dp_marginals.pdf) describes both how to calculate the necessary noise as well as how to define the threshold $\rho_{k}$. So this document will only present how SDS applies and uses such values.

## 3.2. Calculating the required noise

The noise added to each attribute combination count $(k-tuple)$ is sampled from $\sigma_{k} * \sqrt{\Delta_k} * N(0, 1)$ [2], where $k$ defines each combination length from 1 up to and including the reporting length $(R)$, and $N(0, 1)$ is a Gaussian distribution.

### 3.2.1. Computing sensitivity with DP-percentiles

Notice that the noise level is directly related to the overall sensitivity $\Delta_k$. So higher sensitivity values would result in higher levels of noise.

In order to decrease the noise, we can use a percentile technique with differential privacy to select $\Delta_k$, so instead of $\Delta_{k} = max |M_{k_j}|$ we could consume some privacy budget and compute $\Delta_{k} = Q^{th}-percentile(|M_{k_j}|,\varepsilon_Q)$, where $\varepsilon_Q$ is dedicated privacy budget to the percentile selection.

> As a result of lowering the sensitivity for a given combination length $k$, we also need to randomly drop `k-tuples`, to ensure that all records will meet the new sensitivity criteria.

### 3.2.2. Computing noise scale

From the [Differentially Private Marginals document](./dp_marginals.pdf) we see that satisfy $(\varepsilon, \delta)-DP$, the following inequality needs to hold:

$0.5 * R\varepsilon_Q^2 + 0.5 *\displaystyle\sum_{1}^{R} 1/\sigma_i^2 \leq \sqrt{\varepsilon + \ln(2/\delta)} - \sqrt{\ln(2/\delta)}$

Lets call $\rho=\sqrt{\varepsilon + \ln(2/\delta)} - \sqrt{\ln(2/\delta)}$ and define $Q_{prop}$ as the proportion of the total privacy budget dedicated for finding $Q^{th}$ percentiles. Then, we need to find: (i) - $0.5 * R\varepsilon_Q^2  = \rho * Q_{prop}$ and (ii) $0.5 *\displaystyle\sum_{1}^{R} 1/\sigma_i^2 = \rho * (1 - Q_{prop})$

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

To summarize, to control how to split the privacy budget $\varepsilon$, SDS expects the following inputs:

- `Percentile epsilon proportion` = $\varepsilon_Q$
- `Sigma proportions` = $[p_1, p_2, ..., p_k]$

## 3.3. Noise threshold types

As explained above, the thresholds $\rho_{k}$ decides whether or not a noisy attribute combination count should be included in the reported aggregate data.

As described in the [Differentially Private Marginals document](TODO), the threshold for the $1-tuples$ (single attribute counts) is given by:

$\rho_1 = 1 + \sigma_1 * \sqrt{\Delta_1} * \Phi^{-1}[(1 - \frac{\delta}{2})^{1/\Delta_1}]$, where $\Phi^{-1}$ is the inverse of the CDF (PPF).

Although, $\rho_2, ..., \rho_k$ do not affect the privacy parameters, but only the fraction of spurious (fabricated) combinations in the output.

SDS provides two ways to control fabrication and define the $\rho_k$ parameters for $k \geq 2$: (i) fixed threshold; and (ii) adaptive threshold.

### 3.3.1. Fixed threshold

SDS allows $\rho_2, ..., \rho_k$ to specified directly - e.g. $\rho_2=10$ and $\rho_3=20$, will cause:

- only $2-tuples$ with noisy count $> 10$ will be included in the aggregate data
- only $3-tuples$ with noisy count $> 20$ will be included in the aggregate data

Since fabricated combinations will have their counts sampled from $\sigma_{k} * \sqrt{\Delta_k} * N(0, 1)$, higher $\rho_k$ values will decrease the number of fabricated combinations in the final output, but also increase the number of not fabricated combinations being reported.

### 3.3.2. Adaptive threshold

SDS allows $\eta_2, ..., \eta_k$ to be specified such that:

$\rho_k = \sigma_k * \sqrt{\Delta_1} * \Phi^{-1}[1 - \frac{\eta_k}{2}]$, where $0 < \eta_k \leq 1$.

Notice that when $\eta_k = 1$, then $\rho_k = 0$, resulting in the maximum possible fabrication, whereas smaller values of $\eta_k$ will result in bigger thresholds and less fabrication - although, more attribute combinations suppressed.

## 3.4. Normalization

Since attribute combinations counts will have noise added to them, as well as some will be fabricated and others suppressed, $k-tuples$ might have a bigger reported count than sub-combinations generated from it. For example:

- $count(A = a1, B = b1) = 25$
- $count(A = a1, B = b1, C = c1) = 30$
- $count(A = a1, B = b1, C = c2) = 40$

In the original data, this should does not happen: for any given $k-tuple, t_k$ of length $k$, then $count(t_k) \leq count(t_{k-1})$.

There, SDS will normalize the reported noisy-counts to follow this rule:

- $count(A = a1, B = b1) = 25$
- $count(A = a1, B = b1, C = c1) = 25^*$
- $count(A = a1, B = b1, C = c2) = 25^*$

> \* Notice this decision is based in another noisy count to keep the same DP-guarantees.

## 3.5. Algorithm description

High level code to compute aggregate counts with DP:

- $epsilon \gets \varepsilon$
- $delta \gets \delta$
- $reporting\_length \in [1,\infty)$
- $percentile \in [1,100]$
- $percentile\_epsilon\_proportion \in (0, 1)$
- $sigma\_proportions \gets [p_1, ..., p_k]$
- $threshold\_type = fixed | adaptive$
- $thresholds = [t_1, ..., t_k]$

```python
aggregate_data = {}

# split privacy budget
sigmas = find_gaussian_scales(
	percentile_epsilon_proportion,
	sigma_proportions,
	reporting_length
)
percentile_epsilon = find_percentile_epsilon(
	percentile_epsilon_proportion,
	reporting_length
)

# loop from k = 1...reporting_length
for k in range(1, reporting_length + 1):
	if k > 1:
		# only surviving tuples from the last iteration
		# will be used
		k_tuples = find_k_tuples_based_on_previous_iteration(
			aggregate_data[k - 1]
		)
	else:
		# find the set of single attributes from
		# the data
		k_tuples = find_single_attributes()

	# find all valid k-tuples for each record
	# valid k-tuples are the ones present in k_tuples
	k_tuples_by_record = find_valid_k_tuples_by_record(k_tuples, k)

	# compute the allowed sensitivity using DP-percentile
	allowed_sensitivity = compute_allowed_sensitivity_with_dp(
		k_tuples_by_record,
		percentile,
		percentile_epsilon / k
	)

	# randomly pick tuples for each record and increment
	# their counts until we reach the allowed sensitivity
	k_tuples = increment_counts_based_on_allowed_sensitivity(
		k_tuples,
		k_tuples_by_record,
		allowed_sensitivity
	)

	# add gaussian noise to the current counts
	k_tuples = add_gaussian_noise(
		k_tuples,
		sigmas[k],
		allowed_sensitivity
	)

	# calculate the rhos based on the threshold types
	# and provided threshold values
	rhos = calc_rhos(
		threshold_type,
		thresholds,
		sigmas[k],
		allowed_sensitivity
	)

	# retain counts based on rhos[k]
	k_tuples = retain_k_tuples_based_on_rho(k_tuples, rhos[k])

	aggregate_data[k] = current_k_tuples

aggregate_data = normalize(aggregate_data)
```

# 4. Data synthesis

TODO