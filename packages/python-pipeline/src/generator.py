from doctest import OutputChecker
import time
import datetime
import logging
import sds
from os import path


def generate(config):
    """Generates synthetic microdata approximating the sensitive microdata at sensitive_microdata_path.

    Produces the synthetic_microdata tsv file of synthetic records.

    Args:
        config: options from the json config file, else default values.
    """

    use_columns = config['use_columns']
    record_limit = config['record_limit']
    sensitive_microdata_path = config['sensitive_microdata_path']
    sensitive_microdata_delimiter = config['sensitive_microdata_delimiter']
    synthetic_microdata_path = config['synthetic_microdata_path']
    sensitive_zeros = config['sensitive_zeros']
    resolution = config['reporting_resolution']
    cache_max_size = config['cache_max_size']
    synthesis_mode = config['synthesis_mode']
    output_dir = config['output_dir']
    prefix = config['prefix']
    dp_aggregates = config['dp_aggregates']
    if dp_aggregates:
        aggregated_data_json = path.join(
            output_dir, f'{prefix}_protected_aggregated_data.json')
    else:
        aggregated_data_json = path.join(
            output_dir, f'{prefix}_sensitive_aggregated_data.json')
    oversampling_ratio = config['oversampling_ratio']

    logging.info(f'Generate {sensitive_microdata_path}')
    start_time = time.time()

    logging.info(f'Generating {synthesis_mode}')

    sds_processor = sds.SDSProcessor(
        sensitive_microdata_path,
        sensitive_microdata_delimiter,
        use_columns,
        sensitive_zeros,
        max(record_limit, 0)
    )
    generated_data = sds_processor.generate(
        cache_max_size,
        resolution,
        "",
        synthesis_mode,
        aggregated_data_json if (
            oversampling_ratio or dp_aggregates) else None,
        oversampling_ratio
    )
    generated_data.write_synthetic_data(synthetic_microdata_path, '\t')
    syn_ratio = generated_data.expansion_ratio

    config['expansion_ratio'] = syn_ratio

    logging.info(
        f'Generated {synthetic_microdata_path} from {sensitive_microdata_path} with synthesis ratio {syn_ratio}, took {datetime.timedelta(seconds = time.time() - start_time)}s')
