# Differentially private aggregation and synthesis

The goal of this document is to describe the differential privacy approach taken by synthetic data showcase (SDS) to aggregate and synthesize data.

> Approach based on [Differentially Private Marginals](./dp_marginals.pdf).

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
  - [4.1. Algorithm description](#41-algorithm-description)
  - [4.2. Sampling description](#42-sampling-description)
    - [4.2.1. Sampling up to and including the reporting length](#421-sampling-up-to-and-including-the-reporting-length)
    - [4.2.2. Sampling beyond the reporting length](#422-sampling-beyond-the-reporting-length)
  - [4.3. Using synthetic counts to balance sampling](#43-using-synthetic-counts-to-balance-sampling)

# 1. High level approach

To produce synthetic data, SDS: (i) generates differently-private marginals (also called differently-private aggregates in this document), then (ii) derives synthetic records from these aggregates in a way that retains the same differential privacy guarantees under the post-processing property.

```
|--------------|  (i)   |---------------|  (ii)   |-------------------|
| Tabular data | -----> | DP aggregates | ------> | DP synthetic data |
|--------------|        |---------------|         |-------------------|
```

# 2. Definitions

## 2.1. Aggregate counts

> Aggregate counts or marginals are the counts of _k-tuples_ in the data representing certain combinations of attributes.

Let $X$ denote a record in the data, and $X_i$ the $i^{th}$-column of the record. A $k$-tuple is defined by a set of $k$ columns along with possible values for each of them, i.e., $(X_{i_1} = a_1, X_{i_2} = a_2, ..., X_{i_k} = a_k)$.

For a given tabular data input, the set of all non-empty $k$-tuples is denoted by $M_k$, and the maximum value that $k$ might assume denoted by $R$ (_reporting length_). Therefore, the set of all possible $k$-tuples, starting from 1 up to and including $R$ $(k=1..R)$, along with their counts, defines the aggregate data for the given input: $A_R$.

For example, given the following dataset and a reporting length of 3 $(R=3)$:

| A   | B   | C   |
| --- | --- | --- |
| a1  | b1  | c1  |
| a1  | b2  | c1  |
| a2  |     | c2  |
| a2  | b2  | c1  |
| a1  | b2  |     |

Then $A_{R=3}$ is:

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

> In the context of the aggregates, the sensitivity of a record is defined as the maximum number of $k$-tuples that can be generated from the record.

Let $j$ be the index of a record, and the set of all non-empty $k$-tuples for this record $M_{k_j}$. The sensitivity for a record $j$ and a given $k$ is then $\Delta_{k,j} = |M_{k,j}|$.

The sensitivity can be interpreted as the maximum number of contributions a record can make to the aggregate data, i.e., the maximum number of non-empty combinations with length $k$ that can be generated from the record.

In this way, the overall sensitivity $\Delta_{k}$ across all records is $\Delta_{k} = max |M_{k,j}|$.

For example, given the following dataset and $k=2$:

| ID | A | B | C |
| --- | --- | --- | --- |
| 1 | a1 | b1 | c1 |
| 2 | a1 | b2 | c1 |
| 3 | a2 | | c2 |

Then:

- $\Delta_{k=2,j=1} = \binom{3}{2} = |(A = a1, B = b1), (A = a1, C = c1), (B = b1, C = c1)| = 3$
- $\Delta_{k=2,j=2} = \binom{3}{2} = |(A = a1, B = b2), (A = a1, C = c1), (B = b2, C = c1)| = 3$
- $\Delta_{k=2,j=3} = \binom{2}{2} = |(A = a2, C = c2)| = 1$
- $\Delta_{k=2} = max |M_{2_j}| = max(3, 3, 1) = 3$

# 3. Aggregation with differential privacy

## 3.1. Adding noise and fabrication

To ensure differential privacy guarantees for the aggregate data, noise needs to be added to the reported counts. Furthermore, based on the dataset's domain, there might be some attribute combinations that do not exist in the original dataset. For example:

| ID  | A   | B   | C   |
| --- | --- | --- | --- |
| 1   | a1  | b1  | c1  |
| 2   | a1  | b2  | c1  |
| 3   | a2  |     | c2  |

$(A = a2, C = c1)$ does not appear in the dataset. However, to satisfy DP guarantees in the reported aggregate data, we need to give combinations that do not exist in the input dataset a chance of being sampled. If they are ever sampled and reported in the aggregate dataset, they will be called **fabricated (spurious) attribute combinations**.

To illustrate the process of adding noise to the aggregate data, let's consider the example above and a reporting length of 2 $(R=2)$. The domain inferred from the dataset is:

- **Column A**: `a1, a2`
- **Column B**: `b1, b2`
- **Column C**: `c1, c2`

From this domain, we can infer the possible attribute combinations and their sensitive counts:

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

This means that noise needs to be added to the sensitive counts, and if $count(t_k) + noise > \rho_{k}$ [1], where $t_k$ is any $k$-tuple and $\rho_{k}$ is a threshold value, then the $k$-tuple is added to the aggregate data alongside its noisy count.

> Since the algorithm is iterative, we repeat this process starting with $k = 1$ and continue up to and including $k = R$, where $R$ is the reporting length. We start by selecting combinations that satisfy equation [1] for $k = 1$, then in the next iteration, only $k$-tuple including the surviving $(k-1)$-tuples from the previous iteration are considered for sampling.

## 3.2. Calculating the required noise

According to [Differentially Private Marginals](./dp_marginals.pdf), the noise added to each attribute combination count (_k-tuple_) is sampled from $\sigma_{k} * \sqrt{\Delta_k} * N(0, 1)$ [2], where $k$ defines each combination length from 1 up to and including the reporting length $(R)$, and $N(0, 1)$ is a Gaussian distribution.

### 3.2.1. Computing sensitivity with DP-percentiles

Notice that the noise level is directly related to the overall sensitivity $\Delta_k$. Higher sensitivity values therefore result in higher levels of added noise.

In order to decrease the noise, we can use a differentially-private percentile technique to select $\Delta_k$, so instead of $\Delta_{k} = max |M_{k,j}|$ we consume some privacy budget and compute $\Delta_{k} = Q^{th}$-$percentile(|M_{k,j}|,\varepsilon_Q)$, where $\varepsilon_Q$ is the dedicated privacy budget for the percentile selection.

> To lower the sensitivity for a given combination length $k$, we need to randomly drop $k$-tuples from records to make sure the record's sensitivity will not exceed the "allowed sensitivity" computed with DP.

### 3.2.2. Computing noise scale

From [Differentially Private Marginals](./dp_marginals.pdf), to satisfy $(\varepsilon, \delta)$-DP, the following inequality needs to hold:

$0.5 * R\varepsilon_Q^2 + 0.5 *\displaystyle\sum_{1}^{R} 1/\sigma_i^2 \leq \sqrt{\varepsilon + \ln(2/\delta)} - \sqrt{\ln(2/\delta)}$

Let's call $\rho=\sqrt{\varepsilon + \ln(2/\delta)} - \sqrt{\ln(2/\delta)}$ and define $Q_{p}$ as the proportion of the total privacy budget dedicated for finding $Q^{th}$ percentiles. Then, we need to find: (i) $0.5 * R\varepsilon_Q^2  = \rho * Q_{p}$ and (ii) $0.5 *\displaystyle\sum_{1}^{R} 1/\sigma_i^2 = \rho * (1 - Q_{p})$

(i) directly tells us that: $\varepsilon_Q = \sqrt{(2 * \rho * Q_{p}) / R}$ [3]

Then to solve (ii) and find the $\sigma_k$ values, SDS will proportionally split the privacy budget such that:

- $\sigma_1 = p_1 * \sigma$
- $\sigma_2 = p_2 * \sigma$
- ...
- $\sigma_k = p_k * \sigma$

Thus:

$(\frac{1}{\sigma_1^2} + \frac{1}{\sigma_2^2}+ ... + \frac{1}{\sigma_k^2}) = 2 * \rho * (1 - Q_{p})$

$(\frac{1}{p_1^2*\sigma^2} + \frac{1}{p_2^2*\sigma^2} + ... + \frac{1}{p_k^2*\sigma^2}) = 2 * \rho * (1 - Q_{p})$

$\frac{1}{\sigma^2} * (\frac{1}{p_1^2} + \frac{1}{p_2^2} + ... + \frac{1}{p_k^2}) = 2 * \rho * (1 - Q_{p})$

$\frac{1}{\sigma^2} = \frac{2 * \rho * (1 - Q_{p})}{(\frac{1}{p_1^2} + \frac{1}{p_2^2} + ... + \frac{1}{p_k^2})}$

$\sigma = \sqrt{\frac{(\frac{1}{p_1^2} + \frac{1}{p_2^2} + ... + \frac{1}{p_k^2})}{2 * \rho * (1 - Q_{p})}}$

$\sigma_k = p_k * \sigma = p_k * \sqrt{\frac{(\frac{1}{p_1^2} + \frac{1}{p_2^2} + ... + \frac{1}{p_k^2})}{2 * \rho * (1 - Q_{p})}}$ [4]

To summarize, to control the allocation of the privacy budget $\varepsilon$, SDS expects the following inputs:

- `Percentile epsilon proportion` = $Q_p$, where $0 < Q_p < 1$
- `Sigma proportions` = $[p_1, p_2, ..., p_k]$, where $p_k > 0$

## 3.3. Noise threshold types

As explained above, the thresholds $\rho_{k}$ decide whether or not a noisy attribute combination count should be included in the reported aggregate data.

As described in [Differentially Private Marginals](./dp_marginals.pdf), the threshold for the $1$-tuples (single attribute counts) is given by:

$\rho_1 = 1 + \sigma_1 * \sqrt{\Delta_1} * \Phi^{-1}[(1 - \frac{\delta}{2})^{1/\Delta_1}]$, where $\Phi^{-1}$ is the inverse of the CDF (PPF).

Note that $\rho_2, ..., \rho_k$ do not affect the privacy parameters, only the fraction of fabricated (spurious) combinations in the output. SDS provides two ways to control fabrication and define the $\rho_k$ parameters for $k \geq 2$: (i) fixed threshold and (ii) adaptive threshold.

### 3.3.1. Fixed threshold

SDS allows $\rho_2, ..., \rho_k$ to specified directly - e.g. $\rho_2=10$ and $\rho_3=20$, will cause:

- only $2$-tuples with noisy count $> 10$ will be included in the aggregate data
- only $3$-tuples with noisy count $> 20$ will be included in the aggregate data

Since fabricated combinations will have their counts sampled from $\sigma_{k} * \sqrt{\Delta_k} * N(0, 1)$, higher $\rho_k$ values will decrease the number of fabricated combinations in the final output, but also increase the number of not fabricated combinations being reported.

### 3.3.2. Adaptive threshold

SDS allows $\eta_2, ..., \eta_k$ to be specified such that:

$\rho_k = \sigma_k * \sqrt{\Delta_1} * \Phi^{-1}[1 - \frac{\eta_k}{2}]$, where $0 < \eta_k \leq 1$.

Notice that when $\eta_k = 1$, then $\rho_k = 0$, resulting in the maximum possible fabrication, whereas smaller values of $\eta_k$ will result in greater thresholds and less fabrication. The tradeoff is that more attribute combinations will be suppressed from the reported aggregate data.

## 3.4. Normalization

Since attribute combinations counts will have noise added to them, some will be fabricated, and others suppressed, a $k$-tuple might have a greater reported count than sub-combinations contained within it. For example:

- $count(A = a1, B = b1) = 25$
- $count(A = a1, B = b1, C = c1) = 30$
- $count(A = a1, B = b1, C = c2) = 40$

In the original data, this does not happen: for any given $k$-tuple, $t_k$ of length $k$, then $count(t_k) \leq count(t_{k-1})$.

To retain this property in the aggregate data while also preserving DP, SDS will normalize the reported noisy-counts to follow this rule:

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
- $input\_data$

```python
aggregate_data = {}

# find the gaussian scales for each combination length k
# and the privacy budget dedicated to the percentile with DP
sigmas, percentile_epsilon = split_privacy_budget(
	reporting_length,
	epsilon,
	delta,
	percentile_epsilon_proportion,
	sigma_proportions
)

# loop from k = 1...reporting_length
for k in range(1, reporting_length + 1):
	if k == 1:
		# find the set of single attributes from the data
		#
		# all the attributes start with a count of 0
		k_tuples = find_single_attributes(input_data)
	else:
		# only surviving tuples from the previous iteration
		# will be used
		#
		# all the tuples will start with a count of 0
		k_tuples = find_k_tuples_based_on_previous_iteration(
			input_data,
			k,
			aggregate_data[k - 1]
		)

	# find all valid k-tuples for each record
	#
	# valid k-tuples are the ones that have survived
	# until this iteration
	k_tuples_by_record = find_valid_k_tuples_by_record(
		input_data,
		k_tuples,
		k
	)

	# compute the allowed sensitivity using DP-percentile
	allowed_sensitivity = compute_allowed_sensitivity_with_dp(
		k_tuples_by_record,
		percentile,
		percentile_epsilon / k
	)

	# randomly pick tuples for each record and increment
	# their counts until we reach the allowed sensitivity
	#
	# this will update the k_tuple counts from 0 to counts
	# that ensure the allowed sensitivity is not exceeded
	k_tuples = increment_counts_based_on_allowed_sensitivity(
		k_tuples,
		k_tuples_by_record,
		k,
		allowed_sensitivity
	)

	# add gaussian noise to the current counts
	k_tuples = add_gaussian_noise(
		k_tuples,
		sigmas[k],
		allowed_sensitivity
	)

	# compute rhos based on the threshold types
	# and provided threshold values
	rhos = compute_rhos(
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

SDS synthesizes data directly from the [differently-private aggregates](#3-aggregation-with-differential-privacy), without querying the sensitive data. This way, the generated synthetic data will preserve the same guarantees present in the aggregates computed with differential privacy.

The synthesis mode used to synthesize data from the DP aggregates is called _aggregate-seeded_. The idea behind it is to sample attributes and build records trying to match not only the single attribute count distributions in the aggregate data, but also all the reported $k$-tuple distributions. For example, if the aggregate data contains the following $k$-tuples and counts:

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

Then the _aggregate-seeded_ synthesis will attempt to reproduce these distributions in the output dataset.

The following sections explain in more detail how _aggregate-seeded_ synthesis works.

## 4.1. Algorithm description

The general concept behind this synthesis can be expressed by the following algorithm:

- $reporting\_length =$ the same used to generate the aggregate data
- $aggregate\_data$

```python
# this will get the 1-tuple counts from the aggregate_data
#
# therefore, this will contain only the single attribute counts
single_attributes_available = count_single_attributes(aggregate_data)

# stores the resulting synthetic records
synthesized_records = []

# this keeps track of the already synthesized k-tuple counts
already_synthesized_counts = {}

# we keep going, while we have not used all the available
# single attributes
while len(single_attribute_available) > 0:
	synthetic_record = []

	while True:
		# sample the next attribute
		attr = sample_next_attr(
			aggregate_data,
			synthetic_record,
			single_attributes_available,
			already_synthesized_counts
		)

		# if we could sample one more attribute
		# add it to result
		if attr != None:
			synthetic_record.append(attr)

			# now we decrement the used attribute count
			single_attributes_available[attr] -= 1

			# if the count reaches 0, this attribute
			# will not be available for sampling anymore
			if single_attributes_available[attr] == 0:
				del single_attributes_available[attr]
		else:
			break

	# update the already synthesized k-tuples counts
	for k in range(1, reporting_length + 1):
		for comb in combinations(synthetic_record, k):
			already_synthesized_counts[comb] += 1

	synthesized_records.append(synthetic_record)
```

## 4.2. Sampling description

Notice that the overall algorithm described above includes a function called `sample_next_attr`. The goal of such function is to sample a new attribute to be added to the currently synthesized record.

This function works by randomly sampling attributes from the list of single attributes available. Despite having a level of randomness, this function will try to follow the same distribution of counts present in the aggregate data.

Generally speaking, it performs sampling based on weights, so let's consider the following scenario:

| Attribute | Weight |
| --------- | ------ |
| a1        | 1      |
| b1        | 5      |
| c1        | 10     |

Even though all of the 3 attribute above have a chance of being sampled, $c1$ has 2 times more chance than $b1$, which has 5 times greater chance than $a1$.

Also, when sampling it is important to ensure that:

- Attributes already present in the currently synthesized record cannot be sampled again

- Only attribute from columns that are not present in the synthetic record yet can be sampled (e.g. If $a1$ from column A has been already sampled, $a2$ also from column A cannot)

- Attributes that create attribute combinations that do not exist in the DP aggregate data when added to the currently synthesized record cannot be sampled (e.g., if the currently synthesized record is $(A = a1, B = b1, C = c2)$ and we try to sample $D = d2$, if, for instance, $(B = b1, D = d2)$ is not reported in the aggregate data, sampling $D = d1$ is not an option)

  - This guarantees that the synthesis will not fabricate new attribute combinations. However, combinations fabricated during aggregation with DP are reported in the aggregate data and might therefore also appear in the synthetic data.

On the other hand, we also need to calculate the weights that are used for sampling. Adding a new attribute to the current synthetic record creates a new record having a number of attributes either: (i) less than or equal to the reporting length, or (ii) greater than the reporting length.

### 4.2.1. Sampling up to and including the reporting length

Let's say the currently synthesized record is $(A = a1, B = b1)$, and we have the following available attributes: $[C = c1, C = c2, D = d1]$. If we decide to add each of these attributes to the synthetic record and look up the result in the aggregate data:

- $C = c1 \rightarrow (A = a1, B = b1, C = c1)$; $count(A = a1, B = b1, C = c1) = 1$
- $C = c2 \rightarrow (A = a1, B = b1, C = c2)$; $count(A = a1, B = b1, C = c2) = 5$
- $D = d1 \rightarrow (A = a1, B = b1, D = d1)$; $(A = a1, B = b1, D = d1)$ does not exist in the aggregate data

This means that $D = d1$ cannot be a candidate for sampling, while $C = c1$ and $C = c2$ can, with the weights being their counts in the aggregate data.

### 4.2.2. Sampling beyond the reporting length

For as long as the size of the synthesized record plus the new attribute candidate for sampling does not exceed the reporting length, the weight can be a direct lookup in the aggregate data. However, if it does exceed the reporting length, we can proceed by doing the following:

- $synthetic\_record =$ record already synthesized so far
- $attr\_candidate =$ attribute candidate we want to calculate the weight for
- $weight\_selection\_percentile=$ the percentile we want from all the weights candidates (default 95)
- $aggregate\_data$

```python
# store all weight candidates for the percentile technique
weight_candidates = []

# current record with the new attr candidate added to it
current_candidate = synthetic_record + attr_candidate

# for every combination length from 1 up to and including the
# reporting length
for k in range(1, reporting_length + 1):
	# get all the sub-combinations that include the
	# attribute we want to get the weight for
	for sub_combination in combinations(current_candidate):
		if attr_candidate in sub_combination:
			if sub_combination in aggregate_data:
				weight_candidates.append(aggregate_data[sub_combination])
			else:
				# adding the attribute would create
				# a combination that does not exist in
				# aggregate data - we will not do that
				return None

if len(weight_candidates) == 0:
	return None

# calculate the percentile that will represent the
# weight for the attribute candidate
return percentile(weight_candidates, weight_selection_percentile)
```

Notice that the aggregate counts are already DP, so we don't need differential privacy to compute the percentile of weight candidates here.

## 4.3. Using synthetic counts to balance sampling

So far, every time the aggregate data is queried, either to directly get a weight for sampling, or to build the list of weight candidates for the percentile technique, the initial aggregate counts are used irrespective of the attributes already accounted for in the synthetic data.

Sometimes, depending on the dataset, it might be desirable to use the count of the already-synthesized attributes to help guide the sampling process.

If we look back to the [overall algorithm](#41-algorithm-description), we already keep track of the already synthesized attribute counts `already_synthesized_counts`. So, when we perform the lookup in the aggregate data, instead of using the raw count, we could use: `aggregate_data[sub_combination] - already_synthesized_counts[sub_combination]`. In this way, attributes that have already been sampled will have a lower chance of being sampled again.

> This is controlled by the `use_synthetic_counts` flag in SDS.
