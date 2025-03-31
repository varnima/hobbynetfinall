import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MentorList from "./components/MentorList";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MentorDashboard from "./pages/MentorDashboard";
import UserDashboard from "./pages/UserDashboard";
import "./style.css";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <Routes>
          <Route path="/mentorlist" element={<MentorList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
