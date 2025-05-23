import React, { useState, useEffect } from "react";
import "./CommunityPage.css";

const API_BASE_URL = "http://127.0.0.1:5000";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", media_url: "" });
  const [newComment, setNewComment] = useState("");
  const [selectedHobby, setSelectedHobby] = useState("Painting");
  const [loading, setLoading] = useState(true);

  // Fetch all posts and top mentors
  useEffect(() => {
    fetchPosts();
    fetchTopMentors(selectedHobby);
  }, [selectedHobby]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchTopMentors = async (hobby) => {
    try {
      const response = await fetch(`${API_BASE_URL}/mentors/top/${hobby}`);
      const data = await response.json();
      if (data.success) {
        setMentors(data.mentors);
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newPost, user_id: "user1", username: "John Doe" }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Post created successfully!");
        fetchPosts();
        setNewPost({ title: "", content: "", media_url: "" });
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/like/${postId}`, { method: "POST" });
      const data = await response.json();
      if (data.success) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentPost = async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/comment/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "user1", username: "John Doe", comment: newComment }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Comment added successfully!");
        fetchPosts();
        setNewComment("");
      }
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  return (
    <div className="community-container">
      <header className="community-header">
        <h1>Community Page</h1>
        <h2>Explore posts and mentors for your favorite hobbies!</h2>
      </header>

      {/* Create Post Section */}
      <section className="create-post-section">
        <h3>Create a Post</h3>
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Media URL (optional)"
            value={newPost.media_url}
            onChange={(e) => setNewPost({ ...newPost, media_url: e.target.value })}
          />
          <button type="submit">Post</button>
        </form>
      </section>

      {/* Posts Section */}
      <section className="posts-section">
        <h2>All Posts</h2>
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.media_url && <img src={post.media_url} alt="Post media" />}
              <p>By: {post.username}</p>
              <p>Likes: {post.likes}</p>
              <button onClick={() => handleLikePost(post._id)}>Like</button>
              <div className="comment-section">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={() => handleCommentPost(post._id)}>Comment</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Mentors Section */}
      <section className="mentors-section">
        <h2>Top Mentors for {selectedHobby}</h2>
        <select onChange={(e) => setSelectedHobby(e.target.value)} value={selectedHobby}>
          <option value="Painting">Painting</option>
          <option value="Singing">Singing</option>
          <option value="Dancing">Dancing</option>
          <option value="Cooking">Cooking</option>
          <option value="Photography">Photography</option>
        </select>
        <div className="mentors-list">
          {mentors.map((mentor) => (
            <div key={mentor._id} className="mentor-card">
              <h3>{mentor.name}</h3>
              <p>Hobby: {mentor.hobby}</p>
              <p>Experience: {mentor.experience} years</p>
              <p>Rating: {mentor.rating}</p>
              <p>Location: {mentor.location}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;



