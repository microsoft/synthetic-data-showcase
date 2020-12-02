import time
import datetime
import logging
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
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
    identifier_column = config['identifier_column']
    event_column = config['event_column']
    reporting_length = config['reporting_length']
    reporting_resolution = config['reporting_resolution']
    parallel_jobs = config['parallel_jobs']
    record_limit = config['record_limit']
    sensitive_microdata_path = config['sensitive_microdata_path']
    sensitive_microdata_delimiter = config['sensitive_microdata_delimiter']
    reportable_aggregates_path = config['reportable_aggregates_path']
    sensitive_aggregates_path = config['sensitive_aggregates_path']
    sensitive_zeros = config['sensitive_zeros']
    output_dir = config['output_dir']
    prefix = config['prefix']

    logging.info(f'Aggregate {sensitive_microdata_path}')
    start_time = time.time()  

    df, identifier_column = util.loadMicrodata(path=sensitive_microdata_path, delimiter=sensitive_microdata_delimiter, record_limit=record_limit, use_columns=use_columns, identifier_column=identifier_column)
    event_rows = util.genEventRows(df=df, sensitive_zeros=sensitive_zeros, identifier_column=identifier_column, event_column=event_column)
    if reporting_length == -1:
        reporting_length = max([max([len(x) for x in row_list]) for row_list in event_rows.values()])
    if use_columns != []:
        reporting_length = min(reporting_length, len(use_columns))
    length_to_combo_to_counts = util.countAllCombos(identifier_column=identifier_column, event_column=event_column, event_rows=event_rows, length_limit=reporting_length, parallel_jobs=parallel_jobs)

    len_to_combo_count = {length: len(combo_to_counts) for length, combo_to_counts in length_to_combo_to_counts.items()}
    len_to_rare_count = {length: len([1 for combo, counts in combo_to_counts.items() if counts[0] < reporting_resolution]) for length, combo_to_counts in length_to_combo_to_counts.items()}

    leakage_tsv = path.join(output_dir, f'{prefix}_sensitive_rare_by_length.tsv')
    leakage_svg = path.join(output_dir, f'{prefix}_sensitive_rare_by_length.svg')
    with open(leakage_tsv, 'w') as f:
        f.write('\t'.join(['sen_combo_length', 'combo_count', 'rare_count', 'rare_proportion'])+'\n')
        for length, combo_count in len_to_combo_count.items():
            rare_count = len_to_rare_count[length]
            rare_prop = rare_count / combo_count
            f.write('\t'.join([str(length), str(combo_count), str(rare_count), str(rare_prop)])+'\n')

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

    with open(reportable_aggregates_path, 'w') as ra:
        with open(sensitive_aggregates_path, 'w') as sa:
            sa.write('\t'.join(['selections', 'id_count', 'event_count'])+'\n')
            sa.write('\t'.join(['', str(len(df))])+'\n')
            ra.write('\t'.join(['selections', 'protected_count'])+'\n')
            ra.write('\t'.join(['selections', str(util.protect(len(df), reporting_resolution))])+'\n')
            for _, combo_to_count in length_to_combo_to_counts.items():
                for combo, counts in combo_to_count.items():
                    protected_ids = util.protect(counts[0], reporting_resolution)
                    protected_events = util.protect(counts[1], reporting_resolution)
                    selections_string = util.comboToString(combo)
                    sa.write('\t'.join([str(selections_string), str(counts[0]), str(counts[1])])+'\n')
                    if protected_ids > 0:
                        ra.write('\t'.join([str(selections_string), str(protected_events)])+'\n')


    logging.info(f'Aggregated {sensitive_microdata_path} into {reportable_aggregates_path}, took {datetime.timedelta(seconds = time.time() - start_time)}s')

