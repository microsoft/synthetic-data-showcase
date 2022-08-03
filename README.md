[![Rust CI](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/rust-ci.yml/badge.svg?branch=main&event=push)](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/rust-ci.yml)
[![Javascript CI](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/javascript-ci.yml/badge.svg?branch=main&event=push)](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/javascript-ci.yml)
[![Python CI](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/python-ci.yml/badge.svg?branch=main&event=push)](https://github.com/microsoft/synthetic-data-showcase/actions/workflows/python-ci.yml)

# Synthetic data showcase

> Generates synthetic data and user interfaces for privacy-preserving data sharing and analysis.

# Overview

In many cases, the best way to share sensitive datasets is not to share the actual sensitive datasets, but user interfaces to derived datasets that are inherently anonymous. Our name for such an interface is a _data showcase_. In this project, we provide an automated set of tools for generating the three elements of a _synthetic data showcase_:

1. _Synthetic data_ representing the overall structure and statistics of the input data, without describing actual identifiable individuals.
2. _Aggregate data_ reporting the number of individuals with different combinations of attributes, without disclosing precise counts.
3. _Data dashboards_ enabling exploratory visual analysis of both datasets, without the need for custom data science or interface development.

To generate such elements, our tools provide two approaches to anonymize data: (i) k-anonymity and (ii) differential privacy (DP).

# K-anonymity

## Privacy guarantees

The main privacy control offered by the tools is based on the numbers of individuals described by different combinations of attributes. The `resolution` determines the minimum group size that will be (a) reported explicitly in the aggregate data and (b) represented implicitly by the records of the synthetic data. This makes it possible to offer privacy guarantees in clearly understandable terms, e.g.:

"All attribute combinations in this synthetic dataset describe groups of 10 or more individuals in the original sensitive dataset, therefore may never be used to infer the presence of individuals or groups smaller than 10."

Under such guarantees, it is impossible for attackers to infer the presence of groups whose size is below the `resolution`. For groups at or above this resolution, the 'safety in numbers' principle applies &ndash; the higher the limit, the harder it becomes to make inferences about the presence of known individuals.

This anonymization method can be viewed as enforcing [k-anonymity](https://en.wikipedia.org/wiki/K-anonymity) across all columns of a sensitive dataset. While typical implementations of k-anonymity divide data columns into quasi-identifiers and sensitive attributes, only enforcing k-anonymity over quasi-identifiers leaves the remaining attributes open to linking attacks based on background knowledge. The data synthesis approach used to create a synthetic data showcase safeguards against such attacks while preserving the structure and statistics of the sensitive dataset.

## Usage

Use of k-anonymity synthesizers is recommended for **one-off data releases** where the accuracy of attribute counts is critical.

These methods are designed to offer strong group-level protection against **membership inference**, i.e., preventing an adversary from inferring whether a known individual or small group of individuals is present in the sensitive dataset.

They should not be used in situations where **attribute inference** from **homogeneity attacks** are a concern, i.e., when an adversary knows that a certain individual is present in the sensitive dataset, identifies them as part of a group sharing known attributes, and then infers previously unknown attributes of the individual because those attributes are common to the group.

# Differential privacy

## Privacy guarantees

Differential privacy is not a tool, but a set of mathematical techniques that can be used to protect data. Protection is accomplished by adding some uncertainty (noise) to the data, up to a level that achieves the protection desired by the user (privacy budget).

This tool, protects attribute combination counts in the aggregate data with differential privacy [**`(epsilon, delta)-DP`**](https://en.wikipedia.org/wiki/Differential_privacy), and then uses the resulting DP aggregate counts to derive synthetic records that retain differential privacy under the post-processing property.

## Usage

Use of differential privacy synthesizers is recommended for **repeated data releases** where cumulative privacy loss must be quantified and controlled, where **attribute inference** from **homogeneity attacks** is a concern, or where provable guarantees against all possible privacy attacks are desired.

They should be used with caution, however, whenever missing, fabricated, or inaccurate counts of attribute combinations could trigger inappropriate downstream decisions or actions.

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
