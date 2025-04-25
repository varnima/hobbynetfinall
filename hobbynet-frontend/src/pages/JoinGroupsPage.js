
import React, { useState, useEffect } from "react";
import "./JoinGroupsPage.css";

function JoinGroupsPage() {
  const [groups, setGroups] = useState([]); // All groups fetched from the backend
  const [joinedGroups, setJoinedGroups] = useState([]); // Groups the user has joined
  const [userId, setUserId] = useState("64f9c2e8e4b0f5a2b3c4d5e6"); // Replace with dynamic user ID

  // Fetch all groups and joined groups on component mount
  useEffect(() => {
    // Fetch all groups
    fetch("http://localhost:5000/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error("Error fetching groups:", err));

    // Fetch groups joined by the user
    fetch(`http://localhost:5000/api/user/groups/${userId}`)
      .then((res) => res.json())
      .then((data) => setJoinedGroups(data))
      .catch((err) => console.error("Error fetching joined groups:", err));
  }, [userId]);

  // Handle joining a group
  const handleJoin = async (groupId) => {
    try {
      const res = await fetch("http://localhost:5000/api/groups/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, groupId }),
      });
      const result = await res.json();

      if (result.success) {
        setJoinedGroups((prev) => [...prev, groupId]); // Add the group to joined groups
        alert("Successfully joined the group!");
      } else {
        alert("Failed to join the group: " + result.error);
      }
    } catch (error) {
      console.error("Error joining group:", error);
      alert("An error occurred while joining the group.");
    }
  };

  // Check if a group is already joined
  const isJoined = (groupId) => joinedGroups.includes(groupId);

  return (
    <div className="join-groups-page">
      <h2>Join Hobby Groups</h2>
      <div className="group-list">
        {groups.map((group) => (
          <div key={group._id} className="group-card">
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <p>🎯 Hobby: {group.hobby}</p>
            <button
              onClick={() => handleJoin(group._id)}
              disabled={isJoined(group._id)}
              className={isJoined(group._id) ? "joined" : ""}
            >
              {isJoined(group._id) ? "✔ Joined" : "Join"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JoinGroupsPage;