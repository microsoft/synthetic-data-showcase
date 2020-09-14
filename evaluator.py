import time
import datetime
import logging
from os import path
from collections import defaultdict
import pandas as pd
import util as util

def evaluate(config):
    """Evaluates the error in the synthetic microdata with respect to the sensitive microdata.

    Produces output statistics (tsv) and graphics (svg) for preservation_by_length and preservation_by_count,
    as well as leakage analysis from the synthetic data (as synthetic_leakage_by_length).

    Args:
        config: options from the json config file, else default values.
    """

    use_columns = config['use_columns']
    record_limit = config['record_limit']
    reporting_length = config['reporting_length']
    reporting_threshold = config['reporting_threshold']
    sensitive_microdata_path = config['sensitive_microdata_path']
    sensitive_microdata_delimiter = config['sensitive_microdata_delimiter']
    synthetic_microdata_path = config['synthetic_microdata_path']
    sensitive_zeros = config['sensitive_zeros']
    parallel_jobs = config['parallel_jobs']
    output_dir = config['output_dir']
    prefix = config['prefix']

    logging.info(f'Evaluate {synthetic_microdata_path} vs {sensitive_microdata_path}')
    start_time = time.time()  

    sen_counts = None
    if not path.exists(config['sensitive_aggregates_path']):
        logging.info('Computing sensitive aggregates...')
        sen_df = util.loadMicrodata(path=sensitive_microdata_path, delimiter=sensitive_microdata_delimiter, record_limit=record_limit, use_columns=use_columns)
        row_list = util.genRowList(sen_df, sensitive_zeros)
        if reporting_length == -1:
            reporting_length = max([len(row) for row in row_list])
        sen_counts = util.countAllCombos(row_list, reporting_length, parallel_jobs)
    else:
        logging.info('Loading sensitive aggregates...')
        sen_counts = util.loadSavedAggregates(config['sensitive_aggregates_path'])
        if reporting_length == -1:
            reporting_length = max(sen_counts.keys())

    if use_columns != []:
        reporting_length = min(reporting_length, len(use_columns))
    
    filtered_sen_counts = {length: {combo: count for combo, count in combo_to_counts.items() if count >= reporting_threshold} for length, combo_to_counts in sen_counts.items()}
    syn_df = util.loadMicrodata(path=synthetic_microdata_path, delimiter='\t', record_limit=-1, use_columns=use_columns)
    
    syn_counts = util.countAllCombos(util.genRowList(syn_df, sensitive_zeros), reporting_length, parallel_jobs)

    len_to_syn_count = {length: len(combo_to_count) for length, combo_to_count in syn_counts.items()}
    len_to_sen_rare = {length: {combo : count for combo, count in combo_to_count.items() if count < reporting_threshold} for length, combo_to_count in sen_counts.items()}
    len_to_syn_leak = {length: len([1 for rare in rares if rare in syn_counts[length].keys()]) for length, rares in len_to_sen_rare.items()}

    leakage_tsv = path.join(output_dir, f'{prefix}_synthetic_leakage_by_length.tsv')
    leakage_svg = path.join(output_dir, f'{prefix}_synthetic_leakage_by_length.svg')
    with open(leakage_tsv, 'w') as f:
        f.write('\t'.join(['syn_combo_length', 'combo_count', 'leak_count', 'leak_proportion'])+'\n')
        for length, leak_count in len_to_syn_leak.items():
            combo_count = len_to_syn_count[length]
            leak_prop = leak_count / len_to_syn_count[length]
            f.write('\t'.join([str(length), str(combo_count), str(leak_count), str(leak_prop)])+'\n')

  

    util.plotStats(
        x_axis='syn_combo_length', 
        x_axis_title='Length of Synthetic Combination',
        y_bar='combo_count', 
        y_bar_title='Count of Combinations', 
        y_line='leak_proportion', 
        y_line_title=f'Proportion of Leaked (<{reporting_threshold}) Combinations',
        color='violet',
        darker_color='darkviolet',
        stats_tsv=leakage_tsv,
        stats_svg=leakage_svg,
        delimiter='\t',
        style='whitegrid',
        palette='magma')

    compareDatasets(filtered_sen_counts, syn_counts, output_dir, prefix)

    logging.info(f'Evaluated {synthetic_microdata_path} vs {sensitive_microdata_path}, took {datetime.timedelta(seconds = time.time() - start_time)}s')


def compareDatasets(sensitive_length_to_combo_to_count, synthetic_length_to_combo_to_count, output_dir, prefix):
    """Evaluates the error in the synthetic microdata with respect to the sensitive microdata.

    Produces output statistics and graphics binned by attribute count.

    Args:
        sensitive_length_to_combo_to_count: counts from sensitive microdata.
        synthetic_length_to_combo_to_count: counts from synthetic microdata.
        output_dir: where to save output statistics and graphics.
        prefix: prefix to add to output files.
    """

    all_count_length_preservation = []
    max_syn_count = 0

    all_combos = set()
    for length, combo_to_count in sensitive_length_to_combo_to_count.items():
        for combo in combo_to_count.keys():
            all_combos.add((length, combo))
    for length, combo_to_count in synthetic_length_to_combo_to_count.items():
        for combo in combo_to_count.keys():
            all_combos.add((length, combo))
    tot = len(all_combos)
    for i, (length, combo) in enumerate(all_combos):
        if i % 10000 == 0:
            logging.info(f'{100*i/tot:.1f}% through comparisons')
        sen_count = sensitive_length_to_combo_to_count[length].get(combo, 0)
        syn_count = synthetic_length_to_combo_to_count[length].get(combo, 0)
        max_syn_count = max(syn_count, max_syn_count)
        preservation = 0
        try:
            preservation = syn_count / sen_count
        except:
            logging.error(f'Error: For {combo}, syn is {syn_count} but no sen count')
        all_count_length_preservation.append((syn_count, length, preservation))
        max_syn_count = max(syn_count, max_syn_count)

    generateStatsAndGraphics(output_dir, max_syn_count, all_count_length_preservation, prefix)
    

def generateStatsAndGraphics(output_dir, max_syn_count, count_length_preservation, prefix):
    """Generates count error statistics for buckets of user-observed counts (post-filtering).

    Outputs the files preservation_by_length and preservation_by_count tsv and svg files.

    Args:
        output_dir: the folder in which to output summary files.
        max_syn_count: the maximum observed count of synthetic records matching a single attribute value.
        count_length_preservation: list of (count, length, preservation) tuples for observed preservation of sensitive counts after filtering by a combo of length.
    """
    sorted_counts = sorted(count_length_preservation, key=lambda x: x[0], reverse=False)
    buckets = []
    next_bucket = 10 
    while next_bucket < max_syn_count:
        buckets.append(next_bucket)
        next_bucket *= 2 
    buckets.append(next_bucket)
    bucket_to_preservations = defaultdict(list)
    bucket_to_counts = defaultdict(list)
    bucket_to_lengths = defaultdict(list)
    length_to_preservations = defaultdict(list)
    length_to_counts = defaultdict(list)
    for (count, length, preservation) in sorted_counts:
        bucket = buckets[0] 
        for bi in range(len(buckets)-1, -1, -1):
            if count > buckets[bi]:
                bucket = buckets[bi+1]
                break
        bucket_to_preservations[bucket].append(preservation)
        bucket_to_lengths[bucket].append(length)
        bucket_to_counts[bucket].append(count)
        length_to_counts[length].append(count)
        length_to_preservations[length].append(preservation)
        
    bucket_to_mean_count = {bucket: sum(counts)/len(counts) if len(counts) > 0 else 0 for bucket, counts in bucket_to_counts.items()}
    bucket_to_mean_preservation = {bucket: sum(preservations)/len(preservations) if len(preservations) > 0 else 0 for bucket, preservations in bucket_to_preservations.items()}
    bucket_to_mean_length = {bucket: sum(lengths)/len(lengths) if len(lengths) > 0 else 0 for bucket, lengths in bucket_to_lengths.items()}

    counts_tsv = path.join(output_dir, f'{prefix}_preservation_by_count.tsv')
    counts_svg = path.join(output_dir, f'{prefix}_preservation_by_count.svg')
    with open(counts_tsv, 'w') as f:
        f.write('\t'.join(['syn_count_bucket', 'mean_combo_count', 'mean_combo_length', 'count_preservation'])+'\n')
        for bucket in reversed(buckets):
            f.write('\t'.join([str(bucket), str(bucket_to_mean_count.get(bucket, 0)), str(bucket_to_mean_length.get(bucket, 0)), str(bucket_to_mean_preservation.get(bucket, 0))])+'\n')

    util.plotStats(
        x_axis='syn_count_bucket', 
        x_axis_title='Count of Filtered Synthetic Records',
        y_bar='mean_combo_length', 
        y_bar_title='Mean Length of Combinations', 
        y_line='count_preservation', 
        y_line_title='Count Preservation (Synthetic/Sensitive)',
        color='lightgreen',
        darker_color='green',
        stats_tsv=counts_tsv,
        stats_svg=counts_svg,
        delimiter='\t',
        style='whitegrid',
        palette='magma')

    length_to_mean_preservation = {length: sum(preservations)/len(preservations) if len(preservations) > 0 else 0 for length, preservations in length_to_preservations.items()}
    length_to_mean_count = {length: sum(counts)/len(counts) if len(counts) > 0 else 0 for length, counts in length_to_counts.items()}

    lengths_tsv = path.join(output_dir, f'{prefix}_preservation_by_length.tsv')
    lengths_svg = path.join(output_dir, f'{prefix}_preservation_by_length.svg')
    with open(lengths_tsv, 'w') as f:
        f.write('\t'.join(['syn_combo_length', 'mean_combo_count', 'count_preservation'])+'\n')
        for length in sorted(length_to_preservations.keys()):
            f.write('\t'.join([str(length), str(length_to_mean_count.get(length, 0)), str(length_to_mean_preservation.get(length, 0))])+'\n')

    util.plotStats(
        x_axis='syn_combo_length', 
        x_axis_title='Length of Combination',
        y_bar='mean_combo_count', 
        y_bar_title='Mean Synthetic Count', 
        y_line='count_preservation', 
        y_line_title='Count Preservation (Synthetic/Sensitive)',
        color='cornflowerblue',
        darker_color='mediumblue',
        stats_tsv=lengths_tsv,
        stats_svg=lengths_svg,
        delimiter='\t',
        style='whitegrid',
        palette='magma')
