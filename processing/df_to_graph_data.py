import json
import numpy as np
import pandas as pd
import raw_data_processing as rdp

def write_speed_vs_time_data_to_csv(data):
    
    table = rdp.get_table(data)
    table = table.drop(['engine_speed', 'brake_pedal_status', 'latitude',           'longitude', 'fuel_consumed_since_restart', 'steering_wheel_angle', 'fine_odometer_since_restart', 'parking_brake_status', 'headlamp_status', 'windshield_wiper_status', 'odometer', 'high_beam_status', 'fuel_level', 'ignition_status', 'powertrain_torque', 'accelerator_pedal_position', 'transmission_gear_position'], axis=1)
    table.to_csv('time_v_speed.csv')
    return table

def write_mpg_vs_behavior_data_to_csv():
    """
    TODO:
    1. Read in all jsons that are under the behavior directory.
    2. write a function to calculate mpg
    3. create df with columns [behavior, mpg]
    4. write to csv
    
    ex. output:

    Behavior, MPG
    Idling, 10
    Highway, 48
    Sleeping, 0
    """
    pass

def main():
    write_speed_vs_time_data_to_csv(data)
    write_mpg_vs_behavior_data_to_csv()

if __name__ == "__main__":
    main()