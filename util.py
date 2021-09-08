
import matplotlib.ticker as ticker
import matplotlib.pyplot as plt
import logging
import numpy as np
import pandas as pd
import joblib
from itertools import combinations
from collections import defaultdict
import seaborn as sns
from math import ceil, floor
import matplotlib
# fixes matplotlib + joblib bug "RuntimeError: main thread is not in main loop Tcl_AsyncDelete: async handler deleted by the wrong thread"
matplotlib.use('Agg')


def loadMicrodata(path, delimiter, record_limit, use_columns):
    """Loads delimited microdata with column headers into a pandas dataframe.
    Args:
        path: the microdata file path.
        delimiter: the delimiter used to delimit data columns.
        record_limit: how many rows to load (-1 loads all rows).
        use_columns: which columns to load.
    """
    df = pd.read_csv(
        path, delimiter=delimiter).astype(str).replace(
        to_replace=r'^nan$', value='', regex=True).replace(
        to_replace=r'\.0$', value='', regex=True).replace(
        to_replace=';', value='.,', regex=True).replace(
        to_replace=':', value='..', regex=True)  # fix pandas type coercion for numbers and remove reserved delimiters

    if use_columns != []:
        df = df[use_columns]
    if record_limit > 0:
        df = df[:record_limit]
    return df


def genRowList(df, sensitive_zeros):
    """Converts a dataframe to a list of rows.

    Args:
        df: the dataframe.
        sensitive_zeros: columns for which negative values should be controlled.

    Returns:
        row_list: the list of rows.
    """
    row_list = []
    for _, row in df.iterrows():
        res = []
        for c in df.columns:
            val = str(row[c])
            if val != '' and (c in sensitive_zeros or val != '0'):
                res.append((c, val))
        row2 = sorted(res, key=lambda x: f'{x[0]}:{x[1]}'.lower())
        row_list.append(row2)
    return row_list


def computeAttToIds(row_list):
    """Maps each attribute in the rows of row_list to a set of row ids.

    Args:
        row_list: a list of rows with non-senstitive/blank values filtered out.

    Returns:
        atts_to_ids: a dict mapping each attribute in the rows of row_list to a set of row ids.
    """
    att_to_ids = defaultdict(set)
    for i, row in enumerate(row_list):
        for val in row:
            att_to_ids[val].add(i)
    return att_to_ids


def genColValIdsDict(df, sensitive_zeros):
    """Converts a dataframe to a dict of col->val->ids.

    Args:
        df: the dataframe

    Returns:
        colValIds: the dict of col->val->ids.
    """
    colValIds = {}
    for rid, row in df.iterrows():
        for c in df.columns:
            val = str(row[c])
            if c not in colValIds.keys():
                colValIds[c] = defaultdict(list)
            if val == '0':
                if c in sensitive_zeros:
                    colValIds[c][val].append(rid)
                else:
                    colValIds[c][''].append(rid)
            else:
                colValIds[c][val].append(rid)

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


def countAllCombos(row_list, length_limit, parallel_jobs):
    """Counts all combinations in the given rows up to a limit.

    Args:
        row_list: a list of rows.
        length_limit: the maximum length to compute counts for (all lengths if -1).
        parallel_jobs: the number of processor cores to use for parallelized counting.

    Returns:
        length_to_combo_to_count: a dict mapping combination lengths to dicts mapping combinations to counts. 
    """
    length_to_combo_to_count = {}
    if length_limit == -1:
        length_limit = max([len(x) for x in row_list])
    for length in range(1, length_limit+1):
        logging.info(f'counting combos of length {length}')
        res = joblib.Parallel(n_jobs=parallel_jobs, backend='loky', verbose=1)(
            joblib.delayed(genAllCombos)(row, length) for row in row_list)
        length_to_combo_to_count[length] = defaultdict(int)
        for combos in res:
            for combo in combos:
                length_to_combo_to_count.get(length, {})[combo] += 1

    return length_to_combo_to_count


def genAllCombos(row, length):
    """Generates all combos from row up to and including size length.

    Args:
        row: the row to extract combinations from.
        length: the maximum combination length to extract.

    Returns:
        combos: list of combinations extracted from row.
    """
    res = []
    if len(row) == length:
        canonical_combo = tuple(sorted(list(row), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
        res.append(canonical_combo)
    else:
        for combo in combinations(row, length):
            canonical_combo = tuple(sorted(list(combo), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
            res.append(canonical_combo)
    return res


def mapShortestUniqueRareComboLengthToRecords(records, length_to_rare):
    """
    Maps each record to the shortest combination length that isolates it within a rare group (i.e., below resolution).

    Args:
        records: the input records.
        length_to_rare: a dict of length to rare combo to count.

    Returns:
        rare_to_records: dict of rare combination lengths mapped to record lists
    """
    rare_to_records = defaultdict(set)
    unique_to_records = defaultdict(set)
    length_to_combo_to_rare = {length: defaultdict(set) for length in length_to_rare.keys()}
    for i, record in enumerate(records):
        matchedRare = False
        matchedUnique = False
        for length in sorted(length_to_rare.keys()):
            if matchedUnique:
                break
            for combo in combinations(record, length):
                canonical_combo = tuple(sorted(list(combo), key=lambda x: f'{x[0]}:{x[1]}'.lower()))
                if canonical_combo in length_to_rare.get(length, {}).keys():
                    if length_to_rare.get(length, {})[canonical_combo] == 1:  # unique
                        unique_to_records[length].add(i)
                        matchedUnique = True
                        length_to_combo_to_rare.get(length, {})[canonical_combo].add(i)
                        if i in rare_to_records[length]:
                            rare_to_records[length].remove(i)

                    else:
                        if i not in unique_to_records[length]:
                            rare_to_records[length].add(i)
                        matchedRare = True
                        length_to_combo_to_rare.get(length, {})[canonical_combo].add(i)

            if matchedUnique:
                break
        if not matchedRare and not matchedUnique:
            rare_to_records[0].add(i)
        if not matchedUnique:
            unique_to_records[0].add(i)
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
                continue  # skip header
            parts = [x.strip() for x in line.split('\t')]
            if len(parts[0]) > 0:
                length, combo = stringToLengthAndCombo(parts[0])
                length_to_combo_to_count[length][combo] = int(parts[1])
    return length_to_combo_to_count


def stringToLengthAndCombo(combo_string):
    """Creates a tuple of (attribute, value) tuples from a given string.

    Args:
        combo_string: string representation of (attribute, value) tuples.

    Returns:
        combo_tuple: tuple of (attribute, value) tuples.
    """
    length = len(combo_string.split(';'))
    combo_list = []
    for col_vals in combo_string.split(';'):
        parts = col_vals.split(':')
        if len(parts) == 2:
            combo_list.append((parts[0], parts[1]))
    combo_tuple = tuple(combo_list)
    return length, combo_tuple


def plotStats(
        x_axis, x_axis_title, y_bar, y_bar_title, y_line, y_line_title, color, darker_color, stats_tsv, stats_svg,
        delimiter, style='whitegrid', palette='magma'):
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
        filepath_or_buffer=stats_tsv,
        sep=delimiter,
    )
    if len(df) > 0:
        fig, ax1 = plt.subplots(figsize=(12, 4.5))
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
        ax2.tick_params(axis='y', labelsize=font_size)
        ax2.set_xticklabels(ax2.get_xmajorticklabels(), fontsize=font_size)
        ax2.set_ylim([-0.1, max(1.0, df[y_line].max()) + 0.1])
        ax2.yaxis.set_major_formatter(ticker.FuncFormatter(lambda x, pos: '{:,.2f}'.format(x)))
        x = list(range(0, len(df[x_axis].values)))
        y = df[y_line]
        for i in range(len(df)):
            label = f'{y.loc[i]:.2f}'
            ax2.annotate(label, xy=(x[i], y.loc[i]), fontsize=font_size,
                         xytext=(0, 0), textcoords="offset points",
                         bbox=dict(pad=0.9, alpha=1, fc=pct_color, color='none'),
                         va='center', ha='center', color='white')
        plt.tight_layout()
        fig.savefig(stats_svg)
        plt.figure().clear()
        plt.close()
