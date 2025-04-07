
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import datetime
# from bson.objectid import ObjectId

# app = Flask(__name__)
# CORS(app)  # Enable cross-origin requests

# # Connect to MongoDB
# client = MongoClient("mongodb://localhost:27017/")
# db = client["hobbynet"]
# posts_collection = db["posts"]

# # ✅ Create a Post
# @app.route("/posts", methods=["POST"])
# def create_post():
#     data = request.get_json()
#     user_id = data.get("user_id")
#     username = data.get("username")
#     title = data.get("title")
#     content = data.get("content")

#     if not user_id or not title or not content:
#         return jsonify({"success": False, "message": "Missing fields"}), 400

#     post = {
#         "user_id": user_id,
#         "username": username,
#         "title": title,
#         "content": content,
#         "timestamp": datetime.datetime.utcnow().isoformat(),
#         "likes": 0,
#         "comments": []
#     }
#     result = posts_collection.insert_one(post)

#     return jsonify({"success": True, "message": "Post created", "post_id": str(result.inserted_id)})

# # ✅ Get All Posts
# @app.route("/posts", methods=["GET"])
# def get_posts():
#     posts = list(posts_collection.find({}))
    
#     for post in posts:
#         post["_id"] = str(post["_id"])  # Convert ObjectId to string
    
#     return jsonify({"success": True, "posts": posts})

# # ✅ Like a Post (Fixed)
# @app.route("/posts/like/<post_id>", methods=["POST"])
# def like_post(post_id):
#     try:
#         result = posts_collection.update_one({"_id": ObjectId(post_id)}, {"$inc": {"likes": 1}})
        
#         if result.matched_count == 0:
#             return jsonify({"success": False, "message": "Post not found"}), 404

#         return jsonify({"success": True, "message": "Post liked"})
    
#     except Exception as e:
#         return jsonify({"success": False, "message": str(e)}), 500

# # ✅ Comment on a Post (Fixed)
# @app.route("/posts/comment/<post_id>", methods=["POST"])
# def comment_on_post(post_id):
#     data = request.get_json()
#     user_id = data.get("user_id")
#     username = data.get("username")
#     comment_text = data.get("comment")

#     if not user_id or not comment_text:
#         return jsonify({"success": False, "message": "Missing fields"}), 400

#     comment = {
#         "user_id": user_id,
#         "username": username,
#         "comment": comment_text,
#         "timestamp": datetime.datetime.utcnow().isoformat()
#     }

#     try:
#         result = posts_collection.update_one({"_id": ObjectId(post_id)}, {"$push": {"comments": comment}})

#         if result.matched_count == 0:
#             return jsonify({"success": False, "message": "Post not found"}), 404

#         return jsonify({"success": True, "message": "Comment added"})
    
#     except Exception as e:
#         return jsonify({"success": False, "message": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)




# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import datetime
# from bson.objectid import ObjectId

# app = Flask(__name__)
# CORS(app)  # Enable cross-origin requests

# # Connect to MongoDB
# client = MongoClient("mongodb://localhost:27017/")
# db = client["hobbynet"]
# posts_collection = db["posts"]

# # ✅ Create a Post
# @app.route("/posts", methods=["POST"])
# def create_post():
#     data = request.get_json()
#     user_id = data.get("user_id")
#     username = data.get("username")
#     title = data.get("title")
#     content = data.get("content")

#     if not user_id or not title or not content:
#         return jsonify({"success": False, "message": "Missing fields"}), 400

#     post = {
#         "user_id": user_id,
#         "username": username,
#         "title": title,
#         "content": content,
#         "timestamp": datetime.datetime.utcnow().isoformat(),
#         "likes": 0,
#         "comments": []
#     }
#     result = posts_collection.insert_one(post)

#     return jsonify({"success": True, "message": "Post created", "post_id": str(result.inserted_id)})

# # ✅ Get All Posts
# @app.route("/posts", methods=["GET"])
# def get_posts():
#     posts = list(posts_collection.find({}))
    
#     for post in posts:
#         post["_id"] = str(post["_id"])  # Convert ObjectId to string
    
#     return jsonify({"success": True, "posts": posts})

# # ✅ Get Most Liked Posts
# @app.route("/posts/most-liked", methods=["GET"])
# def get_most_liked_posts():
#     try:
#         # Fetch posts sorted by likes in descending order
#         posts = list(posts_collection.find({}).sort("likes", -1))
        
#         for post in posts:
#             post["_id"] = str(post["_id"])  # Convert ObjectId to string
        
#         return jsonify({"success": True, "posts": posts})
    
#     except Exception as e:
#         return jsonify({"success": False, "message": str(e)}), 500

# # ✅ Like a Post
# @app.route("/posts/like/<post_id>", methods=["POST"])
# def like_post(post_id):
#     try:
#         result = posts_collection.update_one({"_id": ObjectId(post_id)}, {"$inc": {"likes": 1}})
        
#         if result.matched_count == 0:
#             return jsonify({"success": False, "message": "Post not found"}), 404

#         return jsonify({"success": True, "message": "Post liked"})
    
#     except Exception as e:
#         return jsonify({"success": False, "message": str(e)}), 500

# # ✅ Comment on a Post
# @app.route("/posts/comment/<post_id>", methods=["POST"])
# def comment_on_post(post_id):
#     data = request.get_json()
#     user_id = data.get("user_id")
#     username = data.get("username")
#     comment_text = data.get("comment")

#     if not user_id or not comment_text:
#         return jsonify({"success": False, "message": "Missing fields"}), 400

#     comment = {
#         "user_id": user_id,
#         "username": username,
#         "comment": comment_text,
#         "timestamp": datetime.datetime.utcnow().isoformat()
#     }

#     try:
#         result = posts_collection.update_one({"_id": ObjectId(post_id)}, {"$push": {"comments": comment}})

#         if result.matched_count == 0:
#             return jsonify({"success": False, "message": "Post not found"}), 404

#         return jsonify({"success": True, "message": "Comment added"})
    
#     except Exception as e:
#         return jsonify({"success": False, "message": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)



from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import datetime
from bson.objectid import ObjectId

# Define the blueprint
community_posts = Blueprint("community_posts", __name__)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
posts_collection = db["posts"]
mentors_collection = db["mentors"]

# ✅ Create a Post with Image or Video
@community_posts.route("/posts", methods=["POST"])
def create_post():
    data = request.get_json()
    user_id = data.get("user_id")
    username = data.get("username")
    title = data.get("title")
    content = data.get("content")
    media_url = data.get("media_url")  # Optional field for image or video URL

    if not user_id or not title or not content:
        return jsonify({"success": False, "message": "Missing fields"}), 400

    post = {
        "user_id": user_id,
        "username": username,
        "title": title,
        "content": content,
        "media_url": media_url,
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "likes": 0,
        "comments": []
    }
    result = posts_collection.insert_one(post)

    return jsonify({"success": True, "message": "Post created", "post_id": str(result.inserted_id)})

# ✅ Get All Posts
@community_posts.route("/posts", methods=["GET"])
def get_posts():
    posts = list(posts_collection.find({}))
    
    for post in posts:
        post["_id"] = str(post["_id"])  # Convert ObjectId to string
    
    return jsonify({"success": True, "posts": posts})

# ✅ Get Most Liked Posts
@community_posts.route("/posts/most-liked", methods=["GET"])
def get_most_liked_posts():
    try:
        # Fetch posts sorted by likes in descending order
        posts = list(posts_collection.find({}).sort("likes", -1))
        
        for post in posts:
            post["_id"] = str(post["_id"])  # Convert ObjectId to string
        
        return jsonify({"success": True, "posts": posts})
    
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# ✅ Like a Post
@community_posts.route("/posts/like/<post_id>", methods=["POST"])
def like_post(post_id):
    try:
        result = posts_collection.update_one({"_id": ObjectId(post_id)}, {"$inc": {"likes": 1}})
        
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Post not found"}), 404

        return jsonify({"success": True, "message": "Post liked"})
    
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# ✅ Comment on a Post
@community_posts.route("/posts/comment/<post_id>", methods=["POST"])
def comment_on_post(post_id):
    data = request.get_json()
    user_id = data.get("user_id")
    username = data.get("username")
    comment_text = data.get("comment")

    if not user_id or not comment_text:
        return jsonify({"success": False, "message": "Missing fields"}), 400

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

# ✅ Get Top Mentors for a Hobby
@community_posts.route("/mentors/top/<hobby>", methods=["GET"])
def get_top_mentors(hobby):
    try:
        # Fetch mentors sorted by experience and rating in descending order
        mentors = list(
            mentors_collection.find({"hobby": hobby}).sort([("experience", -1), ("rating", -1)])
        )
        
        for mentor in mentors:
            mentor["_id"] = str(mentor["_id"])  # Convert ObjectId to string
        
        return jsonify({"success": True, "mentors": mentors})
    
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500