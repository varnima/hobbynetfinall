from flask import Blueprint, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_bcrypt import Bcrypt
import jwt
import datetime

auth = Blueprint('auth', __name__)

# MongoDB Connection
mongo = PyMongo() # This will be assigned in app.py
bcrypt = Bcrypt()

# Secret key for JWT (Change this in production)
SECRET_KEY = "your_secret_key"

# Signup Route
@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')  # Default role is "user"

    if not username or not email or not password:
        return jsonify({"success": False, "message": "Missing fields"}), 400

    existing_user = mongo.db.users.find_one({"email": email})
    if existing_user:
        return jsonify({"success": False, "message": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    user_id = mongo.db.users.insert_one({
        "username": username,
        "email": email,
        "password": hashed_password,
        "role": role
    }).inserted_id

    return jsonify({"success": True, "message": "User registered successfully", "user_id": str(user_id)})



@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = mongo.db.users.find_one({"email": email})

    if not user:
        return jsonify({"success": False, "message": "User not found"}), 401

    # Debugging
    print("Stored Hash:", user["password"])
    print("Entered Password:", password)

    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    # Generate JWT token
    token = jwt.encode(
        {"user_id": str(user["_id"]), "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        SECRET_KEY, algorithm="HS256"
    )

    return jsonify({"success": True, "message": "Login successful", "token": token})
