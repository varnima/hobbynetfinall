


from flask import Blueprint, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import datetime

# Define the blueprint
resources = Blueprint("resources", __name__)
CORS(resources)  # Enable CORS for this blueprint

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
resources_collection = db["resources"]
workshops_collection = db["workshops"]

# ✅ Get All Resources or Filter by Hobby
@resources.route("/api/resources", methods=["GET"])
def get_resources():
    try:
        hobby = request.args.get("hobby", "All")
        query = {} if hobby == "All" else {"hobby": hobby}
        resources_data = list(resources_collection.find(query))
        for r in resources_data:
            r["_id"] = str(r["_id"])
        return jsonify({"success": True, "resources": resources_data}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ✅ Get All Workshops or Filter by Hobby
@resources.route("/api/workshops", methods=["GET"])
def get_workshops():
    try:
        hobby = request.args.get("hobby", "All")
        query = {} if hobby == "All" else {"hobby": hobby}
        workshops_data = list(workshops_collection.find(query).sort("date", 1))
        for w in workshops_data:
            w["_id"] = str(w["_id"])
        return jsonify({"success": True, "workshops": workshops_data}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ✅ Add Workshop (Mentor Only)
@resources.route("/api/workshops", methods=["POST"])
def add_workshop():
    try:
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
        return jsonify({"success": True, "message": "Workshop added", "workshop_id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500