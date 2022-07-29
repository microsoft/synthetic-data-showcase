# Private Accurate Combination (PAC) Synthesizers

> Library to generate synthetic data for privacy-preserving data sharing and analysis.

Python library exposing a set of synthesizers based on the [Synthetic Data Showcase project](https://github.com/microsoft/synthetic-data-showcase).

The synthesizers aim to privately keep the accuracy of the attribute combinations counts from the original dataset, as well as the statistical distributions of the original data.

## Available synthesizers

- `DpAggregateSeededSynthesizer`: a differentially private synthesizer that relies on DP Marginals to build synthetic data. It will compute DP Marginals (called aggregates) for your dataset using a specified `reporting length`, and synthesize data based on the computed aggregated counts.

## Installation

```bash
pip install pac-synth
```

## Using

> **Check our [detailed](./samples/dp_aggregate_seeded_detailed_example.ipynb) and [short](./samples/dp_aggregate_seeded_short_example.ipynb) notebook examples for more information.**

```python
from pacsynth import Dataset, DpAggregateSeededParametersBuilder, DpAggregateSeededSynthesizer
from utils import gen_data_frame

# this generates a random pandas data frame with 5000 records
# replace this with your own data
sensitive_df = gen_data_frame(5000)
dataset = Dataset.from_data_frame(sensitive_df)

# build synthesizer
synth = DpAggregateSeededSynthesizer(
	DpAggregateSeededParametersBuilder().epsilon(0.5).build()
)
synth.fit(dataset)

# sample 5000 records and build a data frame
synthetic_raw_data = synth.sample(5000)
synthetic_df = Dataset.raw_data_to_data_frame(synthetic_raw_data)

# show 10 example records
print(synthetic_df.sample(10))

# this will output
#      H1 H2  H3 H4 H5 H6 H7 H8 H9 H10
# 1858  2  2   2  1  1  1  1  1  1   1
# 4218     4  10
# 2346  2  4   6  1  1  1  1  1  1   1
# 3594  1  6   1
# 4059  2  6   6
# 2042  2  3   1  1  1  1  1  1  1   1
# 4546        10
# 2443  2  4   8  1  1  1  1  1  1   1
# 831   1  4   6  1  1  1  1  1  1   1
# 20    1  1   1  1  1  1  1  1  1   1
```

# License

MIT License

Copyright (c) Microsoft Corporation.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

# Contact

Feedback and suggestions are welcome via email to synthetic-showcase@microsoft.com.
