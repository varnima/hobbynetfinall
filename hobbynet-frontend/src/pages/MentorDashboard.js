// import React from "react";
// import "./Dashboard.css";

// const MentorDashboard = () => {
//   const username = localStorage.getItem("username");

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">Welcome, {username}!</h1>
//       <p className="dashboard-message">This is your Mentor Dashboard.</p>
//     </div>
//   );
// };

// export default MentorDashboard;
// import React from "react";

// const MentorDashboard = () => {
//   return (
//     <div style={{ textAlign: "center", padding: "50px" }}>
//       <h1>Welcome to the Mentor Dashboard!</h1>
//       <p>Here you can manage your profile, view mentees, and more.</p>
//     </div>
//   );
// };

// export default MentorDashboard;

import React from 'react';
import './MentorDashboard.css';

const MentorDashboard = () => {
  return (
    <div className="mentor-dashboard">
      <header className="mentor-header">
        <h1>Welcome Mentor!</h1>
        <p>Manage your profile, sessions, and messages here.</p>
      </header>

      <section className="mentor-section">
        <div className="dashboard-card">
          <h2>Upcoming Sessions</h2>
          <ul>
            <li>Session with Priya - April 15, 5:00 PM</li>
            <li>Session with Rahul - April 17, 2:00 PM</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h2>Messages</h2>
          <ul>
            <li><strong>Aman:</strong> Can we reschedule?</li>
            <li><strong>Neha:</strong> Thanks for the session!</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h2>My Ratings</h2>
          <p>⭐ 4.8 (32 Reviews)</p>
        </div>
      </section>
    </div>
  );
};

export default MentorDashboard; 
