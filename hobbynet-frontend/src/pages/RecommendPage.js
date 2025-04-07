import React, { useEffect, useState } from "react";
import "./RecommendPage.css";

const RecommendPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = "YOUR_USER_ID"; // Replace with the actual user ID (e.g., from localStorage or context)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/recommend/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await response.json();
        setMentors(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  if (loading) {
    return <div className="recommend-loading">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="recommend-error">Error: {error}</div>;
  }

  return (
    <div className="recommend-container">
      <h1 className="recommend-title">Recommended Mentors</h1>
      {mentors.length === 0 ? (
        <p className="recommend-message">No mentors found for your preferences.</p>
      ) : (
        <div className="mentor-list">
          {mentors.map((mentor) => (
            <div key={mentor._id} className="mentor-card">
              <h3 className="mentor-name">{mentor.name}</h3>
              <p className="mentor-hobby">Hobby: {mentor.hobby}</p>
              <p className="mentor-experience">Experience: {mentor.experience} years</p>
              <p className="mentor-location">Location: {mentor.location}</p>
              <p className="mentor-fees">Fees: {mentor.fees}</p>
              <p className="mentor-bio">{mentor.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendPage;