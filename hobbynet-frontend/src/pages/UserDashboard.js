import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const hobbies = ["Dance", "Singing", "Painting", "Cooking", "Photography"];

const UserDashboard = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleHobbyClick = (hobby) => {
    navigate(`/community/${hobby.toLowerCase()}`); // Redirect to the community page for the selected hobby
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {username}!</h1>
      <p className="dashboard-message">Explore hobbies and connect with the community.</p>

      <div className="hobby-list">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="hobby-card"
            onClick={() => handleHobbyClick(hobby)}
          >
            <h3>{hobby}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;