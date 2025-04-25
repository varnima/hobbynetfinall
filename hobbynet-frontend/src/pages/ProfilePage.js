import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

export default function ProfilePage() {
  const userId = localStorage.getItem("user_id"); // Assuming user ID stored at login
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  // Fetch user profile
  const fetchUser = async () => {
    try {
      console.log("Fetching user profile...");
      const res = await fetch(`http://localhost:5000/api/user/${userId}`);
      console.log("Response status:", res.status);

      if (!res.ok) {
        throw new Error(`Failed to fetch user profile: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Response data:", data);

      if (data.success) {
        setUser(data.user);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Failed to fetch user profile.");
    }
  };

  // Save updated user profile
  const handleSave = async () => {
    try {
      console.log("Saving user profile...");
      const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      console.log("Save response:", result);

      if (result.success) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert(`Failed to update profile: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving user profile:", error);
      alert("An error occurred while saving the profile.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Handle loading and error states
  if (error) return <p className="error-message">{error}</p>;
  if (!user) return <p>Loading user profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-bg" src="/bg-art.jpg" alt="Background" />
        <div className="profile-avatar">
          <img src="/avatar.png" alt="User Avatar" />
        </div>
        <input
          className="profile-name"
          name="name"
          value={user.name}
          onChange={handleChange}
          readOnly={!isEditing}
        />
        <input
          className="profile-tagline"
          name="tagline"
          value={user.tagline}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="profile-content">
        <section className="profile-section bio">
          <h3>Bio</h3>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </section>

        <section className="profile-section hobbies">
          <h3>Hobbies</h3>
          <input
            name="hobbies"
            value={user.hobbies.join(", ")}
            onChange={(e) => setUser({ ...user, hobbies: e.target.value.split(",") })}
            readOnly={!isEditing}
          />
        </section>

        <section className="profile-section buttons">
          {isEditing ? (
            <button className="save-btn" onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </section>

        <section className="profile-section portfolio">
          <h3>Portfolio</h3>
          <textarea
            name="portfolio"
            value={user.portfolio.join("\n")}
            onChange={(e) => setUser({ ...user, portfolio: e.target.value.split("\n") })}
            readOnly={!isEditing}
          />
          <div className="portfolio-grid">
            {user.portfolio.map((url, index) => (
              <img key={index} src={url} alt={`Portfolio ${index}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}