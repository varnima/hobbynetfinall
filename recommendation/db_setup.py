
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Change URI if using a cloud DB

# Create a database
db = client["hobbynet"]


mentors_collection = db["mentors"]

# # Insert a test document
# test_mentor = {
#     "name": "John Doe",
#     "hobby": "Painting",
#     "experience": 5,
#     "rating": 4.7
# }

# mentors_collection.insert_one(test_mentor)

# print("Database and test mentor added successfully!")
