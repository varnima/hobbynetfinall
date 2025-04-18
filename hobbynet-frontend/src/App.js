import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MentorList from "./components/MentorList";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MentorDashboard from "./pages/MentorDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreatePost from "./pages/CreatePost";
// import "./style.css";
import MentorSignup from "./pages/MentorSignup";
import MentorProfilePage from "./pages/MentorProfilePage";
import CommunityPage from "./pages/CommunityPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import MentorDiscovery from "./pages/MentorDiscovery";
import ChatPage from "./pages/ChatPage";
import AdminDashboard from "./pages/AdminDashboard";
import SettingsPage from "./pages/SettingsPage";
import JoinGroups from "./pages/JoinGroupsPage";
import ResourcesPage from "./pages/ResourcesPage";
import AddWorkshop from "./pages/AddWorkshop";

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
          
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/create-post/:hobby" element={<CreatePost />} />
          <Route path="/mentor-signup" element={<MentorSignup />} />
          <Route path="/mentor/:id" element={<MentorProfilePage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/mentor-discovery" element={<MentorDiscovery />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/join-groups" element={<JoinGroups />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/add-workshop" element={<AddWorkshop />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
