from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

# Define the blueprint
chat_bp = Blueprint("chat", __name__)

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
conversations_collection = db["conversations"]
messages_collection = db["messages"]

# ✅ Fetch Conversations
@chat_bp.route("/api/conversations/<user_id>", methods=["GET"])
def get_conversations(user_id):
    try:
        conversations = list(conversations_collection.find({
            "$or": [{"user1_id": user_id}, {"user2_id": user_id}]
        }))
        for convo in conversations:
            convo["_id"] = str(convo["_id"])
        return jsonify({"success": True, "conversations": conversations})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@chat_bp.route("/api/conversations", methods=["POST"])
def start_conversation():
    try:
        data = request.get_json()
        new_conversation = {
            "user1_id": data["user1_id"],
            "user2_id": data["user2_id"],
            "user2_name": "Mentor/User Name",  # Replace with logic to fetch the user's name
            "last_message": "",
            "online": False
        }
        result = conversations_collection.insert_one(new_conversation)
        new_conversation["_id"] = str(result.inserted_id)
        return jsonify({"success": True, "conversation": new_conversation})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ✅ Fetch Messages for a Conversation
@chat_bp.route("/api/messages/<conversation_id>", methods=["GET"])
def get_messages(conversation_id):
    try:
        messages = list(messages_collection.find({"conversation_id": conversation_id}).sort("timestamp", 1))
        for msg in messages:
            msg["_id"] = str(msg["_id"])
        return jsonify({"success": True, "messages": messages})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ✅ Send a New Message
@chat_bp.route("/api/messages", methods=["POST"])
def send_message():
    try:
        data = request.get_json()
        new_message = {
            "conversation_id": data["conversation_id"],
            "sender_id": data["sender_id"],
            "receiver_id": data["receiver_id"],
            "content": data["content"],
            "timestamp": data.get("timestamp", None)  # Optional timestamp
        }
        result = messages_collection.insert_one(new_message)
        new_message["_id"] = str(result.inserted_id)
        return jsonify({"success": True, "message": new_message})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500