import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/mentors");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2 mb-2 w-full"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="border p-2 mb-2 w-full"/>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
