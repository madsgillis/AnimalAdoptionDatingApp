from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
import pymysql.cursors
from datetime import datetime
from werkzeug.utils import secure_filename
import os
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}  # Allowed file types


def allowed_file(filename):
    """
    Checks if the file has an allowed extension.
    :param filename: The name of the file being uploaded.
    :return: True if the file is allowed, False otherwise.
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Accept"]
    }
}) 

# handling photo upload (local path on server holds photos)
current_directory = os.getcwd()

# Define the upload folder relative to the current directory
UPLOAD_FOLDER = os.path.join(current_directory, 'static/uploads')
# Create the 'uploads' directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
print(f"Upload folder is set to: {UPLOAD_FOLDER}")

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
                SELECT a.animal_id, a.animal_name, a.photo, s.species_desc as species, a.animal_sex, a.age, DATE_FORMAT(a.date, '%Y-%m-%dT%H:%i') as date, a.description,
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


# handles requests for uploading profile photo
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'photo' not in request.files:
        return jsonify({"error": "No photo uploaded"}), 400

    photo = request.files['photo']
    if photo.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if allowed_file(photo.filename):
        filename = secure_filename(photo.filename)  # Ensures the filename is safe
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        file_url = url_for('static', filename='uploads/' + filename, _external=True)
        return jsonify({"file_url": file_url}), 200
    else:
        return jsonify({"error": "File type not allowed"}), 400


@app.route('/admin/create-profile', methods=['POST'])
def create_profile():

    animal_data = request.get_json()

    if not animal_data:
        return jsonify({"error": "No data provided"}), 400

    date = animal_data.get('date')
    name = animal_data.get('name')
    sex = animal_data.get('sex')
    age = animal_data.get('age')
    species = animal_data.get('species')
    availability = animal_data.get('status')
    disposition = animal_data.get('selectedTraits')
    description = animal_data.get('description')
    formatted_date = datetime.strptime(date, '%Y-%m-%dT%H:%M')
    photo = animal_data.get('photo')

    connection = db_connection()
    try:
        with connection.cursor() as cursor:

            if sex == "M":
                sex_char = 'M'
            if sex == "F":
                sex_char = 'F'

            # get corresponding ID for species string
            species_query = "SELECT species_id from Species where species_desc = %s;"
            cursor.execute(species_query, species)
            data = cursor.fetchone()
            if data:
                species_id = data['species_id']
            else:
                species_id = None

            # get corresponding ID for availability string
            avail_query = "SELECT avail_id from Availability where avail_desc = %s;"
            cursor.execute(avail_query, availability)
            data = cursor.fetchone()
            if data:
                avail_id = data['avail_id']
            else:
                avail_id = None

            # insert new animal profile into database
            sql_query = """
                INSERT INTO Animals (date, animal_name, animal_sex, age, species, availability, description, photo)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
                """
            cursor.execute(sql_query, (formatted_date, name, sex_char, age, species_id, avail_id, description, photo))
            connection.commit()

            # get ID for animal profile that was just created
            animal_query = """
                SELECT animal_id FROM Animals WHERE date = %s AND animal_name = %s AND animal_sex = %s
                AND age = %s AND species = %s AND availability = %s and description = %s AND photo = %s;
                """
            cursor.execute(animal_query, (formatted_date, name, sex_char, age, species_id, avail_id, description, photo))
            data = cursor.fetchone()
            if data:
                animal_id = data['animal_id']
            else:
                animal_id = None

            # add each disposition for new animal profile
            for disp_desc in disposition:
                disp_desc_query = "SELECT disp_id from Dispositions WHERE disp_desc = %s;"
                cursor.execute(disp_desc_query, (disp_desc,))
                data = cursor.fetchone()
                if data:
                    disp_id = data['disp_id']
                else:
                    disp_id = None

                disp_query = "INSERT INTO AnimalDispositions (animal_id, disposition_id) VALUES (%s, %s);"
                cursor.execute(disp_query, (animal_id, disp_id))
                connection.commit()

            connection.commit()
            return jsonify(success=True, message="New profile successfully created!"), 201
    except Exception as e:
        return jsonify({"Error": str(e)}), 500
    finally:
        connection.close()

# EDIT (PUT)
@app.route('/admin/edit-profile', methods=['PUT'])
def update_animal():
    animal_data = request.get_json()

    if not animal_data:
        return jsonify({"error": "No data provided"}), 400

    animal_id = animal_data.get('animal_id')
    date = animal_data.get('date')
    name = animal_data.get('name')
    sex = animal_data.get('sex')
    age = animal_data.get('age')
    species = animal_data.get('species')
    availability = animal_data.get('status')
    disposition = list(set(animal_data.get('selectedTraits', [])))
    description = animal_data.get('description')
    formatted_date = datetime.strptime(date, '%Y-%m-%dT%H:%M')
    photo = animal_data.get('photo')
    
    if not animal_id:
        return jsonify({"error": "No animal_id provided"}), 400  # Ensure animal_id is provided

    connection = db_connection()
    try:
        with connection.cursor() as cursor:

            if sex == "M":
                sex_char = 'M'
            if sex == "F":
                sex_char = 'F'

            # get corresponding ID for species string
            species_query = "SELECT species_id from Species where species_desc = %s;"
            cursor.execute(species_query, species)
            data = cursor.fetchone()
            if data:
                species_id = data['species_id']
            else:
                species_id = None

            # get corresponding ID for availability string
            avail_query = "SELECT avail_id from Availability where avail_desc = %s;"
            cursor.execute(avail_query, availability)
            data = cursor.fetchone()
            if data:
                avail_id = data['avail_id']
            else:
                avail_id = None

            # update basic form fields
            sql_query = """
                UPDATE Animals
                SET animal_name = %s, age = %s, animal_sex = %s, description = %s,
                    availability = %s, species = %s, date = %s, photo = %s
                WHERE animal_id = %s;
            """
            cursor.execute(sql_query, (name, age, sex, description, avail_id, species_id, formatted_date, photo, animal_id))

            # add each disposition for new animal profile, make sure only 1 of each
            for disp_desc in set(disposition):
                disp_desc_query = "SELECT disp_id from Dispositions WHERE disp_desc = %s;"
                cursor.execute(disp_desc_query, (disp_desc,))
                data = cursor.fetchone()
                if data:
                    disp_id = data['disp_id']
                else:
                    disp_id = None

                disp_query = """
                    INSERT IGNORE INTO AnimalDispositions (animal_id, disposition_id) 
                    VALUES (%s, %s);
                """
                cursor.execute(disp_query, (animal_id, disp_id))
                connection.commit()

            connection.commit()
            return jsonify(success=True, message="Profile updated successfully!"), 201
    except Exception as e:
        print(f"SQL Error: {e}")  # Debugging output
        return jsonify({"Error": str(e)}), 500
    finally:
        connection.close()

# DELETE
@app.route('/admin/delete-profile/<int:animal_id>', methods=['DELETE'])
def delete_profile(animal_id):
    connection = db_connection()
    try:
        with connection.cursor() as cursor:
            # Delete dispositions associated with the animal
            delete_dispositions_query = "DELETE FROM AnimalDispositions WHERE animal_id = %s;"
            cursor.execute(delete_dispositions_query, (animal_id,))
            
            # Delete the animal profile
            delete_animal_query = "DELETE FROM Animals WHERE animal_id = %s;"
            cursor.execute(delete_animal_query, (animal_id,))
            
            connection.commit()
            return jsonify(success=True, message="Profile successfully deleted!"), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 500
    finally:
        connection.close()

# Homepage
@app.route('/')
def index():
    return ""

if __name__ == '__main__':
    app.run(debug=True)