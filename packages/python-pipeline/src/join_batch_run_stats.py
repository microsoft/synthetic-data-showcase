import json
from sys import argv
from os import path, listdir


def write_result(stats_by_run, indexes_by_run, output_file):
    stats = []
    sorted_runs = sorted(stats_by_run.keys(), key=lambda x: indexes_by_run[x])
    result = [['Run', *sorted_runs]]

    for values in stats_by_run.values():
        if len(values) > len(stats):
            stats = [value for value in values.keys()]

    for stat in stats:
        line = [stats_by_run[run][stat] if stat in stats_by_run[run]
                else '' for run in sorted_runs]
        result.append([stat, *line])

    with open(output_file, 'w+') as f:
        for line in result:
            f.write('\t'.join(line) + '\n')


def run_for_group(group_dir, prefix):
    if not path.isdir(group_dir):
        return

    stats_aggregate_by_run = dict()
    stats_synthetic_by_run = dict()
    indexes_by_run = dict()

    for run_dir in listdir(group_dir):
        stats_aggregate_file = path.join(
            group_dir, run_dir, f'{prefix}_stats_aggregate_counts.tsv'
        )
        stats_synthetic_file = path.join(
            group_dir, run_dir,  f'{prefix}_stats_synthetic_data.tsv')

        if path.isfile(stats_aggregate_file) and path.isfile(stats_synthetic_file):
            indexes_by_run[run_dir] = int(run_dir.split('_', 1)[0])

            with open(stats_aggregate_file) as f:
                stats_aggregate_by_run[run_dir] = {
                    line.split('\t')[0].strip(): line.split('\t')[1].strip()
                    for line in f.readlines()[1:]
                }

            with open(stats_synthetic_file) as f:
                stats_synthetic_by_run[run_dir] = {
                    line.split('\t')[0].strip(): line.split('\t')[1].strip()
                    for line in f.readlines()[1:]
                }

    write_result(
        stats_aggregate_by_run,
        indexes_by_run,
        path.join(group_dir, f'{prefix}_joined_stats_aggregate_counts.tsv')
    )
    write_result(
        stats_synthetic_by_run,
        indexes_by_run,
        path.join(group_dir, f'{prefix}_joined_stats_synthetic_data.tsv')
    )


def main():
    with open(argv[1], 'r') as f:
        batch_config = json.load(f)

    base_config = batch_config['base_config']
    output_dir = base_config['output_dir']
    prefix = base_config['prefix']

    for group_dir in listdir(output_dir):
        run_for_group(path.join(output_dir, group_dir), prefix)


if __name__ == '__main__':
    main()
