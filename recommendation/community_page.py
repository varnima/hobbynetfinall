from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import datetime
from bson.objectid import ObjectId

# Define the blueprint
community_page = Blueprint("community_page", __name__)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
posts_collection = db["posts"]

# ✅ Create a Post
@community_page.route("/posts", methods=["POST"])
def create_post():
    data = request.get_json()
    user_id = data.get("user_id")
    username = data.get("username")
    content = data.get("content")
    hobby = data.get("hobby")
    media_url = data.get("media_url")  # Optional field for image or video URL

    if not user_id or not username or not content or not hobby:
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    post = {
        "user_id": user_id,
        "username": username,
        "content": content,
        "hobby": hobby,
        "media_url": media_url,
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "likes": 0,
        "comments": []
    }
    result = posts_collection.insert_one(post)

    return jsonify({"success": True, "message": "Post created", "post_id": str(result.inserted_id)})

# ✅ Get Posts (Filtered by Hobby)
@community_page.route("/posts", methods=["GET"])
def get_posts():
    hobby = request.args.get("hobby", "All")  # Default to "All" if no hobby is provided

    query = {}
    if hobby != "All":
        query["hobby"] = hobby

    posts = list(posts_collection.find(query).sort("timestamp", -1))  # Sort by latest posts

    for post in posts:
        post["_id"] = str(post["_id"])  # Convert ObjectId to string

    return jsonify({"success": True, "posts": posts})

# ✅ Like a Post
@community_page.route("/posts/like/<post_id>", methods=["POST"])
def like_post(post_id):
    try:
        result = posts_collection.update_one({"_id": ObjectId(post_id)}, {"$inc": {"likes": 1}})
        
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Post not found"}), 404

        return jsonify({"success": True, "message": "Post liked"})
    
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# ✅ Comment on a Post
@community_page.route("/posts/comment/<post_id>", methods=["POST"])
def comment_on_post(post_id):
    data = request.get_json()
    user_id = data.get("user_id")
    username = data.get("username")
    comment_text = data.get("comment")

    if not user_id or not username or not comment_text:
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    comment = {
        "user_id": user_id,
        "username": username,
        "comment": comment_text,
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

    try:
        result = posts_collection.update_one({"_id": ObjectId(post_id)}, {"$push": {"comments": comment}})

        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Post not found"}), 404

        return jsonify({"success": True, "message": "Comment added"})
    
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500