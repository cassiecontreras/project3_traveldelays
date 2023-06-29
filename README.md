<c>![image](https://github.com/cassiecontreras/project3_traveldelays/assets/126130038/4f372694-35f9-4c81-83a6-e3e9e1a95752)</c>



# Project 3: Airline Delays in US

## Contributors 
Chun Zhao, Rihanna Afkami, Jing Xu, Jerrett Williams, Cassie Contreras

## Background
In a post-COVID era, the aviation industry experienced a shortage of airline workers, and struggled to meet the high demand. Travelers in 2022 were most likely to experience flight delays and cancellations.  

Using data from U.S. Department of Transportation's (DOT) Bureau of Transportation Statistics (BTS), we gathered a year’s worth of data from 03/2022 to 03/2023 to track the on-time performance of domestic flights operated by several different large air carriers.   

## Key Things to Note
What is considered “delayed”?
A flight is considered delayed when it arrived 15 or more minutes later than the schedule

How many airline carriers are we comparing in our Dashboard?
17 major airline carriers
(Endeavor Air Inc., American Airlines Inc., Alaska Airlines Inc., JetBlue Airways, Delta Air Lines Inc., Frontier Airlines Inc., Allegiant Air, Hawaiian Airlines Inc., Envoy Air, Spirit Airlines, PSA Airlines Inc., SkyWest Airlines Inc., United Air Lines Inc., Southwest Airlines Co., Republic Airline, Horizon Air, Mesa Airlines Inc.)

Reporting Dates: 03/2022 - 03/2023

## Coding Approach

### 1) Clean downloaded Kaggle data and create dataframe using Jupyter Notebook
```

import numpy as np
import pandas as pd
from pandas import DataFrame, Series
import re
from pathlib import Path
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

file = Path('Resources/Airline_Delay_Cause.csv')

df = pd.read_csv(file) 

# Review columns in data
df.columns

# Check data types
df.dtypes

# Review unique carrier names to identify what will be excluded
df.carrier_name.unique()

# Confirm that airlines were removed
df.carrier_name.unique()

# Create a new column that calculates delayed % of flights
df["arr_del15_per"] = df["arr_del15"] / df["arr_flights"]

# Create a new column that calculates delayed flights due to weather
df["arr_weather_delay_per"] = df["weather_ct"] / df["arr_flights"]

# Create a new column that calculates delayed flights due to air carrier
df["arr_carrier_delay_per"] = df["carrier_ct"] / df["arr_flights"]

# Create a new column that calculates delayed flights due to National Aviation System (e.g. heavy air traffic)
df["arr_nas_delay_per"] = df["nas_ct"] / df["arr_flights"]

# Create a new column that calculates delayed flights as a result of another flight on same aircraft delayed
df["arr_late_aircraft_delay_per"] = df["late_aircraft_ct"] / df["arr_flights"]

# Create a new column that calculates cancelled % of flights
df["arr_cancelled_per"] = df["arr_cancelled"] / df["arr_flights"]

# Create a new column that calculates cancelled flights due to security breach
df["arr_security_cancelled_per"] = df["security_ct"] / df["arr_flights"]

# Split airport_name column into 2 separate columns to identify city and state
df[['location', 'airport']] = df['airport_name'].str.split(pat=':', expand = True)
df[['location', 'airport']]

# Delete airport_name column as it's no longer needed and now split
del df['airport_name']
df

# Delete nulls
df.dropna(how='any', inplace=True)

df.to_csv('AirlineDelays.csv', encoding='utf-8', index=False)

connection_string = "postgres:***********@localhost:5432/Travel"
engine = create_engine(f'postgresql://{connection_string}')

engine.table_names()

# Load dataframe into database
df.to_sql(name='airlinedelays', con=engine, if_exists='append', index=False)

pd.read_sql_query('select * from airlinedelays', con=engine).head()

```

### 2) Import Data into Database using SQL in PGADMIN

```
DROP TABLE IF EXISTS AirlineDelays CASCADE;

CREATE TABLE AirlineDelays (
    year int,
	month int,
	carrier varchar,
	carrier_name varchar,
	airport varchar,
	arr_flights float,
	arr_del15 float,
	carrier_ct float,
	weather_ct float, 
	nas_ct float,
	security_ct float,
	late_aircraft_ct float,
	arr_cancelled float,
	arr_diverted float,
	arr_delay float,
	carrier_delay float,
	weather_delay float,
	nas_delay float,
	security_delay float,
	late_aircraft_delay float,
	arr_del15_per float,
	arr_weather_delay_per float,
	arr_carrier_delay_per float,
	arr_nas_delay_per float,
	arr_late_aircraft_delay_per float,
	arr_cancelled_per float,
	arr_security_cancelled_per float,
	location varchar);
	
	select * from AirlineDelays
```

### 3) Create Flask

```
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################

connection_string = 'postgresql+psycopg2://postgres:******************@localhost:5432/Travel'
engine = create_engine(connection_string)
# print(engine.table_names())
connect=engine.connect()
print(connect)
query= "select * from airlinedelays"


#################################################
# Flask Setup
#################################################
application = Flask(__name__)

#################################################
# Flask Routes
#################################################
@application.route('/data', methods=['GET'])
def get_data():
    results=pd.read_sql(query,connect)
    # print(results.to_json())
    return results.to_json()

@application.route("/")

def home():
    return render_template("index.html")



if __name__ == '__main__':
    application.run()


```

### 4) Create Dashboard
![image](https://github.com/cassiecontreras/project3_traveldelays/assets/126130038/b57f5268-3628-4bc7-b26f-03c16e368d01)


## Data
Source: https://www.transtats.bts.gov/OT_Delay/OT_DelayCause1.asp

Collection Methodology: Download data from website

## Helpful Links
https://docs.google.com/presentation/d/1L1K8PFo1JNqibXPOC91UDdhwLPghLYAs_3HlyF4oxX0/edit#slide=id.g255c80a5b5d_0_41 


