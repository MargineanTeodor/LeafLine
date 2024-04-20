from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from geopy.geocoders import Nominatim

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"*": {"origins": "http://localhost:4200"}})

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

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Float, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(80), nullable=False)

class Locations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    type = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    nrSlots = db.Column(db.Float, nullable=False)
    discount = db.Column(db.Float, nullable=False)


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

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')  
    role = "normal"
    name = data.get('name')
    age = data.get('age')
    email = data.get('email')

    print(data)

    if not (username and password and role and name and age and email):
        return jsonify({"error": "Missing fields"}), 400

    user_exists = Users.query.filter_by(username=username).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 400

    new_user = Users(username=username, password=password, role=role, age=age, email= email, name= name)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": True, "message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password') 

    if not (username and password):
        return jsonify({"error": "Missing credentials"}), 400

    user = Users.query.filter_by(username=username, password=password).first()

    if user:
        return jsonify({"success": True, "role": user.role}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401


@app.route('/test_db_connection')
def test_db_connection():
    try:
        num_cities = City.query.count()
        return jsonify({"success": True, "num_cities": num_cities})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


# ====================== ENDPOINTS  LOCATIONS  ===========================

@app.route('/change_discount', methods=['POST'])
def change_discount():
    data = request.get_json()
    location_id = data.get('location_id')
    new_discount = data.get('new_discount')

    if not location_id or new_discount is None:
        return jsonify({"error": "Missing location_id or new discount value"}), 400

    location = Locations.query.get(location_id)
    if not location:
        return jsonify({"error": "Location not found"}), 404

    location.discount = new_discount
    db.session.commit()
    return jsonify({"success": True, "message": "Discount updated successfully"}), 200

@app.route('/add_location', methods=['POST'])
def add_location():
    data = request.get_json()
    name = data.get('name')
    location = data.get('location')
    loc_type = data.get('loc_type')
    price = data.get('price')
    nr_slots = data.get('nr_slots')
    discount = data.get('discount')

    if not all([name, location, loc_type, price, nr_slots, discount]):
        return jsonify({"error": "Missing one or more fields"}), 400

    new_location = Locations(name=name, location=location, type=loc_type, price=price, nrSlots=nr_slots, discount=discount)
    db.session.add(new_location)
    db.session.commit()
    return jsonify({"success": True, "message": "Location added successfully"}), 201

@app.route('/remove_location', methods=['DELETE'])
def remove_location():
    location_id = request.args.get('location_id')

    if not location_id:
        return jsonify({"error": "Missing location_id"}), 400

    location = Locations.query.get(location_id)
    if not location:
        return jsonify({"error": "Location not found"}), 404

    db.session.delete(location)
    db.session.commit()
    return jsonify({"success": True, "message": "Location removed successfully"}), 200

@app.route('/change_slots', methods=['POST'])
def change_slots():
    data = request.get_json()
    location_id = data.get('location_id')
    new_slots = data.get('new_slots')

    if not location_id or new_slots is None:
        return jsonify({"error": "Missing location_id or new slots value"}), 400

    location = Locations.query.get(location_id)
    if not location:
        return jsonify({"error": "Location not found"}), 404

    location.nrSlots = new_slots
    db.session.commit()
    return jsonify({"success": True, "message": "Number of slots updated successfully"}), 200

@app.route('/change_price', methods=['POST'])
def change_price():
    data = request.get_json()
    location_id = data.get('location_id')
    new_price = data.get('new_price')

    if not location_id or new_price is None:
        return jsonify({"error": "Missing location_id or new price value"}), 400

    location = Locations.query.get(location_id)
    if not location:
        return jsonify({"error": "Location not found"}), 404

    location.price = new_price
    db.session.commit()
    return jsonify({"success": True, "message": "Price updated successfully"}), 200

@app.route('/get_locations', methods=['GET'])
def get_locations():
    try:
        locations = Locations.query.order_by(Locations.id).all()
        locations_list = [{
            'id': location.id,
            'name': location.name,
            'location': location.location,
            'type': location.type,
            'price': location.price,
            'nrSlots': location.nrSlots,
            'discount': location.discount
        } for location in locations]

        return jsonify({"success": True, "locations": locations_list}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
