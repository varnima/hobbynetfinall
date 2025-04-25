import React from 'react';
import './MentorSidebar.css';

const MentorSidebar = () => {
  return (
    <div className="mentor-sidebar">
      <div className="mentor-profile">
        <img
          src="https://via.placeholder.com/80"
          alt="Mentor"
          className="mentor-profile-pic"
        />
        <h3 className="mentor-name">Mentor Name</h3>
      </div>

      <nav className="mentor-nav">
        <ul>
          <li><a href="/mentor/dashboard">🏠 Dashboard</a></li>
          <li><a href="/mentor/workshops">📅 My Workshops</a></li>
          <li><a href="/mentor/posts">📝 My Posts / Community</a></li>
          <li><a href="/mentor/messages">💬 Messages / Chat</a></li>
          <li><a href="/mentor/students">👩‍🎓 My Students</a></li>
          <li><a href="/mentor/edit-profile">✏️ Edit Profile</a></li>
          <li><a href="/logout">🚪 Logout</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default MentorSidebar;
