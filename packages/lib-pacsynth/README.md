# Private Accurate Combination (PAC) Synthesizers

> Library to generate synthetic data for privacy-preserving data sharing and analysis.

Python library exposing a set of synthesizers based on the [Synthetic Data Showcase project](https://github.com/microsoft/synthetic-data-showcase).

The synthesizers aim to privately keep the accuracy of the attribute combinations counts from the original dataset, as well as the statistical distributions of the original data.

## Available synthesizers

- `DpAggregateSeededSynthesizer`: a differentially private synthesizer that relies on DP Marginals to build synthetic data. It will compute DP Marginals (called aggregates) for your dataset using a specified `reporting length`, and synthesize data based on the computed aggregated counts. Check our [detailed](./samples/dp_aggregate_seeded_detailed_example.ipynb) and [short](./samples/dp_aggregate_seeded_short_example.ipynb) notebook examples for more information.
