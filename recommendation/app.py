
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
from chat import chat_bp  # Import the chat blueprint
from join_groups import join_groups_bp  # Import the join_groups blueprint
from resources import resources # Import the resources_page blueprint
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
app.register_blueprint(chat_bp)  # Register chat blueprint
app.register_blueprint(join_groups_bp)  # Register join_groups blueprint
app.register_blueprint(resources)  # Register resources_page blueprint

if __name__ == "__main__":
    app.run(debug=True)