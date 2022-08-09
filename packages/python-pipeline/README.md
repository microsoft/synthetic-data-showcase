# SDS Python pipeline

Python pipeline to perform data synthesis, aggregation and evaluation.

# How to run

## I. Build python bindings

To run the pipeline you will need to build the python bindings for the sds core library. To do so, please follow the steps described in [here](../lib-python/README.md#how-to-compile).

## II. Install the dependencies

Make sure you are in the root of the sds python package (_packages/python-pipeline_) and run the following command to install the required python dependencies:

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
    "reporting_length": 4,

    "synthesis_mode": "row_seeded",
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

## Input data

### Format

The data at `sensitive_microdata_path` should be in comma separated values (.csv) or tab separated values (.tsv) format, with the `sensitive_microdata_delimiter` set accordingly (e.g., `","` or `"\t"`).

The pipeline assumes de-identified categorical microdata as input, i.e., a table in which each row contains all data (but no personally-identifiable information, PII) relating to an individual.

Single-valued attributes (e.g., gender) are represented as columns of categorical variables whose values are shared by multiple rows. Any continuous numeric variables (e.g., age) should be quantized in advance (e.g., into age ranges) to ensure there are sufficient instances of each value.

Multi-valued attributes (e.g., interests) are represented as multiple columns of binary variables (integer values of `0` and `1`) indicating the different values of that attribute (e.g., food, sports, politics).

### Input data parameters

- `sensitive_microdata_path`: Path to the file containing microdata (csv or tsv);
- `sensitive_microdata_delimiter`: Delimiter used in the `sensitive_microdata_path` file (e.g., `","` or `"\t"`);
- `subject_id`: Each row is expected to identify a single subject. This represents the column name containing the unique identifier. If there are multiple records with the same ID, the tool will try to join records automatically using multi-value columns. If not provided, each row is assumed to be related to a single subject;
- `use_columns`: Which data columns at `sensitive_microdata_path` should be included in the output. An empty list `[]` indicates that all columns should be used;
- `multi_value_columns`: If a single attribute (within a single column) represents more than one value (e.g. `a1;a2`), it can be automatically split into new columns (e.g. `A_a1` and `A_a2`) with values set to `1` every time the attribute appears in the record. This represents a dictionary containing the column name as key and the delimiter as value (e.g. `{'A': ';'}`);
- `record_limit`: May be used to limit data synthesis to the specified number of records, taken from the start of the sensitive data. A value of `-1` indicates that all sensitive records should be modelled and synthesized;
- `sensitive_zeros`: Columns where zero values are of interest (and thus sensitive). See [negative value interpretation](#Negative_value_interpretation) below;

### Negative value interpretation

The pipeline distinguishes 'positive' attribute values that indicate the presence of specific sensitive data from 'negative' attribute values that indicate the absence of such data. By default, the integer zero (`0`) and the empty string (`""`) and not taken into account when creating and counting attribute combinations. Any columns where zero values are of interest (and thus sensitive) should be listed in `sensitive_zeros`. This pipeline treats such `sensitive_zeros` in the same way as positive values.

## Aggregate data generation

To complement the synthetic microdata, the pipeline also pre-computes reportable counts of sensitive records containing all short combinations of attributes.

The `reporting_length` determines the maximum length of attribute combination for which aggregate counts are pre-computed and reported. In the user interface, this value determines how many attribute value selections a user may make while retaining the ability to compare estimated (synthetic) vs actual values. The number of selections is always one less than the `reporting_length`. Specifying a `reporting_length` of `-1` indicates that combinations of all lengths should be computed. This is not recommended except for small or sparse datasets as the number of attribute combinations grows rapidly with their length.

### Aggregation with k-anonymity

The privacy risk related to such aggregate data is that small aggregate counts may identify specific groups of individuals, while precise counts may allow the detection of small differences over time. The pipeline thus protects the reported aggregate counts by rounding counts down to the closest multiple of the specified `reporting_resolution`. The `reporting_resolution` therefore acts as both the minimum threshold for reporting and the minimum difference between reported counts.

### Aggregation with differential privacy

The pipeline can also protect aggregate data with differential privacy by adding noise to each attribute combination count in order to meet a certain privacy budget (`noise_epsilon`) specified. To ensure DP guarantees the tool might also suppress existing attribute combinations and fabricate some new ones - this behavior can be controlled with parameters, as explained in the following sections.

#### Aggregation with differential privacy parameters

- `dp_aggregates`: `true` or `false`, indicating whether aggregates should be computed with differential privacy or not;
- `percentile_percentage`: During the aggregates generation with differential privacy, some of the privacy budget is spent to select combinations and lower the records overall sensitivity, resulting in more accurate reported counts (although, some combinations will be randomly suppressed to achieve this). The closest it is from `100`, less combinations will be suppressed. A commonly-used value for this is `99`;
- `percentile_epsilon_proportion`: Proportion of the privacy budget dedicated to the percentile technique (e.g. a value of `0.01` means `1%`);
- `sigma_proportions`: This controls how to split the privacy budget for different combination lengths. See [splitting privacy budget across different combinations lengths](#Splitting_privacy_budget_across_different_combinations_lengths) below;
- `noise_epsilon`: Privacy budget for the aggregates generation with differential privacy;
- `delta_factor`: Used to calculate the delta value for `(epsilon, delta)-DP` (if not set, defaults to `ln(number_of_records)`):

  - `delta = [1 / (delta_factor * number_of_records)]`;

- `noise_threshold_type`: This provides controls over fabrication (spurious attribute combinations). Possible values are `fixed` and `adaptive`. See [controlling fabrication](#Controlling_fabrication) below;
- `noise_threshold_values`: Dictionary specifying threshold by combination length (e.g. `{ 2: 0, 3: 10 }`). See [controlling fabrication](#Controlling_fabrication) below;
- `number_of_records_epsilon_proportion`: The number of records reported in the reportable aggregates file should also be protected with differential privacy. To do so, noise needs to be added to original number of records to ensure it is protected by DP. This specifies the proportion of the privacy budget used to generate this noise (if not set, defaults to 0.005);

#### Splitting privacy budget across different combinations lengths

Sigma defines the scale (standard deviation) of the gaussian noise
added to a particular combination length.

Example 1:

- Given reporting_length=3;
- Given `sigma_proportions=[1.0, 0.25, 0.5]`;
- Being `S(1), S(2), S(3)` the sigma values for the noise related to the
  1, 2 and 3-counts, respectively;
- Then:
  - Scale of the noise added to the 1-counts: `S(1) = S`;
  - Scale of the noise added to the 2-counts: `S(2) = S(1) / 4 = S / 4`;
  - Scale of the noise added to the 3-counts: `S(3) = S(1) / 2 = S / 2`;

Example 2:

- Given reporting_length=3;
- Given `sigma_proportions=[1.0, 1.0, 1.0]` - evenly split the privacy budget;
- Being `S(1), S(2), S(3)` the sigma values for the noise related to the
  1, 2 and 3-counts, respectively;
- Then:
  - Scale of the noise added to the 1-counts: `S(1) = S`;
  - Scale of the noise added to the 2-counts: `S(2) = S(1) = S`;
  - Scale of the noise added to the 3-counts: `S(3) = S(2) = S(1) = S`;

#### Controlling fabrication

An attribute combination is called fabricated (spurious) if it exists in the reported aggregated data with differential privacy but does not exist in the original sensitive dataset.

For each combination length, the aggregates generation with differential privacy will sample noise from a gaussian distribution and then add it to the original attribute count, so that:

`reported_count = sensitive_counts + noise`

Then a threshold (`noise_threshold_values[length]`) can be defined per combination length, to decide if attribute combinations should be reported or not. So they are only reported if:

`reported_count > noise_threshold_values[length]`

For fabricated combinations, the reported count is:

`reported_count = 0 + noise`

Therefore, if the noise exceeds the defined threshold, the fabricated combination is reported.

##### Fixed thresholds

This type let's you specify the threshold used to control fabrication per combination length - the actual threshold value used to filter reported counts can be provided by combination length.

> To ensure differential privacy guarantees, this cannot be set for the 1-counts (single attributes).

> If not set for a particular length, will default to 0.

Example:

- For a `reporting_length=3` and `noise_threshold_values = { 2: 30, 3: 0 }`
- Then:
  - This will only report noisy counts for combinations of 2 attributes with reported counts greater than 30;
  - This will only report noisy counts for combinations of 3 attributes with reported counts greater 0;

##### Adaptive thresholds

This type let's you specify a number between `0` (exclusive) and `1` (inclusive) to control fabrication per combination length:

- Values close to `0` will try to minimize fabrication as much as possible;
- Values close to `1` will let fabrication happen more frequently (uncontrolled fabrication);

> To ensure differential privacy guarantees, this cannot be set for the 1-counts (single attributes).

> If not set for a particular length, will default to 1.0.
> Example:

- For a `reporting_length=3` and `noise_threshold_values = { 2: 0.01, 3: 1.0 }`
  - This will try to minimize fabrication for combinations of 2 attributes;
  - This will allow fabrication for combinations of 3 attributes to be "uncontrolled";

## Synthetic data generation

The pipeline supports different ways to synthesize data. This behavior is configured using the `synthesis_mode` parameter.

> In the resulting synthetic data, synthetic records are sorted by number of non-empty attribute values prior to output in a way that intermixes partly-suppressed and wholly-synthetic records.

### `row_seeded` synthesis mode

Proceeds by sampling attributes from a sensitive record until the addition of further attributes would create a rare combination based on the `reporting_resolution`. These privacy-preserving subsets of sensitive records are collected for output as synthetic records. The unused attributes of each seed are also collected, with further output records synthesized from these (without replacement) until all sensitive attributes are accounted for in a synthetic record.

Since precise attribute counts create a privacy risk, it is advisable to create some uncertainty over the actual counts by adding noise to the synthetic data. The same `reporting_resolution` used to create aggregate counts is used again here to suppress attributes or synthesize additional records such that synthetic attribute counts are equal to the (already imprecise) reported count.

#### Main characteristics:

- Synthetic records are seeded from a corresponding sensitive record;
- Seeded synthesis is faster and better preserves statistics for visual analytics;
- Attribute counts in the sensitive data drive the sampling process;
- Ensures 0% fabrication for all combinations lengths;

### `unseeded` synthesis mode

Proceeds by synthesizing records in an unseeded way by randomly sampling joint attribute distributions.

#### Main characteristics:

- Synthetic records are generated in an unconstrained way by randomly sampling joint attribute distributions;
- Attribute counts in the sensitive data drive the sampling process;
- Unseeded synthesis is slower but creates longer records of more uniform length that may better preserve structure for machine learning;
- Ensure 0% fabrication for all combinations lengths;

### `value_seeded` synthesis mode

Proceeds by sampling records from the sensitive attribute distributions, not using a particular record to drive the synthesis but the single attribute counts instead.

#### Main characteristics:

- Synthetic records are seeded from the counts of individual attributes in the sensitive data;
- Attribute counts in the sensitive data drive the sampling process;
- Preserves statistics for visual analytics;
- Ensure 0% fabrication for all combinations lengths;

#### Additional parameters

- `oversampling_ratio`: When attribute sampling is performed, there might be some attribute combinations that are oversampled (synthetic counts greater than reported aggregate counts). This represents the allowed oversampling proportion for each individual aggregate count (e.g., `0.1` means that synthetic aggregate counts are allowed to exceed the reported aggregates by up to 10%);
- `oversampling_tries`: When a particular attribute is sampled, adding it to the record being synthesized might lead to oversampling. This parameter sets how many times we should try resampling a new attribute to avoid oversampling;

### `aggregate_seeded` synthesis mode

Proceeds by sampling records from aggregates (either with K-Anonymity or DP), without need for access to the original sensitive data. This will sample attributes trying to replicate the counts of attribute combinations in the aggregates file.

> When used with K-Anonymity, this does not suppress attribute to preserve the reporting resolution in the synthetic data.

#### Main characteristics:

- Synthetic records are seeded from the counts of individual attributes in the reportable aggregate data;
- Combination counts in the aggregate data drive the sampling process;
- Preserves statistics for visual analytics;
- Will preserve the same characteristics of the aggregates file used as input:
  - When used with aggregates generated with K-anonymity as input, ensures 0% fabrication for all combinations lengths up to the reporting length;
  - When used with aggregates generated with DP as input, ensures the same guarantees as the ones provided by the DP aggregates (the same level of suppression and fabrication are expected);
- Does not need access to the original sensitive data, only to its aggregates;

#### Additional parameters

- `use_synthetic_counts`: Indicates whether attribute combination counts of already-synthesized records should influence the subsequent behavior of the sampling process:
  - If `false`: The sampling process will take into account only the reported aggregate counts to balance the sampling process;
  - If `true`: The sampling process will take into account both the reported aggregate counts and the already-synthesized counts to balance the sampling process;
- `weight_selection_percentile`: During the synthesis process, attribute combinations up to the reporting length will use the aggregate counts to balance the sampling process. When the attribute combination exceeds the reporting length, all its sub-combinations will be computed and the weight used to balance sampling will be selected using the percentile specified by this parameter. A commonly-used value for this is `95`;
- `aggregate_seeded_counts_scale_factor`: We can optionally multiply the aggregate counts computed by some factor. For example, setting this to `1.5` and setting the flag `use_synthetic_count=true`, might improve the accuracy of bigger combination lengths, but decrease the accuracy of the 1-counts;
- `aggregate_seeded_target_number_of_records`: Desired number of records to be synthesized. If not set, the synthesizer will use all the available attributes counts to synthesize records (which will produce a number close to original number of records);

## Data processing and output

The `parallel_jobs` parameter specifies the extent of parallel processing (e.g., based on the number of available processor cores) for the algorithms providing parallel implementation. For local processing, this should be set to the number of available CPU cores. For faster processing of larger and more complex datasets, use of a virtual machine with multiple cores is recommended.

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

# Quick configuration templates

## K-anonymity (row_seeded)

```json
{
	"sensitive_microdata_path": "MICRODATA_PATH",
	"sensitive_microdata_delimiter": ",",
	"use_columns": [],
	"record_limit": -1,
	"sensitive_zeros": [],

	"reporting_resolution": 10,
	"reporting_length": 4,

	"synthesis_mode": "row_seeded",

	"parallel_jobs": 4,
	"cache_max_size": 10000,
	"output_dir": "OUTPUT_DIR_PATH",
	"prefix": "example",

	"report_title": "example",
	"report_visuals": {},
	"report_pages": {}
}
```

## K-anonymity (unseeded)

```json
{
	"sensitive_microdata_path": "MICRODATA_PATH",
	"sensitive_microdata_delimiter": ",",
	"use_columns": [],
	"record_limit": -1,
	"sensitive_zeros": [],

	"reporting_resolution": 10,
	"reporting_length": 4,

	"synthesis_mode": "unseeded",

	"parallel_jobs": 2,
	"cache_max_size": 10000,
	"output_dir": "OUTPUT_DIR_PATH",
	"prefix": "example",

	"report_title": "example",
	"report_visuals": {},
	"report_pages": {}
}
```

## K-anonymity (value_seeded)

```json
{
	"sensitive_microdata_path": "MICRODATA_PATH",
	"sensitive_microdata_delimiter": ",",
	"use_columns": [],
	"record_limit": -1,
	"sensitive_zeros": [],

	"reporting_resolution": 10,
	"reporting_length": 4,

	"synthesis_mode": "value_seeded",
	"oversampling_ratio": 0.1,
	"oversampling_tries": 10,

	"parallel_jobs": 4,
	"cache_max_size": 10000,
	"output_dir": "OUTPUT_DIR_PATH",
	"prefix": "example",

	"report_title": "example",
	"report_visuals": {},
	"report_pages": {}
}
```

## K-anonymity (aggregate_seeded)

```json
{
	"sensitive_microdata_path": "MICRODATA_PATH",
	"sensitive_microdata_delimiter": ",",
	"use_columns": [],
	"record_limit": -1,
	"sensitive_zeros": [],

	"reporting_resolution": 10,
	"reporting_length": 4,

	"synthesis_mode": "aggregate_seeded",
	"use_synthetic_counts": true,
	"weight_selection_percentile": 95,
	"aggregate_seeded_counts_scale_factor": 1.0,
	"aggregate_seeded_target_number_of_records": null,

	"parallel_jobs": 4,
	"cache_max_size": 10000,
	"output_dir": "OUTPUT_DIR_PATH",
	"prefix": "example",

	"report_title": "example",
	"report_visuals": {},
	"report_pages": {}
}
```

## Differential privacy

```json
{
	"sensitive_microdata_path": "MICRODATA_PATH",
	"sensitive_microdata_delimiter": ",",
	"use_columns": [],
	"record_limit": -1,
	"sensitive_zeros": [],

	"reporting_resolution": 10,
	"reporting_length": 4,

	"dp_aggregates": true,
	"percentile_percentage": 99,
	"percentile_epsilon_proportion": 0.01,
	"number_of_records_epsilon_proportion": 0.005,
	"sigma_proportions": [1.0, 0.5, 0.33, 0.25],
	"noise_epsilon": 4.0,
	"delta_factor": null,
	"noise_threshold_type": "fixed",
	"noise_threshold_values": {},

	"synthesis_mode": "aggregate_seeded",
	"use_synthetic_counts": false,
	"weight_selection_percentile": 95,
	"aggregate_seeded_counts_scale_factor": 1.0,
	"aggregate_seeded_target_number_of_records": null,

	"parallel_jobs": 4,
	"cache_max_size": 10000,
	"output_dir": "OUTPUT_DIR_PATH",
	"prefix": "example",

	"report_title": "example",
	"report_visuals": {},
	"report_pages": {}
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
