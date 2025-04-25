from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson import ObjectId

# Define the blueprint
user_profile = Blueprint("user_profile", __name__)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
users_collection = db["users"]

# ✅ Get user profile
@user_profile.route("/user/<user_id>", methods=["GET"])
def get_user_profile(user_id):
    try:
        print(f"Fetching profile for user_id: {user_id}")
        # Validate ObjectId
        if not ObjectId.is_valid(user_id):
            return jsonify({"success": False, "message": "Invalid user ID"}), 400

        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            print("User not found")
            return jsonify({"success": False, "message": "User not found"}), 404

        # Serialize the user data
        user["_id"] = str(user["_id"])
        print("User found:", user)
        return jsonify({"success": True, "user": user}), 200
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"success": False, "error": str(e)}), 500

# ✅ Update or Add user profile
@user_profile.route("/user/<user_id>", methods=["PUT"])
def update_user_profile(user_id):
    try:
        print(f"Updating profile for user_id: {user_id}")
        # Validate ObjectId
        if not ObjectId.is_valid(user_id):
            return jsonify({"success": False, "message": "Invalid user ID"}), 400

        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No data provided"}), 400

        # Check if the user exists
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            # If user does not exist, create a new profile
            new_user = {
                "_id": ObjectId(user_id),
                "name": data.get("name", ""),
                "tagline": data.get("tagline", ""),
                "bio": data.get("bio", ""),
                "hobbies": data.get("hobbies", []),
                "portfolio": data.get("portfolio", []),
            }
            users_collection.insert_one(new_user)
            print("New user profile created")
            return jsonify({"success": True, "message": "New profile created successfully"}), 201

        # Update existing user profile
        updated_fields = {
            "name": data.get("name"),
            "tagline": data.get("tagline"),
            "bio": data.get("bio"),
            "hobbies": data.get("hobbies", []),
            "portfolio": data.get("portfolio", []),
        }

        result = users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": updated_fields}
        )

        if result.matched_count == 0:
            return jsonify({"success": False, "message": "User not found"}), 404

        print("Profile updated successfully")
        return jsonify({"success": True, "message": "Profile updated successfully"}), 200
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"success": False, "error": str(e)}), 500