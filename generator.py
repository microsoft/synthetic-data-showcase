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
    """Generates synthetic microdata approximating the sensitive microdata at sensitive_microdata_path.

    Produces the synthetic_microdata tsv file of synthetic records.

    Args:
        config: options from the json config file, else default values.
    """

    use_columns = config['use_columns']
    identifier_column = config['identifier_column']
    event_column = config['event_column']
    parallel_jobs = config['parallel_jobs']
    record_limit = config['record_limit']
    sensitive_microdata_path = config['sensitive_microdata_path']
    sensitive_microdata_delimiter = config['sensitive_microdata_delimiter']
    synthetic_microdata_path = config['synthetic_microdata_path']
    sensitive_zeros = config['sensitive_zeros']
    resolution = config['reporting_resolution']
    memory_limit = config['memory_limit_pct']

    logging.info(f'Generate {sensitive_microdata_path}')
    start_time = time.time()  

    df, identifier_column = util.loadMicrodata(path=sensitive_microdata_path, delimiter=sensitive_microdata_delimiter, record_limit=record_limit, use_columns=use_columns, identifier_column=identifier_column)
    
    columns = df.columns.values
    for col in columns:
        if col == identifier_column or col == event_column:
            continue
        possible_vals = df[col].unique()
        allowed_vals = set()
        for val in possible_vals:
            id_count = len(df[df[col] == val][identifier_column].unique())
            if id_count >= resolution:
                allowed_vals.add(val)
        df[col] = [x if x in allowed_vals else '' for x in df[col]]
    
    num = len(df)
    logging.info(f'Prepared data')
    wide_records = []
    event_to_id = {}

    chunk = ceil(num/(parallel_jobs))

    logging.info(f'Generating from seeds')
    event_rows = util.genEventRows(df=df, sensitive_zeros=sensitive_zeros, identifier_column=identifier_column, event_column=event_column)
    att_to_events, event_to_id = util.computeAttToEvents(event_rows=event_rows, identifier_column=identifier_column, event_column=event_column)
    all_available_atts = defaultdict(int)
    chunks = []
    current_chunk = []
    for _, row in event_rows.items():
        current_chunk.append(row)
        if len(current_chunk) > chunk:
            chunks.append(current_chunk)
            current_chunk = []
    if current_chunk != []:
        chunks.append(current_chunk)

    res = joblib.Parallel(n_jobs=parallel_jobs, backend='loky', verbose=1) (joblib.delayed(synthesizeRowsSeeded)(seeds, identifier_column, event_column, num, columns, event_to_id, att_to_events, resolution, memory_limit) for seeds in chunks)
    for (rows, available_atts) in res:
        wide_records.extend(rows)
        for attribute, available in available_atts.items():
            if len(set([event_to_id[x] for x in att_to_events[attribute]])) >= resolution:
                all_available_atts[attribute] += available
    logging.info(f'Consolidating')
    all_available_atts = {k : v for k, v in all_available_atts.items() if v > 0}

    # These are the attribute additions/removals necessary for final attribute counts to match reported (i.e., rounded) values
    targets =  {att: util.protect(len(att_to_events[att]), resolution) - len(att_to_events[att]) for att, events in att_to_events.items() if att[0] != identifier_column}
    
    # Some of the targets we can address by making attributes available for consolidation
    for att, target in targets.items():
        if att not in all_available_atts.keys():
            all_available_atts[att] = target
        else:
            all_available_atts[att] += target
        all_available_atts[att] = max(0, all_available_atts[att])
        if all_available_atts[att] == 0:
            del all_available_atts[att]

    consolidated = divideAndConsolidate(all_available_atts, event_column, columns, event_to_id, att_to_events, num, resolution, memory_limit, parallel_jobs)
    wide_records.extend(consolidated)
    
    # Negative targets are resolved in a final stage of suppresion / synthesis
    wide_records = suppressToTargets(wide_records, columns, event_column, event_to_id, att_to_events, resolution)
        
    records = []
    for wide in wide_records:
        new_rows = normalize(columns, wide, identifier_column, event_column)
        records.extend(new_rows)
    min_atts = 1
    if event_column != None:
        min_atts = 2
    records = [r for r in records if len([y for y in r if y != '']) >= min_atts]
    records.sort()
    records.sort(key = lambda x : len([y for y in x if y != '']), reverse=True)

    sdf = pd.DataFrame(records, columns = columns)
    sdf.drop(identifier_column, axis=1, inplace=True)
    if event_column != None:
        event_ids = sdf[event_column]
        id_mapping = {}
        next_id = 1
        mapped_ids = []
        for id in event_ids:
            if id not in id_mapping.keys():
                id_mapping[id] = next_id
                mapped_ids.append(next_id)
                next_id += 1  
            else:
                mapped_ids.append(id_mapping[id])
        sdf[event_column] = mapped_ids
           
    syn_ratio = len(sdf) / len(df)
    config['expansion_ratio'] = syn_ratio
    sdf.to_csv(synthetic_microdata_path, sep = '\t', index=False)

    logging.info(f'Generated {synthetic_microdata_path} from {sensitive_microdata_path} with synthesis ratio {syn_ratio}, took {datetime.timedelta(seconds = time.time() - start_time)}s')


def synthesizeRowsSeeded(seeds, identifier_column, event_column, num_rows, columns, event_to_id, att_to_events, resolution, memory_limit):
    """Maps each seed record into a synthetic record.

    If the seed value is None, the synthetic record is generated through unconstrained sampling of attribute distributions.
    Otherwise, the synthetic record is a protected (i.e., above resolution) subset of the seed record's attributes.

    Args:
        seeds: a list of sensitive records or None values (for unseeded synthesis).
        identifier_column: in the sensitive data, the column representing the identity of the individual data subject associated with the record.
        event_column: in the sensitive data, the column representing the identity of the event associated with the record.
        num_rows: how many rows/records in the sensitive dataset.
        columns: the columns of the sensitive dataset.
        event_to_id: a dict mapping the event id to the subject id.
        atts_to_events: a dict mapping attributes to event ids.
        resolution: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
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
        
        id =  [r[1] for r in seed if r[0] == identifier_column][0]
        event_id = id
        if event_column != None:
            event_id = [r[1] for r in seed if r[0] == event_column][0]
        seed = [att for att in seed if att[0] != event_column and att[0] != identifier_column]
        
        filters, row_cache_hits, row_cache_misses = synthesizeRowSeeded(seed, (), [], filter_cache, num_rows, columns, event_to_id, att_to_events, resolution, memory_limit)
        overall_cache_hits += row_cache_hits
        overall_cache_misses += row_cache_misses

        if seed != None:
            remaining = set(seed).difference(filters)
            for rem_att in remaining:
                available_atts[rem_att] += 1
    
        if len(filters) > 0:
            if event_column != None:
                filters = (*filters, (event_column, event_id))           
            rows.append(filters)

    return rows, available_atts


def synthesizeRowSeeded(seed, filters, disallowed, filter_cache, num_rows, columns, event_to_id, att_to_events, resolution, memory_limit):
    """Maps a seed record into a synthetic record.

    Args:
        seed: a sensitive record, or None for unseeded synthesis.
        filters: the attributes to include in the record.
        disallowed: the attributes not to include in the record.
        filter_cache: a cache of already-computed ids for filtering combinations.
        num_rows: how many rows/records in the sensitive dataset.
        columns: the columns of the sensitive dataset.
        event_to_id: a dict mapping the event id to the subject id.
        atts_to_events: a dict mapping attributes to event ids.
        resolution: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
    
    Returns:
        new_filters: the filters of the synthesized row.
        row_cache_hits: the number of times the cache was hit.
        row_cache_misses: the number of times the cache was missed.

    """
    row_cache_hits = 0
    row_cache_misses = 0
    nxt, cache_hits, cache_misses = sampleNextAttribute(seed, disallowed, filter_cache, columns, num_rows, filters, event_to_id, att_to_events, resolution, memory_limit)

    row_cache_hits += cache_hits
    row_cache_misses += cache_misses
    new_filters = filters
    while nxt != None:
        new_filters = tuple(sorted((*new_filters, nxt), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
        nxt, cache_hits, cache_misses = sampleNextAttribute(seed, disallowed, filter_cache, columns, num_rows, new_filters, event_to_id, att_to_events, resolution, memory_limit)
        row_cache_hits += cache_hits
        row_cache_misses += cache_misses

    return new_filters, row_cache_hits, row_cache_misses


def sampleNextAttribute(seed, disallowed, filter_cache, columns, num_rows, filters, event_to_id, att_to_events, resolution, memory_limit):
    """Samples the next attribute in the process of synthetic record generation.

    If the seed value is None, the synthetic record is generated through unconstrained sampling of attribute distributions.
    Otherwise, the synthetic record is a protected (i.e., above resolution) subset of the seed record's attributes.

    Args:
        seed: the seed record from the sensitive dataset, else None.
        disallowed: the attributes not to include in the record.
        filter_cache: a cache of already-computed attribute counts for filtering combinations.
        columns: columns of the sensitive dataset.
        num_rows: how many rows/records in the sensitive dataset.
        filters: the attribute combination filtering the dataset.
        event_to_id: a dict mapping the event id to the subject id.
        atts_to_events: a dict mapping attributes to event ids.
        resolution: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
    
    Returns:
        sampled_value: the sampled attribute value to add to the synthetic record being generated.
        cache_hits: the number of times the cache was hit.
        cache_misses: the number of times the cache was missed.
    """
    residualCounts, cache_hits, cache_misses = residualAttributeCounts(seed, disallowed, filter_cache, columns, event_to_id, att_to_events, num_rows, filters, resolution, memory_limit)
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


def residualAttributeCounts(seed, disallowed, filter_cache, columns, event_to_id, att_to_events, num_rows, filters, resolution, memory_limit):
    """Computes the counts of records remaining after filtering.

    If the seed value is None, the residual attribute counts are drawn from all attributes.
    Otherwise, the counts are drawn from the seed record's attributes.

    Args:
        seed: the seed record from the sensitive dataset, else None.
        disallowed: the attributes not to include in the record.
        filter_cache: a cache of already-computed attribute counts for filtering combinations.
        columns: the columns of the sensitive dataset.
        event_to_id: a dict mapping the event id to the subject id.
        atts_to_events: a dict mapping attributes to event ids.
        num_rows: how many rows/records in the sensitive dataset.
        filters: the attribute combination filtering the dataset.
        resolution: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
    
    Returns:
        residual_counts: the counts of records remaining after filtering for all linked attributes.
        cache_hits: the number of times the cache was hit.
        cache_misses: the number of times the cache was missed.
    """
    sorted_filters = sorted(filters, key = lambda x: len(att_to_events[x]), reverse=False)
    residual_events = set()
    residual_counts = {}
    cache_hits = 0
    cache_misses = 0
    use_cache = psutil.virtual_memory()[2] <= memory_limit # do not add to cache once memory limit is reached
    if filters in filter_cache.keys():
        residual_events = set(filter_cache[filters]) # use cached value if possible
        cache_hits += 1
    else:
        cache_misses += 1
        if len(filters) > 0:
            residual_events = att_to_events[sorted_filters[0]]    
            for c in sorted_filters[1:]:
                residual_events = residual_events.intersection(att_to_events[c])
        else:
            residual_events = set(event_to_id.keys())
        if use_cache:
            filter_cache[filters] = set(residual_events) # set cached value

    atts = sorted(att_to_events.keys() if seed is None else seed, key = lambda x: len(att_to_events[x]), reverse=False)

    for att in disallowed:
        if att in atts:
            atts.remove(att)

    for att in atts:
        if att in filters:
            continue
        extended_filters = tuple(sorted((*filters, att), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
        num = 0
        if extended_filters in filter_cache.keys():
            filtered_events = filter_cache[extended_filters] # use cached value if possible
            filtered_ids = set([event_to_id[x] for x in filtered_events])
            num = len(filtered_ids)
            cache_hits += 1
        else:
            cache_misses += 1
            filtered_events = residual_events.intersection(att_to_events[att])
            filtered_ids = set([event_to_id[x] for x in filtered_events])
            num = len(filtered_ids)
            if use_cache:
                filter_cache[extended_filters] = set(filtered_events) # set cached value
        if num >= resolution:
            residual_counts[att] = num

    return residual_counts, cache_hits, cache_misses


def convertCountsToCumulativeDistribution(att_to_count):
    """Converts a dict of counts to a cumulative probability distribution for sampling.

    Args:
        att_to_count: a dict of attribute counts.
    
    Returns:
        dist: a cumulative probability distribution mapping cumulative probabilities [0,1] to attributes. 
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


def normalize(columns, atts, identifier_column, event_column):
    """Creates an output record according to the columns schema from a set of attributes.

    Args:
        columns: the columns of the output record.
        atts: the attribute values of the output record.
        identifier_column: in the sensitive data, the column representing the identity of the individual data subject associated with the record.
        event_column: in the sensitive data, the column representing the identity of the event associated with the record.
    
    Returns:
        row: a normalized row ready for dataframe integration.
    """
    if event_column == None:
        event_column = identifier_column
    col_to_atts = defaultdict(set)
    event_id = -1
    for att in atts:
        if att[0] != event_column and att[0] != identifier_column:
            col_to_atts[att[0]].add(att)
        if att[0] == event_column:
            event_id = att[1]
    rows = [[]]
    for c in columns:
        if c == event_column:
            for row in rows:
                row.append(event_id)
        else:
            c_atts = list(col_to_atts.get(c, []))
            if len(c_atts) == 0:
                for row in rows:
                    row.append('')
            elif len(c_atts) == 1:
                for row in rows:
                    row.append(c_atts[0][1])
            else:
                new_rows = []
                for _ in range(len(c_atts)):
                    new_rows.extend([list(row) for row in rows])
                rows = new_rows
                for ix, row in enumerate(rows):
                    row.append(c_atts[ix%len(atts)][1])

    return rows

def suppressToTargets(records, columns, event_column, event_to_id, att_to_events, resolution):
    """Returns a new record list in which attributes have been suppressed match the reported (rounded) values.

    Args:
        records: the input records
        columns: the columns of the output record.
        event_column: in the sensitive data, the column representing the identity of the event associated with the record.
        event_to_id: a dict mapping the event id to the subject id.
        atts_to_events: a dict mapping attributes to event ids.
        resolution: the resolution with which the synthesis algorithm can access counts.
    Returns:
        new_records: the modified records.
    """

    current_counts = Counter(list(chain(*records)))
    targets =  {att: current_counts[att] - util.protect(len(events), resolution) for att, events in att_to_events.items()}
    targets =  {k: v for k, v in targets.items() if v > 0}
    shuffle(records)
    while len(targets) > 0:
        new_records = []
        for combo in records:
            new_combo = list(combo)
            for att in list(combo):
                if att in targets.keys() and att[0] != event_column:
                    new_combo.remove(att)
                    if targets[att] == 1:
                        del targets[att]
                    else:
                        targets[att] -= 1
                    break
            new_records.append(new_combo)
        records = new_records
    return records


def divideAndConsolidate(available_atts, event_column, columns, event_to_id, att_to_events, num_rows, resolution, memory_limit, parallel_jobs):
    """Synthesizes new privacy-preserving records from the available attributes (in parallel).

    Args:
        avalabile_atts: dict of available attribute counts for new record synthesis.
        event_column: in the sensitive data, the column representing the identity of the event associated with the record.
        columns: the columns of the output record.
        event_to_id: a dict mapping the event id to the subject id.
        atts_to_events: a dict mapping attributes to event ids.
        num_rows: how many rows/records in the sensitive dataset.
        resolution: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
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
    res = joblib.Parallel(n_jobs=parallel_jobs, backend='loky', verbose=1) (joblib.delayed(consolidate)(available_atts, event_column, columns, event_to_id, att_to_events, num_rows, resolution, memory_limit) for available_atts in divided_available_atts)
    id = 1
    id_prefix = 'SID_'
    for rs in res:
        for r in rs:
            if event_column != None:
                r = (*r, (event_column, id_prefix + str(id)))
            records.append(r)
            id += 1
    return records

def consolidate(available_atts, event_column, columns, event_to_id, att_to_events, num_rows, resolution, memory_limit):    
    """Synthesizes new privacy-preserving records from the available attributes.

    Args:
        avalabile_atts: dict of available attribute counts for new record synthesis.
        event_column: in the sensitive data, the column representing the identity of the event associated with the record.
        columns: the columns of the output record.
        event_to_id: a dict mapping the event id to the subject id.
        atts_to_events: a dict mapping attributes to event ids.
        num_rows: how many rows/records in the sensitive dataset.
        resolution: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
    
    Returns:
        records: new records synthesized frmo the available attributes.
    """
    filtered_att_to_events = {k : v for k, v in att_to_events.items() if k in available_atts.keys()}
    filter_cache = {}
    records = []
    while len(available_atts) > 0:
        aa = len(available_atts)
        aa_count = sum(available_atts.values())
        if aa_count % 10 == 0:
            logging.info(f'{aa_count} values remaining across {aa} attributes')
        filters = consolidateRecord(available_atts, filter_cache, columns, event_to_id, filtered_att_to_events, num_rows, resolution, memory_limit)
        if len(filters) > 0:
            records.append(filters)
    return records
   
def consolidateRecord(available_atts, filter_cache, columns, event_to_id, att_to_events, num_rows, resolution, memory_limit):
    """Synthesizes a new privacy-preserving record from the available attributes.

    Args:
        avalabile_atts: dict of available attribute counts for new record synthesis.
        filter_cache: a cache of already-computed attribute counts for filtering combinations.
        columns: columns of the sensitive dataset.
        event_to_id: a dict mapping the event id to the subject id.
        atts_to_events: a dict mapping attributes to event ids.
        num_rows: how many rows/records in the sensitive dataset.
        resolution: the minimum count of sensitive attribute combinations for inclusion in synthetic records.
        memory_limit: the percentage memory use not to exceed.
    
    Returns:
        filters: attributes of a new record synthesized from the available attributes.
    """
    filters = ()
    disallowed = set([k for k in att_to_events.keys() if k not in available_atts.keys() or (k in available_atts.keys() and available_atts[k] <= 0)])
    
    if len(available_atts) > 0:
        residual_counts, _, _ = residualAttributeCounts(None, disallowed, filter_cache, columns, event_to_id, att_to_events, num_rows, filters, resolution, memory_limit)
        next_att = sampleFromCounts(residual_counts, preferNotNone=True)
        while next_att != None:
            if available_atts[next_att] == 1:
                del available_atts[next_att]
                disallowed.add(next_att)
            else:
                available_atts[next_att] -= 1
            filters = tuple(sorted((*filters, next_att), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
            residual_counts, _, _ = residualAttributeCounts(None, disallowed, filter_cache, columns, event_to_id, att_to_events, num_rows, filters, resolution, memory_limit)
            next_att = sampleFromCounts(residual_counts, preferNotNone=True)
        else:
            return filters
    else:
        return filters
