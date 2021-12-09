import time
import datetime
import logging
import joblib
import psutil
import pandas as pd
from math import ceil
from random import random, shuffle
import util as util
import sds


def generate(config):
    """Generates synthetic microdata approximiating the sensitive microdata at sensitive_microdata_path.

    Produces the synthetic_microdata tsv file of synthetic records.

    Args:
        config: options from the json config file, else default values.
    """

    use_columns = config['use_columns']
    parallel_jobs = config['parallel_jobs']
    record_limit = config['record_limit']
    sensitive_microdata_path = config['sensitive_microdata_path']
    sensitive_microdata_delimiter = config['sensitive_microdata_delimiter']
    synthetic_microdata_path = config['synthetic_microdata_path']
    sensitive_zeros = config['sensitive_zeros']
    resolution = config['reporting_resolution']
    memory_limit = config['memory_limit_pct']
    cache_max_size = config['cache_max_size']
    seeded = config['seeded']

    logging.info(f'Generate {sensitive_microdata_path}')
    start_time = time.time()

    if seeded:
        logging.info(f'Generating from seeds')
        data_block = sds.create_data_block_from_file(
            sensitive_microdata_path,
            sensitive_microdata_delimiter,
            use_columns,
            sensitive_zeros,
            max(record_limit, 0)
        )
        syn_ratio = sds.generate_seeded_and_write(
            data_block,
            synthetic_microdata_path,
            '\t',
            cache_max_size,
            resolution
        )

    else:
        df = util.loadMicrodata(path=sensitive_microdata_path, delimiter=sensitive_microdata_delimiter,
                                record_limit=record_limit, use_columns=use_columns)
        columns = df.columns.values
        num = len(df)
        logging.info(f'Prepared data')
        records = []

        chunk = ceil(num/(parallel_jobs))

        logging.info(f'Generating unseeded')
        chunks = [chunk for i in range(parallel_jobs)]
        col_val_ids = util.genColValIdsDict(df, sensitive_zeros)
        res = joblib.Parallel(
            n_jobs=parallel_jobs, backend='loky', verbose=1)(
            joblib.delayed(synthesizeRowsUnseeded)(
                chunk, num, columns, col_val_ids, resolution, memory_limit)
            for chunk in chunks)
        for rows in res:
            records.extend(rows)
        # trim any overgenerated records because of uniform chunk size
        records = records[:num]

        records.sort()
        records.sort(key=lambda x: len(
            [y for y in x if y != '']), reverse=True)

        sdf = pd.DataFrame(records, columns=df.columns)
        syn_ratio = len(sdf) / len(df)
        sdf.to_csv(synthetic_microdata_path, sep='\t', index=False)

    config['expansion_ratio'] = syn_ratio

    logging.info(
        f'Generated {synthetic_microdata_path} from {sensitive_microdata_path} with synthesis ratio {syn_ratio}, took {datetime.timedelta(seconds = time.time() - start_time)}s')


def synthesizeRowsUnseeded(chunk, num_rows, columns, col_val_ids, resolution, memory_limit):
    """Create synthetic records through unconstrained sampling of attribute distributions.

    Args:
        chunk: how many records to synthesize.
        num_rows: how many rows/records in the sensitive dataset.
        columns: the columns of the sensitive dataset.
        atts_to_ids: a dict mapping attributes to row ids.
        resolution: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.

    Returns:
        rows: synthetic records created through unconstrained sampling of attribute distributions.
        overall_cache_hits: the number of times the cache was hit.
        overall_cache_misses: the number of times the cache was missed.
    """
    rows = []
    filter_cache = {}
    overall_cache_hits = 0
    overall_cache_misses = 0

    for i in range(chunk):
        if i % 100 == 99:
            logging.info(
                f'{(100*i/chunk):.1f}% through row synthesis, cache utilization {100*overall_cache_hits/(overall_cache_hits + overall_cache_misses):.1f}%')
        filters, cache_hits, cache_misses = synthesizeRowUnseeded(
            filter_cache, num_rows, columns, col_val_ids, resolution, memory_limit)
        overall_cache_hits += cache_hits
        overall_cache_misses += cache_misses
        row = normalize(columns, filters)
        rows.append(row)

    return rows


def synthesizeRowUnseeded(filter_cache, num_rows, columns, col_val_ids, resolution, memory_limit):
    """Creates a synthetic record through unconstrained sampling of attribute distributions.

    Args:
        num_rows: how many rows/records in the sensitive dataset.
        columns: the columns of the sensitive dataset.
        atts_to_ids: a dict mapping attributes to row ids.
        resolution: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.

    Returns:
        row: a synthetic record created through unconstrained sampling of attribute distributions.
        row_cache_hits: the number of times the cache was hit.
        row_cache_misses: the number of times the cache was missed.
    """
    shuffled_columns = list(columns)
    shuffle(shuffled_columns)
    output_atts = []
    residual_ids = set(range(num_rows))
    row_cache_hits = 0
    row_cache_misses = 0
    # do not add to cache once memory limit is reached
    use_cache = psutil.virtual_memory()[2] <= memory_limit
    for col in shuffled_columns:
        vals_to_sample = {}
        for val, ids in col_val_ids[col].items():
            next_filters = tuple(
                sorted((*output_atts, (col, val)), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
            if next_filters in filter_cache.keys():
                vals_to_sample[val] = set(filter_cache[next_filters])
                row_cache_hits += 1
            else:
                row_cache_misses += 1
                res = set(ids).intersection(residual_ids)
                vals_to_sample[val] = res
                if use_cache:
                    filter_cache[next_filters] = res
        if '' not in vals_to_sample.keys():
            vals_to_sample[''] = set()
        vals_to_remove = {k: v for k,
                          v in vals_to_sample.items() if len(v) < resolution}
        for val, ids in vals_to_remove.items():
            vals_to_sample[''].update(ids)
            if val != '':
                del vals_to_sample[val]
        val_to_counts = {k: len(v) for k, v in vals_to_sample.items()}
        sampled_val = sampleFromCounts(val_to_counts, True)
        if sampled_val != None:
            output_atts.append((col, sampled_val))
            residual_ids = set(vals_to_sample[sampled_val])

    filters = tuple(
        sorted(output_atts, key=lambda x: f'{x[0]}:{x[1]}'.lower()))
    return filters, row_cache_hits, row_cache_misses


def sampleFromCounts(counts, preferNotNone):
    """Samples from a dict of counts based on their relative frequency

    Args:
        counts: the dict of counts.
        preferNotNone: whether to avoid sampling None if possible

    Returns:
        sampled_value: the sampled value
    """
    dist = convertCountsToCumulativeDistribution(counts)
    sampled_value = None
    r = random()
    keys = sorted(dist.keys())
    for p in keys:
        v = dist[p]
        if r < p:
            if preferNotNone and v == None:
                continue
            else:
                sampled_value = v
                break
        sampled_value = v
    return sampled_value


def convertCountsToCumulativeDistribution(att_to_count):
    """Converts a dict of counts to a cumulative probability distribution for sampling.

    Args:
        att_to_count: a dict of attribute counts.

    Returns:
        dist a cumulative probability distribution mapping cumulative probabilities [0,1] to attributes. 
    """
    dist = {}
    total = sum(att_to_count.values())
    if total == 0:
        return dist
    cumulative = 0
    for att, count in att_to_count.items():
        if count > 0:
            p = count/total
            cumulative += p
            dist[cumulative] = att
    return dist


def normalize(columns, atts):
    """Creates an output record according to the columns schema from a set of attributes.

    Args:
        columns: the columns of the output record.
        atts: the attribute values of the output record.

    Returns:
        row: a normalized row ready for dataframe integration.
    """
    row = []
    for c in columns:
        added = False
        for a in atts:
            if a[0] == c:
                row.append(a[1])
                added = True
                break
        if not added:
            row.append('')
    return row
