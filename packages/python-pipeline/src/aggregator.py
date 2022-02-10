import time
import datetime
import logging
import sds
from os import path
import util as util


def aggregate(config):
    """Aggregates the sensitive microdata at sensitive_microdata_path.

    Produces the reportable_aggregates tsv file of aggregate counts rounded down to the closest resolution,
    the sensitive_aggregates tsv file of actual aggregate counts, and the
    sensitive_rare_by_length tsv and svg files of rare combinations by length.

    This stage only needs to be run once for a given sensitive dataset and reporting limit/resolution.

    Args:
        config: options from the json config file, else default values.
    """

    use_columns = config['use_columns']
    reporting_length = config['reporting_length']
    reporting_resolution = config['reporting_resolution']
    record_limit = config['record_limit']
    sensitive_microdata_path = config['sensitive_microdata_path']
    sensitive_microdata_delimiter = config['sensitive_microdata_delimiter']
    reportable_aggregates_path = config['reportable_aggregates_path']
    sensitive_aggregates_path = config['sensitive_aggregates_path']
    sensitive_zeros = config['sensitive_zeros']
    output_dir = config['output_dir']
    prefix = config['prefix']
    sensitive_aggregated_data_json = path.join(
        output_dir, f'{prefix}_sensitive_aggregated_data.json')
    protected_aggregated_data_json = path.join(
        output_dir, f'{prefix}_protected_aggregated_data.json')
    dp_aggregates = config['dp_aggregates']
    sensitivities_epsilon = config['sensitivities_epsilon']
    sensitivities_percentile = config['sensitivities_percentile']
    noise_epsilon = config['noise_epsilon']
    noise_delta = config['noise_delta']

    logging.info(f'Aggregate {sensitive_microdata_path}')
    start_time = time.time()

    sds_processor = sds.SDSProcessor(
        sensitive_microdata_path,
        sensitive_microdata_delimiter,
        use_columns,
        sensitive_zeros,
        max(record_limit, 0)
    )

    aggregated_data = sds_processor.aggregate(
        reporting_length,
        0
    )
    len_to_combo_count = aggregated_data.calc_combinations_count_by_len()
    len_to_rare_count = aggregated_data.calc_rare_combinations_count_by_len(
        reporting_resolution)

    aggregated_data.write_aggregates_count(
        sensitive_aggregates_path,
        '\t',
        ';',
        reporting_resolution,
        False
    )
    aggregated_data.write_to_json(sensitive_aggregated_data_json)

    if dp_aggregates:
        allowed_sensitivity_by_len = aggregated_data.filter_sensitivities(
            sensitivities_percentile,
            sensitivities_epsilon
        )

        if not noise_delta:
            noise_delta = 1 / (2 * sds_processor.number_of_records())

        aggregated_data.add_gaussian_noise(
            noise_epsilon,
            noise_delta,
            allowed_sensitivity_by_len
        )
    else:
        aggregated_data.protect_aggregates_count(reporting_resolution)

    aggregated_data.write_aggregates_count(
        reportable_aggregates_path,
        '\t',
        ';',
        reporting_resolution,
        True
    )
    aggregated_data.write_to_json(protected_aggregated_data_json)

    leakage_tsv = path.join(
        output_dir, f'{prefix}_sensitive_rare_by_length.tsv')
    leakage_svg = path.join(
        output_dir, f'{prefix}_sensitive_rare_by_length.svg')
    with open(leakage_tsv, 'w') as f:
        f.write('\t'.join(['sen_combo_length', 'combo_count',
                'rare_count', 'rare_proportion'])+'\n')
        for length in sorted(len_to_combo_count.keys()):
            combo_count = len_to_combo_count[length]
            rare_count = len_to_rare_count.get(length, 0)
            rare_prop = rare_count / combo_count if combo_count > 0 else 0
            f.write('\t'.join([str(length), str(combo_count),
                    str(rare_count), str(rare_prop)])+'\n')

    util.plotStats(
        x_axis='sen_combo_length',
        x_axis_title='Length of Sensitive Combination',
        y_bar='combo_count',
        y_bar_title='Count of Combinations',
        y_line='rare_proportion',
        y_line_title=f'Proportion of Rare (<{reporting_resolution}) Combinations',
        color='violet',
        darker_color='darkviolet',
        stats_tsv=leakage_tsv,
        stats_svg=leakage_svg,
        delimiter='\t',
        style='whitegrid',
        palette='magma')

    logging.info(
        f'Aggregated {sensitive_microdata_path} into {reportable_aggregates_path}, took {datetime.timedelta(seconds = time.time() - start_time)}s')
