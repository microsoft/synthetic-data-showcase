mod multi_value_column_cmd_input;

use log::{error, log_enabled, trace, Level::Debug};
use multi_value_column_cmd_input::MultiValueColumnCmdInput;
use sds_core::{
    data_block::{CsvDataBlockCreator, DataBlockCreator},
    dp::{DpParameters, NoisyCountThreshold},
    processing::{
        aggregator::{AggregatedData, Aggregator},
        generator::{Generator, OversamplingParameters},
    },
    utils::{reporting::LoggerProgressReporter, threading::set_number_of_threads},
};
use std::{process, sync::Arc};
use structopt::StructOpt;

#[derive(StructOpt, Debug)]
enum Command {
    Generate {
        #[structopt(long = "synthetic-path", help = "synthetic microdata path")]
        synthetic_path: String,

        #[structopt(
            long = "synthetic-delimiter",
            help = "csv delimiter for the generated synthetic microdata file",
            default_value = "\t"
        )]
        synthetic_delimiter: String,

        #[structopt(
            long = "join-multi-value-columns",
            help = "join multi value columns back together when exporting to CSV file"
        )]
        join_multi_value_columns: bool,

        #[structopt(
            long = "cache-max-size",
            help = "maximum cache size (# of combinations)",
            default_value = "100000"
        )]
        cache_max_size: usize,

        #[structopt(
            long = "mode",
            help = "synthesis mode",
            possible_values = &["row_seeded", "unseeded", "value_seeded", "aggregate_seeded"],
            case_insensitive = true,
            default_value = "row_seeded"
        )]
        mode: String,

        #[structopt(
            long = "aggregates-json",
            help = "json file generated on the aggregate step (optional on the \"value_seeded\" mode, required on \"aggregate_seeded\" mode)"
        )]
        aggregates_json: Option<String>,

        #[structopt(
            long = "oversampling-ratio",
            help = "allowed oversampling ratio used on \"value_seeded\" mode (0.1 means 10%)",
            requires = "aggregates-json"
        )]
        oversampling_ratio: Option<f64>,

        #[structopt(
            long = "oversampling-tries",
            help = "how many times try to resample in case the currently sampled value causes oversampling (\"value_seeded\" mode)",
            requires = "aggregates-json"
        )]
        oversampling_tries: Option<usize>,

        #[structopt(
            long = "use-synthetic-counts",
            help = "use synthetic aggregates to balance attribute sampling on \"aggregate_seeded\" mode",
            requires = "aggregates-json"
        )]
        use_synthetic_counts: bool,
    },
    Aggregate {
        #[structopt(long = "aggregates-path", help = "generated aggregates file path")]
        aggregates_path: String,

        #[structopt(
            long = "aggregates-delimiter",
            help = "csv delimiter for the generated aggregates file",
            default_value = "\t"
        )]
        aggregates_delimiter: String,

        #[structopt(
            long = "reporting-length",
            help = "maximum length of attribute combination for which aggregate counts are precomputed (0 means all)",
            default_value = "0"
        )]
        reporting_length: usize,

        #[structopt(
            long = "not-protect",
            help = "do not protect the aggregates counts by rounding down to the nearest multiple of resolution (if noise is not being added)"
        )]
        not_protect: bool,

        #[structopt(long = "records-sensitivity-path", help = "records sensitivity path")]
        records_sensitivity_path: Option<String>,

        #[structopt(
            long = "dp",
            help = "generate the aggregates with differential privacy",
            requires_all = &["sensitivities-percentile", "sensitivities-epsilon-proportion", "noise-epsilon", "noise-threshold-type", "noise-threshold-values"]
        )]
        dp: bool,

        #[structopt(
            long = "sensitivities-percentile",
            help = "percentile used as record sensitivity filter",
            requires = "dp"
        )]
        sensitivities_percentile: Option<usize>,

        #[structopt(
            long = "sensitivities-epsilon-proportion",
            help = "proportion of epsilon used to generate noise during sensitivity filter selection",
            requires = "dp"
        )]
        sensitivities_epsilon_proportion: Option<f64>,

        #[structopt(
            long = "noise-epsilon",
            help = "epsilon used to generate noise that will be added to the aggregate counts",
            requires = "dp"
        )]
        noise_epsilon: Option<f64>,

        #[structopt(
            long = "noise-delta",
            help = "delta used to generate noise that will be added to the aggregate counts [default: 1/(2 * number of records)]",
            requires = "dp"
        )]
        noise_delta: Option<f64>,

        #[structopt(
            long = "noise-threshold-type",
            help = "threshold type, could be fixed or adaptive",
            possible_values = &["fixed", "adaptive"],
            case_insensitive = true,
            default_value = "fixed",
        )]
        noise_threshold_type: String,

        #[structopt(
            long = "noise-threshold-values",
            help = "value used as the count threshold filter (meaning will change based on \"noise-threshold-type\")",
            requires = "dp"
        )]
        noise_threshold_values: Option<Vec<f64>>,

        #[structopt(
            long = "sigma-proportions",
            help = "proportion to split sigma across combination lengths",
            requires = "dp"
        )]
        sigma_proportions: Option<Vec<f64>>,

        #[structopt(
            long = "aggregates-json",
            help = "serialize aggregated data to json file (sensitive)"
        )]
        aggregates_json: Option<String>,
    },
}

#[derive(StructOpt, Debug)]
#[structopt(name = "sds-cli")]
struct Cli {
    #[structopt(subcommand)]
    cmd: Command,

    /* common parameters */
    #[structopt(long = "sensitive-path", help = "sensitive microdata path")]
    sensitive_path: String,

    #[structopt(
        long = "sensitive-delimiter",
        help = "csv delimiter for the sensitive microdata file",
        default_value = "\t"
    )]
    sensitive_delimiter: String,

    #[structopt(
        long = "resolution",
        help = "minimum threshold to build/evaluate synthetic microdata"
    )]
    resolution: usize,

    #[structopt(
        long = "record-limit",
        help = "take only these first records (0 means all)",
        default_value = "0"
    )]
    record_limit: usize,

    #[structopt(
        long = "use-columns",
        help = "use this column (can be set multiple times)"
    )]
    use_columns: Vec<String>,

    #[structopt(long = "multi-value-columns", help = "<column name>,<delimiter>")]
    multi_value_columns: Vec<MultiValueColumnCmdInput>,

    #[structopt(
        long = "sensitive-zeros",
        help = "columns where zeros should not be ignored (can be set multiple times)"
    )]
    sensitive_zeros: Vec<String>,

    #[structopt(
        long = "n-threads",
        help = "number of threads used to process the data in parallel (default is the number of cores)"
    )]
    n_threads: Option<usize>,
}

fn main() {
    env_logger::init();

    let cli = Cli::from_args();
    let mut progress_reporter = if log_enabled!(Debug) {
        Some(LoggerProgressReporter::new(Debug))
    } else {
        None
    };

    trace!("execution parameters: {:#?}", cli);

    if let Some(n_threads) = cli.n_threads {
        set_number_of_threads(n_threads);
    }

    match CsvDataBlockCreator::create(
        csv::ReaderBuilder::new()
            .delimiter(cli.sensitive_delimiter.chars().next().unwrap() as u8)
            .from_path(cli.sensitive_path),
        &cli.use_columns,
        &cli.multi_value_columns
            .iter()
            .map(|mvc| (mvc.column_name.clone(), mvc.attr_delimiter.clone()))
            .collect(),
        &cli.sensitive_zeros,
        cli.record_limit,
    ) {
        Ok(data_block) => match cli.cmd {
            Command::Generate {
                synthetic_path,
                synthetic_delimiter,
                join_multi_value_columns,
                cache_max_size,
                mode,
                aggregates_json,
                oversampling_ratio,
                oversampling_tries,
                use_synthetic_counts,
            } => {
                let aggregated_data = aggregates_json.map(|json_path| {
                    match AggregatedData::read_from_json(&json_path) {
                        Ok(data) => Arc::new(data),
                        Err(err) => {
                            error!("error reading aggregates json file: {}", err);
                            process::exit(1);
                        }
                    }
                });

                if (oversampling_ratio.is_some()
                    || oversampling_tries.is_some()
                    || mode == "aggregate_seeded")
                    && aggregated_data.is_none()
                {
                    error!("aggregates json file should be provided");
                    process::exit(1);
                }

                let oversampling_parameters =
                    if oversampling_ratio.is_some() || oversampling_tries.is_some() {
                        Some(OversamplingParameters::new(
                            aggregated_data.clone().unwrap(),
                            oversampling_ratio,
                            oversampling_tries,
                        ))
                    } else {
                        None
                    };
                let generator = Generator::default();
                let generated_data = match mode.as_str() {
                    "unseeded" => generator.generate_unseeded(
                        &data_block,
                        cli.resolution,
                        cache_max_size,
                        "",
                        &mut progress_reporter,
                    ),
                    "row_seeded" => generator.generate_row_seeded(
                        &data_block,
                        cli.resolution,
                        cache_max_size,
                        "",
                        &mut progress_reporter,
                    ),
                    "value_seeded" => generator.generate_value_seeded(
                        &data_block,
                        cli.resolution,
                        cache_max_size,
                        "",
                        oversampling_parameters,
                        &mut progress_reporter,
                    ),
                    "aggregate_seeded" => generator.generate_aggregate_seeded(
                        "",
                        aggregated_data.unwrap(),
                        use_synthetic_counts,
                        &mut progress_reporter,
                    ),
                    _ => {
                        error!("invalid mode");
                        process::exit(1);
                    }
                };

                if let Err(err) = generated_data.map(|gd| {
                    gd.write_synthetic_data(
                        &synthetic_path,
                        synthetic_delimiter.chars().next().unwrap(),
                        join_multi_value_columns,
                    )
                }) {
                    error!("error writing output file: {}", err);
                    process::exit(1);
                }
            }
            Command::Aggregate {
                aggregates_path,
                aggregates_delimiter,
                reporting_length,
                not_protect,
                records_sensitivity_path,
                sensitivities_percentile,
                sensitivities_epsilon_proportion,
                dp,
                noise_delta,
                noise_epsilon,
                noise_threshold_type,
                noise_threshold_values,
                sigma_proportions,
                aggregates_json,
            } => {
                let mut aggregator = Aggregator::new(data_block.clone());
                let aggregated_data = if dp {
                    let delta = noise_delta
                        .unwrap_or(1.0 / (2.0 * (data_block.number_of_records() as f64)));
                    let thresholds_map = noise_threshold_values
                        .unwrap()
                        .iter()
                        .enumerate()
                        .map(|(i, t)| (i + 2, *t))
                        .collect();

                    let threshold = match noise_threshold_type.as_str() {
                        "fixed" => NoisyCountThreshold::Fixed(thresholds_map),
                        "adaptive" => NoisyCountThreshold::Adaptive(thresholds_map),
                        _ => {
                            error!("invalid noise threshold type");
                            process::exit(1);
                        }
                    };

                    match aggregator.aggregate_with_dp(
                        reporting_length,
                        &DpParameters::new(
                            noise_epsilon.unwrap(),
                            delta,
                            sensitivities_percentile.unwrap(),
                            sensitivities_epsilon_proportion.unwrap(),
                            sigma_proportions,
                        ),
                        threshold,
                        &mut progress_reporter,
                    ) {
                        Err(err) => {
                            error!("error making aggregates noisy: {}", err);
                            process::exit(1);
                        }
                        Ok(ad) => ad,
                    }
                } else {
                    match aggregator.aggregate(reporting_length, &mut progress_reporter) {
                        Ok(mut aggregated_data) => {
                            if !not_protect {
                                aggregated_data.protect_with_k_anonymity(cli.resolution);
                            }
                            aggregated_data
                        }
                        Err(err) => {
                            error!("data aggregation error: {}", err);
                            process::exit(1);
                        }
                    }
                };

                if let Err(err) = aggregated_data.write_aggregates_count(
                    &aggregates_path,
                    aggregates_delimiter.chars().next().unwrap(),
                    ";",
                    cli.resolution,
                    !not_protect || dp,
                ) {
                    error!("error writing output file: {}", err);
                    process::exit(1);
                }

                if let Some(json_path) = aggregates_json {
                    if let Err(err) = aggregated_data.write_to_json(&json_path) {
                        error!("error writing aggregates json file: {}", err);
                        process::exit(1);
                    }
                }

                if let Some(path) = records_sensitivity_path {
                    if let Err(err) = aggregated_data.write_records_sensitivity(&path, '\t') {
                        error!("error writing output file: {}", err);
                        process::exit(1);
                    }
                }
            }
        },
        Err(err) => {
            error!("error generating data block from path: {}", err);
            process::exit(1);
        }
    };
}
