

# from flask import Flask, request, jsonify
# from flask_pymongo import PyMongo
# from flask_cors import CORS
# from pymongo import MongoClient
# from auth import auth, bcrypt, mongo  # Import authentication routes
# from community_posts import community_posts


# app = Flask(__name__)
# CORS(app)  # Allow frontend to call this API

# # MongoDB Configuration
# app.config["MONGO_URI"] = "mongodb://localhost:27017/hobbynet"
# mongo.init_app(app)  # Initialize MongoDB
# bcrypt.init_app(app)  # Initialize bcrypt

# # Connect to MongoDB
# client = MongoClient("mongodb://localhost:27017/")
# db = client["hobbynet"]
# mentors_collection = db["mentors"]

# # ✅ Route to Get Mentors
# @app.route("/mentors", methods=["GET"])
# def get_mentors():
#     try:
#         hobby = request.args.get("hobby")  # Get hobby from query params
#         min_rating = request.args.get("min_rating", type=float)  # Get min rating (convert to float)

#         # Build the query dynamically
#         query = {}
#         if hobby:
#             query["hobby"] = hobby  # Apply hobby filter
#         if min_rating is not None:
#             query["rating"] = {"$gte": min_rating}  # Apply rating filter

#         # Query the mentors collection and include all fields
#         mentors = list(
#             mentors_collection.find(query, {"_id": 0, "username": 1, "hobby": 1, "rating": 1, "experience": 1, "email": 1})
#             .sort([("rating", -1), ("experience", -1)])  # Sort by rating and experience (desc)
#         )

#         # Return the mentors as JSON
#         return jsonify(mentors), 200

#     except Exception as e:
#         # Handle errors and return a 500 response
#         return jsonify({"success": False, "message": "An error occurred", "error": str(e)}), 500

# # Register Blueprints
# app.register_blueprint(auth)  # Register authentication routes
# app.register_blueprint(community_posts)  # Register community_posts blueprint



# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from pymongo import MongoClient
from auth import auth, bcrypt, mongo  # Import authentication routes
from community_posts import community_posts
from mentor_signup import mentor_signup_bp  # Import the mentor_signup blueprint
from mentor_discovery import mentor_discovery  # Import the mentor_discovery blueprint
from recommend import recommend_bp  # Import the recommend blueprint
from community_page import community_page  # Import the community_page blueprint
from mentor_profile import mentor_profile_bp # Import the mentor_profile blueprint
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

# Register Blueprints
app.register_blueprint(auth)  # Register authentication routes
app.register_blueprint(community_posts)  # Register community_posts blueprint
app.register_blueprint(mentor_signup_bp)  # Register mentor_signup blueprint
app.register_blueprint(mentor_discovery)  # Register mentor_discovery blueprint
app.register_blueprint(recommend_bp)  # Register recommend blueprint
app.register_blueprint(community_page)  # Register community_page blueprint
app.register_blueprint(mentor_profile_bp)  # Register mentor_profile blueprint

if __name__ == "__main__":
    app.run(debug=True)