import json
from os import listdir
from os.path import isfile, join
import numpy as np
import pandas as pd
import raw_data_processing as rdp
import matplotlib
from raw_data_processing import get_table, remove_nan_from_table

def write_time_vs_speed_data_to_csv(filename):
    table = rdp.get_table(filename)
    cols_wanted = ['timestamp','vehicle_speed', 'fuel_consumed_since_restart','odometer']
    cols_to_delete = []
    for col in list(table):
        if col not in cols_wanted:
            cols_to_delete.append(col)
    table = table.drop(cols_to_delete, axis=1)
    table = rdp.remove_nan_from_table(table, cols_wanted)
    np_delta_d = np.diff(table['odometer'], n = 1)
    np_delta_f = np.diff(table['fuel_consumed_since_restart'], n = 1)
    np_mpg = np.divide(np_delta_d, np_delta_f, out = np.zeros_like(np_delta_d), where=np_delta_f != 0)
    table['instantaneous_mpg'] = [0] *1 + list(np_mpg)
    table.loc[table['instantaneous_mpg'] <= 0,'instantaneous_mpg'] = np.nan
    table.loc[table['instantaneous_mpg'] >= 100,'instantaneous_mpg'] = np.nan
    table = table.interpolate(method="linear", limit=1000)
    table[['instantaneous_mpg']] = table[['instantaneous_mpg']].fillna(value=0)
    table.drop(table.columns.difference(["timestamp", "vehicle_speed", "instantaneous_mpg"]), 1, inplace=True)
    behavior = filename.split("/")[-1][:-5]
    table.to_csv(f"../data/time_v_speed_and_mpg/{behavior}.csv")
    return table

    
def write_mpg_vs_behavior_data_to_csv():
    BEHAVIOR_DATA_DIR = '../data/behavior'
    BEHAVIOR_DATA_FILES = [f for f in listdir(BEHAVIOR_DATA_DIR) if isfile(join(BEHAVIOR_DATA_DIR, f))]
    BAD_DATA = ['localwithgps.json', 'driving.json']
    BEHAVIOR_DATA_FILES = [f for f in BEHAVIOR_DATA_FILES if f not in BAD_DATA]
    
    def get_accumulation_without_jumps(values, direction):
        increments = np.diff(values)
        increments = increments[increments * direction >= 0]
        return sum(increments)
    
    def get_miles_per_gallon(df, columns):
        odometer = df[columns[0]]
        fuel = df[columns[1]]
        kilometers = get_accumulation_without_jumps(odometer, 1)
        liters = get_accumulation_without_jumps(fuel, 1)
        miles = kilometers * 0.621371
        gallons = liters * 0.264172
        return miles/gallons
    
    def capitalize(name):
        return name[0].upper() + name[1:].lower()
    
    def get_uppercase_name(json_name):
        stripped = json_name.split('.')[0]
        dashed = stripped.split('-')
        return ' '.join([capitalize(part) for part in dashed])
    
    def get_desired_columns(df, column_groups):
        desired_columns = []
        for group in column_groups:
            desired_columns.append(next((column for column in group if column in df.columns), None))
        return desired_columns
    
    data = []
    for file_name in BEHAVIOR_DATA_FILES:
        df = get_table(join(BEHAVIOR_DATA_DIR, file_name))
        relevant_columns = get_desired_columns(df, [['odometer', 'fine_odometer_since_restart'], ['fuel_consumed_since_restart']])
        df = remove_nan_from_table(df, relevant_columns)
        df = df[relevant_columns]
        mpg = get_miles_per_gallon(df, relevant_columns)
        display_name = get_uppercase_name(file_name)
        data.append({'Behavior': display_name, 'MPG': mpg})
        
    df = pd.DataFrame(data)
    df.to_csv('mpg_data.csv')
            
    
def main():
    for filename in os.listdir("../data/behavior"):
        print(os.listdir("../data/behavior"))
        if filename != 'parked.json': 
            write_time_vs_speed_data_to_csv("../data/behavior/"+filename)
        else:
            continue

    write_mpg_vs_behavior_data_to_csv()

if __name__ == "__main__":
    main()