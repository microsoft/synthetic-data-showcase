import time
import datetime
import logging
from os import path
import util as util
import sds


class Evaluator:
    def __init__(self, config):
        self.sds_evaluator = sds.Evaluator()
        self.use_columns = config['use_columns']
        self.record_limit = max(config['record_limit'], 0)
        self.reporting_length = max(config['reporting_length'], 0)
        self.reporting_resolution = config['reporting_resolution']
        self.sensitive_microdata_path = config['sensitive_microdata_path']
        self.sensitive_microdata_delimiter = config['sensitive_microdata_delimiter']
        self.synthetic_microdata_path = config['synthetic_microdata_path']
        self.sensitive_zeros = config['sensitive_zeros']
        self.output_dir = config['output_dir']
        self.prefix = config['prefix']
        self.sensitive_aggregated_data_json = path.join(
            self.output_dir, f'{self.prefix}_sensitive_aggregated_data.json'
        )
        self.record_analysis_tsv = path.join(
            self.output_dir, f'{self.prefix}_sensitive_analysis_by_length.tsv'
        )
        self.synthetic_rare_combos_tsv = path.join(
            self.output_dir, f'{self.prefix}_synthetic_rare_combos_by_length.tsv'
        )
        self.parameters_tsv = path.join(
            self.output_dir, f'{self.prefix}_parameters.tsv'
        )
        self.leakage_tsv = path.join(
            self.output_dir, f'{self.prefix}_synthetic_leakage_by_length.tsv'
        )
        self.leakage_svg = path.join(
            self.output_dir, f'{self.prefix}_synthetic_leakage_by_length.svg'
        )
        self.preservation_by_count_tsv = path.join(
            self.output_dir, f'{self.prefix}_preservation_by_count.tsv'
        )
        self.preservation_by_count_svg = path.join(
            self.output_dir, f'{self.prefix}_preservation_by_count.svg'
        )
        self.absolute_error_by_count_svg = path.join(
            self.output_dir, f'{self.prefix}_absolute_error_by_count.svg'
        )
        self.preservation_by_length_tsv = path.join(
            self.output_dir, f'{self.prefix}_preservation_by_length.tsv'
        )
        self.preservation_by_length_svg = path.join(
            self.output_dir, f'{self.prefix}_preservation_by_length.svg'
        )
        self.dp_aggregates = config['dp_aggregates']

    def _load_sensitive_aggregates(self):
        if not path.exists(self.sensitive_aggregated_data_json):
            logging.info('Computing sensitive aggregates...')
            self.sen_sds_processor = sds.SDSProcessor(
                self.sensitive_microdata_path,
                self.sensitive_microdata_delimiter,
                self.use_columns,
                self.sensitive_zeros,
                self.record_limit
            )
            self.sen_aggregated_data = self.sen_sds_processor.aggregate(
                self.reporting_length,
                0
            )
        else:
            logging.info('Loading sensitive aggregates...')
            self.sen_aggregated_data = sds.AggregatedData.read_from_json(
                self.sensitive_aggregated_data_json
            )
            self.sen_sds_processor = sds.SDSProcessor.from_aggregated_data(
                self.sen_aggregated_data
            )

        self.reporting_length = self.sen_sds_processor.normalize_reporting_length(
            self.reporting_length
        )

    def _load_synthetic_aggregates(self):
        logging.info('Computing synthetic aggregates...')
        self.syn_sds_processor = sds.SDSProcessor(
            self.synthetic_microdata_path,
            "\t",
            self.use_columns,
            self.sensitive_zeros,
            self.record_limit
        )
        self.syn_aggregated_data = self.syn_sds_processor.aggregate(
            self.reporting_length,
            0
        )

    def _do_records_analysis(self):
        logging.info('Performing records analysis on sensitive aggregates...')
        self.records_analysis_data = self.sen_aggregated_data.calc_records_analysis_by_len(
            self.reporting_resolution, True
        )
        self.records_analysis_data.write_records_analysis(
            self.record_analysis_tsv, '\t'
        )

    def _compare_synthetic_and_sensitive_rare(self):
        logging.info(
            'Comparing synthetic and sensitive aggregates rare combinations...')
        rare_combinations_data = self.sds_evaluator.compare_synthetic_and_sensitive_rare(
            self.syn_aggregated_data, self.sen_aggregated_data, self.reporting_resolution, ' AND ', True
        )
        rare_combinations_data.write_rare_combinations(
            self.synthetic_rare_combos_tsv, '\t'
        )

    def _write_parameters(self):
        logging.info('Writing evaluation parameters...')
        total_sen = self.sen_sds_processor.protected_number_of_records(
            self.reporting_resolution
        )
        with open(self.parameters_tsv, 'w') as f:
            f.write('\t'.join(['parameter', 'value'])+'\n')
            f.write(
                '\t'.join(['resolution', str(self.reporting_resolution)])+'\n'
            )
            f.write('\t'.join(['limit', str(self.reporting_length)])+'\n')
            f.write(
                '\t'.join(['total_sensitive_records', str(total_sen)])+'\n'
            )
            f.write('\t'.join(['unique_identifiable', str(
                self.records_analysis_data.get_total_unique())])+'\n'
            )
            f.write('\t'.join(['rare_identifiable', str(
                self.records_analysis_data.get_total_rare())])+'\n'
            )
            f.write('\t'.join(['risky_identifiable', str(
                self.records_analysis_data.get_total_risky())])+'\n'
            )
            f.write(
                '\t'.join(['risky_identifiable_pct', str(
                    100*self.records_analysis_data.get_total_risky()/total_sen)])+'\n'
            )

    def _find_leakages(self):
        logging.info(
            'Looking for leakages from the sensitive dataset on the synthetic dataset...')
        comb_counts = self.syn_aggregated_data.calc_combinations_count_by_len()
        leakage_counts = self.sds_evaluator.calc_leakage_count(
            self.sen_aggregated_data, self.syn_aggregated_data, self.reporting_resolution
        )

        with open(self.leakage_tsv, 'w') as f:
            f.write('\t'.join(
                ['syn_combo_length', 'combo_count', 'leak_count', 'leak_proportion'])+'\n'
            )
            for length in range(1, self.reporting_length + 1):
                combo_count = comb_counts.get(length, 0)
                leak_count = leakage_counts.get(length, 0)
                if not self.dp_aggregates:
                    # by design there should be no leakage
                    assert leak_count == 0
                leak_prop = leak_count/combo_count if combo_count > 0 else 0
                f.write('\t'.join(
                    [str(length), str(combo_count), str(leak_count), str(leak_prop)])+'\n'
                )

        util.plotStats(
            x_axis='syn_combo_length',
            x_axis_title='Length of Synthetic Combination',
            y_bar='combo_count',
            y_bar_title='Count of Combinations',
            y_line='leak_proportion',
            y_line_title=f'Proportion of Leaked (<{self.reporting_resolution}) Combinations',
            color='violet',
            darker_color='darkviolet',
            stats_tsv=self.leakage_tsv,
            stats_svg=self.leakage_svg,
            delimiter='\t',
            style='whitegrid',
            palette='magma'
        )

    def _calculate_preservation_by_count(self):
        logging.info('Calculating preservation by count...')
        preservation_by_count = self.sds_evaluator.calc_preservation_by_count(
            self.sen_aggregated_data, self.syn_aggregated_data, self.reporting_resolution
        )
        preservation_by_count.write_preservation_by_count(
            self.preservation_by_count_tsv, '\t'
        )

        util.plotStats(
            x_axis='syn_count_bucket',
            x_axis_title='Count of Filtered Synthetic Records',
            y_bar='mean_combo_length',
            y_bar_title='Mean Length of Combinations',
            y_line='count_preservation',
            y_line_title='Count Preservation (Synthetic/Sensitive)',
            color='lightgreen',
            darker_color='green',
            stats_tsv=self.preservation_by_count_tsv,
            stats_svg=self.preservation_by_count_svg,
            delimiter='\t',
            style='whitegrid',
            palette='magma'
        )

        util.plotStats(
            x_axis='syn_count_bucket',
            x_axis_title='Count of Filtered Synthetic Records',
            y_bar='mean_combo_length',
            y_bar_title='Mean Length of Combinations',
            y_line='mean_absolute_error',
            y_line_title='Mean absolute error (Synthetic - Sensitive)',
            color='lightgreen',
            darker_color='green',
            stats_tsv=self.preservation_by_count_tsv,
            stats_svg=self.absolute_error_by_count_svg,
            delimiter='\t',
            style='whitegrid',
            palette='magma'
        )

    def _calculate_preservation_by_length(self):
        logging.info('Calculating preservation by length...')
        preservation_by_length = self.sds_evaluator.calc_preservation_by_length(
            self.sen_aggregated_data, self.syn_aggregated_data, self.reporting_resolution
        )
        preservation_by_length.write_preservation_by_length(
            self.preservation_by_length_tsv, '\t'
        )

        util.plotStats(
            x_axis='syn_combo_length',
            x_axis_title='Length of Combination',
            y_bar='mean_combo_count',
            y_bar_title='Mean Synthetic Count',
            y_line='count_preservation',
            y_line_title='Count Preservation (Synthetic/Sensitive)',
            color='cornflowerblue',
            darker_color='mediumblue',
            stats_tsv=self.preservation_by_length_tsv,
            stats_svg=self.preservation_by_length_svg,
            delimiter='\t',
            style='whitegrid',
            palette='magma'
        )

    def run(self):
        logging.info(
            f'Evaluate {self.synthetic_microdata_path} vs {self.sensitive_microdata_path}'
        )
        start_time = time.time()

        self._load_sensitive_aggregates()
        self._load_synthetic_aggregates()
        self._do_records_analysis()
        self._compare_synthetic_and_sensitive_rare()
        self._write_parameters()
        self._find_leakages()
        self._calculate_preservation_by_count()
        self._calculate_preservation_by_length()

        logging.info(
            f'Evaluated {self.synthetic_microdata_path} vs {self.sensitive_microdata_path}, took {datetime.timedelta(seconds = time.time() - start_time)}s')


def evaluate(config):
    """Evaluates the error in the synthetic microdata with respect to the sensitive microdata.

    Produces output statistics (tsv) and graphics (svg) for preservation_by_length and preservation_by_count,
    as well as leakage analysis from the synthetic data (as synthetic_leakage_by_length).

    Args:
        config: options from the json config file, else default values.
    """
    Evaluator(config).run()
