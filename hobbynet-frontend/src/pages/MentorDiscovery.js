

// import React, { useState, useEffect } from 'react';
// import './MentorDiscovery.css';

// export default function MentorDiscovery() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredMentors, setFilteredMentors] = useState([]);
//   const [filters, setFilters] = useState({
//     hobby: 'All',
//     min_rating: 0,
//     experience: '',
//     location: ''
//   });

//   useEffect(() => {
//     fetchMentors();
//   }, [searchTerm, filters]);

//   const fetchMentors = async () => {
//     const queryParams = new URLSearchParams({
//       search: searchTerm,
//       hobby: filters.hobby,
//       min_rating: filters.min_rating,
//       experience: filters.experience,
//       location: filters.location
//     }).toString();

//     const response = await fetch(`http://127.0.0.1:5000/mentors?${queryParams}`);
//     const data = await response.json();
//     if (data.success) {
//       setFilteredMentors(data.mentors);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="mentor-page">
//       <header className="mentor-header">
//         <h2>Discover Mentors</h2>
//         <input
//           type="text"
//           className="search-bar"
//           placeholder="Search by name, hobby, location..."
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </header>

//       <div className="mentor-body">
//         <aside className="filters-panel">
//           <h3>Filters</h3>
//           <label>Hobby</label>
//           <select name="hobby" onChange={handleFilterChange}>
//             <option>All</option>
//             <option>Painting</option>
//             <option>Photography</option>
//             <option>Cooking</option>
//           </select>

//           <label>Rating</label>
//           <select name="min_rating" onChange={handleFilterChange}>
//             <option value="0">All</option>
//             <option value="4.5">4.5+</option>
//             <option value="4.0">4.0+</option>
//           </select>

//           <label>Experience</label>
//           <select name="experience" onChange={handleFilterChange}>
//             <option>All</option>
//             <option>1-3 years</option>
//             <option>3-5 years</option>
//             <option>5+ years</option>
//           </select>

//           <label>Location</label>
//           <input
//             type="text"
//             name="location"
//             placeholder="e.g. Delhi"
//             onChange={handleFilterChange}
//           />
//         </aside>

//         <section className="mentors-list">
//           {filteredMentors.map((mentor) => (
//             <div className="mentor-card" key={mentor._id}>
//               <img src={mentor.img || '/images/default.jpg'} alt={mentor.name} className="mentor-img" />
//               <h4>{mentor.name}</h4>
//               <p>🎯 {mentor.hobby}</p>
//               <p>⭐ {mentor.rating} | {mentor.experience} years</p>
//               <p>📍 {mentor.location}</p>
//               <button className="connect-btn">Connect</button>
//             </div>
//           ))}
//         </section>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './MentorDiscovery.css';

// MentorCard Component
const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();

  const handleConnect = () => {
    navigate(`/mentor/${mentor._id}`); // Navigate to the mentor's profile page
  };

  return (
    <div className="mentor-card">
      <img src={mentor.img || '/images/default.jpg'} alt={mentor.name} className="mentor-img" />
      <h4>{mentor.name}</h4>
      <p>🎯 {mentor.hobby}</p>
      <p>⭐ {mentor.rating} | {mentor.experience} years</p>
      <p>📍 {mentor.location}</p>
      <button className="connect-btn" onClick={handleConnect}>Connect</button>
    </div>
  );
};

export default function MentorDiscovery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [filters, setFilters] = useState({
    hobby: 'All',
    min_rating: 0,
    experience: '',
    location: ''
  });

  useEffect(() => {
    fetchMentors();
  }, [searchTerm, filters]);

  const fetchMentors = async () => {
    const queryParams = new URLSearchParams({
      search: searchTerm,
      hobby: filters.hobby,
      min_rating: filters.min_rating,
      experience: filters.experience,
      location: filters.location
    }).toString();

    const response = await fetch(`http://127.0.0.1:5000/mentors?${queryParams}`);
    const data = await response.json();
    if (data.success) {
      setFilteredMentors(data.mentors);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="mentor-page">
      <header className="mentor-header">
        <h2>Discover Mentors</h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name, hobby, location..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>

      <div className="mentor-body">
        <aside className="filters-panel">
          <h3>Filters</h3>
          <label>Hobby</label>
          <select name="hobby" onChange={handleFilterChange}>
            <option>All</option>
            <option>Painting</option>
            <option>Photography</option>
            <option>Cooking</option>
          </select>

          <label>Rating</label>
          <select name="min_rating" onChange={handleFilterChange}>
            <option value="0">All</option>
            <option value="4.5">4.5+</option>
            <option value="4.0">4.0+</option>
          </select>

          <label>Experience</label>
          <select name="experience" onChange={handleFilterChange}>
            <option>All</option>
            <option>1-3 years</option>
            <option>3-5 years</option>
            <option>5+ years</option>
          </select>

          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Delhi"
            onChange={handleFilterChange}
          />
        </aside>

        <section className="mentors-list">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </section>
      </div>
    </div>
  );
}