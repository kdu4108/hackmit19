import json
import numpy as np
import pandas as pd

def extract_dictionaries(data_file):
    with open(data_file, 'r+') as f:
        json_data_string = f.read()
    json_data_strings = json_data_string.split('\n')
    json_data_strings = [data for data in json_data_strings if data]
    json_datas = [json.loads(data_string) for data_string in json_data_strings]
    return json_datas

def transform_dict(datapoint):
    return {'timestamp': datapoint['timestamp'], datapoint['name']:datapoint['value']}

def get_first_valid_value(df, column, ignore):
    valid_locs = df.index[df[column].apply(lambda value: pd.notna(value) and value not in ignore)]
    if len(valid_locs):
        first_valid_loc = valid_locs[0]
        first_valid_status = df.iloc[first_valid_loc][column]
        return first_valid_status
    else:
        return None
    
def fix_nan_value(df, column, ignore, initial_value_dict, default_initial):
    if column in df.columns:
        first_valid_value = get_first_valid_value(df, column, ignore)
        initial_value = None
        if first_valid_value in initial_value_dict:
            initial_value = initial_value_dict[first_valid_value]
        else:
            initial_value = default_initial
        df[column] = df[column].fillna(initial_value)
    
def get_table(data_file, remove_nan=False):
    json_datas = extract_dictionaries(data_file)
    data_dicts = [transform_dict(json_data) for json_data in json_datas]
    data_table = pd.DataFrame(data_dicts).set_index('timestamp').reset_index().fillna(method='ffill')
    if 'door_status' in data_table.columns:
        data_table = data_table.drop(['door_status'], axis=1)
    fix_nan_value(data_table, 'ignition_status', ['accessory'], {'off': 'run'}, 'off')
    fix_nan_value(data_table, 'windshield_wiper_status', [], {False: True, True: False}, False)
    fix_nan_value(data_table, 'headlamp_status', [], {False: True, True: False}, False)
    fix_nan_value(data_table, 'button_state', [], {'pressed': 'depressed', 'depressed': 'pressed'}, 'depressed')
    fix_nan_value(data_table, 'transmission_gear_position', [], {}, 'first')
    fix_nan_value(data_table, 'brake_pedal_status', [], {False: True, True: False}, False)
    if remove_nan:
        return data_table.dropna()
    else:
        return data_table
    
    