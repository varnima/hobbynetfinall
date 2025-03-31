import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Signup successful! Please login.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="border p-2 mb-2 w-full"/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2 mb-2 w-full"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="border p-2 mb-2 w-full"/>
        
        <select name="role" onChange={handleChange} className="border p-2 mb-2 w-full">
          <option value="user">User</option>
          <option value="mentor">Mentor</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
