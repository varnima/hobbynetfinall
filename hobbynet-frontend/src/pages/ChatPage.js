
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import './ChatPage.css';

// const socket = io('http://127.0.0.1:5000'); // Connect to the backend WebSocket server

// const ChatPage = () => {
//   const [conversations, setConversations] = useState([]); // Conversations fetched from the backend
//   const [activeConversation, setActiveConversation] = useState(null); // Currently active conversation
//   const [messages, setMessages] = useState([]); // Messages for the active conversation
//   const [input, setInput] = useState(''); // Input for the message box
//   const [newChatUser, setNewChatUser] = useState(''); // Input for starting a new chat
//   const userId = 'user1'; // Replace with the logged-in user's ID

//   // Fetch conversations from the backend
//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/api/conversations/${userId}`);
//         const data = await response.json();
//         if (data.success) {
//           setConversations(data.conversations);
//           setActiveConversation(data.conversations[0]); // Set the first conversation as active
//         } else {
//           console.error('Failed to fetch conversations:', data.error);
//         }
//       } catch (error) {
//         console.error('Error fetching conversations:', error);
//       }
//     };

//     fetchConversations();
//   }, [userId]);

//   // Fetch messages for the active conversation
//   useEffect(() => {
//     if (!activeConversation) return;

//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/api/messages/${activeConversation._id}`);
//         const data = await response.json();
//         if (data.success) {
//           setMessages(data.messages);
//         } else {
//           console.error('Failed to fetch messages:', data.error);
//         }
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();

//     // Join the conversation room for real-time updates
//     socket.emit('join', { conversation_id: activeConversation._id });

//     // Listen for new messages
//     socket.on('new_message', (message) => {
//       if (message.conversation_id === activeConversation._id) {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       }
//     });

//     // Cleanup on component unmount or when activeConversation changes
//     return () => {
//       socket.emit('leave', { conversation_id: activeConversation._id });
//       socket.off('new_message');
//     };
//   }, [activeConversation]);

//   // Handle sending a new message
//   const handleSend = async () => {
//     if (input.trim() === '') return;

//     const newMessage = {
//       conversation_id: activeConversation._id,
//       sender_id: userId,
//       receiver_id: activeConversation.user2_id, // Assuming user2_id is the receiver
//       content: input,
//       timestamp: new Date().toISOString(),
//     };

//     try {
//       // Emit the message to the server via WebSocket
//       socket.emit('send_message', newMessage);

//       // Optimistically update the UI
//       setMessages([...messages, newMessage]);
//       setInput(''); // Clear the input field
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   // Handle starting a new chat
//   const handleNewChat = async () => {
//     if (newChatUser.trim() === '') return;

//     const newConversation = {
//       user1_id: userId,
//       user2_id: newChatUser, // The ID of the user/mentor to start a chat with
//     };

//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/conversations', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newConversation),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setConversations([...conversations, data.conversation]); // Add the new conversation to the list
//         setActiveConversation(data.conversation); // Set the new conversation as active
//         setNewChatUser(''); // Clear the input field
//       } else {
//         console.error('Failed to start a new chat:', data.error);
//       }
//     } catch (error) {
//       console.error('Error starting a new chat:', error);
//     }
//   };

//   return (
//     <div className="chat-page">
//       <div className="conversation-list">
//         <h3>Chats</h3>
//         {conversations.map((c) => (
//           <div
//             key={c._id}
//             className={`conversation-item ${activeConversation && activeConversation._id === c._id ? 'active' : ''}`}
//             onClick={() => setActiveConversation(c)}
//           >
//             <div className={`status-dot ${c.online ? 'online' : 'offline'}`}></div>
//             <div>
//               <strong>{c.user2_name}</strong>
//               <p>{c.last_message}</p>
//             </div>
//           </div>
//         ))}
//         <div className="new-chat">
//           <input
//             type="text"
//             placeholder="Enter user/mentor ID to start a chat"
//             value={newChatUser}
//             onChange={(e) => setNewChatUser(e.target.value)}
//           />
//           <button onClick={handleNewChat}>Start Chat</button>
//         </div>
//       </div>

//       <div className="chat-window">
//         {activeConversation ? (
//           <>
//             <div className="chat-header">
//               <h3>{activeConversation.user2_name}</h3>
//               <span className={`status ${activeConversation.online ? 'online' : 'offline'}`}>
//                 {activeConversation.online ? 'Online' : 'Offline'}
//               </span>
//             </div>
//             <div className="chat-messages">
//               {messages.map((msg, idx) => (
//                 <div key={idx} className={`message ${msg.sender_id === userId ? 'me' : 'them'}`}>
//                   <p>{msg.content}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="chat-input">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//               />
//               <button onClick={handleSend}>Send</button>
//             </div>
//           </>
//         ) : (
//           <p>Select a conversation to start chatting</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;



import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './ChatPage.css';

const socket = io('http://127.0.0.1:5000'); // Connect to the backend WebSocket server

const ChatPage = () => {
  const [conversations, setConversations] = useState([]); // Conversations fetched from the backend
  const [activeConversation, setActiveConversation] = useState(null); // Currently active conversation
  const [messages, setMessages] = useState([]); // Messages for the active conversation
  const [input, setInput] = useState(''); // Input for the message box
  const [newChatUser, setNewChatUser] = useState(''); // Input for starting a new chat
  const userId = 'user1'; // Replace with the logged-in user's ID

  // Fetch conversations from the backend
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/conversations/${userId}`);
        const data = await response.json();
        if (data.success) {
          setConversations(data.conversations);
          setActiveConversation(data.conversations[0]); // Set the first conversation as active
        } else {
          console.error('Failed to fetch conversations:', data.error);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, [userId]);

  // Fetch messages for the active conversation
  useEffect(() => {
    if (!activeConversation) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/messages/${activeConversation._id}`);
        const data = await response.json();
        if (data.success) {
          setMessages(data.messages);
        } else {
          console.error('Failed to fetch messages:', data.error);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Join the conversation room for real-time updates
    socket.emit('join', { conversation_id: activeConversation._id });

    // Listen for new messages
    socket.on('new_message', (message) => {
      if (message.conversation_id === activeConversation._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Cleanup on component unmount or when activeConversation changes
    return () => {
      socket.emit('leave', { conversation_id: activeConversation._id });
      socket.off('new_message');
    };
  }, [activeConversation]);

  // Handle sending a new message
  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = {
      conversation_id: activeConversation._id,
      sender_id: userId,
      receiver_id: activeConversation.user2_id, // Assuming user2_id is the receiver
      content: input,
      timestamp: new Date().toISOString(),
    };

    try {
      // Emit the message to the server via WebSocket
      socket.emit('send_message', newMessage);

      // Optimistically update the UI
      setMessages([...messages, newMessage]);
      setInput(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle starting a new chat
  const handleNewChat = async () => {
    if (newChatUser.trim() === '') return;

    const newConversation = {
      user1_id: userId,
      user2_id: newChatUser, // The ID of the user/mentor to start a chat with
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConversation),
      });

      const data = await response.json();
      if (data.success) {
        setConversations([...conversations, data.conversation]); // Add the new conversation to the list
        setActiveConversation(data.conversation); // Set the new conversation as active
        setNewChatUser(''); // Clear the input field
      } else {
        console.error('Failed to start a new chat:', data.error);
      }
    } catch (error) {
      console.error('Error starting a new chat:', error);
    }
  };

  return (
    <div className="chat-page">
      <div className="conversation-list">
        <h3>Chats</h3>
        {conversations.map((c) => (
          <div
            key={c._id}
            className={`conversation-item ${activeConversation && activeConversation._id === c._id ? 'active' : ''}`}
            onClick={() => setActiveConversation(c)}
          >
            <div className={`status-dot ${c.online ? 'online' : 'offline'}`}></div>
            <div>
              <strong>{c.user2_name}</strong>
              <p>{c.last_message}</p>
            </div>
          </div>
        ))}
        <div className="new-chat">
          <input
            type="text"
            placeholder="Enter user/mentor ID to start a chat"
            value={newChatUser}
            onChange={(e) => setNewChatUser(e.target.value)}
          />
          <button onClick={handleNewChat}>Start Chat</button>
        </div>
      </div>

      <div className="chat-window">
        {activeConversation ? (
          <>
            <div className="chat-header">
              <h3>{activeConversation.user2_name}</h3>
              <span className={`status ${activeConversation.online ? 'online' : 'offline'}`}>
                {activeConversation.online ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${msg.sender_id === userId ? 'me' : 'them'}`}
                >
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a conversation to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;