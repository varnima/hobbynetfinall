from pymongo import MongoClient
import random

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["hobbynet"]
mentors_collection = db["mentors"]

# Define hobbies
hobbies = ["Painting", "Singing", "Dancing", "Cooking", "Photography"]

# Generate random mentors for each hobby
sample_mentors = []
for hobby in hobbies:
    for i in range(1, 21):  # Generate 20 mentors per hobby
        mentor = {
            "name": f"{hobby} Mentor {i}",
            "email": f"{hobby.lower()}_mentor{i}@example.com",
            "hobby": hobby,
            "experience": random.randint(1, 15),  # Random experience between 1 and 15 years
            "age": random.randint(25, 50),  # Random age between 25 and 50
            "certifications": f"Certified {hobby} Instructor",
            "location": random.choice(["New York", "Los Angeles", "Chicago", "San Francisco", "Seattle"]),
            "fees": f"${random.randint(30, 100)}/hour",  # Random fees between $30 and $100 per hour
            "bio": f"Experienced {hobby.lower()} mentor with a passion for teaching.",
            "rating": round(random.uniform(3.5, 5.0), 1),  # Random rating between 3.5 and 5.0
            "role": "mentor"
        }
        sample_mentors.append(mentor)

# Insert sample mentors into the collection
result = mentors_collection.insert_many(sample_mentors)

print(f"Inserted {len(result.inserted_ids)} sample mentors into the 'mentors' collection.")