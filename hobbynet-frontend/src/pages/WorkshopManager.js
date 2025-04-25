import React, { useState } from 'react';
import './WorkshopManager.css';

const WorkshopManager = () => {
  const [workshops, setWorkshops] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    hobby: '',
    link: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWorkshops([...workshops, { ...formData, id: Date.now() }]);
    setFormData({ title: '', description: '', date: '', time: '', hobby: '', link: '' });
  };

  const handleDelete = (id) => {
    setWorkshops(workshops.filter((workshop) => workshop.id !== id));
  };

  return (
    <div className="workshop-manager">
      <h2 className="section-title">📅 Create New Workshop</h2>
      <form className="workshop-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <input type="text" name="hobby" placeholder="Hobby" value={formData.hobby} onChange={handleChange} required />
        <input type="text" name="link" placeholder="Workshop Link" value={formData.link} onChange={handleChange} required />
        <button type="submit">Add Workshop</button>
      </form>

      <h2 className="section-title">🗂️ Your Workshops</h2>
      <div className="workshop-list">
        {workshops.length === 0 ? (
          <p className="empty-text">No workshops added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Hobby</th>
                <th>Date</th>
                <th>Time</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workshops.map((workshop) => (
                <tr key={workshop.id}>
                  <td>{workshop.title}</td>
                  <td>{workshop.hobby}</td>
                  <td>{workshop.date}</td>
                  <td>{workshop.time}</td>
                  <td><a href={workshop.link} target="_blank" rel="noreferrer">Join</a></td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(workshop.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WorkshopManager;
