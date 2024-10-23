# app.py
from flask import Flask
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'animal-adoption-app.cjqaq2ssgxlm.us-east-2.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = '0BIzTypE1AT2AIk3EfjA'
app.config['MYSQL_DB'] = 'adoption_app'

mysql = MySQL(app)

@app.route('/')
def home():
    #return "Hello, Flask!"
    cur = mysql.connection.cursor()
    cur.execute("SELECT text from diagnostic where id = 1;") # test to verify working connection
    data = cur.fetchone()
    return "Good news, everyone! " + str(data[0])

if __name__ == '__main__':
    app.run(debug=True)
