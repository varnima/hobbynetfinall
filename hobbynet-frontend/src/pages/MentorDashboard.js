// import React from "react";
// import "./Dashboard.css";

// const MentorDashboard = () => {
//   const username = localStorage.getItem("username");

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">Welcome, {username}!</h1>
//       <p className="dashboard-message">This is your Mentor Dashboard.</p>
//     </div>
//   );
// };

// export default MentorDashboard;
import React from "react";

const MentorDashboard = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to the Mentor Dashboard!</h1>
      <p>Here you can manage your profile, view mentees, and more.</p>
    </div>
  );
};

export default MentorDashboard;