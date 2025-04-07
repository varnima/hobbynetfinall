from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
mentors_collection = db["mentors"]
ratings_collection = db["ratings"]

# Insert dummy mentors
mentors = [
    {
        "_id": "mentor1",
        "name": "John Doe",
        "hobby": "Painting",
        "experience": 5,
        "rating": 4.8,
        "location": "New York",
        "fees": "$50/hour",
        "bio": "Experienced artist and mentor.",
        "role": "mentor"
    },
    {
        "_id": "mentor2",
        "name": "Jane Smith",
        "hobby": "Painting",
        "experience": 3,
        "rating": 4.6,
        "location": "Los Angeles",
        "fees": "$40/hour",
        "bio": "Passionate about teaching art.",
        "role": "mentor"
    },
    {
        "_id": "mentor3",
        "name": "Alice Johnson",
        "hobby": "Cooking",
        "experience": 7,
        "rating": 4.9,
        "location": "Chicago",
        "fees": "$60/hour",
        "bio": "Professional chef and mentor.",
        "role": "mentor"
    }
]

# Insert dummy ratings
ratings = [
    {"user_id": "user1", "mentor_id": "mentor1", "rating": 5},
    {"user_id": "user1", "mentor_id": "mentor2", "rating": 4},
    {"user_id": "user2", "mentor_id": "mentor1", "rating": 4},
    {"user_id": "user2", "mentor_id": "mentor3", "rating": 5},
    {"user_id": "user3", "mentor_id": "mentor2", "rating": 3},
    {"user_id": "user3", "mentor_id": "mentor3", "rating": 4}
]

# Insert data into collections
mentors_collection.insert_many(mentors)
ratings_collection.insert_many(ratings)

print("Dummy data inserted successfully!")