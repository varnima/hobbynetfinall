

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import "./Dashboard.css";

// export default function UserDashboard() {
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [mentors, setMentors] = useState([]); // State to store recommended mentors
//   const [showAllMentors, setShowAllMentors] = useState(false); // State to toggle between showing 3 mentors and all mentors

//   // Fetch recommended mentors from the backend
//   useEffect(() => {
//     const fetchRecommendedMentors = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/api/recommend/mentors"); // Replace with your backend endpoint
//         const data = await response.json();
//         if (data.success) {
//           setMentors(data.mentors); // Set the mentors in state
//         } else {
//           console.error("Failed to fetch mentors:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching mentors:", error);
//       }
//     };

//     fetchRecommendedMentors();
//   }, []);

//   const handleNavigation = (path) => {
//     navigate(path); // Navigate to the specified path
//   };

//   return (
//     <div className="dashboard">
//       {/* Top Navbar */}
//       <header className="top-navbar">
//         <div className="logo">HobbyNet</div>
//         <input type="text" className="search" placeholder="Search hobbies, mentors..." />
//         <div className="top-actions">
//           <span className="icon">🔔</span>
//           <img
//             src="/images/profile.jpg"
//             alt="Profile"
//             className="profile-pic"
//             onClick={() => handleNavigation("/profile")} // Navigate to ProfilePage.js
//           />
//         </div>
//       </header>

//       <div className="main-content">
//         {/* Sidebar */}
//         <aside className="sidebar">
//           <ul>
//             <li onClick={() => handleNavigation("/")}>🏠 Home</li>
//             <li onClick={() => handleNavigation("/mentor-discovery")}>🔍 Explore Mentors</li>
//             <li onClick={() => handleNavigation("/chat")}>💬 Chats</li>
//             <li onClick={() => handleNavigation("/community")}>🌐 Community</li>
//             <li onClick={() => handleNavigation("/settings")}>⚙️ Settings</li>
//           </ul>
//         </aside>

//         <section className="dashboard-content">
//           {/* Welcome Message */}
//           <h2 className="welcome-msg">Welcome back, Hobbyist!</h2>

//           {/* Hobby Highlights Carousel */}
//           <div className="carousel">
//             <div className="carousel-item">🎨 Painting Workshop</div>
//             <div className="carousel-item">🎸 Guitar Jam</div>
//             <div className="carousel-item">🍳 Cooking Class</div>
//           </div>

//           {/* Recommended Mentors */}
//           <div className="recommend-section">
//             <h3>Recommended Mentors</h3>
//             <div className="card-container">
//               {(showAllMentors ? mentors : mentors.slice(0, 3)).map((mentor, index) => (
//                 <div className="mentor-card" key={index}>
//                   <h4>{mentor.name}</h4>
//                   <p>🎯 Hobby: {mentor.hobby}</p>
//                   <p>⭐ Rating: {mentor.rating}</p>
//                   <p>📍 Location: {mentor.location}</p>
//                 </div>
//               ))}
//             </div>
//             {mentors.length > 3 && (
//               <button
//                 className="show-more-btn"
//                 onClick={() => setShowAllMentors(!showAllMentors)}
//               >
//                 {showAllMentors ? "Show Less" : "Show More Mentors"}
//               </button>
//             )}
//           </div>

//           {/* Join Hobby Group */}
//           <div className="group-section">
//             <h3>Join a Hobby Group</h3>
//             <input type="text" placeholder="Search groups by hobby" className="group-filter" />
//             <div className="group-list">
//               <div className="group-card">🎨 Art Lovers</div>
//               <div className="group-card">📖 Bookworms</div>
//               <div className="group-card">🎮 Gamers United</div>
//             </div>
//           </div>

//           {/* Latest Community Posts */}
//           <div className="community-posts">
//             <h3>Latest Community Posts</h3>
//             <div className="post">
//               <p>
//                 <strong>Rahul:</strong> Just finished a painting challenge! 🖌️
//               </p>
//             </div>
//             <div className="post">
//               <p>
//                 <strong>Sneha:</strong> Looking for a baking mentor! 🍰
//               </p>
//             </div>
//             <div className="post">
//               <p>
//                 <strong>Arjun:</strong> Hosting a weekend photography walk 📷
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Dashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [mentors, setMentors] = useState([]); // State to store recommended mentors
  const [showAllMentors, setShowAllMentors] = useState(false); // State to toggle between showing 3 mentors and all mentors

  // Fetch recommended mentors from the backend
  useEffect(() => {
    const fetchRecommendedMentors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/recommend/mentors"); // Replace with your backend endpoint
        const data = await response.json();
        if (data.success) {
          setMentors(data.mentors); // Set the mentors in state
        } else {
          console.error("Failed to fetch mentors:", data.message);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchRecommendedMentors();
  }, []);

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="dashboard">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="logo">HobbyNet</div>
        <input type="text" className="search" placeholder="Search hobbies, mentors..." />
        <div className="top-actions">
          <span className="icon">🔔</span>
          <img
            src="/images/profile.jpg"
            alt="Profile"
            className="profile-pic"
            onClick={() => handleNavigation("/profile")} // Navigate to ProfilePage.js
          />
        </div>
      </header>

      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li onClick={() => handleNavigation("/")}>🏠 Home</li>
            <li onClick={() => handleNavigation("/mentor-discovery")}>🔍 Explore Mentors</li>
            <li onClick={() => handleNavigation("/chat")}>💬 Chats</li>
            <li onClick={() => handleNavigation("/community")}>🌐 Community</li>
            <li onClick={() => handleNavigation("/resources")}>📚 Resources & Workshops</li>
          </ul>
        </aside>

        <section className="dashboard-content">
          {/* Welcome Message */}
          <h2 className="welcome-msg">Welcome back, Hobbyist!</h2>

          {/* Hobby Highlights Carousel */}
          <div className="carousel">
            <div className="carousel-item">🎨 Painting Workshop</div>
            <div className="carousel-item">🎸 Guitar Jam</div>
            <div className="carousel-item">🍳 Cooking Class</div>
          </div>

          {/* Recommended Mentors */}
          <div className="recommend-section">
            <h3>Recommended Mentors</h3>
            <div className="card-container">
              {(showAllMentors ? mentors : mentors.slice(0, 3)).map((mentor, index) => (
                <div className="mentor-card" key={index}>
                  <h4>{mentor.name}</h4>
                  <p>🎯 Hobby: {mentor.hobby}</p>
                  <p>⭐ Rating: {mentor.rating}</p>
                  <p>📍 Location: {mentor.location}</p>
                </div>
              ))}
            </div>
            {mentors.length > 3 && (
              <button
                className="show-more-btn"
                onClick={() => setShowAllMentors(!showAllMentors)}
              >
                {showAllMentors ? "Show Less" : "Show More Mentors"}
              </button>
            )}
          </div>

          {/* Join Hobby Group */}
          <div className="group-section">
            <h3>Join a Hobby Group</h3>
            <input type="text" placeholder="Search groups by hobby" className="group-filter" />
            <div className="group-list">
              <div className="group-card">🎨 Art Lovers</div>
              <div className="group-card">📖 Bookworms</div>
              <div className="group-card">🎮 Gamers United</div>
            </div>
          </div>

          {/* Latest Community Posts */}
          <div className="community-posts">
            <h3>Latest Community Posts</h3>
            <div className="post">
              <p>
                <strong>Rahul:</strong> Just finished a painting challenge! 🖌️
              </p>
            </div>
            <div className="post">
              <p>
                <strong>Sneha:</strong> Looking for a baking mentor! 🍰
              </p>
            </div>
            <div className="post">
              <p>
                <strong>Arjun:</strong> Hosting a weekend photography walk 📷
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}