import React, { useEffect, useState } from 'react';
import './ResourcesPage.css';

function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [hobby, setHobby] = useState('All');

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/resources?hobby=${hobby}`)
      .then(res => res.json())
      .then(data => setResources(data.resources));

    fetch(`http://127.0.0.1:5000/api/workshops?hobby=${hobby}`)
      .then(res => res.json())
      .then(data => setWorkshops(data.workshops));
  }, [hobby]);

  return (
    <div className="resources-container">
      <h2>📚 Resources & 🎓 Workshops</h2>

      <select onChange={e => setHobby(e.target.value)} value={hobby}>
        <option value="All">All</option>
        <option value="Music">Music</option>
        <option value="Painting">Painting</option>
        <option value="Cooking">Cooking</option>
      </select>

      <div className="section">
        <h3>📚 Resources</h3>
        {resources.map(r => (
          <div className="card" key={r._id}>
            <h4>{r.title}</h4>
            <p>{r.description}</p>
            <a href={r.link} target="_blank" rel="noreferrer">View Resource</a>
          </div>
        ))}
      </div>

      <div className="section">
        <h3>🎓 Workshops</h3>
        {workshops.map(w => (
          <div className="card" key={w._id}>
            <h4>{w.title}</h4>
            <p>{w.description}</p>
            <p><strong>Date:</strong> {new Date(w.date).toLocaleString()}</p>
            <a href={w.registration_link} target="_blank" rel="noreferrer">Register</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesPage;
