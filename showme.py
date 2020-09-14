import logging
import json
import pandas as pd
from urllib import request
from os import path, mkdir
from showcase import runPipeline

def main():
    logging.basicConfig(format="%(funcName)s: %(message)s", level=logging.INFO)
    output_dir = './german_credit_showcase/'
    sensitive_microdata_path = output_dir + 'german_credit_data.tsv'

    if not path.exists(output_dir):
        mkdir(output_dir)
    
    if not path.exists(sensitive_microdata_path):
        attributes = []
        codes = {}
        logging.info('Retrieving data documentation...')
        codes_file = request.urlopen('https://archive.ics.uci.edu/ml/machine-learning-databases/statlog/german/german.doc').readlines() 
        logging.info('Retrieved')
        state = 'skip'
        attribute = ''
        code = ''
        value = ''
        for line in [x.decode('UTF-8').strip() for x in codes_file]:
            if line == '':
                state = 'skip'
            elif state == 'skip':
                if str.startswith(line, 'Att'):
                    state = 'attribute'
            elif state == 'attribute':
                attribute = line.strip()
                attributes.append(attribute)
                codes[attribute] = {}
                state = 'values'
            elif state == 'values':
                split = line.index(':') if ':' in line else -1
                if split != -1:
                    code = line[:split].strip()
                    value = line[split+1:].strip().replace(':', '-')
                    codes[attribute][code] = value
                else:
                    codes[attribute][code] += ' ' + line.replace(':', '-')
        attributes.append('Credit rating')
        codes['Credit rating'] = { '1': 'Good', '2': 'Bad'}

        logging.info('Retrieving data file...')
        df = pd.read_csv('https://archive.ics.uci.edu/ml/machine-learning-databases/statlog/german/german.data', 
            sep=' ', index_col=False, header=None, names=attributes)

        logging.info('Retrieved')
        logging.info('Processing dataset...')
        values, labels = binValuesAndLabels(df['Duration in month'].max(), 12)
        df['Duration in month'] = pd.cut(df['Duration in month'], bins=values, labels=labels)   
        values, labels = binValuesAndLabels(df['Credit amount'].max(), 2500)
        df['Credit amount'] = pd.cut(df['Credit amount'], bins=values, labels=labels)
        values, labels = binValuesAndLabels(df['Age in years'].max(), 20)
        df['Age in years'] = pd.cut(df['Age in years'], bins=values, labels=labels)


        df = df.astype(str).replace(to_replace=r'^nan$', value='', regex=True)

        for att in attributes:
            df[att] = df[att].replace(codes[att])

        
        del df['foreign worker']
        del df['Property']
        del df['Telephone']
        del df['Other debtors / guarantors']
        del df['Number of people being liable to provide maintenance for']
        del df['Other installment plans']
        del df['Savings account/bonds']
        del df['Present employment since']
        del df['Status of existing checking account']

        df.to_csv(sensitive_microdata_path, sep='\t', index=False)
        logging.info('Processed')

    config = {
        'parallel_jobs': 1,
        'memory_limit_pct': 90,
        'use_columns': [],
        'record_limit': -1,
        'reporting_length': 5,
        'reporting_precision': 2,
        'reporting_threshold': 2,
        'seeded': True,
        'sensitive_zeros': [],
        'prefix': 'credit',
        'output_dir': output_dir,
        'sensitive_microdata_path': sensitive_microdata_path,
        'sensitive_microdata_delimiter': '\t',
        'report_title': 'German Credit Data Showcase',

    }

    json.dump(config, open(path.join('.', config['prefix'] + '_config.json'), 'w'), indent=1)

    config['aggregate'] = True
    config['generate'] = True
    config['navigate'] = True
    config['evaluate'] = True

    config['reportable_aggregates_path'] = path.join(config['output_dir'], config['prefix'] + '_reportable_aggregates.tsv')
    config['synthetic_microdata_path'] = path.join(config['output_dir'], config['prefix'] + '_synthetic_microdata.tsv')
    config['sensitive_aggregates_path'] = path.join(config['output_dir'], config['prefix'] + '_sensitive_aggregates.tsv')

    runPipeline(config)

def binValuesAndLabels(max_value, bin_size):
    values = [0]
    labels = []
    upper = bin_size
    while upper < max_value:
        values.append(upper)
        labels.append(f'{upper-bin_size}-{upper}')
        upper += bin_size
    return values, labels

if __name__ == '__main__':
    main( )
