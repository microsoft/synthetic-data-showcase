
import logging
import numpy as np
import pandas as pd
from os import path
import joblib
import re
from itertools import combinations
from collections import defaultdict
import seaborn as sns
from math import ceil, floor
import matplotlib
matplotlib.use('Agg') # fixes matplotlib + joblib bug "RuntimeError: main thread is not in main loop Tcl_AsyncDelete: async handler deleted by the wrong thread"
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

def loadMicrodata(path, delimiter, record_limit, use_columns, identifier_column):
    """Loads delimited microdata with column headers into a pandas dataframe.

    Args:
        path: the microdata file path.
        delimiter: the delimiter used to delimit data columns.
        record_limit: how many rows to load (-1 loads all rows).
        use_columns: which columns to load.
        identifier_column: in the sensitive data, the column representing the identity of the individual data subject associated with the record.
    """
    df = pd.read_csv(path, delimiter).astype(str) \
        .replace(to_replace=r'^nan$', value='', regex=True) \
        .replace(to_replace=r'\.0$', value='', regex=True) \
        .replace(to_replace=';', value='.,', regex=False) \
        .replace(to_replace=':', value='..', regex=False)  # fix pandas type coercion for numbers and remove reserved delimiters
    
    if identifier_column == None:
        identifier_column = 'NATURAL_INDEX'
        df[identifier_column] = list(range(1, len(df) + 1))

    if use_columns != []:
        if identifier_column not in use_columns:
            use_columns = [identifier_column] + use_columns
        df = df[use_columns]
    if record_limit > 0:
        df = df[:record_limit]
    return df, identifier_column


def genEventRows(df, sensitive_zeros, identifier_column, event_column):
    """Converts a dataframe to a dictionary mapping event ids to row lists.
    
    Rows are represented as lists of (attribute, value) tuples.
 
    Args:
        df: the dataframe.
        sensitive_zeros: columns for which negative values should be controlled.
        identifier_column: in the sensitive data, the column representing the identity of the individual data subject associated with the record.
        event_column: in the sensitive data, the column representing the identity of the event associated with the record.

    Returns:
        event_rows: a dict mapping event ids to row lists.
    """
    event_rows = defaultdict(set)
    for _, row in df.iterrows():
        id = row[identifier_column]
        event = id
        if event_column != None:
            event = row[event_column]
        res = []
        for c in df.columns:
            val = str(row[c])
            if val != '' and (c in sensitive_zeros or val != '0'):
                res.append((c, val))
        row2 = sorted(res, key=lambda x: f'{x[0]}:{x[1]}'.lower())
        event_rows[event].update(row2)
    return event_rows

def computeAttToEvents(event_rows, identifier_column, event_column):
    """Maps each attribute to a set of event ids and each event id to a subject id.

    Args:
        event_rows: a dict mapping event ids to row lists.
        identifier_column: in the sensitive data, the column representing the identity of the individual data subject associated with the record.
        event_column: in the sensitive data, the column representing the identity of the event associated with the record.

    Returns:
        atts_to_events: a dict mapping each attribute to a set of event ids.
        events_to_ids: a dict mapping each event id to its subject id.
    """
    att_to_events = defaultdict(set)
    event_to_ids = {}
    for event, row in event_rows.items():
        id = event
        if identifier_column != None:
            id = [r[1] for r in row if r[0] == identifier_column][0]
        event_to_ids[event] = id
        for val in row:
            if val[0] != identifier_column and val[0] != event_column:
                att_to_events[val].add(event)
    return att_to_events, event_to_ids

def genColValIdsDict(df, sensitive_zeros, event_column):
    """Converts a dataframe to a dict of col->val->ids.

    Args:
        df: the dataframe.
        sensitive_zeros: columns for which negative values should be controlled.
        event_column: in the sensitive data, the column representing the identity of the event associated with the record.

    Returns:
        colValIds: the dict of col->val->ids.
    """
    colValIds = {}
    for rid, row in df.iterrows():
        event = rid
        if event_column != None:
            event = row[event_column]
        for c in df.columns:
            val = str(row[c])
            if c not in colValIds.keys():
                colValIds[c] = defaultdict(list)
            if val == '0':
                if c in sensitive_zeros:
                    colValIds[c][val].append(event)
                else:
                    colValIds[c][''].append(event)
            else:
                colValIds[c][val].append(event)

    return colValIds


def rowToCombo(row, columns):
    """Converts a row to a list of (Attribute, Value) tuples.

    Args:
        row: the input row.
        columns: the columns of the input row.

    Returns:
        combo: the list of (Attribute, Value) tuples.
    """
    res = []
    for i, c in enumerate(columns):
        val = str(row[i])
        if val != '':
            res.append((c, val))
    combo = sorted(res, key=lambda x: f'{x[0]}:{x[1]}'.lower())
    return combo


def countAllCombos(identifier_column, event_column, event_rows, length_limit, parallel_jobs):
    """Counts all combinations in the given rows up to a limit.

    Args:
        identifier_column: in the sensitive data, the column representing the identity of the individual data subject associated with the record.
        event_column: in the sensitive data, the column representing the identity of the event associated with the record.
        event_rows: a dict mapping event ids to row lists.
        length_limit: the maximum length to compute counts for (all lengths if -1).
        parallel_jobs: the number of processor cores to use for parallelized counting.

    Returns:
        length_to_combo_to_counts: a dict mapping combination lengths to dicts mapping combinations to count tuples (subject count, event count). 
    """
    length_to_combo_to_events = {}
    if length_limit == -1:
        length_limit = max([max([len(x) for x in row_list]) for row_list in event_rows.values()])
    for length in range(1, length_limit+1):
        logging.info(f'counting combos of length {length}')
        res = joblib.Parallel(n_jobs=parallel_jobs, backend='loky', verbose=1) (joblib.delayed(genAllCombos)(identifier_column, event_column, event, row, length) for event, row in event_rows.items())
        length_to_combo_to_events[length] = defaultdict(set)
        for (id, event_to_combos) in res:
            for event, combos in event_to_combos.items():
                for combo in combos:
                    length_to_combo_to_events[length][combo].add((id, event))
    length_to_combo_to_counts = {length: {combo: (len(set([x[0] for x in events])), len(events)) for combo, events in combo_to_events.items()} for length, combo_to_events in length_to_combo_to_events.items()}
    return length_to_combo_to_counts


def genAllCombos(identifier_column, event_column, event, row, length):
    """Generates all combos from the row up to and including size length.

    Args:
        identifier_column: in the sensitive data, the column representing the identity of the individual data subject associated with the record.
        event_column: in the sensitive data, the column representing the identity of the event associated with the record.row: the row to extract combinations from.
        event: the event id associated with the row.
        row: the attributes of the row.
        length: the maximum combination length to extract.

    Returns:
        id: the id extracted from the row.
        res: a dict mapping event id to attribute combinations.
    """
    res = defaultdict(list)
    id = event
    if identifier_column != None:
        id = [r[1] for r in row if r[0] == identifier_column][0]
    row = [r for r in row if r[0] != identifier_column and r[0] != event_column]
    if len(row) == length:
        canonical_combo = tuple(sorted(list(row), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
        res[event].append(canonical_combo)
    else:
        for combo in combinations(row, length):
            canonical_combo = tuple(sorted(list(combo), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
            res[event].append(canonical_combo)
    return (id, res)


def mapShortestUniqueRareComboLengthToRecords(event_to_records, length_to_rare):
    """
    Maps each record to the shortest combination length that isolates it within a rare group (i.e., below resolution).

    Args:
        event_to_records: a dict mapping event id to a list of records.
        length_to_rare: a dict of length to rare combo to count.

    Returns:
        unique_to_records: dict of unique combination lengths mapped to record lists.
        rare_to_records: dict of rare combination lengths mapped to record lists.
        length_to_combo_to_rare: a dict mapping combination length to combination to event ids.
    """
    rare_to_records = defaultdict(set)
    unique_to_records = defaultdict(set)
    length_to_combo_to_rare = {length: defaultdict(set) for length in length_to_rare.keys()}
    for event, record in event_to_records.items():
        matchedRare = False
        matchedUnique = False
        for length in sorted(length_to_rare.keys()):
            if matchedUnique:
                break
            for combo in combinations(record, length):
                canonical_combo = tuple(sorted(list(combo), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
                if canonical_combo in length_to_rare[length].keys():
                    if length_to_rare[length][canonical_combo] == 1: # unique
                        unique_to_records[length].add(event)
                        matchedUnique = True
                        length_to_combo_to_rare[length][canonical_combo].add(event)
                    else:
                        rare_to_records[length].add(event)
                        matchedRare = True
                        length_to_combo_to_rare[length][canonical_combo].add(event)
                        
            if matchedUnique:
                break
        if not matchedRare:
            rare_to_records[0].add(event)
        if not matchedUnique:
            unique_to_records[0].add(event)
    return unique_to_records, rare_to_records, length_to_combo_to_rare


def protect(value, resolution):
    """Protects a value from a privacy perspective by rounding down to the closest multiple of the supplied resolution.

    Args:
        value: the value to protect.
        resolution: round values down to the closest multiple of this.
    """
    rounded = floor(round(value / resolution) * resolution)
    return rounded


def comboToString(combo_tuple):
    """Creates a string from a tuple of (attribute, value) tuples.

    Args:
        combo_tuple: tuple of (attribute, value) tuples.

    Returns:
        combo_string: a ;-delimited string of ':'-concatenated attribute-value pairs.
    """
    combo_string = ''
    for (col, val) in combo_tuple:
        combo_string += f'{col}:{val};'
    return combo_string[:-1]


def loadSavedAggregates(path):
    """Loads sensitive aggregates from file to speed up evaluation.

    Args:
        path: location of the saved sensitive aggregates.

    Returns:
        length_to_combo_to_count: a dict mapping combination lengths to dicts mapping combinations to counts
    """
    length_to_combo_to_count = defaultdict(dict)
    with open(path, 'r') as f:
        for i, line in enumerate(f):
            if i == 0:
                continue # skip header
            parts = [x.strip() for x in line.split('\t')]
            if len(parts[0]) > 0:
                length, combo = stringToLengthAndCombo(parts[0])
                length_to_combo_to_count[length][combo] = (int(parts[1]), int(parts[2]))
    return length_to_combo_to_count


def stringToLengthAndCombo(combo_string):
    """Creates a tuple of (attribute, value) tuples from a given string.

    Args:
        combo_string: string representation of (attribute, value) tuples.

    Returns:
        length: the length of the combination.
        combo_tuple: tuple of (attribute, value) tuples.
    """
    length = len(combo_string.split(';'))
    combo_list = []
    for col_vals in combo_string.split(';'):
        parts = col_vals.split(':')
        if len(parts) == 2:
            combo_list.append((parts[0],parts[1]))
    combo_tuple = tuple(combo_list)
    return length, combo_tuple


def plotStats(x_axis, x_axis_title, y_bar, y_bar_title, y_line, y_line_title, color, darker_color, stats_tsv, stats_svg, delimiter, style='whitegrid', palette='magma'):
    """Creates comparison graphics by combination count.

    Outputs 'count_stats.svg'.

    Args:
        stats_tsv: input data path.
        delimiter: input data delimiter.
        output_folder: folder in which to save summary graphics.
        prefix: prefix to add to graphics filenames.
        style: seaborn style.
        palette: seaborn palette.
    """
    df = pd.read_csv(
        filepath_or_buffer = stats_tsv,
        sep = delimiter,
    )
    fig, ax1 = plt.subplots(figsize=(12,4.5))
    cnt_color = color
    font_size = 12
    ax1 = sns.barplot(x=x_axis, y=y_bar, data=df, color=cnt_color, order=df[x_axis].values)
    y_ticks = list(ax1.get_yticks())
    y_max = ceil(df[y_bar].max())
    y_upper = y_ticks[-1]
    if y_ticks[-1] < y_max:
        y_upper = y_ticks[-1] + y_ticks[1]
        y_ticks.append(y_upper)
    if y_max > 1 and y_max < 10:
        y_ticks = list(range(y_max+1))
    new_y_ticks = np.array(y_ticks)
    ax1.set_ylim((0, y_upper))
    ax1.set_yticks(new_y_ticks)
    ax1.set_xticklabels(ax1.get_xmajorticklabels(), fontsize=font_size)
    ax1.set_xlabel(x_axis_title, fontsize=font_size)
    ax1.set_ylabel(y_bar_title, fontsize=font_size)
    ax1.set_yticklabels(new_y_ticks, fontsize=font_size)
    ax1.yaxis.set_major_formatter(ticker.FuncFormatter(lambda x, pos: '{:,.0f}'.format(x)))
    ax2 = ax1.twinx()
    pct_color = darker_color
    ax2 = sns.pointplot(x=x_axis, y=y_line, data=df, color=pct_color, order=df[x_axis].values)
    ax2.set_ylabel(y_line_title, fontsize=font_size, color=pct_color)
    ax2.set_yticklabels(ax2.get_yticks(), fontsize=font_size)
    ax2.set_xticklabels(ax2.get_xmajorticklabels(), fontsize=font_size)
    ax2.set_ylim([-0.1, max(1.0, df[y_line].max()) + 0.1])
    ax2.yaxis.set_major_formatter(ticker.FuncFormatter(lambda x, pos: '{:,.2f}'.format(x)))
    x = list(range(0, len(df[x_axis].values)))
    y = df[y_line]
    for i in range(len(df)):
        label = f'{y.loc[i]:.2f}'
        ax2.annotate(label, xy=(x[i], y.loc[i]), fontsize=font_size,
            xytext = (0,0), textcoords="offset points",
            bbox=dict(pad=0.9, alpha=1, fc=pct_color, color='none'),
            va='center', ha='center', color='white')
    plt.tight_layout()
    fig.savefig(stats_svg)
    plt.figure().clear()
    plt.close()