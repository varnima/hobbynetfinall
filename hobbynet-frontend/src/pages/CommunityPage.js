// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./CommunityPage.css";

// const CommunityPage = () => {
//   const { hobby } = useParams(); // Get the hobby from the URL
//   const navigate = useNavigate(); // For navigation
//   const [posts, setPosts] = useState([]);
//   const [mentors, setMentors] = useState([]);
//   const [videos, setVideos] = useState([]); // For hobby-related videos

//   useEffect(() => {
//     fetchTopPosts();
//     fetchTopMentors();
//     fetchVideos();
//   }, []);

//   // Fetch top posts for the community
//   const fetchTopPosts = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/posts/most-liked");
//       const data = await response.json();
//       if (data.success) {
//         setPosts(data.posts.filter((post) => post.title.toLowerCase().includes(hobby.toLowerCase())));
//       }
//     } catch (error) {
//       console.error("Error fetching top posts:", error);
//     }
//   };

//   // Fetch top mentors for the hobby
//   const fetchTopMentors = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/mentors/top/${hobby}`);
//       const data = await response.json();
//       if (data.success) {
//         setMentors(data.mentors);
//       }
//     } catch (error) {
//       console.error("Error fetching top mentors:", error);
//     }
//   };

//   // Fetch hobby-related videos (mock data for now)
//   const fetchVideos = () => {
//     setVideos([
//       "https://www.youtube.com/embed/4Qw4w9WoXcQ",
//       "https://www.youtube.com/embed/0Hg55JYRHA0",
//       "https://www.youtube.com/embed/tgbNymZ7vqY",
//     ]);
//   };

//   // Redirect to the Create Post page
//   const handleCreatePostRedirect = () => {
//     navigate(`/create-post/${hobby}`);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       {/* Header */}
//       <header className="text-center mb-6">
//         <h1 className="text-4xl font-bold">{hobby.charAt(0).toUpperCase() + hobby.slice(1)} Community</h1>
//         <p className="text-lg text-gray-600">Explore and connect with others who share your passion for {hobby}!</p>
//       </header>

//       {/* Create Post Button */}
//       <section className="mb-8 text-center">
//         <button
//           onClick={handleCreatePostRedirect}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Create a Post
//         </button>
//       </section>

//       {/* Top Community Posts Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold">Top Community Posts</h2>
//         <div className="grid grid-cols-3 gap-4 mt-4">
//           {posts.map((post) => (
//             <div key={post._id} className="bg-gray-200 p-4 rounded">
//               <h3 className="font-bold">{post.title}</h3>
//               <p>{post.content}</p>
//               {post.media_url && (
//                 <img
//                   src={post.media_url}
//                   alt="Post media"
//                   className="w-full h-40 object-cover rounded mt-2"
//                 />
//               )}
//               <p className="text-sm text-gray-600">By: {post.username}</p>
//               <p className="text-sm text-gray-600">Likes: {post.likes}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Hobby Videos Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold">{hobby.charAt(0).toUpperCase() + hobby.slice(1)} Videos</h2>
//         <div className="grid grid-cols-3 gap-4 mt-4">
//           {videos.map((video, index) => (
//             <iframe
//               key={index}
//               src={video}
//               allowFullScreen
//               className="w-full h-40"
//               title={`Video ${index + 1}`}
//             ></iframe>
//           ))}
//         </div>
//       </section>

//       {/* Mentors Section */}
//       <section>
//         <h2 className="text-2xl font-semibold">Top Mentors</h2>
//         <div className="grid grid-cols-3 gap-4 mt-4">
//           {mentors.map((mentor) => (
//             <div key={mentor._id} className="bg-blue-200 p-4 rounded">
//               <h3 className="font-bold">{mentor.username}</h3>
//               <p>Rating: ⭐ {mentor.rating}</p>
//               <p>Experience: {mentor.experience} years</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default CommunityPage;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CommunityPage.css";

const CommunityPage = () => {
  const { hobby } = useParams(); // Get the hobby from the URL
  const navigate = useNavigate(); // For navigation
  const [posts, setPosts] = useState([]); // Top posts
  const [mentors, setMentors] = useState([]); // Top mentors
  const [videos, setVideos] = useState([]); // Hobby-related videos
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    fetchTopContent();
  }, [hobby]);

  // Fetch top posts, mentors, and videos
  const fetchTopContent = async () => {
    try {
      setLoading(true);

      // Fetch top posts
      const postsResponse = await fetch("http://127.0.0.1:5000/posts/most-liked");
      const postsData = await postsResponse.json();
      if (postsData.success) {
        setPosts(postsData.posts.filter((post) => post.title.toLowerCase().includes(hobby.toLowerCase())));
      }

      // Fetch top mentors
      const mentorsResponse = await fetch(`http://127.0.0.1:5000/mentors/top/${hobby}`);
      const mentorsData = await mentorsResponse.json();
      if (mentorsData.success) {
        setMentors(mentorsData.mentors);
      }

      // Fetch hobby-related videos (mock data for now)
      setVideos([
        "https://www.youtube.com/embed/4Qw4w9WoXcQ",
        "https://www.youtube.com/embed/0Hg55JYRHA0",
        "https://www.youtube.com/embed/tgbNymZ7vqY",
      ]);

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch content. Please try again later.");
      setLoading(false);
    }
  };

  // Redirect to the Create Post page
  const handleCreatePostRedirect = () => {
    navigate(`/create-post/${hobby}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold">{hobby.charAt(0).toUpperCase() + hobby.slice(1)} Community</h1>
        <p className="text-lg text-gray-600">Explore and connect with others who share your passion for {hobby}!</p>
      </header>

      {/* Create Post Button */}
      <section className="mb-8 text-center">
        <button
          onClick={handleCreatePostRedirect}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create a Post
        </button>
      </section>

      {/* Top Community Posts Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Top Community Posts</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {posts.map((post) => (
            <div key={post._id} className="bg-gray-200 p-4 rounded">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.content}</p>
              {post.media_url && (
                <img
                  src={post.media_url}
                  alt="Post media"
                  className="w-full h-40 object-cover rounded mt-2"
                />
              )}
              <p className="text-sm text-gray-600">By: {post.username}</p>
              <p className="text-sm text-gray-600">Likes: {post.likes}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hobby Videos Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">{hobby.charAt(0).toUpperCase() + hobby.slice(1)} Videos</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {videos.map((video, index) => (
            <iframe
              key={index}
              src={video}
              allowFullScreen
              className="w-full h-40"
              title={`Video ${index + 1}`}
            ></iframe>
          ))}
        </div>
      </section>

      {/* Mentors Section */}
      <section>
        <h2 className="text-2xl font-semibold">Top Mentors</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {mentors.map((mentor) => (
            <div key={mentor._id} className="bg-blue-200 p-4 rounded">
              <h3 className="font-bold">{mentor.name}</h3>
              <p>Rating: ⭐ {mentor.rating}</p>
              <p>Experience: {mentor.experience} years</p>
              <p>Location: {mentor.location}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;