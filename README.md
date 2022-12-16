[![Rust CI](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/rust-ci.yml/badge.svg?branch=main&event=push)](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/rust-ci.yml)
[![Javascript CI](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/javascript-ci.yml/badge.svg?branch=main&event=push)](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/javascript-ci.yml)
[![Python CI](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/python-ci.yml/badge.svg?branch=main&event=push)](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/python-ci.yml)

# Synthetic data showcase

> Generates synthetic data and user interfaces for privacy-preserving data sharing and analysis.

> Free-to-use web application for private data release: https://microsoft.github.io/synthetic-data-showcase/

# Overview

In many cases, the best way to share sensitive datasets is not to share the actual sensitive datasets, but user interfaces to derived datasets that are inherently anonymous. Our name for such an interface is a _data showcase_. In this project, we provide an automated set of tools for generating the three elements of a _synthetic data showcase_:

1. _Synthetic data_ representing the overall structure and statistics of the input data, without describing actual identifiable individuals.
2. _Aggregate data_ reporting the number of individuals with different combinations of attributes, without disclosing exact counts.
3. _Data dashboards_ enabling exploratory visual analysis of both datasets, without the need for custom data science or interface development.

To generate these elements, our tool provides two approaches to create anonymous datasets that are safe to release: (i) differential privacy and (ii) k-anonymity.

# Differential privacy

## Privacy guarantees

The paradigm of differential privacy (DP) offers "safety in noise" &ndash; just enough calibrated noise is added to the data to control the maximum possible privacy loss, $\varepsilon$ (epsilon). When applied in the context of private data release, $\varepsilon$ bounds the ratio of probabilities of getting an arbitrary result to an arbitrary computation when using two synthetic datasets &ndash; one generated from the sensitive dataset itself and the other from a neighboring dataset missing a single arbitrary record.  

Our approach to synthesizing data with differential privacy first protects attribute combination counts in the aggregate data using our [DP Marginals](./docs/dp/dp_marginals.pdf) algorithm and then uses the resulting DP aggregate counts to derive synthetic records that retain differential privacy under the post-processing property.

> For a detailed explanation of how SDS uses differential privacy, please check our [DP documentation](./docs/dp/README.md).

## Usage

Use of our differential privacy synthesizer is recommended for **repeated data releases** where cumulative privacy loss must be quantified and controlled and where provable guarantees against all possible privacy attacks are desired.

Any differentially-private dataset should be evaluated for potential risks in situations where missing, fabricated, or inaccurate counts of attribute combinations could trigger inappropriate downstream decisions or actions. Our DP synthesizer prioritises the release of accurate combination counts (with minimal noise) of actual combinations (with minimal fabrication).

# K-anonymity

## Privacy guarantees

The paradigm of k-anonymity offers "safety in numbers" &ndash; combinations of attributes are only released when they occur at least k times in the sensitive dataset. When applied in the context of private data release, we interpret k as a privacy resolution determining the minimum group size that will be (a) reported explicitly in the aggregate dataset and (b) represented implicitly by the records of the synthetic dataset. This makes it possible to offer privacy guarantees in clearly understandable terms, e.g.:

"All attribute combinations in this synthetic dataset describe groups of 10 or more individuals in the original sensitive dataset, therefore may never be used to infer the presence of individuals or groups smaller than 10."

Our approach to synthesizing data with k-anonymity overcomes many of the limitations of standard [k-anonymization](https://en.wikipedia.org/wiki/K-anonymity), in which attributes of sensitive data records are generalized and suppressed until k-anonymity is reached, and only for those attributes determined in advance to be potentially identifying when used in combination (so-called quasi-identifiers). In this standard approach, all remaining sensitive attributes are released so long as k-anonymity holds for the designated quasi-identifiers. This makes the records (and thus subjects) of k-anonymized datasets susceptible to linking attacks based on auxilliary data or background knowledge.

In contrast, our k-anonymity synthesizers generate synthetic records that do not represent actual individuals, yet are composed exclusively from common combinations of attributes in the senstive dataset. The k-anonymity guarantee therefore holds for all data columns and all combinations of attributes.

## Usage

Use of our k-anonymity synthesizers is recommended only for **one-off data releases** where there is a need for precise counts of attribute combinations (at a given privacy resolution).

These synthesizers are designed to offer strong group-level protection against membership inference, i.e., preventing an adversary from inferring whether a known individual or small group of individuals is present in the sensitive dataset.

They should not be used in situations where attribute inference from homogeneity attacks are a concern, i.e., when an adversary knows that a certain individual is present in the sensitive dataset, identifies them as part of a group sharing known attributes, and then infers previously unknown attributes of the individual because those attributes are common to the group.

# Quick setup

The easiest way to start is to [run the web application locally with docker](./packages/webapp/README.md#locally-run-the-web-application-with-docker). You will be able to experiment with your data and see the result in real time using the UI.

If you are looking for faster alternatives to process bigger datasets, please refer to our [python pipeline tool](./packages/python-pipeline/README.md), [CLI application tool](./packages/cli/README.md) or [python synthesizer library](./packages/lib-pacsynth/README.md).

# All available tools

We provide a set of tools to synthesize, aggregate and evaluate your data, which can be used according to your use case/preference. The available tools are described below:

- **Python pipeline**: if you want to synthesize, aggregate your data and also generate the dashboards for visual analysis with a single command line command in python, please check the [python pipeline tool](./packages/python-pipeline/README.md).
- **Web application**: if you want to locally run a web application capable of synthesize, aggregate and evaluate your data directly on your browser using Javascript and Web Assembly, this is the tool for you. The data is processed locally and never leaves your machine. Please check the [web application tool](./packages/webapp/README.md).
- **Raw CLI application**: if you only want a command line interface (CLI) around our [core Rust library](./packages/core/README.md) for data synthesis and aggregation, please check the [CLI application tool](./packages/cli/README.md).
- **pac-synth library**: if want to aggregate and synthesize data locally with python, please check the [python synthesizer library](./packages/lib-pacsynth/README.md).

# Quick references

- [python-pipeline](./packages/python-pipeline/README.md)
- [webapp](./packages/webapp/README.md)
- [cli](./packages/cli/README.md)
- [core](./packages/core/README.md)
- [lib-wasm](./packages/lib-wasm/README.md)
- [lib-python](./packages/lib-python/README.md)
- [lib-pacsynth](./packages/lib-pacsynth/README.md)

# License

Synthetic data showcase

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

# Acknowledgements

This project resulted from a [Tech Against Trafficking (TAT)](https://techagainsttrafficking.org/) accelerator program with the [Counter Trafficking Data Collaborative (CTDC)](https://www.ctdatacollaborative.org/) and the [International Organization for Migration (IOM)](https://www.iom.int/) on how to safely share data on identified victims of human trafficking. Read more in this [TAT blog post](https://techagainsttrafficking.org/accelerating-toward-data-insights-tech-against-trafficking-successfully-concludes-its-pilot-accelerator/).

# Contact

Feedback and suggestions are welcome via email to synthetic-showcase@microsoft.com.
