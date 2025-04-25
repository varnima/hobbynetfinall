 

import React from 'react';
import './MentorDashboard.css';

import MentorSidebar from './MentorSidebar'; // Import the MentorSidebar component

const MentorDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <MentorSidebar />

      {/* Main Content */}
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <div className="mentor-dashboard">
          <header className="mentor-header">
            <h1>Welcome Mentor!</h1>
            <p>Manage your profile, sessions, and messages here.</p>
          </header>

          {/* Mentor Dashboard Home Section */}
          <div className="mentor-dashboard-home">
            <h2 className="welcome-text">Welcome back, Mentor Name! 👋</h2>

            <div className="stats-container">
              <div className="stat-card">
                <h3>👥 Students Connected</h3>
                <p>15</p>
              </div>
              <div className="stat-card">
                <h3>📅 Workshops Conducted</h3>
                <p>7</p>
              </div>
              <div className="stat-card">
                <h3>❤️ Posts Liked/Commented</h3>
                <p>42</p>
              </div>
              <div className="stat-card">
                <h3>👁️ Profile Views</h3>
                <p>120</p>
              </div>
            </div>
          </div>

          {/* Existing Mentor Dashboard Sections */}
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
      </div>
    </div>
  );
};

export default MentorDashboard;