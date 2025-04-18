# # from flask import Flask, request, jsonify
# # from flask_pymongo import PyMongo
# # from bson import ObjectId
# # from flask_cors import CORS

# # app = Flask(__name__)
# # CORS(app)  # Allow cross-origin requests from frontend

# # # MongoDB config
# # app.config['MONGO_URI'] = 'mongodb://localhost:27017/hobbynet'
# # mongo = PyMongo(app)

# # # Get all groups
# # @app.route('/api/groups', methods=['GET'])
# # def get_groups():
# #     groups = list(mongo.db.groups.find({}))
# #     for g in groups:
# #         g['_id'] = str(g['_id'])
# #     return jsonify(groups)

# # # Join a group
# # @app.route('/api/groups/join/<group_id>', methods=['POST'])
# # def join_group(group_id):
# #     data = request.json
# #     user_id = data.get('userId')

# #     if not user_id:
# #         return jsonify({'success': False, 'error': 'User ID is required'}), 400

# #     group = mongo.db.groups.find_one({'_id': ObjectId(group_id)})
# #     if group:
# #         mongo.db.groups.update_one(
# #             {'_id': ObjectId(group_id)},
# #             {'$addToSet': {'members': user_id}}  # $addToSet prevents duplicates
# #         )
# #         return jsonify({'success': True})

# #     return jsonify({'success': False, 'error': 'Group not found'}), 404

# # if __name__ == '__main__':
# #     app.run(debug=True)

# from flask import Blueprint, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# from bson import ObjectId

# # Define the blueprint
# join_groups_bp = Blueprint("join_groups", __name__)

# # MongoDB Connection
# client = MongoClient("mongodb://localhost:27017/")  # or your Atlas URL
# db = client["hobbynet"]
# groups_collection = db["groups"]
# users_collection = db["users"]

# # Utility to serialize ObjectId
# def serialize_doc(doc):
#     doc["_id"] = str(doc["_id"])
#     return doc

# # Get all groups
# @join_groups_bp.route("/api/groups", methods=["GET"])
# def get_groups():
#     groups = list(groups_collection.find())
#     return jsonify([serialize_doc(group) for group in groups])

# # User joins a group
# @join_groups_bp.route("/api/join-group", methods=["POST"])
# def join_group():
#     data = request.json
#     user_email = data.get("email")
#     group_id = data.get("group_id")

#     if not user_email or not group_id:
#         return jsonify({"error": "Email and group_id are required"}), 400

#     user = users_collection.find_one({"email": user_email})
#     if not user:
#         users_collection.insert_one({"email": user_email, "joined_groups": [group_id]})
#     else:
#         users_collection.update_one(
#             {"email": user_email},
#             {"$addToSet": {"joined_groups": group_id}}  # $addToSet prevents duplicates
#         )

#     return jsonify({"message": "Group joined successfully!"})

# # Get groups joined by a user
# @join_groups_bp.route("/api/user-groups/<email>", methods=["GET"])
# def get_user_groups(email):
#     user = users_collection.find_one({"email": email})
#     if not user:
#         return jsonify([])

#     group_ids = user.get("joined_groups", [])
#     groups = list(groups_collection.find({"_id": {"$in": [ObjectId(gid) for gid in group_ids]}}))
#     return jsonify([serialize_doc(group) for group in groups])

from flask import Blueprint, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

# Define the blueprint
join_groups_bp = Blueprint("join_groups", __name__)

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")  # or your MongoDB URI
db = client["hobbynet"]
groups_collection = db["groups"]
users_collection = db["users"]

# Utility to convert ObjectId
def serialize_group(group):
    return {
        "_id": str(group["_id"]),
        "name": group["name"],
        "description": group["description"],
        "hobby": group["hobby"]
    }

# Fetch all groups
@join_groups_bp.route('/api/groups', methods=['GET'])
def get_groups():
    groups = list(groups_collection.find())
    return jsonify([serialize_group(group) for group in groups]), 200

# Join a group
@join_groups_bp.route('/api/groups/join', methods=['POST'])
def join_group():
    data = request.json
    user_id = data.get("userId")
    group_id = data.get("groupId")

    if not user_id or not group_id:
        return jsonify({"error": "Missing userId or groupId"}), 400

    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"error": "User not found"}), 404

    if "joined_groups" not in user:
        user["joined_groups"] = []

    if ObjectId(group_id) not in user["joined_groups"]:
        users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$addToSet": {"joined_groups": ObjectId(group_id)}}
        )

    return jsonify({"success": True}), 200

# Get user’s joined groups
@join_groups_bp.route('/api/user/groups/<user_id>', methods=['GET'])
def get_user_groups(user_id):
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify([])

        joined_ids = user.get("joined_groups", [])
        return jsonify([str(gid) for gid in joined_ids])
    except:
        return jsonify([])

# Enable CORS for the blueprint
CORS(join_groups_bp)
