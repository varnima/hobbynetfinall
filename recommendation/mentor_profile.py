from flask import Blueprint, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

# Define the blueprint
mentor_profile_bp = Blueprint("mentor_profile", __name__)

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
mentors = db["mentors"]

# Mentor Profile Endpoint
@mentor_profile_bp.route("/api/mentor/<mentor_id>", methods=["GET"])
def get_mentor(mentor_id):
    try:
        mentor = mentors.find_one({"_id": ObjectId(mentor_id)})
        if not mentor:
            return jsonify({"error": "Mentor not found"}), 404

        # Convert ObjectId to string
        mentor["_id"] = str(mentor["_id"])
        return jsonify(mentor)

    except Exception as e:
        return jsonify({"error": str(e)}), 500