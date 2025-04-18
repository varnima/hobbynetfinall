import React, { useState } from 'react';
import './AddWorkshop.css';

function AddWorkshop() {
  const [formData, setFormData] = useState({
    mentor_id: '',
    mentor_name: '',
    title: '',
    description: '',
    date: '',
    time: '',
    link: '',
    tags: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(tag => tag.trim()) // handle clean tags
        }),
      });

      const result = await response.json();
      alert(result.message);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to submit. Backend may be down.");
    }
  };

  return (
    <div className="add-workshop">
      <h2>Add New Workshop</h2>
      <form onSubmit={handleSubmit}>
        <input name="mentor_id" placeholder="Mentor ID" onChange={handleChange} required />
        <input name="mentor_name" placeholder="Mentor Name" onChange={handleChange} required />
        <input name="title" placeholder="Workshop Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />
        <input name="link" placeholder="Meeting Link" onChange={handleChange} />
        <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />
        <button type="submit">Add Workshop</button>
      </form>
    </div>
  );
}

export default AddWorkshop;
