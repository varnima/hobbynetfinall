import React from "react";
import "./Dashboard.css";

const MentorDashboard = () => {
  const username = localStorage.getItem("username");

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {username}!</h1>
      <p className="dashboard-message">This is your Mentor Dashboard.</p>
    </div>
  );
};

export default MentorDashboard;