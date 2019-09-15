import json
import numpy as np
import pandas as pd
import raw_data_processing as rdp

def write_speed_vs_time_data_to_csv(data):
    
    table = rdp.get_table(data)
    cols_wanted = ['timestamp','vehicle_speed',     'fuel_consumed_since_restart','odometer']
    cols_to_delete = []
    for col in list(table):
        if col not in cols_wanted:
            cols_to_delete.append(col)
    table = table.drop(cols_to_delete, axis=1)
    table = rdp.remove_nan_from_table(table, cols_wanted)
    mpg = [0]
    for r in range(1,len(table)):
        delta_d = table['odometer'][r] - table['odometer'][r]
        delta_f = table['fuel_consumed_since_restart'][r] - table['odometer'][r]
        inst_mpg = delta_d/delta_f
        mpg.append(inst_mpg)
    table['instantaneous_mpg'] = mpg
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