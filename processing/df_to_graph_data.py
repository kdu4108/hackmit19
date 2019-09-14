import json
from os import listdir
from os.path import isfile, join
import numpy as np
import pandas as pd
import raw_data_processing as rdp
from raw_data_processing import get_table, remove_nan_from_table

def write_speed_vs_time_data_to_csv(data):
    
    table = rdp.get_table(data)
    table = table.drop(['engine_speed', 'brake_pedal_status', 'latitude',           'longitude', 'fuel_consumed_since_restart', 'steering_wheel_angle', 'fine_odometer_since_restart', 'parking_brake_status', 'headlamp_status', 'windshield_wiper_status', 'odometer', 'high_beam_status', 'fuel_level', 'ignition_status', 'powertrain_torque', 'accelerator_pedal_position', 'transmission_gear_position'], axis=1)
    table.to_csv('time_v_speed.csv')
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
    write_speed_vs_time_data_to_csv(data)
    write_mpg_vs_behavior_data_to_csv()

if __name__ == "__main__":
    main()