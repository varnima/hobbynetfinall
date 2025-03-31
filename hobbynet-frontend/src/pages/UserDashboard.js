import React from "react";
import "./Dashboard.css";
const UserDashboard = () => {
  const username = localStorage.getItem("username");

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {username}!</h1>
      <p className="dashboard-message">This is your User Dashboard.</p>
    </div>
  );
};

export default UserDashboard;