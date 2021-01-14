import zipfile
from shutil import copyfile, make_archive, rmtree, move
import pandas as pd
import os
import math
import json
import copy
import logging
import argparse
import time
import util as util

class Navigator ():

    def __init__(self, config):
        self.column_group_separator = ':'
        self.prefix = config.get('prefix', '')
        self.output_dir = config.get('output_dir', './')
        self.use_columns = config.get('use_columns', [])
        self.identifier_column = config.get('identifier_column', None)
        self.event_column = config.get('event_column', None)
        self.reportable_aggregates = '%s/%s_reportable_aggregates.tsv' %(self.output_dir, self.prefix)
        self.synthetic_microdata = '%s/%s_synthetic_microdata.tsv'  %(self.output_dir, self.prefix)
        self.renamed_reportable_aggregates = '%s/rounded_aggregates.tsv' %(self.output_dir)
        self.synthetic_attributes = '%s/synthesized_attributes.tsv' %(self.output_dir)
        self.template_original_loc = './template/data_showcase.pbit'
        self.temporary_zip_loc = '%s/privatize.zip' %(self.output_dir)
        self.temporary_folder_loc = '%s/privatize' %(self.output_dir)
        self.data_schema_loc = '%s/DataModelSchema' %(self.temporary_folder_loc)
        self.data_mashup_loc = '%s/DataMashup' %(self.temporary_folder_loc)
        self.data_mashup_zip_loc = '%s/zip_archive.zip' %(self.temporary_folder_loc)
        self.data_mashup_temp_loc = '%s/zip_archive' %(self.temporary_folder_loc)
        self.m_file_loc = '%s/Formulas/Section1.m' %(self.data_mashup_temp_loc)
        self.layout_loc = '%s/Report/Layout' %(self.temporary_folder_loc)
        self.template_final_loc = '%s/%s_data_showcase.pbit' %(self.output_dir, self.prefix)
        self.max_number_of_visuals = 64
        self.number_of_visuals_per_page = 16
        self.number_of_combo_tables = 10
        self.max_number_of_pages = math.ceil(self.max_number_of_visuals/self.number_of_visuals_per_page)
        self.template_title = config.get('report_title', '')
        self.template_layout = config.get('report_pages', {})
        self.template_combined_attributes = config.get('report_visuals', {})


    def actual_measure(self, combo_tables):
        '''Creates a measure string for filtered actual aggregated results'''
        whole = '\nVAR target_attribute = SELECTCOLUMNS(synthesized_attributes, "attribute:value", SELECTEDVALUE(disconnected_table[attribute:value]))'
        all_filters_pre = '\nVAR all_filters = DISTINCT(FILTER(UNION(target_attribute, '
        all_filters_list = []
        for i, name in enumerate(self.sorted_names):
            if name in combo_tables:
                #attribute, value = name.split(":", 1)
                table_and_column = "{0}[attribute:value]".format(combo_tables[name])
                part1 = '\nVAR attr_{0}_filters = FILTERS({1})'.format(i+1, table_and_column)
            else:
                table_and_column = 'synthesized_pivoted[{0}]'.format(name)
                composed = '"{0}:" & [{0}]'.format(name)
                part1 = '\nVAR attr_{0}_filters = SELECTCOLUMNS(FILTERS({1}), "attribute:value", {2})'.format(i+1, table_and_column, composed) 
            part = part1 + '\nVAR is_attr_{0}_filtered = COUNTROWS(attr_{0}_filters) <> COUNTROWS(DISTINCT(ALL({1})))\nVAR filters_{0} = FILTER(attr_{0}_filters, is_attr_{0}_filtered)'.format(i+1, table_and_column)   
            whole +=part
            all_filters_list.append('filters_{0}'.format(i+1))
        all_filters = all_filters_pre + ', '.join(all_filters_list)
        whole += all_filters + '), [attribute:value] <> BLANK()))\nVAR sorted_filter = CONCATENATEX(all_filters, [attribute:value], ";", [attribute:value], ASC)\nVAR corrected_filter = IF(ISBLANK(sorted_filter), "", sorted_filter)\nVAR actual_count = LOOKUPVALUE(rounded_aggregates[protected_count], rounded_aggregates[selections], corrected_filter, BLANK())\nRETURN actual_count'    
        return whole


    def add_filter_steps(self, m_expression, filters_list):
        '''Adds additional filtering steps to M expression of a table'''
        filter_expressions = []
        for item in filters_list:
            filter_expressions.append('[#"attribute:value"] = "' + item + '"')
        all_filters = ' or '.join(filter_expressions)
        filtered = m_expression.split('\nin\n')[0] + ',\n    #"Filtered Rows" = Table.SelectRows(#"Changed Type", each ({0}))\nin\n    #"Filtered Rows"'.format(all_filters)
        return filtered


    def change_table_schema(self, data, visual_name, table_name):
        '''Returns model schema with filter steps added for a table'''
        table_index = int(table_name.split('_')[1]) + 4
        filters_list = self.template_combined_attributes[visual_name]
        expression_copy = copy.deepcopy(data['model']['tables'][table_index]['partitions'][0]['source']['expression'])
        expression_updated = self.add_filter_steps(expression_copy, filters_list)
        data['model']['tables'][table_index]['partitions'][0]['source']['expression'] = expression_updated
        return data

    
    def change_table_mashup(self, mashup, visual_name, table_name):
        '''Returns data mashup with filter steps added for a table'''
        filter_expressions = []
        filters_list = self.template_combined_attributes[visual_name]
        for item in filters_list:
            filter_expressions.append('[#"attribute:value"] = "' + item + '"')
        all_filters = ' or '.join(filter_expressions)
        first_split = mashup.split('shared {0}'.format(table_name))
        second_split = first_split[1].split('\nin\n    #"Changed Type"', 1)
        mashup = first_split[0] + 'shared {0}'.format(table_name) + second_split[0] + ',\n    #"Filtered Rows" = Table.SelectRows(#"Changed Type", each ({0}))\nin\n    #"Filtered Rows"'.format(all_filters) + second_split[1]
        return mashup


    def change_visual(self, attr_container, name, table, title):
        '''Transforms visual container of Attribute Slicer to handle a new column'''    
        visual_config = json.loads(attr_container['config'])
        event = self.event_column if self.event_column else name
        agg_function = 2 if self.event_column and name != self.event_column else 5
        visual_config['singleVisual']['projections']['Values'][0]['queryRef'] = 'CountNonNull({0}.{1})'.format(table, event)
        visual_config['singleVisual']['projections']['Category'][0]['queryRef'] = '{0}.{1}'.format(table, name)
        visual_config['singleVisual']['prototypeQuery']['From'][0]['Name'] = table[0]
        visual_config['singleVisual']['prototypeQuery']['From'][0]['Entity'] = table
        visual_config['singleVisual']['prototypeQuery']['Select'][1]['Name'] = 'CountNonNull({0}.{1})'.format(table, event)
        visual_config['singleVisual']['prototypeQuery']['Select'][1]['Aggregation']['Expression']['Column']['Property'] = event
        visual_config['singleVisual']['prototypeQuery']['Select'][1]['Aggregation']['Expression']['Column']['Expression']['SourceRef']['Source'] = table[0]
        visual_config['singleVisual']['prototypeQuery']['Select'][1]['Aggregation']['Function'] = agg_function
        visual_config['singleVisual']['prototypeQuery']['Select'][0]['Column']['Expression']['SourceRef']['Source'] = table[0]
        visual_config['singleVisual']['prototypeQuery']['Select'][0]['Column']['Property'] = name
        visual_config['singleVisual']['prototypeQuery']['Select'][0]['Name'] = '{0}.{1}'.format(table, name)
        visual_config['singleVisual']['prototypeQuery']['OrderBy'][0]['Expression']['Aggregation']['Expression']['Column']['Expression']['SourceRef']['Source'] = table[0]
        visual_config['singleVisual']['prototypeQuery']['OrderBy'][0]['Expression']['Aggregation']['Expression']['Column']['Property'] = event
        visual_config['singleVisual']['prototypeQuery']['OrderBy'][0]['Expression']['Aggregation']['Function'] = agg_function
        visual_config['singleVisual']['vcObjects']['title'][0]['properties']['text']['expr']['Literal']['Value'] = "'{0}'".format(title)
        if self.event_column and name == self.event_column:
            visual_config['singleVisual']['projections']['Color'] = [{'queryRef':'{0}.{1}'.format(table, name)}]
            visual_config['singleVisual']['objects']['dataPoint'] = [
                {'properties': {'colorMode': {'expr': {'Literal': {'Value': '0D'}}},
                                'startColor': {'solid': {'color': {'expr': {'ThemeDataColor': {'ColorId': 0, 'Percent': -0.3}}}}},
                                'endColor': {'solid': {'color': {'expr': {'ThemeDataColor': {'ColorId': 0, 'Percent': -0.3}}}}}}}]
        attr_container['config'] = json.dumps(visual_config)
        filters = []
        attr_container['filters'] = json.dumps(filters)
        return attr_container


    def change_title(self, attr_container):
        '''Changes the text of the title. Recommended length is up to 50 characters'''
        visual_config= json.loads(attr_container['config'])
        visual_config['singleVisual']['objects']['general'][0]['properties']['paragraphs'][0]['textRuns'][0]['value'] = self.template_title
        new_config = json.dumps(visual_config)
        attr_container['config'] = new_config
        return attr_container


    def prepare_layout(self):
        '''Checks if a custom layout is required and assigns visuals to pages'''
        layout = []
        if self.template_layout:
            checked_type = isinstance(self.template_layout, dict)
            if not checked_type:
                logging.info('"report_pages" parameter is in the wrong format. The dictionary as follows is expected: {"Page Name 1": ["Column1", "Column2"], "Page Name 2": ["Column3", "Column4"]}.')
            page_names = [] if not checked_type else list(self.template_layout.keys())[:min(self.max_number_of_pages, len(self.template_layout))]
            for page in page_names:
                column_names  = self.template_layout[page]
                layout.append(column_names if len(column_names) <= self.max_number_of_visuals else column_names[:self.max_number_of_visuals])
            logging.info('Custom layout is applied')
        else:
            name_index = 0
            page_names = []
            visual_num = min(len(self.names), self.max_number_of_visuals)  
            while name_index < visual_num:
                page = []
                while len(page) < self.number_of_visuals_per_page and name_index < visual_num:
                    page.append(self.names[name_index])
                    name_index +=1
                layout.append(page)
            logging.info('Default layout is applied') 
        return layout, page_names 


    def process(self):
        start_time = time.time()

        logging.info('Renaming and reformatting files with records...')

        copyfile(self.reportable_aggregates, self.renamed_reportable_aggregates)
        df, self.identifier_column = util.loadMicrodata(self.synthetic_microdata, '\t', -1, use_columns=self.use_columns, identifier_column=None) 
        new_df = []
        for i, row in df.iterrows():
            natural_index = row[self.identifier_column]
            [new_df.append([natural_index, ind, value]) for ix, (ind, value) in enumerate(row.items()) if str(value) != '' and ind != self.identifier_column]
        self.test_table = pd.DataFrame(new_df)
        self.test_table.to_csv(self.synthetic_attributes, sep="\t", index=False, header=None)
        logging.info('Done with record files in %s seconds' %( time.time() - start_time ))

        self.names = self.test_table[1].unique().tolist()
        # assign combined attributes to tables(max 10)
        combo_tables = {}
        if self.template_combined_attributes:
            checked_type = isinstance(self.template_combined_attributes, dict)
            if not checked_type:
                logging.info('"report_visuals" parameter is in the wrong format. The dictionary as follows is expected: {"Combined Attribute Name 1": ["attribute1:value", "attribute2:value"]}.')
            combo_list = list(self.template_combined_attributes.keys())[:min(self.number_of_combo_tables, len(self.template_combined_attributes))] if checked_type else []
            combo_tables = {each:'copy_{0}'.format(i+1) for i, each in enumerate(combo_list)}
            self.names  +=  combo_list
        self.sorted_names = sorted(self.names)

        # extract files from the original template
        copyfile(self.template_original_loc, self.temporary_zip_loc)
        with zipfile.ZipFile(self.temporary_zip_loc) as myzip:
            myzip.extractall(path= self.temporary_folder_loc) 
        os.remove(self.temporary_zip_loc)
        logging.info('Done extracting template files')

        ### add modified measures to DataModelSchema file and add filtering steps to tables data model schema
        with open(self.data_schema_loc, 'r', encoding='utf-16-le') as json_file:
            data = json.load(json_file)
        data['model']['tables'][4]['measures'][1]['expression'] = self.actual_measure(combo_tables)
        logging.info('Measure strings are added')
        if combo_tables:
            for visual_name, table_name in combo_tables.items():
                data = self.change_table_schema(data, visual_name, table_name)
            logging.info('Filtering steps are added to tables schema')
        with open(self.data_schema_loc, 'w', encoding='utf-16-le') as outfile:
            json.dump(data, outfile, indent=2)   
            
        if combo_tables:        
            ### filter tables in DataMashup file to support combined attributes
            with open(self.data_mashup_loc, "rb") as f:
                bn = f.read()
            # dissassemble to pieces
            pre = bn[:4]
            size_of_zip_bn = bn[4:8]
            size_of_zip = int.from_bytes(bn[4:8], "little")
            # ZIP archive
            start = 8
            end = 8+size_of_zip
            zip_arch = bn[start:end]
            tail = bn[end:]

            # write zipped portion as bin and extract files
            with open(self.data_mashup_zip_loc, "wb") as outfile:
                outfile.write(zip_arch)
            with zipfile.ZipFile(self.data_mashup_zip_loc) as myzip:
                myzip.extractall(path= self.data_mashup_temp_loc)

            # open Section1.m file and add filtering steps
            with open(self.m_file_loc,'r', encoding='utf-8') as myfile:
                mashup = myfile.read()
            for visual_name, table_name in combo_tables.items():
                mashup = self.change_table_mashup(mashup, visual_name, table_name)
            with open(self.m_file_loc, 'w', encoding='utf-8') as outfile:
                outfile.writelines(mashup)

            # zip the archive with changes
            make_archive(self.data_mashup_temp_loc, 'zip', self.data_mashup_temp_loc)
            with open(self.data_mashup_zip_loc, "rb") as z:
                zip_arch = z.read()
            size_of_zip_bn = (len(zip_arch)).to_bytes(4, byteorder='little')

            # remove extra files and directories
            os.remove(self.data_mashup_zip_loc)
            rmtree(self.data_mashup_temp_loc)

            # write down the binary file
            with open(self.data_mashup_loc, "wb") as f:
                f.write(pre + size_of_zip_bn + zip_arch + tail)
            logging.info('Tables are filtered to support combined attributes')

        ### change Layout to support new columns
        with open(self.layout_loc, 'r', encoding='utf-16-le') as json_file:
            layout = json.load(json_file)
        prepared_layout, page_names = self.prepare_layout()      

        # remove extra pages
        pages_to_remove = len(prepared_layout)-len(layout['sections'])
        layout['pods'] = (layout['pods'][:pages_to_remove] if pages_to_remove < 0  else layout['pods'])
        pages = layout['sections']
        pages = (pages[:pages_to_remove] if pages_to_remove < 0  else layout['sections'])

        # assign attributes/columns to visuals, change title.
        persistent_viz_index = [0,1,3,4] 
        attributes_viz_index = [2,7,10,13,5,8,11,14,6,9,12,15,16,17,18,19]  
        
        for i, page in enumerate(pages):
            names_index = 0
            page['displayName'] = page_names[i] if len(page_names)>i else page['displayName']
            containers = page['visualContainers'].copy()
            if self.template_title:
                new = [self.change_title(containers[0])]
                new += [containers[ind] for ind in persistent_viz_index[1:]]
            else:
                new = [containers[ind] for ind in persistent_viz_index]
            viz_index = 0
            while viz_index < len(attributes_viz_index) and names_index < len(prepared_layout[i]):
                attr_container = copy.deepcopy(containers[attributes_viz_index[viz_index]])
                name = prepared_layout[i][names_index]
                if name in combo_tables:
                    attr_container = self.change_visual(attr_container, 'attribute:value', combo_tables[name], name)
                else:
                    self.change_visual(attr_container, name, 'synthesized_pivoted', name)               
                new.append(attr_container)
                names_index += 1
                viz_index +=1
            pages[i]['visualContainers'] = new
        layout['sections'] = pages

        with open(self.layout_loc, 'w', encoding='utf-16-le') as outfile:
            json.dump(layout, outfile, separators=(',', ':')) 
        logging.info('Visual layout is adjusted')

        # pack the template and remove temporary files
        make_archive(self.temporary_folder_loc, 'zip', self.temporary_folder_loc)
        move(self.temporary_zip_loc, self.template_final_loc)
        rmtree(self.temporary_folder_loc)
        logging.info('The template is created')
        logging.info('Total time is %s seconds' %(time.time() - start_time ))

