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

    Produces the reportable_aggregates tsv file of rounded aggregate counts above threshold,
    the sensitive_aggregates tsv file of actual aggregate counts above threshold, and the
    sensitive_rare_by_length tsv and svg files of rare combinations by length.

    This stage only needs to be run once for a given sensitive dataset and reporting limit/threshold/precision.

    Args:
        config: options from the json config file, else default values.
    """

    reporting_length = config['reporting_length']
    reporting_threshold = config['reporting_threshold']
    reporting_precision = config['reporting_precision']
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

    df = util.loadMicrodata(path=sensitive_microdata_path, delimiter=sensitive_microdata_delimiter, record_limit=record_limit)
    row_list = util.genRowList(df=df, sensitive_zeros=sensitive_zeros)
    if reporting_length == -1:
        reporting_length = max([len(row) for row in row_list])
    length_to_combo_to_count = util.countAllCombos(row_list=row_list, length_limit=reporting_length, parallel_jobs=parallel_jobs)

    len_to_combo_count = {length: len(combo_to_count) for length, combo_to_count in length_to_combo_to_count.items()}
    len_to_rare_count = {length: len([1 for combo, count in combo_to_count.items() if count < reporting_threshold]) for length, combo_to_count in length_to_combo_to_count.items()}

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
        y_line_title=f'Proportion of Rare (<{reporting_threshold}) Combinations',
        color='violet',
        darker_color='darkviolet',
        stats_tsv=leakage_tsv,
        stats_svg=leakage_svg,
        delimiter='\t',
        style='whitegrid',
        palette='magma')

    for _, combo_to_count in list(length_to_combo_to_count.items()):
        for combo, count in list(combo_to_count.items()):
            if util.protect(count, reporting_threshold, reporting_precision) == 0:
                del combo_to_count[combo]

    with open(reportable_aggregates_path, 'w') as ra:
        with open(sensitive_aggregates_path, 'w') as sa:
            sa.write('\t'.join(['selections', 'count'])+'\n')
            sa.write('\t'.join(['', str(len(df))])+'\n')
            ra.write('\t'.join(['selections', 'protected_count'])+'\n')
            ra.write('\t'.join(['selections', str(util.protect(len(df), reporting_threshold, reporting_precision))])+'\n')
            for _, combo_to_count in length_to_combo_to_count.items():
                for combo, count in combo_to_count.items():
                    selections_string = util.comboToString(combo)
                    protected_count = util.protect(count, reporting_threshold, reporting_precision)
                    sa.write('\t'.join([str(selections_string), str(count)])+'\n')
                    if protected_count > 0:
                        ra.write('\t'.join([str(selections_string), str(protected_count)])+'\n')


    logging.info(f'Aggregated {sensitive_microdata_path} into {reportable_aggregates_path}, took {datetime.timedelta(seconds = time.time() - start_time)}s')

