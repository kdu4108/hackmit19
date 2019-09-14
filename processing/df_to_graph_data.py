def write_speed_vs_time_data_to_csv():
    """
    TODO:
    1. Read in a single json -> df using raw_data_processing.py
    2. convert that df to have just timestamp, speed columns.
    3. write to csv

    ex output:
    Time, Speed
    1, 2
    2, 3
    3, 5
    4, 6
    5, 7
    6, 1
    """
    pass

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
    write_speed_vs_time_data_to_csv()
    write_mpg_vs_behavior_data_to_csv()

if __name__ == "__main__":
    main()