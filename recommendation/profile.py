from flask import Blueprint, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import datetime

# Define the blueprint
user_profile = Blueprint("profile", __name__, url_prefix="/api/profile")
CORS(user_profile)  # Enable CORS for this blueprint

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
users_collection = db["users"]

# ✅ Get User Profile
@user_profile.route("/<user_id>", methods=["GET"])
def get_profile(user_id):
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"success": False, "message": "User not found"}), 404

        # Serialize the user data
        user["_id"] = str(user["_id"])
        return jsonify({"success": True, "user": user}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ✅ Update User Profile
@user_profile.route("/<user_id>", methods=["PUT"])
def update_profile(user_id):
    try:
        data = request.get_json()
        update_fields = {}

        # Update only the fields provided in the request
        if "name" in data:
            update_fields["name"] = data["name"]
        if "tagline" in data:
            update_fields["tagline"] = data["tagline"]
        if "bio" in data:
            update_fields["bio"] = data["bio"]
        if "hobbies" in data:
            update_fields["hobbies"] = data["hobbies"]
        if "portfolio" in data:
            update_fields["portfolio"] = data["portfolio"]

        if not update_fields:
            return jsonify({"success": False, "message": "No fields to update"}), 400

        result = users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_fields, "$currentDate": {"last_updated": True}}
        )

        if result.matched_count == 0:
            return jsonify({"success": False, "message": "User not found"}), 404

        return jsonify({"success": True, "message": "Profile updated successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ✅ Login Endpoint
@user_profile.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"success": False, "message": "Email and password are required"}), 400

        user = users_collection.find_one({"email": email, "password": password})
        if not user:
            return jsonify({"success": False, "message": "Invalid email or password"}), 401

        # Serialize the user data
        user["_id"] = str(user["_id"])
        return jsonify({"success": True, "message": "Login successful", "user": user}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500