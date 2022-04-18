import logging
import copy
import json
from os import path, mkdir
from showcase import runForConfig
from sys import argv


def run_experiment(index, execute, base_config, output_dir, experiment):
    for key in experiment.keys():
        if key != 'name' and key != 'skip':
            base_config[key] = experiment[key]
    name = experiment['name']
    base_config['output_dir'] = path.join(output_dir, f'{index}_{name}')

    try:
        base_config['aggregate'] = execute['aggregate'] if execute['aggregate'] != None else False
        base_config['generate'] = execute['generate'] if execute['generate'] != None else False
        base_config['evaluate'] = execute['evaluate'] if execute['evaluate'] != None else False
        base_config['navigate'] = execute['navigate'] if execute['navigate'] != None else False

        runForConfig(base_config)
    except Exception as e:
        logging.exception(
            f"Failed to run experiment with exception: {e}", exc_info=True)


def main():
    logging.basicConfig(
        format="%(funcName)s: %(message)s", level=logging.INFO)

    with open(argv[1], 'r') as f:
        batch_config = json.load(f)

    execute = batch_config.get('execute', {})
    base_config = batch_config['base_config']
    runs = batch_config['runs']

    output_dir = base_config['output_dir']

    for (exp_group, exps) in runs.items():
        group_output_dir = path.join(output_dir, exp_group)
        if not path.exists(group_output_dir) and len(exps) > 0:
            mkdir(group_output_dir)
        for i, exp in enumerate(exps):
            if not exp.get('skip', False):
                run_experiment(i, execute, copy.deepcopy(
                    base_config), group_output_dir, exp)


if __name__ == '__main__':
    main()
