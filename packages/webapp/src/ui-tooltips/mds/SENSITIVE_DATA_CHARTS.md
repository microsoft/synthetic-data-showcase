This contains statistics collected directly from the sensitive data:

- **Mean sensitive count by length**: for each combinations of length 1, 2, up to the analysis length it is defined as the sum of all the combinations counts divided by the number of distinct combinations with that particular length - `sum(combination counts) / number of distinct combinations`
- **Rare combinations percentage by length**: for each combinations of length 1, 2, up to the analysis length it is defined as the percentage of combinations that are rare (`count < resolution`)
- **Distinct combinations by length**: for each combinations of length 1, 2, up to the analysis length it is defined as the number of distinct combinations, regardless of the counts
