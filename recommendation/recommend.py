from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from collections import defaultdict
import math

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
mentors_collection = db["mentors"]
ratings_collection = db["ratings"]

# Define the Flask Blueprint
recommend_bp = Blueprint("recommend", __name__)

def hybrid_recommend(user_id, user_hobby=None, min_rating=0):
    # Step 1: Filter mentors by hobby and rating
    mentor_filter = {
        "role": "mentor",
        "rating": {"$gte": min_rating}
    }
    if user_hobby:
        mentor_filter["hobby"] = user_hobby

    filtered_mentors = list(mentors_collection.find(mentor_filter))

    # Step 2: Collaborative Filtering
    user_ratings = list(ratings_collection.find())  # Format: {user_id, mentor_id, rating}
    mentor_scores = defaultdict(float)
    similarity_scores = defaultdict(float)

    # Group ratings by user
    user_ratings_dict = defaultdict(dict)
    for r in user_ratings:
        user_ratings_dict[r['user_id']][r['mentor_id']] = r['rating']

    if user_id not in user_ratings_dict:
        return filtered_mentors  # No previous data for this user

    target_ratings = user_ratings_dict[user_id]

    for other_user, other_ratings in user_ratings_dict.items():
        if other_user == user_id:
            continue

        common = set(target_ratings.keys()) & set(other_ratings.keys())
        if not common:
            continue

        num, denom_a, denom_b = 0, 0, 0
        for m in common:
            a = target_ratings[m]
            b = other_ratings[m]
            num += a * b
            denom_a += a**2
            denom_b += b**2

        if denom_a == 0 or denom_b == 0:
            continue

        sim = num / (math.sqrt(denom_a) * math.sqrt(denom_b))

        for m_id, rating in other_ratings.items():
            if m_id not in target_ratings:
                mentor_scores[m_id] += sim * rating
                similarity_scores[m_id] += abs(sim)

    recommendations = []
    for m_id in mentor_scores:
        if similarity_scores[m_id] > 0:
            score = mentor_scores[m_id] / similarity_scores[m_id]
            mentor = mentors_collection.find_one({"_id": m_id})
            if mentor:
                mentor["score"] = score
                recommendations.append(mentor)

    recommendations.sort(key=lambda x: x.get("score", 0), reverse=True)

    if not recommendations:
        return filtered_mentors
    return recommendations

# API Endpoint for Recommendations
@recommend_bp.route("/recommend/<user_id>", methods=["GET"])
def recommend_mentors(user_id):
    try:
        user_hobby = request.args.get("hobby")  # Optional hobby filter
        min_rating = float(request.args.get("min_rating", 0))  # Optional minimum rating filter

        recommendations = hybrid_recommend(user_id, user_hobby, min_rating)
        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500