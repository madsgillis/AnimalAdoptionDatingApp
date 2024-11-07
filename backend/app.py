from flask import Flask, jsonify, render_template
from flask_cors import CORS
import pymysql.cursors

app = Flask(__name__)
CORS(app)

# Database configuration
db_config = {
    'host': 'animal-adoption-app.cjqaq2ssgxlm.us-east-2.rds.amazonaws.com',
    'user': 'admin',
    'password': '0BIzTypE1AT2AIk3EfjA',
    'database': 'adoption_app',
    'cursorclass': pymysql.cursors.DictCursor
}

# Create a database connection
def db_connection():
    return pymysql.connect(**db_config)

# Test connection with a simple query from test table
@app.route('/test_db', methods=['GET'])
def test_db_connection():
    connection = db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM diagnostic;")
            result = cursor.fetchone()
        return jsonify({'success': True, 'result': result}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        connection.close()

# Route to get admin data
@app.route('/admin', methods=['GET'])
def get_admin_data():
    connection = db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT a.animal_id, a.animal_name, a.photo, s.species_desc as species,"
                    + "v.avail_desc as availability from Animals as a join Availability v "
                    + "on a.availability = v.avail_id join Species as s on a.species = s.species_id "
                    + "order by a.animal_id;")
            data = cursor.fetchall()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()

# Homepage
@app.route('/')
def index():
    return ""

if __name__ == '__main__':
    app.run(debug=True)