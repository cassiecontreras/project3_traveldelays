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
# print(connect)
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
