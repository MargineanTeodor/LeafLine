from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from geopy.geocoders import Nominatim

app = Flask(__name__)
CORS(app) # giving the permissions 

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost/LeafLineDB'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

geolocator = Nominatim(user_agent="Leafline")


# ======================== MODEL =============================

class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<City {self.name}>'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Float, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<City {self.name}>'

@app.cli.command("init-db")
def init_db_command():
    """Create database tables."""
    db.create_all()
    print("Initialized the database.")
    
# ====================== ENDPOINTS ===========================

@app.route('/get_city_by_coords') 
def get_city_by_coords():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    
    if lat and lon:
        try:
            location = geolocator.reverse((lat, lon), exactly_one=True)
            address = location.raw.get('address', {})
            city_name = address.get('city', 'City not found')
            # Save to database (example)
            city = City(name=city_name, latitude=lat, longitude=lon)
            db.session.add(city)
            db.session.commit()
            return jsonify({"city": city_name})
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    else:
        return jsonify({"error": "Missing latitude or longitude parameters"}), 400

@app.route('/test_db_connection')
def test_db_connection():
    try:
        num_cities = City.query.count()
        return jsonify({"success": True, "num_cities": num_cities})
    except Exception as e:
        # If an error occurs, return a message indicating the connection failed
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
