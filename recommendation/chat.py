from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

chat_bp = Blueprint('chat', __name__)

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')  # Update if needed
db = client['hobbynet']
messages_collection = db['messages']
conversations_collection = db['conversations']

# Helper to convert ObjectId to string
def serialize_message(msg):
    msg['_id'] = str(msg['_id'])
    msg['conversation_id'] = str(msg['conversation_id'])
    msg['sender_id'] = str(msg['sender_id'])
    msg['receiver_id'] = str(msg['receiver_id'])
    return msg

# Get all conversations for a user
@chat_bp.route('/api/conversations/<user_id>', methods=['GET'])
def get_conversations(user_id):
    conversations = conversations_collection.find({
        '$or': [
            {'user1_id': user_id},
            {'user2_id': user_id}
        ]
    })
    result = []
    for convo in conversations:
        convo['_id'] = str(convo['_id'])
        result.append(convo)
    return jsonify(result), 200

# Get messages for a conversation
@chat_bp.route('/api/messages/<conversation_id>', methods=['GET'])
def get_messages(conversation_id):
    messages = messages_collection.find({'conversation_id': ObjectId(conversation_id)}).sort('timestamp', 1)
    return jsonify([serialize_message(msg) for msg in messages]), 200

# Send a message
@chat_bp.route('/api/messages', methods=['POST'])
def send_message():
    data = request.json
    message = {
        'conversation_id': ObjectId(data['conversation_id']),
        'sender_id': data['sender_id'],
        'receiver_id': data['receiver_id'],
        'content': data['content'],
        'timestamp': datetime.utcnow(),
        'is_read': False
    }
    messages_collection.insert_one(message)
    return jsonify({'message': 'Message sent successfully'}), 201

# Mark message as read (optional)
@chat_bp.route('/api/messages/<message_id>/read', methods=['PUT'])
def mark_as_read(message_id):
    messages_collection.update_one({'_id': ObjectId(message_id)}, {'$set': {'is_read': True}})
    return jsonify({'message': 'Message marked as read'}), 200
