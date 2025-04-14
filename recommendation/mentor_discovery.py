from flask import Blueprint, request, jsonify
from pymongo import MongoClient

# Define the blueprint
mentor_discovery = Blueprint("mentor_discovery", __name__)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
mentors_collection = db["mentors"]

# ✅ Get All Mentors with Filters and Search
@mentor_discovery.route("/mentors", methods=["GET"])
def get_mentors():
    try:
        # Get query parameters
        search_term = request.args.get("search", "").lower()
        hobby = request.args.get("hobby", "").lower()
        min_rating = float(request.args.get("min_rating", 0))
        experience_range = request.args.get("experience", "").lower()
        location = request.args.get("location", "").lower()

        # Build the query
        query = {}

        # Search by name, hobby, or location
        if search_term:
            query["$or"] = [
                {"name": {"$regex": search_term, "$options": "i"}},
                {"hobby": {"$regex": search_term, "$options": "i"}},
                {"location": {"$regex": search_term, "$options": "i"}}
            ]

        # Filter by hobby
        if hobby and hobby != "all":
            query["hobby"] = {"$regex": hobby, "$options": "i"}

        # Filter by minimum rating
        if min_rating > 0:
            query["rating"] = {"$gte": min_rating}

        # Filter by experience range
        if experience_range:
            if experience_range == "1-3 years":
                query["experience"] = {"$gte": 1, "$lte": 3}
            elif experience_range == "3-5 years":
                query["experience"] = {"$gte": 3, "$lte": 5}
            elif experience_range == "5+ years":
                query["experience"] = {"$gte": 5}

        # Filter by location
        if location:
            query["location"] = {"$regex": location, "$options": "i"}

        # Fetch mentors from the database
        mentors = list(mentors_collection.find(query))

        # Convert ObjectId to string and format the response
        for mentor in mentors:
            mentor["_id"] = str(mentor["_id"])

        return jsonify({"success": True, "mentors": mentors})

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500       