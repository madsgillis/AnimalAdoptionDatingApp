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

@app.route('/profile', methods=['GET'])
def get_profile():
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


@app.route('/edit-profile', methods=['PUT'])
def update_animal():
    data = request.get_json()  # Get the JSON data from the request
    print("HERE IS THE DATA", data)
    
    # Extract data from the request
    animal_id = data.get('animal_id')
    name = data.get('name')
    #species = data.get('species')
    age = data.get('age')
    animal_sex = data.get('animal_sex')
    #availability = data.get('availability')
    dispositions = data.get('dispositions')

    connection = db_connection()
    try:
        with connection.cursor() as cursor:
            # Update the animal record
            sql = """
                UPDATE Animals
                SET animal_name = %s, age = %s, animal_sex = %s
                WHERE animal_id = %s
            """
            cursor.execute(sql, (name, age, animal_sex, animal_id))
            connection.commit()

            # Optionally update dispositions if you have a separate table for them
            # Clear existing dispositions
            cursor.execute("DELETE FROM AnimalDispositions WHERE animal_id = %s", (animal_id,))
            # Insert new dispositions
            if dispositions:
                for disposition in dispositions.split(','):
                    cursor.execute("INSERT INTO AnimalDispositions (animal_id, disposition_id) VALUES (%s, (SELECT disp_id FROM Dispositions WHERE disp_desc = %s))", (animal_id, disposition.strip()))

            connection.commit()  # Commit the changes
            # Query the updated record
            cursor.execute("""
                SELECT a.animal_id, a.animal_name, a.species, a.age, a.animal_sex, 
                       a.availability, GROUP_CONCAT(d.disp_desc) as dispositions
                FROM Animals a
                LEFT JOIN AnimalDispositions ad ON a.animal_id = ad.animal_id
                LEFT JOIN Dispositions d ON ad.disposition_id = d.disp_id
                WHERE a.animal_id = %s
                GROUP BY a.animal_id
            """, (animal_id,))
            updated_record = cursor.fetchone()

            if updated_record:
                response = {
                    "animal_id": updated_record[0],
                    "animal_name": updated_record[1],
                    "species": updated_record[2],
                    "age": updated_record[3],
                    "animal_sex": updated_record[4],
                    "availability": updated_record[5],
                    "dispositions": updated_record[6] or ""
                }
                return jsonify(response), 200
            else:
                return jsonify({"error": "Animal not found after update"}), 404

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