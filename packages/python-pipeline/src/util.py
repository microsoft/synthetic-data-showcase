
import matplotlib.ticker as ticker
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from math import ceil
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
        ax1 = sns.barplot(x=x_axis, y=y_bar, data=df,
                          color=cnt_color, order=df[x_axis].values)
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
        ax1.yaxis.set_major_formatter(
            ticker.FuncFormatter(lambda x, pos: '{:,.0f}'.format(x)))
        ax2 = ax1.twinx()
        pct_color = darker_color
        ax2 = sns.pointplot(x=x_axis, y=y_line, data=df,
                            color=pct_color, order=df[x_axis].values)
        ax2.set_ylabel(y_line_title, fontsize=font_size, color=pct_color)
        ax2.tick_params(axis='y', labelsize=font_size)
        ax2.set_xticklabels(ax2.get_xmajorticklabels(), fontsize=font_size)
        ax2.set_ylim([-0.1, max(1.0, df[y_line].max()) + 0.1])
        ax2.yaxis.set_major_formatter(
            ticker.FuncFormatter(lambda x, pos: '{:,.2f}'.format(x)))
        x = list(range(0, len(df[x_axis].values)))
        y = df[y_line]
        for i in range(len(df)):
            label = f'{y.loc[i]:.2f}'
            ax2.annotate(label, xy=(x[i], y.loc[i]), fontsize=font_size,
                         xytext=(0, 0), textcoords="offset points",
                         bbox=dict(pad=0.9, alpha=1,
                                   fc=pct_color, color='none'),
                         va='center', ha='center', color='white')
        plt.tight_layout()
        fig.savefig(stats_svg)
        plt.figure().clear()
        plt.close()
