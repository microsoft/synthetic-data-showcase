# SDS Python pipeline

Python pipeline to perform data synthesis, aggregation and evaluation.

# How to run

## I. Build python bindings

To run the pipeline you will need to build the python bindings for the sds core library. To do so, please follow the steps described in [here](../lib-python/README.md#how-to-compile).

## II. Install the dependencies

Make sure you are on the root of the sds python package (_packages/python-pipeline_) and run the following command to install the required python dependencies:

```bash
> pip install -r requirements.txt
```

# Setup

The pipeline is controlled via a json config file containing a variety of parameters, as shown below with illustrative values:

```sh
{
    "sensitive_microdata_path": "./secret_vices.csv",
    "sensitive_microdata_delimiter": ",",
    "use_columns": [],
    "record_limit": -1,
    "sensitive_zeros": [],

    "reporting_resolution": 10,
    "reporting_length": 5,

    "synthesis_mode": "seeded",
    "parallel_jobs": 8,
    "cache_max_size": 100000,
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

Use of each of these parameters is described in the following sections.

## Input data format

The data at `sensitive_microdata_path` should be in comma separated values (.csv) or tab separated values (.tsv) format, with the `sensitive_microdata_delimiter` set accordingly (e.g., `","` or `"\t"`).

The pipeline assumes deidentified microdata as input, i.e., a table in which each row contains all data (but no personally-identifiable information, PII) relating to an individual.

Single-valued attributes (e.g., gender) are represented as columns of categorical variables whose values are shared by multiple rows. Any continuous numeric variables (e.g., age) should be quantized in advance (e.g., into age ranges) to ensure there are sufficient instances of each value.

Multi-valued attributes (e.g., interests) are represented as multiple columns of binary variables (integer values of `0` and `1`) indicating the different values of that attribute (e.g., food, sports, politics).

The `use_columns` parameter may be used to specify which data columns at `sensitive_microdata_path` should be included in the output. An empty list `[]` indicates that all columns should be used.

Similarly, `record_limit` may be used to limit data synthesis to the specified number of records, taken from the start of the sensitive data. A value of `-1` indicates that all sensitive records should be modelled and synthesized.

## Negative value interpretation

The pipeline distinguishes 'positive' attribute values that indicate the presence of specific sensitive data from 'negative' attribute values that indicate the absence of such data. By default, the integer zero (`0`) and the empty string (`""`) and not taken into account when creating and counting attribute combinations. Any columns where zero values are of interest (and thus sensitive) should be listed in `sensitive_zeros`. This pipeline treats such `sensitive_zeros` in the same way as positive values.

## Aggregate data generation

To complement the synthetic microdata, the pipeline also precomputes reportable counts of sensitive records containing all short combinations of attributes. The privacy risk with such aggregate data is that small aggregate counts may identify specific groups of individuals, while precise counts may allow the detection of small differences over time. The pipeline thus protects the reported aggregate counts by rounding counts down to the closest multiple of the specified `reporting_resolution`. The `reporting_resolution` therefore acts as both the minimum threshold for reporting and the minimum difference between reported counts.

The `reporting_length` determines the maximum length of attribute combination for which aggregate counts are precomputed and reported. In the user interface, this value determines how many attribute value selections a user may make while retaining the ability to compare estimated (synthetic) vs actual values. The number of selections is always one less than the `reporting_length`. Specifying a `reporting_length` of `-1` indicates that combinations of all lengths should be computed. This is not recommended except for small or sparse datasets as the number of attribute combinations grows rapidly with their length.

## Synthetic data generation

The `synthesis_mode` parameter indicates whether synthetic records should be seeded with a corresponding sensitive record (`row_seeded`) or generated in an unseeded way by randomly sampling joint attribute distributions (`unseeded`). Seeded synthesis is faster and better preserves statistics for visual analytics, but unseeded synthesis creates longer records of more uniform length that may better preserve structure for machine learning.

Seeded synthesis proceeds by sampling attributes from a sensitive record until the addition of further attributes would create a rare combination based on the `reporting_resolution`. These privacy-preserving subsets of sensitive records are collected for output as synthetic records. The unused attributes of each seed are also collected, with further output records synthesized from these (without replacement) until all sensitive attributes are accounted for in a synthetic record.

Since precise attribute counts create a privacy risk, it is advisable to create some uncertainty over the actual counts by adding noise to the synthetic data. The same `reporting_resolution` used to create aggregate counts is used again here to suppress attributes or synthesize additional records such that synthetic attribute counts are equal to the (already imprecise) reported count.

Synthetic records are sorted by number of non-empty attribute values prior to output in a way that intermixes partly-suppressed and wholly-synthetic records.

## Data processing and output

The `parallel_jobs` parameter specifies the extent of parallel processing (e.g., based on the number of available processor cores). For local processing, this should be set to the number of available CPU cores. For faster processing of larger and more complex datasets, use of a virtual machine with multiple cores is recommended.

The `cache_max_size` parameter sets the size of the cache used to store attribute combination counts during the synthesis process. The higher the value, the more memory will be used. The default value is `100000` which is generally a good balance between performance and memory usage, but this can be tuned depending on the input dataset.

Output files are saved to the `output_dir` directory and prefixed with the `prefix` string. The json config file used to generate the outputs is also copied to this directory as a record of the parameters used, and should therefore be stored outside `output_dir`.

## Interface configuration

The showcase interface is created as a Power BI report that may be opened, explored, and shared using the free [Power BI Desktop](https://powerbi.microsoft.com/en-us/desktop/) application. The Power BI report displays aggregated views of the sensitive data.

The `report_title` parameter specifies the user-facing title shown within the Power BI report.

Related attributes spanning multiple columns in the sensitive dataset may be grouped together in a single visual by specifying `report_visuals` as a new configuration attribute. This contains a mapping from the name of the visual to a list of `column:value` pairs. The `column:value` pairs are combined into a single visual with the given name. In the example below the visual name is `vices` and it combines the list of `column:value` pairs that follow. Up to 10 such visuals may be created.

```sh
"report_visuals": {
    "vices": ["chocolate:1", "beer:1", "napping:1", ...],
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

# Usage

```sh
python showcase.py <config_path> --verbose | --v
```

Runs the complete pipeline using the specified json config file. To run the pipeline for individual stages, see the sections below. Use either form of the verbose flag for detailed output logs.

Multiple stages may also be specified, with any missing stage inputs resulting in prior stages being executed automatically. The complete pipeline can be executed with all stages specified as follows:

```sh
python showcase.py <config_path> --v --aggregate --generate --evaluate --navigate
```

It is recommended to begin with a smaller dataset (in terms of both rows and columns) and reporting length before scaling up based on performance (in terms of privacy, utility, and time).

## Aggregate

```sh
python showcase.py <config_path> --aggregate | --agg
```

Generates the `reportable_aggregates` tsv file containing precomputed and protected counts of all sensitive attribute combinations up to `reporting_length` in length, as well as a `sensitive_aggregates` tsv file storing the actual counts and a `sensitive_aggregated_data` json file containing serialized information about the sensitive aggregates. These files are used in the `--evaluate` pipeline stage to avoid recomputing combinations, and may be used to confirm actual values. Since these are highly sensitive, the file should be protected in the same way as the original microdata.

Additional outputs of this stage are tsv and svg summaries of `sensitive_rare_by_length` &ndash; how many sensitive attribute combinations exist up to `reporting_length` and what proportion of these are rare, i.e., occurring with a frequency below `reporting_resolution`.

## Generate

```sh
python showcase.py <config_path> --generate | --gen
```

Generates the `synthetic_microdata` tsv file containing synthetic microdata representing the structure and statistics of data at `sensitive_microdata_path`, without leaking any attribute combinations that are rare in the sensitive data.

## Evaluate

```sh
python showcase.py <config_path> --evaluate | --eval
```

Compares the `synthetic_microdata` to the `sensitive_microdata` in terms of the proportion of sensitive combination counts that are preserved by the synthetic data (up to `reporting_length` in length). Reads from the `sensitive_aggregates` tsv file if available.

Outputs of this stage are tsv and svg summaries of:

1. `synthetic_leakage_by_length` &ndash; how many synthetic attribute combinations exist up to `reporting_length` and what proportion of these leak rare combinations from the sensitive data (by virtue of the synthesis process, this is guaranteed to be zero across all combination lengths).
2. `synthetic_preservation_by_length` &ndash; how many synthetic records are filtered on average for each combination length up to `reporting_length` and what proportion of the corresponding sensitive count is captured by the synthetic count on average (longer combinations are naturally more rare so result in more loss / less preservation).
3. `synthetic_preservation_by_count` &ndash; how many synthetic attributes are needed on average to give a range of aggregate counts (shown on a log scale with labels representing the upper bound of the bin) and what proportion of the corresponding sensitive count is captured by the synthetic count on average (smaller counts are by definition more rare so result in more loss / less preservation).

## Navigate

```sh
python showcase.py <config_path> --navigate | --nav
```

Creates the `data_showcase.pbit` Power BI template file combining both synthetic and aggregate data. Open this file in Power BI Desktop and when prompted enter the data path as the `output_dir` folder specified in the json config file. This will load the output data files into the template, which may then be saved and shared as a `.pbix` report file. The path must be specified as an absolute path.

## Example

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
