# # In resources_page.py
# from flask import Blueprint, request, jsonify
# from pymongo import MongoClient

# resources_bp = Blueprint('resources_bp', __name__)

# client = MongoClient("mongodb://localhost:27017/")
# db = client["hobbynet"]
# resources_col = db["resources"]
# workshops_col = db["workshops"]

# # Get Resources by Hobby
# @resources_bp.route("/api/resources", methods=["GET"])
# def get_resources():
#     hobby = request.args.get("hobby", "All")
#     query = {} if hobby == "All" else {"hobby": hobby}
#     resources = list(resources_col.find(query))
#     for r in resources:
#         r["_id"] = str(r["_id"])
#     return jsonify({"success": True, "resources": resources})

# # Get Workshops by Hobby
# @resources_bp.route("/api/workshops", methods=["GET"])
# def get_workshops():
#     hobby = request.args.get("hobby", "All")
#     query = {} if hobby == "All" else {"hobby": hobby}
#     workshops = list(workshops_col.find(query))
#     for w in workshops:
#         w["_id"] = str(w["_id"])
#     return jsonify({"success": True, "workshops": workshops})


# 📁 Filename: routes/resources.py

from flask import Blueprint, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import datetime

resources = Blueprint("resources", __name__)
CORS(resources)  # Enable CORS for this blueprint

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
resources_collection = db["resources"]
workshops_collection = db["workshops"]

# ✅ Get All Resources
@resources.route("/api/resources", methods=["GET"])
def get_resources():
    resources_data = list(resources_collection.find())
    for r in resources_data:
        r["_id"] = str(r["_id"])
    return jsonify({"success": True, "resources": resources_data})

# ✅ Get All Workshops
@resources.route("/api/workshops", methods=["GET"])
def get_workshops():
    workshops_data = list(workshops_collection.find().sort("date", 1))
    for w in workshops_data:
        w["_id"] = str(w["_id"])
    return jsonify({"success": True, "workshops": workshops_data})

# ✅ Add Workshop (Mentor Only)
@resources.route("/api/workshops", methods=["POST"])
def add_workshop():
    data = request.get_json()
    mentor_id = data.get("mentor_id")
    mentor_name = data.get("mentor_name")
    title = data.get("title")
    description = data.get("description")
    date = data.get("date")
    time = data.get("time")
    link = data.get("link")
    tags = data.get("tags", [])

    if not mentor_id or not title or not description:
        return jsonify({"success": False, "message": "Required fields are missing"}), 400

    workshop = {
        "mentor_id": mentor_id,
        "mentor_name": mentor_name,
        "title": title,
        "description": description,
        "date": date,
        "time": time,
        "link": link,
        "tags": tags,
        "created_at": datetime.datetime.utcnow().isoformat()
    }

    result = workshops_collection.insert_one(workshop)
    return jsonify({"success": True, "message": "Workshop added", "workshop_id": str(result.inserted_id)})
