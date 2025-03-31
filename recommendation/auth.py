from flask import Blueprint, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_bcrypt import Bcrypt
from jwt import encode
# import jwt
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

    # Validate role
    if role not in ["user", "mentor"]:
        return jsonify({"success": False, "message": "Invalid role"}), 400

    # Check for duplicate email in the appropriate collection
    collection = mongo.db.users if role == "user" else mongo.db.mentors
    existing_user = collection.find_one({"email": email})
    if existing_user:
        return jsonify({"success": False, "message": "Email already exists"}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insert the user/mentor into the appropriate collection
    try:
        user_id = collection.insert_one({
            "username": username,
            "email": email,
            "password": hashed_password,
            "role": role
        }).inserted_id
    except Exception as e:
        return jsonify({"success": False, "message": "Database error: " + str(e)}), 500

    return jsonify({
    "success": True,
    "message": "User registered successfully",
    "user_id": str(user_id),
    "username": username  # Include username in the response
})


@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')  # Role must be provided in the login request

    if not email or not password or not role:
        return jsonify({"success": False, "message": "Missing fields"}), 400

    # Validate role
    if role not in ["user", "mentor"]:
        return jsonify({"success": False, "message": "Invalid role"}), 400

    # Find the user/mentor by email in the appropriate collection
    collection = mongo.db.users if role == "user" else mongo.db.mentors
    user = collection.find_one({"email": email})

    if not user:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    # Debugging: Print the stored hash and the provided password
    print("Stored Hash:", user["password"])
    print("Provided Password:", password)

    # Check if the password matches
    if not bcrypt.check_password_hash(user["password"], password):
        print("Password Match Failed")
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    # Generate JWT token with role included
    token = encode(
        {
            "user_id": str(user["_id"]),
            "role": role,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    # Return success response with token and role
    return jsonify({
        "success": True,
        "message": "Login successful",
        "token": token,
        "role": role,
        "username": user["username"]
    })