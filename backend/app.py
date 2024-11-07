# app.py
from flask import Flask, jsonify, render_template
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'animal-adoption-app.cjqaq2ssgxlm.us-east-2.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = '0BIzTypE1AT2AIk3EfjA'
app.config['MYSQL_DB'] = 'adoption_app'

mysql = MySQL(app)

# Test connection with simple query from test table
@app.route('/test_db', methods=['GET'])
def test_db_connection():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * from diagnostic;")
        result = cur.fetchone()
        cur.close()
        return jsonify({'success': True, 'result': result}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/admin', methods=['GET'])
def get_admin_data():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT a.animal_id, a.animal_name, a.photo, s.species_desc as species,"
                    + "v.avail_desc as availability from Animals as a join Availability v "
                    + "on a.availability = v.avail_id join Species as s on a.species = s.species_id "
                    + "order by a.animal_id;")
        data = cur.fetchall()

        # Create list of column names in query
        columns = [desc[0] for desc in cur.description]
        cur.close()

        # Create a list of dictionaries using column names
        results = [dict(zip(columns, row)) for row in data]
        return jsonify(results)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Homepage. Not pulling data yet.
@app.route('/')
def index():
    return ""

if __name__ == '__main__':
    app.run(debug=True)
