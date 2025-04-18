
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MentorProfilePage.css'; // Add styling here

function MentorProfile() {
  const { id } = useParams(); // This gets the mentor ID from URL
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    console.log(`Fetching mentor data from: http://127.0.0.1:5000/api/mentor/${id}`);
    fetch(`http://127.0.0.1:5000/api/mentor/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("MENTOR DATA:", data);
        if (!data.error) {
          setMentor(data);
        } else {
          setError(data.error);
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to fetch mentor data.");
      })
      .finally(() => setLoading(false)); // Set loading to false
  }, [id]);

  if (loading) {
    return <p>Loading mentor info...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!mentor) {
    return <p>Mentor not found.</p>;
  }

  return (
    <div className="mentor-profile">
      <img src={mentor.profileImage || "/images/default.jpg"} alt={mentor.name} className="mentor-profile-img" />
      <h2>{mentor.name}</h2>
      <p><strong>Email:</strong> {mentor.email}</p>
      <p><strong>🎯 Hobby:</strong> {mentor.hobby}</p>
      <p><strong>⭐ Rating:</strong> {mentor.rating}</p>
      <p><strong>📍 Location:</strong> {mentor.location}</p>
      <p><strong>📝 Experience:</strong> {mentor.experience} years</p>
      <p><strong>🎓 Certifications:</strong> {mentor.certifications}</p>
      <p><strong>💰 Fees:</strong> {mentor.fees}</p>
      <p><strong>📖 Bio:</strong> {mentor.bio}</p>
      <p><strong>👤 Age:</strong> {mentor.age}</p>
    </div>
  );
}

export default MentorProfile;