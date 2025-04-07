import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MentorList from "./components/MentorList";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MentorDashboard from "./pages/MentorDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreatePost from "./pages/CreatePost";
import "./style.css";
import MentorSignup from "./pages/MentorSignup";
import RecommendPage from "./pages/RecommendPage";
import CommunityPage from "./pages/CommunityPage";

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
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/community/:hobby" element={<CommunityPage />} />
          <Route path="/create-post/:hobby" element={<CreatePost />} />
          <Route path="/mentor-signup" element={<MentorSignup />} />
          <Route path="/recommend" element={<RecommendPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
