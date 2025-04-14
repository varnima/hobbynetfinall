// src/pages/SettingsPage.js
import React, { useState } from 'react';
import './SettingsPage.css';

const hobbies = ['Painting', 'Music', 'Cooking', 'Dance', 'Photography', 'Writing'];

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    location: '',
    selectedHobbies: [],
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleHobbyChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setSettings((prev) => ({ ...prev, selectedHobbies: selected }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings Saved:', settings);
    // Send to backend here
  };

  return (
    <div className="settings-container">
      <h2 className="settings-heading">Account Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={settings.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={settings.location}
            onChange={handleChange}
          />
        </label>

        <label>
          Hobby Preferences:
          <select multiple value={settings.selectedHobbies} onChange={handleHobbyChange}>
            {hobbies.map((hobby) => (
              <option key={hobby} value={hobby}>
                {hobby}
              </option>
            ))}
          </select>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
          Enable Notifications
        </label>

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default SettingsPage;
