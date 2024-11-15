from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql.cursors

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Accept"]
    }
}) 

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
    print("connecting to db")
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
            cursor.execute("""
                SELECT a.animal_id, a.animal_name, a.photo, s.species_desc as species,
                v.avail_desc as availability 
                FROM Animals as a 
                JOIN Availability v ON a.availability = v.avail_id 
                JOIN Species as s ON a.species = s.species_id 
                ORDER BY a.animal_id
            """)
            data = cursor.fetchall()
            return jsonify(data), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()

# Route to log in
@app.route('/sign-in', methods=['POST'])
def login():

    login_data = request.get_json()
    user_name = login_data['user_name']
    user_password = login_data['password']

    connection = db_connection()
    try:
        with connection.cursor() as cursor:
            sql_query = "SELECT * FROM Users WHERE user_name = %s"
            cursor.execute(sql_query, (user_name,))
            query_data = cursor.fetchone()

            # Check if user exists
            if query_data is None:
                return jsonify(success=False, message="Invalid email address"), 401

            # If user exists, check if password is correct
            if query_data['password'] == user_password:
                return jsonify(success=True), 200
            else:
                return jsonify(success=False, message="Invalid password"), 401
    finally:
        connection.close()

# Route to sign up
@app.route('/sign-up', methods=['POST'])
def signup():

    login_data = request.get_json()
    user_name = login_data['user_name']
    user_password = login_data['password']

    connection = db_connection()
    try:
        with connection.cursor() as cursor:

            # Check to see if this email address already exists in the database
            sql_query0 = "SELECT * FROM Users WHERE user_name = %s"
            cursor.execute(sql_query0, (user_name,))
            query_data = cursor.fetchone()

            if query_data is not None:
                return jsonify(success=False, message="An account already exists with this email address"), 400

            # Add new user to database
            sql_query1 = "INSERT INTO Users (user_name, password) VALUES (%s, %s)"
            cursor.execute(sql_query1, (user_name, user_password))
            connection.commit()

            # Check if user was successfully created
            sql_query2 = "SELECT * FROM Users WHERE user_name = %s"
            cursor.execute(sql_query2, (user_name,))
            query_data = cursor.fetchone()

            if query_data is None:
                return jsonify(success=False, message="Account creation was not successful. Please try again"), 400
            else:
                return jsonify(success=True, message="Your account has been created!"), 201
    finally:
        connection.close()

# Homepage
@app.route('/')
def index():
    return ""

if __name__ == '__main__':
    app.run(debug=True)