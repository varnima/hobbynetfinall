from flask import Blueprint, request, jsonify
from pymongo import MongoClient

# Setup Flask Blueprint
mentor_signup_bp = Blueprint("mentor_signup", __name__)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
mentors_collection = db["mentors"]

# Mentor Signup Endpoint
@mentor_signup_bp.route("/mentor-signup", methods=["POST"])
def mentor_signup():
    try:
        # Get data from the request
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        hobby = data.get("hobby")
        experience = data.get("experience")
        age = data.get("age")
        certifications = data.get("certifications")
        location = data.get("location")
        fees = data.get("fees")
        bio = data.get("bio")
        additional_details = data.get("additionalDetails")

        # Validate required fields
        if not name or not email or not hobby or not experience or not age or not location or not fees or not bio:
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        # Create mentor document
        mentor = {
            "name": name,
            "email": email,
            "hobby": hobby,
            "experience": int(experience),
            "age": int(age),
            "certifications": certifications,
            "location": location,
            "fees": fees,
            "bio": bio,
            "additional_details": additional_details,
        }

        # Insert mentor into the database
        mentors_collection.insert_one(mentor)

        return jsonify({"success": True, "message": "Mentor registered successfully!"}), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500