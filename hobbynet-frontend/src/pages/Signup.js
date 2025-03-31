import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import the CSS file

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setLoading(false);

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("username", formData.username); // Store the username in local storage
        localStorage.setItem("role", formData.role); // Store the role in local storage
        alert("Signup successful!");

        // Redirect based on role
        if (formData.role === "mentor") {
          navigate("/mentor-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during signup:", error);
      alert("Signup failed! Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="signup-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="signup-input"
        />
        <select
          name="role"
          onChange={handleChange}
          className="signup-select"
        >
          <option value="user">User</option>
          <option value="mentor">Mentor</option>
        </select>
        <button
          type="submit"
          className="signup-button"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;