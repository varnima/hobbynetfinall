import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // Added role field
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

    if (!formData.role) {
      alert("Please select a role.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Login failed!");
        return;
      }

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role); // Store the role in local storage
        localStorage.setItem("username", data.username); // Store the username in local storage
        alert("Login successful!");

        // Redirect based on role
        if (data.role === "mentor") {
          navigate("/mentor-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="login-input"
        />
        <select
          name="role"
          onChange={handleChange}
          required
          className="login-select"
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="mentor">Mentor</option>
        </select>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;