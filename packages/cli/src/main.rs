use log::{error, info, log_enabled, trace, Level::Debug};
use sds_core::{
    data_block::{block::DataBlockCreator, csv_block_creator::CsvDataBlockCreator},
    processing::{aggregator::Aggregator, generator::Generator},
    utils::reporting::LoggerProgressReporter,
};
use std::process;
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
            } => {
                let mut generator = Generator::new(&data_block);
                let generated_data =
                    generator.generate(cli.resolution, cache_max_size, "", &mut progress_reporter);

                if let Err(err) = generator.write_records(
                    &generated_data.synthetic_data,
                    &synthetic_path,
                    synthetic_delimiter.chars().next().unwrap() as u8,
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
            } => {
                let mut aggregator = Aggregator::new(&data_block);
                let mut aggregated_data = aggregator.aggregate(
                    reporting_length,
                    sensitivity_threshold,
                    &mut progress_reporter,
                );
                let privacy_risk =
                    aggregator.calc_privacy_risk(&aggregated_data.aggregates_count, cli.resolution);

                if !not_protect {
                    Aggregator::protect_aggregates_count(
                        &mut aggregated_data.aggregates_count,
                        cli.resolution,
                    );
                }

                info!("Calculated privacy risk is: {:#?}", privacy_risk);

                if let Err(err) = aggregator.write_aggregates_count(
                    &aggregated_data.aggregates_count,
                    &aggregates_path,
                    aggregates_delimiter.chars().next().unwrap(),
                    cli.resolution,
                    !not_protect,
                ) {
                    error!("error writing output file: {}", err);
                    process::exit(1);
                }

                if let Some(path) = records_sensitivity_path {
                    if let Err(err) = aggregator
                        .write_records_sensitivity(&aggregated_data.records_sensitivity, &path)
                    {
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