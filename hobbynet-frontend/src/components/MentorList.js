import React, { useState, useEffect } from "react";
import "./MentorList.css"; // Import the CSS file

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [hobby, setHobby] = useState("");
  const [minRating, setMinRating] = useState("");

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    let url = "http://127.0.0.1:5000/mentors";
    const params = new URLSearchParams();
    if (hobby) params.append("hobby", hobby);
    if (minRating) params.append("min_rating", minRating);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMentors(data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  return (
    <div className="mentorlist-container">
      <h2 className="mentorlist-title">Mentor List</h2>

      <div className="mentorlist-filters">
        <input
          type="text"
          placeholder="Search Hobby"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          className="mentorlist-input"
        />
        <input
          type="number"
          placeholder="Min Rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="mentorlist-input"
        />
        <button onClick={fetchMentors} className="mentorlist-button">
          Search
        </button>
      </div>

      <ul className="mentorlist">
        {mentors.length > 0 ? (
          mentors.map((mentor, index) => (
            <li key={index} className="mentorlist-item">
              <strong>Name:</strong> {mentor.username} <br />
              <strong>Hobby:</strong> {mentor.hobby} <br />
              <strong>Rating:</strong> ⭐ {mentor.rating} <br />
              <strong>Experience:</strong> {mentor.experience} years <br />
              {/* <strong>Email:</strong> {mentor.email} */}
            </li>
          ))
        ) : (
          <p className="mentorlist-empty">No mentors found.</p>
        )}
      </ul>
    </div>
  );
};

export default MentorList;