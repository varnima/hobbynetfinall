import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [reportedPosts, setReportedPosts] = useState([
    { id: 1, content: 'Inappropriate content', user: 'user123' },
    { id: 2, content: 'Spam', user: 'user456' }
  ]);

  const [mentorApplications, setMentorApplications] = useState([
    { id: 1, name: 'Neha Sharma', hobby: 'Painting' },
    { id: 2, name: 'Raj Malhotra', hobby: 'Music' }
  ]);

  const handleApproveMentor = (id) => {
    setMentorApplications(mentorApplications.filter(app => app.id !== id));
  };

  const handleBlockUser = (id) => {
    setReportedPosts(reportedPosts.filter(post => post.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <section className="dashboard-section">
        <h2>User Statistics</h2>
        <ul>
          <li>Total Users: 230</li>
          <li>Mentors: 54</li>
          <li>Active Groups: 32</li>
        </ul>
      </section>

      <section className="dashboard-section">
        <h2>Reported Posts</h2>
        {reportedPosts.map(post => (
          <div key={post.id} className="report-card">
            <p><strong>User:</strong> {post.user}</p>
            <p><strong>Issue:</strong> {post.content}</p>
            <button onClick={() => handleBlockUser(post.id)}>Remove</button>
          </div>
        ))}
      </section>

      <section className="dashboard-section">
        <h2>Mentor Applications</h2>
        {mentorApplications.map(app => (
          <div key={app.id} className="mentor-card">
            <p><strong>Name:</strong> {app.name}</p>
            <p><strong>Hobby:</strong> {app.hobby}</p>
            <button onClick={() => handleApproveMentor(app.id)}>Approve</button>
          </div>
        ))}
      </section>

      <section className="dashboard-section">
        <h2>Admin Controls</h2>
        <button className="danger">Block User</button>
      </section>
    </div>
  );
};

export default AdminDashboard;
