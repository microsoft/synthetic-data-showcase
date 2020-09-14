
# Synthetic data showcase

> Generates synthetic data and user interfaces for privacy-preserving data sharing and analysis.

In many cases, the best way to share sensitive datasets is not to share the actual sensitive datasets, but user interfaces to derived datasets that are inherently anonymous. Our name for such an interface is a *data showcase*. In this project, we provide an automated pipeline for generating the three elements of a *synthetic data showcase*:

1. *Synthetic data* representing the overall structure and statistics of the input data, without describing actual identifiable individuals.
2. *Aggregate data* reporting the number of individuals with different combinations of attributes, without disclosing small or precise counts.
3. *Data dashboards* enabling exploratory visual analysis of both datasets, without the need for custom data science or interface development.

All of these elements are inherently privacy preserving and may be freely shared or published subject to the following privacy guarantees.

## Privacy guarantees

The main privacy control offered by the pipeline is based on the numbers of individuals described by different combinations of attributes. The `reporting_threshold` specified by the pipeline user determines the minimum group size that will be (a) reported explicitly in the aggregate data and (b) represented implicitly by the records of the synthetic data. This makes it possible to offer privacy guarantees in clearly understandable terms, e.g.:

"No attribute combinations in this synthetic dataset describe groups of less than 10 individuals in the original sensitive dataset"

or conversely:

"All attribute combinations in this synthetic dataset describe groups of 10 or more individuals in the original sensitive dataset"

Under such guarantees, it is impossible for attackers to infer the presence of groups whose size is below the `reporting_threshold`. For groups at or above this threshold, the 'safety in numbers' principle applies &ndash; the higher the limit, the harder it becomes to make inferences about the presence of known individuals.

This anonymization method can be viewed as enforcing [k-anonymity](https://en.wikipedia.org/wiki/K-anonymity) across all columns of a sensitive dataset. While typical implementations of k-anonymity divide data columns into quasi-identifiers and sensitive attributes, only enforcing k-anonymity over quasi-identifiers leaves the remaining attributes open to linking attacks based on background knowledge. The data synthesis approach used to create a synthetic data showcase safeguards against such attacks while preserving the structure and statistics of the sensitive dataset.


## Setup

The pipeline is controlled via a json config file containing a variety of parameters, as shown below with illustrative values:

```sh
{
    "sensitive_microdata_path": "./secret_vices.csv",
    "sensitive_microdata_delimiter": ",",
    "sensitive_zeros": [],

    "reporting_threshold": 10,
    "reporting_precision": 10,
    "reporting_length": 5,

    "seeded": true,
    "record_limit": -1,
    "parallel_jobs": 8,
    "memory_limit_pct": 95,
    "output_dir": "./vices_output",
    "prefix": "vices",

    "report_title": "Secret Vices Dataset",
    "report_visuals": {
        "vices": ["chocolate:1", "beer:1", "napping:1", ...],
        ...
    },
    "report_pages": {
        "By age/gender": ["age", "gender", "vices"],
        "By city/job": ["city", "job", "vices"],
        ...
    }
}
```

Use of each of these paramters is described in the following sections.

### Input data format

The data at `sensitive_microdata_path` should be in comma separated values (.csv) or tab separated values (.tsv) format, with the `sensitive_microdata_delimiter` set accordingly (e.g., `","` or `"\t"`).

The pipeline assumes deidentified microdata as input, i.e., a table in which each row contains all data (but no personally-identifable information, PII) relating to an individual.

Single-valued attributes (e.g., gender) are represented as columns of categorical variables whose values are shared by multiple rows. Any continuous numeric variables (e.g., age) should be quantized in advance (e.g., into age ranges) to ensure there are sufficient instances of each value.

Multi-valued attributes (e.g., interests) are represented as multiple columns of binary variables (integer values of `0` and `1`) indicating the different values of that attribute (e.g., food, sports, politics).

### Negative value interpretation

The pipeline distinguishes 'positive' attribute values that indidicate the presence of specific sensitive data from 'negative' attribute values that indicate the absence of such data. By default, the integer zero (`0`) and the empty string (`""`) and not taken into account when creating and counting attribute combinations. Any columns where zero values are of interest (and thus sensitive) should be listed in `sensitive_zeros`. This pipeline treats such `sensitive_zeros` in the same way as positive values.

### Reportable aggregate generation

To complement the synthetic microdata, the pipeline also precomputes reportable counts of sensitive records containing all short combinations of attributes. The privacy risk with such aggregate data is that small aggregate counts may identify specific groups of individuals, while precise counts may allow the detection of small differences over time. The pipeline thus protects the reported aggregate counts by first rounding to a fixed precision (using `reporting_precision`) before thresholding the rounded count to filter out small values (using `reporting_threshold`).

The `reporting_length` determines the maximum length of attribute combination for which aggregate counts are precomputed and reported. In the user interface, this value determines how many attribute value selections a user may make while retaining the ability to compare estimated (synthetic) vs actual values. The number of selections is always one less than the `reporting_length`. Specifying a `reporting_length` of `-1` indicates that combinations of all lengths should be computed. This is not recommended except for small or sparse datasets as the numbe of attribute combinations grows rapidly with their length.


### Synthetic data generation

The `seeded` parameter indicated whether synthetic records should be seeded with a corresponding sensitive record (`true`) or generated in an unseeded way by randomly sampling joint attribute distributions (`false`). Seeded synthesis is faster and better preserves statistics for visual analytics, but unseeded synthesis creates longer records of more uniform length that may better preserve structure for machine learning.

Seeded synthesis proceeds by sampling attributes from a sensitive record until the addition of further attributes would create a rare combination based on the `reporting_threshold`. These privacy-preserving subsets of sensitive records are collected for output as synthetic records. The unused attributes of each seed are also collected, with further output records synthesized from these (without replacement) until all sensitive attributes are accounted for in a synthetic record.

Since precise attribute counts create a privacy risk, it is advisable to create some uncertainty over the actual counts by adding noise to the synthetic data. The same `reporting_precision` used to create aggregate counts is used again here to suppress attributes or synthesize additional records such that synthetic attribute counts are equal to the (already imprecise) reported count.

### Data processing and output

The `record_limit` may be used to limit data synthesis to the specified number of records, taken from the start of the sensitive data. A value of `-1` indicates that all sensitive records should be modelled and synthesized.

The `parallel_jobs` parameter specifies the extent of parallel processing (e.g., based on the number of available processor cores). For local processing, this should be set to the number of available CPU cores. For faster processing of larger and more complex datasets, use of a virtual machine with multiple cores is recommended.

Output files are saved to the `output_dir` directory and prefixed with the `prefix` string. The json config file used to generate the outputs is also copied to this directory as a record of the parameters used, and should therefore be stored outside `output_dir`.

### Interface configuration

The showcase interface is created as a Power BI report that may be opened, explored, and shared using the free [Power BI Desktop](https://powerbi.microsoft.com/en-us/desktop/) application. The Power BI report displays aggregated views of the sensitive data.

The `report_title` parameter specifies the user-facing title shown within the Power BI report.

Related attributes spanning multiple columns in the sensitive dataset may be grouped together in a single visual by specifying `report_visuals` as a new configuration attribute. This contains a mapping from the name of the visual to a list of `column:value` pairs. The `column:value` pairs are combined into a single visual with the given name. In the exmple below the visual name is `vices` and it combines the list of `column:value` pairs that follow. Up to 10 such visuala may be created.


```sh
"report_visuals": {
    "vices": ["drugs:1", "alcohol:1", "gambling:1", ...],
    ...
}
```

The `report_pages` configuration allows you to specify specific visuals to display and the order to display them. The custom visuals that are created by specifying `report_visuals` can be used in the `report_pages` configuration section. The `report_pages` allows the specification of up to 16 attribute visuals per named page (up to 4 pages) as follows:


```sh
"report_pages": {
    "By age/gender": ["age", "gender", "vices"],
    "By city/job": ["city", "job", "vices"],
    ...
}
```

## Usage

```sh
python showcase.py <config_path> --verbose | --v
```

Runs the complete pipeline using the specified json config file. To run the pipeline for individual stages, see the sections below. Use either form of the verbose flag for detailed output logs.

Multiple stages may also be specified, with any missing stage inputs resulting in prior stages being executed automatically. The complete pipeline can be executed with all stages specified as follows:

```sh
python showcase.py <config_path> --v --aggregate --generate --evaluate --navigate
```

It is recommended to begin with a smaller dataset (in terms of both rows and columns) and reporting length before scaling up based on performance (in terms of privacy, utility, and time).

### Aggregate

```sh
python showcase.py <config_path> --aggregate | --agg
```

Generates the `reportable_aggregates` tsv file containing precomputed and protected counts of all sensitive attribute combinations up to `reporting_length` in length, as well as a  `sensitive_aggregates` tsv file storing the actual counts. This file is used in the `--evaluate` pipeline stage to avoid recomputing combinations, and may be used to confirm actual values. Since these are highly sensitive, the file should be protected in the same way as the original microdata.

Additional outputs of this stage are tsv and svg summaries of `sensitive_rare_by_length` &ndash; how many sensitive attribute combinations exist up to `reporting_length` and what proportion of these are rare, i.e., occurring with a frequency below `reporting_threshold`.

### Generate

```sh
python showcase.py <config_path> --generate | --gen
```

Generates the `synthetic_microdata` tsv file containing synthetic microdata representing the structure and statistics of data at `sensitive_microdata_path`, without leaking any attribute combinations that are rare in the sensitive data.

### Evaluate

```sh
python showcase.py <config_path> --evaluate | --eval
```

Compares the `synthetic_microdata` to the `sensitive_microdata` in terms of the proportion of sensitive combination counts that are preserved by the synthetic data (up to `reporting_length` in length). Reads from the `sensitive_aggregates` tsv file if available.

Outputs of this stage are tsv and svg summaries of:

1. `synthetic_leakage_by_length` &ndash; how many synthetic attribute combinations exist up to `reporting_length` and what proportion of these leak rare combinations from the sensitive data (by virtue of the synthesis process, this is guaranteed to be zero across all combination lengths).
2. `synthetic_preservation_by_length` &ndash; how many synthetic records are filtered on average for each combination length up to `reporting_length` and what proportion of the corresponding sensitive count is captured by the synthetic count on average (longer combinations are naturally more rare so result in more loss / less preservation).
3. `synthetic_preservation_by_count` &ndash; how many synthetic attributes are needed on average to give a range of aggregate counts (shown on a log scale with labels representing the upper bound of the bin) and what proportion of the corresponding sensitive count is captured by the synthetic count on average (smaller counts are by definition more rare so result in more loss / less preservation).

### Navigate

```sh
python showcase.py <config_path> --navigate | --nav
```

Creates the `data_showcase.pbit` Power BI template file combining both synthetic and aggregate data. Open this file in Power BI Desktop and when prompted enter the data path as the `output_dir` folder specified in the json config file. This will load the output data files into the template, which may then be saved and shared as a `.pbix` report file. The path must be specififed as an absolute path.

### Example

```sh
python showme.py
```

Runs the complete pipeline on a single core for a small dataset (1000 rows) with many unique combinations (i.e., a very challenging dataset to share while preserving privacy).

Pipeline outputs are saved to the newly-created `./german_credit_data` directory and based on the Statlog (German Credit Data) dataset published by UCI [here](http://archive.ics.uci.edu/ml/datasets/Statlog+%28German+Credit+Data%29) with source credit to:

&nbsp;&nbsp;&nbsp;&nbsp;Professor Dr. Hans Hofmann<br>
&nbsp;&nbsp;&nbsp;&nbsp;Institut für Statistik und Ökonometrie<br>
&nbsp;&nbsp;&nbsp;&nbsp;Universität Hamburg<br>
&nbsp;&nbsp;&nbsp;&nbsp;FB Wirtschaftswissenschaften<br>
&nbsp;&nbsp;&nbsp;&nbsp;Von-Melle-Park 5<br>
&nbsp;&nbsp;&nbsp;&nbsp;2000 Hamburg 13<br>

A sample json config file used to create this example is also saved to the current working directory for reference.

## License

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

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Acknowledgements

This project resulted from a [Tech Against Trafficking (TAT)](https://techagainsttrafficking.org/) accelerator program with the [Counter Trafficking Data Collaborative (CTDC)](https://www.ctdatacollaborative.org/) and the [International Organization for Migration (IOM)](https://www.iom.int/) on how to safely share data on identified victims of human trafficking. Read more in this [TAT blog post](https://techagainsttrafficking.org/accelerating-toward-data-insights-tech-against-trafficking-successfully-concludes-its-pilot-accelerator/).

## Contact

Feedback and suggestions are welcome via email to synthetic-showcase@microsoft.com.
