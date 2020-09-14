import time
import datetime
import logging
import joblib
import psutil
import pandas as pd
from os import path
from math import ceil
from collections import defaultdict, Counter
from itertools import chain
from random import random, shuffle
import util as util


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
    threshold = config['reporting_threshold']
    precision = config['reporting_precision']
    memory_limit = config['memory_limit_pct']
    seeded = config['seeded']

    logging.info(f'Generate {sensitive_microdata_path}')
    start_time = time.time()  

    df = util.loadMicrodata(path=sensitive_microdata_path, delimiter=sensitive_microdata_delimiter, record_limit=record_limit, use_columns=use_columns)
    columns = df.columns.values 
    num = len(df)
    logging.info(f'Prepared data')
    records = []
    
    chunk = ceil(num/(parallel_jobs))
    if seeded:
        logging.info(f'Generating from seeds')
        row_list = util.genRowList(df=df, sensitive_zeros=sensitive_zeros)
        att_to_ids = util.computeAttToIds(row_list=row_list)
        all_available_atts = defaultdict(int)
        chunks = [row_list[i:i + chunk] for i in range(0, len(row_list), chunk)]
        res = joblib.Parallel(n_jobs=parallel_jobs, backend='loky', verbose=1) (joblib.delayed(synthesizeRowsSeeded)(seeds, num, columns, att_to_ids, threshold, memory_limit) for seeds in chunks)
        for (rows, available_atts) in res:
            records.extend(rows)
            for attribute, available in available_atts.items():
                all_available_atts[attribute] += available
        logging.info(f'Consolidating')
        all_available_atts = {k : v for k, v in all_available_atts.items() if v > 0 and len(att_to_ids[k]) >= threshold}
        
        # These are the attribute additions/removals necessary for final attribute counts to match reported (i.e., rounded) values
        targets =  {att: util.protect(len(att_to_ids[att]), threshold, precision) - len(att_to_ids[att]) for att, ids in att_to_ids.items() if len(ids) >= threshold}

        # Some of the targets we can address by making attributes available for consolidation
        for att, target in targets.items():
            if att not in all_available_atts.keys():
                all_available_atts[att] = target
            else:
                all_available_atts[att] += target
            all_available_atts[att] = max(0, all_available_atts[att])
            if all_available_atts[att] == 0:
                del all_available_atts[att]
        consolidated = divideAndConsolidate(all_available_atts, columns, att_to_ids, num, threshold, memory_limit, parallel_jobs)
        records.extend(consolidated)
        # Negative targets are resolved in a final stage of suppresion / synthesis
        records = suppressToTargets(records, columns, att_to_ids, threshold, precision)

    else:
        logging.info(f'Generating unseeded')
        chunks = [chunk for i in range(parallel_jobs)]
        col_val_ids = util.genColValIdsDict(df, sensitive_zeros)
        res = joblib.Parallel(n_jobs=parallel_jobs, backend='loky', verbose=1) (joblib.delayed(synthesizeRowsUnseeded)(chunk, num, columns, col_val_ids, threshold, memory_limit) for chunk in chunks)
        for rows in res:
            records.extend(rows)
        records = records[:num] # trim any overgenerated records because of uniform chunk size  

    records.sort()
    records.sort(key = lambda x : len([y for y in x if y != '']), reverse=True)

    sdf = pd.DataFrame(records, columns = df.columns)
    syn_ratio = len(sdf) / len(df)
    config['expansion_ratio'] = syn_ratio
    sdf.to_csv(synthetic_microdata_path, sep = '\t', index=False)

    logging.info(f'Generated {synthetic_microdata_path} from {sensitive_microdata_path} with synthesis ratio {syn_ratio}, took {datetime.timedelta(seconds = time.time() - start_time)}s')


def synthesizeRowsSeeded(seeds, num_rows, columns, att_to_ids, threshold, memory_limit):
    """Maps each seed record into a synthetic record.

    If the seed value is None, the synthetic record is generated through unconstrained sampling of attribute distributions.
    Otherwise, the synthetic record is a protected (i.e., above threshold) subset of the seed record's attributes.

    Args:
        seeds: a list of sensitive records or None values (for unseeded synthesis).
        num_rows: how many rows/records in the sensitive dataset.
        columns: the columns of the sensitive dataset.
        atts_to_ids: a dict mapping attributes to row ids.
        threshold: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
    
    Returns:
        rows: synthetic rows created from legal fragments of seed rows, else synthesized from distributions if seed is None.
        available_atts: dict of leftover attribute counts from seeded synthesis.
    """
    rows = []
    filter_cache = {}
    overall_cache_hits = 0
    overall_cache_misses = 0
    l = len(seeds)
    available_atts = defaultdict(int)
    
    for i, seed in enumerate(seeds):
        if i % 100 == 99:
            print(f'{(100*i/l):.1f}% through row synthesis, cache utilization {100*overall_cache_hits/(overall_cache_hits + overall_cache_misses):.1f}%')
        filters, row_cache_hits, row_cache_misses = synthesizeRowSeeded(seed, (), [], filter_cache, num_rows, columns, att_to_ids, threshold, memory_limit)
        overall_cache_hits += row_cache_hits
        overall_cache_misses += row_cache_misses

        if seed != None:
            remaining = set(seed).difference(filters)
            for rem_att in remaining:
                available_atts[rem_att] += 1
    
        if len(filters) > 0:           
            row = normalize(columns, filters)
            rows.append(row)

    return rows, available_atts

def synthesizeRowSeeded(seed, filters, disallowed, filter_cache, num_rows, columns, att_to_ids, threshold, memory_limit):
    """Maps a seed record into a synthetic record.

    Args:
        seed: a sensitive record, or None for unseeded synthesis.
        filters: the attributes to include in the record.
        disallowed: the attributes not to include in the record.
        filter_cache: a cache of already-computed ids for filtering combinations.
        num_rows: how many rows/records in the sensitive dataset.
        columns: the columns of the sensitive dataset.
        atts_to_ids: a dict mapping attributes to row ids.
        threshold: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
    
    Returns:
        new_filters: the filters of the synthesized row.
        row_cache_hits: the number of times the cache was hit.
        row_cache_misses: the number of times the cache was missed.

    """
    row_cache_hits = 0
    row_cache_misses = 0
    nxt, cache_hits, cache_misses = sampleNextAttribute(seed, disallowed, filter_cache, columns, num_rows, filters, att_to_ids, threshold, memory_limit)

    row_cache_hits += cache_hits
    row_cache_misses += cache_misses
    new_filters = filters
    while nxt != None:
        new_filters = tuple(sorted((*new_filters, nxt), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
        nxt, cache_hits, cache_misses = sampleNextAttribute(seed, disallowed, filter_cache, columns, num_rows, new_filters, att_to_ids, threshold, memory_limit)
        row_cache_hits += cache_hits
        row_cache_misses += cache_misses

    return new_filters, row_cache_hits, row_cache_misses


def synthesizeRowsUnseeded(chunk, num_rows, columns, col_val_ids, threshold, memory_limit):
    """Create synthetic records through unconstrained sampling of attribute distributions.

    Args:
        chunk: how many records to synthesize.
        num_rows: how many rows/records in the sensitive dataset.
        columns: the columns of the sensitive dataset.
        atts_to_ids: a dict mapping attributes to row ids.
        threshold: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
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
            print(f'{(100*i/chunk):.1f}% through row synthesis, cache utilization {100*overall_cache_hits/(overall_cache_hits + overall_cache_misses):.1f}%')
        filters, cache_hits, cache_misses = synthesizeRowUnseeded(filter_cache, num_rows, columns, col_val_ids, threshold,  memory_limit)
        overall_cache_hits += cache_hits
        overall_cache_misses += cache_misses
        row = normalize(columns, filters)
        rows.append(row)

    return rows


def synthesizeRowUnseeded(filter_cache, num_rows, columns, col_val_ids, threshold, memory_limit):
    """Creates a synthetic record through unconstrained sampling of attribute distributions.

    Args:
        num_rows: how many rows/records in the sensitive dataset.
        columns: the columns of the sensitive dataset.
        atts_to_ids: a dict mapping attributes to row ids.
        threshold: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
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
    use_cache = psutil.virtual_memory()[2] <= memory_limit # do not add to cache once memory limit is reached
    for col in shuffled_columns:
        vals_to_sample = {}
        for val, ids in col_val_ids[col].items():
            next_filters = tuple(sorted((*output_atts, (col, val)), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
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
        vals_to_remove = {k: v for k, v in vals_to_sample.items() if len(v) < threshold}
        for val, ids in vals_to_remove.items():
            vals_to_sample[''].update(ids)
            if val != '':
                del vals_to_sample[val]
        val_to_counts = {k: len(v) for k, v in vals_to_sample.items()}
        sampled_val = sampleFromCounts(val_to_counts, True)
        if sampled_val != None:
            output_atts.append((col, sampled_val))
            residual_ids = set(vals_to_sample[sampled_val])
        

    filters = tuple(sorted(output_atts, key=lambda x: f'{x[0]}:{x[1]}'.lower()))
    return filters, row_cache_hits, row_cache_misses


def sampleNextAttribute(seed, disallowed, filter_cache, columns, num_rows, filters, att_to_ids, threshold, memory_limit):
    """Samples the next attribute in the process of synthetic record generation.

    If the seed value is None, the synthetic record is generated through unconstrained sampling of attribute distributions.
    Otherwise, the synthetic record is a protected (i.e., above threshold) subset of the seed record's attributes.

    Args:
        seed: the seed record from the sensitive dataset, else None.
        disallowed: the attributes not to include in the record.
        filter_cache: a cache of already-computed attribute counts for filtering combinations.
        columns: columns of the sensitive dataset.
        num_rows: how many rows/records in the sensitive dataset.
        filters: the attribute combination filtering the dataset.
        atts_to_ids: a dict mapping attributes to row ids.
        threshold: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
    
    Returns:
        sampled_value: the sampled attribute value to add to the synthetic record being generated.
        cache_hits: the number of times the cache was hit.
        cache_misses: the number of times the cache was missed.
    """
    residualCounts, cache_hits, cache_misses = residualAttributeCounts(seed, disallowed, filter_cache, columns, att_to_ids, num_rows, filters, threshold, memory_limit)
    sampled_value = sampleFromCounts(residualCounts, preferNotNone=filters==())
    return sampled_value, cache_hits, cache_misses

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


def residualAttributeCounts(seed, disallowed, filter_cache, columns, att_to_ids, num_rows, filters, threshold, memory_limit):
    """Computes the counts of records remaining after filtering.

    If the seed value is None, the residual attribute counts are drawn from all attributes.
    Otherwise, the counts are drawn from the seed record's attributes.

    Args:
        seed: the seed record from the sensitive dataset, else None.
        disallowed: the attributes not to include in the record.
        filter_cache: a cache of already-computed attribute counts for filtering combinations.
        columns: the columns of the sensitive dataset.
        atts_to_ids: a dict mapping attributes to row ids.
        num_rows: how many rows/records in the sensitive dataset.
        filters: the attribute combination filtering the dataset.
        threshold: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
    
    Returns:
        residual_counts: the counts of records remaining after filtering for all linked attributes.
        cache_hits: the number of times the cache was hit.
        cache_misses: the number of times the cache was missed.
    """
    sorted_filters = sorted(filters, key = lambda x: len(att_to_ids[x]), reverse=False)
    residual_ids = set()
    residual_counts = {}
    cache_hits = 0
    cache_misses = 0
    use_cache = psutil.virtual_memory()[2] <= memory_limit # do not add to cache once memory limit is reached
    if filters in filter_cache.keys():
        residual_ids = filter_cache[filters] # use cached value if possible
        cache_hits += 1
    else:
        cache_misses += 1
        if len(filters) > 0:
            residual_ids = att_to_ids[sorted_filters[0]]
            for c in sorted_filters[1:]:
                residual_ids = residual_ids.intersection(att_to_ids[c])
        else:
            residual_ids = set(range(num_rows))
        if use_cache:
            filter_cache[filters] = residual_ids # set cached value

    atts = sorted(att_to_ids.keys() if seed is None else seed, key = lambda x: len(att_to_ids[x]), reverse=False)
    for att in disallowed:
        if att in atts:
            atts.remove(att)

    for att in atts:
        if att[0] in [x[0] for x in filters]:
            continue
        extended_filters = tuple(sorted((*filters, att), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
        num = 0
        if extended_filters in filter_cache.keys():
            num = len(filter_cache[extended_filters]) # use cached value if possible
            cache_hits += 1
        else:
            cache_misses += 1
            filtered_ids = residual_ids.intersection(att_to_ids[att])
            num = len(filtered_ids)
            if use_cache:
                filter_cache[extended_filters] = set(filtered_ids) # set cached value
        if num >= threshold:
            residual_counts[att] = num

    return residual_counts, cache_hits, cache_misses


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

def suppressToTargets(records, columns, att_to_ids, threshold, precision):
    """Returns a new record list in which attributes have been suppressed match the reported (rounded) values.

    Args:
        records: the input records
        columns: the columns of the output record.
        atts_to_ids: a dict mapping attributes to row ids.
        threshold: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        precision: the precision with which the synthesis algorithm can access counts.
    Returns:
        new_records: the modified records.
    """
    new_records = []
    legal_atts = [x[0] for x in sorted([(att, len(ids)) for att, ids in att_to_ids.items() if len(ids) >= threshold], reverse=False)]
    current_counts = Counter(list(chain(*[util.rowToCombo(r, columns) for r in records])))

    targets =  {att: current_counts[att] - util.protect(len(att_to_ids[att]), threshold, precision) for att in legal_atts}

    targets =  {k: v for k, v in targets.items() if v > 0}
    empty_record = normalize(columns, ())
    shuffle(records)
    for record in records:
        new_record = None
        combo = util.rowToCombo(record, columns)
        for att in list(combo):
            if att in targets.keys():
                combo.remove(att)
                new_record = normalize(columns, combo)
                if targets[att] == 1:
                    del targets[att]
                else:
                    targets[att] -= 1
        if new_record == None:
            new_records.append(record)
        elif new_records != empty_record:
            new_records.append(new_record)

    return new_records


def divideAndConsolidate(available_atts, columns, att_to_ids, num_rows, threshold, memory_limit, parallel_jobs):
    """Synthesizes new privacy-preserving records from the available attributes (in parallel).

    Args:
        avalabile_atts: dict of available attribute counts for new record synthesis.
        columns: the columns of the output record.
        atts_to_ids: a dict mapping attributes to row ids.
        num_rows: how many rows/records in the sensitive dataset.
        threshold: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
        parallel_jobs: how many processes to use for parallel processing.
    Returns:
        records: new records synthesized frmo the available attributes.
    """
    divided_available_atts = []
    aa = {k : ceil(v/parallel_jobs) for k, v in available_atts.items() if v > 0}
    for _ in range(parallel_jobs):
        divided_available_atts.append(aa.copy())
    records = []
    res = joblib.Parallel(n_jobs=parallel_jobs, backend='loky', verbose=1) (joblib.delayed(consolidate)(available_atts, columns, att_to_ids, num_rows, threshold, memory_limit) for available_atts in divided_available_atts)
    for rs in res:
        records.extend(rs)
    return records

def consolidate(available_atts, columns, att_to_ids, num_rows, threshold, memory_limit):    
    """Synthesizes new privacy-preserving records from the available attributes.

    Args:
        avalabile_atts: dict of available attribute counts for new record synthesis.
        columns: the columns of the output record.
        atts_to_ids: a dict mapping attributes to row ids.
        num_rows: how many rows/records in the sensitive dataset.
        threshold: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
    
    Returns:
        records: new records synthesized frmo the available attributes.
    """
    filtered_att_to_ids = {k : v for k, v in att_to_ids.items() if k in available_atts.keys()}
    filter_cache = {}
    records = []
    while len(available_atts) > 0:
        aa = len(available_atts)
        aa_count = sum(available_atts.values())
        if aa_count % 10 == 0:
            logging.info(f'{aa_count} values remainging across {aa} attributes')
        filters = consolidateRecord(available_atts, filter_cache, columns, filtered_att_to_ids, num_rows, threshold, memory_limit)
        if len(filters) > 0:
            row = normalize(columns, filters)
            records.append(row)
    return records
   
def consolidateRecord(available_atts, filter_cache, columns, att_to_ids, num_rows, threshold, memory_limit):
    """Synthesizes a new privacy-preserving record from the available attributes.

    Args:
        avalabile_atts: dict of available attribute counts for new record synthesis.
        filter_cache: a cache of already-computed attribute counts for filtering combinations.
        filtered_out: a cache of already-computed remaining record counts for filtering combinations.
        columns: columns of the sensitive dataset.
        atts_to_ids: a dict mapping attributes to row ids.
        num_rows: how many rows/records in the sensitive dataset.
        threshold: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
    
    Returns:
        filters: attributes of a new record synthesized from the available attributes.
    """
    filters = ()
    disallowed = set([k for k in att_to_ids.keys() if k not in available_atts.keys() or (k in available_atts.keys() and available_atts[k] <= 0)])
    
    if len(available_atts) > 0:
        residual_counts, _, _ = residualAttributeCounts(None, disallowed, filter_cache, columns, att_to_ids, num_rows, filters, threshold, memory_limit)
        next_att = sampleFromCounts(residual_counts, preferNotNone=True)
        while next_att != None:
            if available_atts[next_att] == 1:
                del available_atts[next_att]
                disallowed.add(next_att)
            else:
                available_atts[next_att] -= 1
            filters = tuple(sorted((*filters, next_att), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
            residual_counts, _, _ = residualAttributeCounts(None, disallowed, filter_cache, columns, att_to_ids, num_rows, filters, threshold, memory_limit)
            next_att = sampleFromCounts(residual_counts, preferNotNone=True)
        else:
            return filters
    else:
        return filters
