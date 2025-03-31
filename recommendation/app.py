from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from pymongo import MongoClient
from auth import auth, bcrypt, mongo  # Import authentication routes

app = Flask(__name__)
CORS(app)  # Allow frontend to call this API

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/hobbynet"
mongo.init_app(app)  # Initialize MongoDB
bcrypt.init_app(app)  # Initialize bcrypt

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
mentors_collection = db["mentors"]

# API to get mentors, filtered by hobby and rating, sorted by highest rating
@app.route("/mentors", methods=["GET"])
def get_mentors():
    hobby = request.args.get("hobby")  # Get hobby from query params
    min_rating = request.args.get("min_rating", type=float)  # Get min rating (convert to float)

    query = {}
    if hobby:
        query["hobby"] = hobby  # Apply hobby filter
    if min_rating is not None:
        query["rating"] = {"$gte": min_rating}  # Apply rating filter

    mentors = list(
        mentors_collection.find(query, {"_id": 0}).sort("rating", -1)  # Sort by rating (desc)
    )

    return jsonify(mentors)

# Register Authentication Routes
app.register_blueprint(auth)

if __name__ == "__main__":
    app.run(debug=True)
