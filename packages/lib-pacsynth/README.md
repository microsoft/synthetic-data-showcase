# Private Accurate Combination (PAC) Synthesizers

Python library exposing a set of synthesizers based on the [Synthetic Data Showcase project](https://github.com/microsoft/synthetic-data-showcase).

## Available synthesizers

- `DpAggregatedSeededSynthesizer`: a differentially private synthesizer that relies on DP Marginals to build synthetic data. It will compute DP Marginals (called aggregates) for your dataset using a specified `reporting length`, and synthesize data based on the computed aggregated counts. Check our [detailed](./samples/aggregate_seeded_detailed_example.ipynb) and [short](./samples/aggregate_seeded_short_example.ipynb) notebook examples for more information.
