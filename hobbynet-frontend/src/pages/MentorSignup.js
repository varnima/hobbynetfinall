import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MentorSignup.css";

const MentorSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hobby: "",
    experience: "",
    age: "",
    certifications: "",
    location: "",
    fees: "",
    bio: "",
    additionalDetails: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/mentor-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        navigate("/mentor-dashboard"); // Redirect to mentor dashboard
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting mentor details:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mentor-signup-container">
      <h1 className="mentor-signup-title">Mentor Signup</h1>
      <p className="mentor-signup-message">
        Fill in your details to join as a mentor and share your expertise!
      </p>
      <form className="mentor-signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="hobby"
          placeholder="Hobby (e.g., Painting, Cooking)"
          value={formData.hobby}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="certifications"
          placeholder="Certifications (if any)"
          value={formData.certifications}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fees"
          placeholder="Fee Structure (e.g., $50/hour)"
          value={formData.fees}
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          required
        ></textarea>
        <textarea
          name="additionalDetails"
          placeholder="Additional Details (optional)"
          value={formData.additionalDetails}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="mentor-signup-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MentorSignup;