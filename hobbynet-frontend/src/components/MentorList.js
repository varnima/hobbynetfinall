// import React, { useState, useEffect } from "react";

// const MentorList = () => {
//   const [mentors, setMentors] = useState([]);
//   const [hobby, setHobby] = useState("");
//   const [minRating, setMinRating] = useState("");

//   useEffect(() => {
//     fetchMentors();
//   }, []);

//   const fetchMentors = async () => {
//     let url = "http://127.0.0.1:5000/mentors";
//     const params = new URLSearchParams();
//     if (hobby) params.append("hobby", hobby);
//     if (minRating) params.append("min_rating", minRating);
    
//     if (params.toString()) {
//       url += `?${params.toString()}`;
//     }

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setMentors(data);
//     } catch (error) {
//       console.error("Error fetching mentors:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Mentor List</h2>

//       <div className="mb-4">
//         <input type="text" placeholder="Search Hobby" value={hobby} onChange={(e) => setHobby(e.target.value)} className="border p-2"/>
//         <input type="number" placeholder="Min Rating" value={minRating} onChange={(e) => setMinRating(e.target.value)} className="border p-2 ml-2"/>
//         <button onClick={fetchMentors} className="bg-blue-500 text-white p-2 ml-2">Search</button>
//       </div>

//       <ul>
//         {mentors.length > 0 ? (
//           mentors.map((mentor, index) => (
//             <li key={index} className="border p-2 mb-2">
//               <strong>{mentor.username}</strong> - {mentor.hobby} (⭐ {mentor.rating})
//             </li>
//           ))
//         ) : (
//           <p>No mentors found.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default MentorList;

import React, { useState, useEffect } from "react";
import "./MentorList.css";


const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [hobby, setHobby] = useState("");
  const [minRating, setMinRating] = useState("");

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    let url = "http://127.0.0.1:5000/mentors";
    const params = new URLSearchParams();
    if (hobby) params.append("hobby", hobby);
    if (minRating) params.append("min_rating", minRating);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMentors(data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mentor List</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Hobby"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Min Rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="border p-2 ml-2"
        />
        <button onClick={fetchMentors} className="bg-blue-500 text-white p-2 ml-2">
          Search
        </button>
      </div>

      <ul>
        {mentors.length > 0 ? (
          mentors.map((mentor, index) => (
            <li key={index} className="border p-2 mb-2">
              <strong>{mentor.username}</strong> - {mentor.hobby} (⭐ {mentor.rating})
            </li>
          ))
        ) : (
          <p>No mentors found.</p>
        )}
      </ul>
    </div>
  );
};

export default MentorList;