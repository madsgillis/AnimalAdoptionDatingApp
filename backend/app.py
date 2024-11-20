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
                v.avail_desc as availability, a.animal_sex, a.age, a.date, a.description
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

# update profile on admin page
@app.route('/admin/edit-profile', methods=['PUT'])
def update_profile():
    # Get data from the request
    data = request.json
    animal_id = data.get('animal_id')
    #animal_name = data.get('animal_name')
    #photo = data.get('photo')
    #species = data.get('species')
    #availability = data.get('availability')
    #animal_sex = data.get('animal_sex')
    age = data.get('age')
    #date = data.get('date')
   # description = data.get('description')

    print("Received data:", data)

    connection = db_connection()
    try:
        with connection.cursor() as cursor:
            # Update the database
            cursor.execute("""
                UPDATE Animals
                SET age = %s
                WHERE animal_id = %s
            """, (age, animal_id))
            
            connection.commit()  # Commit changes to the database

        return jsonify({"message": "Animal data updated successfully"}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()

# animal_name, photo, species, availability, animal_sex, age, 
               #   date, description, animal_id

# route to specific animal data (used in fetching for admin table)
@app.route('/admin/animal/<int:animal_id>', methods=['GET'])
def get_animal_profile(animal_id):
    # Connect to the database
    connection = db_connection()
    try:
        with connection.cursor() as cursor:
            # Query the database for the animal with the given animal_id
            cursor.execute("SELECT * FROM Animals WHERE animal_id = %s", (animal_id,))
            animal = cursor.fetchone()

            # If animal is found, return the data
            if animal:
                return jsonify({
                    'animal_id': animal[0],  # animal_id column
                    'animal_name': animal[1],  # animal_name column
                    'species': animal[2],  # species column
                    'availability': animal[3],  # availability column
                    'animal_sex': animal[4],  # animal_sex column
                    'age': animal[5],  # age column
                    'photo': animal[6],  # photo column
                })
            else:
                return jsonify({'error': 'Animal not found'}), 404
    finally:
        connection.close()

# Homepage
@app.route('/')
def index():
    return ""

if __name__ == '__main__':
    app.run(debug=True)