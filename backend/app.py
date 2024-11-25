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
                SELECT a.animal_id, a.animal_name, a.photo, s.species_desc as species, a.animal_sex, a.age, a.date, a.description,
                v.avail_desc as availability 
                FROM Animals as a 
                JOIN Availability v ON a.availability = v.avail_id 
                JOIN Species as s ON a.species = s.species_id 
                ORDER BY a.animal_id
            """)
            data = cursor.fetchall()

            # grabbing dispositions
            cursor.execute("""
                SELECT ad.animal_id, GROUP_CONCAT(d.disp_desc) AS dispositions
                FROM AnimalDispositions ad
                JOIN Dispositions d ON ad.disposition_id = d.disp_id
                GROUP BY ad.animal_id
            """)
            disposition_data = cursor.fetchall()

            # combining animal table with dispositions
            for animal in data:
                animal_id = animal['animal_id']
                dispositions = next((d['dispositions'] for d in disposition_data if d['animal_id'] == animal_id), None)
                animal['dispositions'] = dispositions
        
            return jsonify(data), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()


@app.route('/admin/edit-profile', methods=['PUT'])
def update_animal():
    data = request.get_json()  # Get the JSON data from the request

    # Extract data from the request
    animal_id = data.get('animal_id')
    name = data.get('name')
    species = data.get('species')
    age = data.get('age')
    animal_sex = data.get('animal_sex')
    availability = data.get('availability')
    dispositions = data.get('dispositions')

    connection = db_connection()
    try:
        with connection.cursor() as cursor:
            # Update the animal record
            sql = """
                UPDATE Animals
                SET animal_name = %s, species = %s, age = %s, animal_sex = %s, availability = %s
                WHERE animal_id = %s
            """
            cursor.execute(sql, (name, species, age, animal_sex, availability, animal_id))

            # Optionally update dispositions if you have a separate table for them
            # Clear existing dispositions
            cursor.execute("DELETE FROM AnimalDispositions WHERE animal_id = %s", (animal_id,))
            # Insert new dispositions
            if dispositions:
                for disposition in dispositions.split(','):
                    cursor.execute("INSERT INTO AnimalDispositions (animal_id, disposition_id) VALUES (%s, (SELECT disp_id FROM Dispositions WHERE disp_desc = %s))", (animal_id, disposition.strip()))

            connection.commit()  # Commit the changes
            return jsonify({'message': 'Animal updated successfully'}), 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

    finally:
        connection.close()


# Homepage
@app.route('/')
def index():
    return ""

if __name__ == '__main__':
    app.run(debug=True)