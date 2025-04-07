import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const { hobby } = useParams(); // Get the hobby from the URL
  const navigate = useNavigate(); // For navigation
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const newPost = {
      user_id: "123", // Replace with the logged-in user's ID
      username: "John Doe", // Replace with the logged-in user's name
      title,
      content,
      hobby,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      if (data.success) {
        navigate(`/community/${hobby}`); // Redirect back to the community page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create a Post for {hobby.charAt(0).toUpperCase() + hobby.slice(1)}</h1>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
