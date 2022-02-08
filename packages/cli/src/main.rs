use log::{error, info, log_enabled, trace, Level::Debug};
use sds_core::{
    data_block::{csv_block_creator::CsvDataBlockCreator, data_block_creator::DataBlockCreator},
    processing::{
        aggregator::{aggregated_data::AggregatedData, Aggregator},
        generator::{Generator, SynthesisMode},
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
            long = "cache-max-size",
            help = "maximum cache size (# of combinations)",
            default_value = "100000"
        )]
        cache_max_size: usize,

        #[structopt(
            long = "mode",
            help = "synthesis mode",
            possible_values = &["seeded", "unseeded", "from_counts"],
            case_insensitive = true,
            default_value = "seeded"
        )]
        mode: SynthesisMode,

        #[structopt(
            long = "aggregates-json",
            help = "json file generated on the aggregate step (used to avoid oversampling in \"from_counts\" mode)"
        )]
        aggregates_json: Option<String>,

        #[structopt(
            long = "oversampling-ratio",
            help = "allowed oversampling ratio used on \"from_counts\" mode (0.1 means 10%)",
            requires = "aggregates-json"
        )]
        oversampling_ratio: Option<f64>,
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
            help = "do not protect the aggregates counts by rounding down to the nearest multiple of resolution"
        )]
        not_protect: bool,

        #[structopt(
            long = "sensitivity-threshold",
            help = "maximum sensitivity allowed per record, attributes will be randomly suppressed to meet this criteria (0 means no suppression)",
            default_value = "0"
        )]
        sensitivity_threshold: usize,

        #[structopt(long = "records-sensitivity-path", help = "records sensitivity path")]
        records_sensitivity_path: Option<String>,

        #[structopt(
            long = "filter-sensitivities",
            help = "suppress combination contributions to meet a certain sensitivity criteria",
            requires_all = &["sensitivities-percentile", "sensitivities-epsilon"]
        )]
        filter_sensitivities: bool,

        #[structopt(
            long = "sensitivities-percentile",
            help = "percentile used as record sensitivity filter",
            requires = "filter-sensitivities"
        )]
        sensitivities_percentile: Option<usize>,

        #[structopt(
            long = "sensitivities-epsilon",
            help = "epsilon used to generate noise used for the sensitivity filter selection",
            requires = "filter-sensitivities"
        )]
        sensitivities_epsilon: Option<f64>,

        #[structopt(
            long = "add-noise",
            help = "add gaussian noise to the aggregates",
            requires_all = &["filter-sensitivities", "noise-epsilon"]
        )]
        add_noise: bool,

        #[structopt(
            long = "noise-epsilon",
            help = "epsilon used to generate noise that will be added to the aggregate counts",
            requires = "add-noise"
        )]
        noise_epsilon: Option<f64>,

        #[structopt(
            long = "noise-delta",
            help = "delta used to generate noise that will be added to the aggregate counts [default: 1/(2 * number of records)]",
            requires = "add-noise"
        )]
        noise_delta: Option<f64>,

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
        help = "minimum threshold to build the synthetic microdata"
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
        &cli.sensitive_zeros,
        cli.record_limit,
    ) {
        Ok(data_block) => match cli.cmd {
            Command::Generate {
                synthetic_path,
                synthetic_delimiter,
                cache_max_size,
                mode,
                aggregates_json,
                oversampling_ratio,
            } => {
                let aggregated_data = match aggregates_json {
                    Some(json_path) => match AggregatedData::read_from_json(&json_path) {
                        Ok(ad) => Some(Arc::new(ad)),
                        Err(err) => {
                            error!("error reading aggregates json file: {}", err);
                            process::exit(1);
                        }
                    },
                    _ => None,
                };
                let mut generator = Generator::new(data_block);
                let generated_data = generator.generate(
                    cli.resolution,
                    cache_max_size,
                    String::from(""),
                    mode,
                    aggregated_data,
                    oversampling_ratio,
                    &mut progress_reporter,
                );

                if let Err(err) = generated_data.write_synthetic_data(
                    &synthetic_path,
                    synthetic_delimiter.chars().next().unwrap(),
                ) {
                    error!("error writing output file: {}", err);
                    process::exit(1);
                }
            }
            Command::Aggregate {
                aggregates_path,
                aggregates_delimiter,
                reporting_length,
                not_protect,
                sensitivity_threshold,
                records_sensitivity_path,
                filter_sensitivities,
                sensitivities_percentile,
                sensitivities_epsilon,
                add_noise,
                noise_delta,
                noise_epsilon,
                aggregates_json,
            } => {
                let mut aggregator = Aggregator::new(data_block.clone());
                let mut aggregated_data = aggregator.aggregate(
                    reporting_length,
                    sensitivity_threshold,
                    &mut progress_reporter,
                );
                let privacy_risk = aggregated_data.calc_privacy_risk(cli.resolution);

                if filter_sensitivities {
                    let allowed_sensitivity_by_len = aggregated_data.filter_sensitivities(
                        sensitivities_percentile.unwrap(),
                        sensitivities_epsilon.unwrap(),
                    );

                    if add_noise {
                        let delta = noise_delta
                            .unwrap_or(1.0 / (2.0 * (data_block.number_of_records() as f64)));

                        if let Err(err) = aggregated_data.add_gaussian_noise(
                            noise_epsilon.unwrap(),
                            delta,
                            allowed_sensitivity_by_len,
                        ) {
                            error!("error applying gaussian noise: {}", err);
                            process::exit(1);
                        }
                    }
                }

                if !not_protect {
                    aggregated_data.protect_aggregates_count(cli.resolution);
                }

                info!("Calculated privacy risk is: {:#?}", privacy_risk);

                if let Err(err) = aggregated_data.write_aggregates_count(
                    &aggregates_path,
                    aggregates_delimiter.chars().next().unwrap(),
                    ";",
                    cli.resolution,
                    !not_protect,
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
