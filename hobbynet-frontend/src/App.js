import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MentorList from "./components/MentorList";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
 import "./style.css";


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<MentorList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
