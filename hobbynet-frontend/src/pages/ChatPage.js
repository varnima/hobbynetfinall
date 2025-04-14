// import React, { useState } from 'react';
// import './ChatPage.css';

// const conversations = [
//   { id: 1, name: 'Riya Mehta', lastMessage: 'See you at 5 PM!', online: true },
//   { id: 2, name: 'Amit Verma', lastMessage: 'Thanks for the session!', online: false },
//   { id: 3, name: 'Sneha Singh', lastMessage: 'Can you help with sketching?', online: true },
// ];

// const ChatPage = () => {
//   const [activeConversation, setActiveConversation] = useState(conversations[0]);
//   const [messages, setMessages] = useState([
//     { sender: 'them', text: 'Hi! Ready for the session?' },
//     { sender: 'me', text: 'Yes, let’s start!' },
//   ]);
//   const [input, setInput] = useState('');

//   const handleSend = () => {
//     if (input.trim() === '') return;
//     setMessages([...messages, { sender: 'me', text: input }]);
//     setInput('');
//   };

//   return (
//     <div className="chat-page">
//       <div className="conversation-list">
//         <h3>Chats</h3>
//         {conversations.map((c) => (
//           <div
//             key={c.id}
//             className={`conversation-item ${activeConversation.id === c.id ? 'active' : ''}`}
//             onClick={() => setActiveConversation(c)}
//           >
//             <div className={`status-dot ${c.online ? 'online' : 'offline'}`}></div>
//             <div>
//               <strong>{c.name}</strong>
//               <p>{c.lastMessage}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="chat-window">
//         <div className="chat-header">
//           <h3>{activeConversation.name}</h3>
//           <span className={`status ${activeConversation.online ? 'online' : 'offline'}`}>
//             {activeConversation.online ? 'Online' : 'Offline'}
//           </span>
//         </div>
//         <div className="chat-messages">
//           {messages.map((msg, idx) => (
//             <div key={idx} className={`message ${msg.sender}`}>
//               <p>{msg.text}</p>
//             </div>
//           ))}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type your message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//           />
//           <button onClick={handleSend}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


import React, { useEffect, useState } from 'react';
import {
  fetchConversations,
  fetchMessages,
  sendMessage,
} from '../services/chatAPI';

export default function ChatPage({ currentUserId }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchConversations(currentUserId)
      .then((res) => setConversations(res.data))
      .catch((err) => console.error(err));
  }, [currentUserId]);

  const loadMessages = (convo) => {
    setSelectedConversation(convo);
    fetchMessages(convo._id)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      conversation_id: selectedConversation._id,
      sender_id: currentUserId,
      receiver_id: currentUserId === selectedConversation.user1_id
        ? selectedConversation.user2_id
        : selectedConversation.user1_id,
      content: newMessage,
    };

    await sendMessage(messageData);
    setNewMessage('');
    loadMessages(selectedConversation); // reload messages
  };

  return (
    <div style={{ display: 'flex', height: '80vh' }}>
      {/* Left panel - Conversations */}
      <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h3>Chats</h3>
        {conversations.map((convo) => (
          <div
            key={convo._id}
            onClick={() => loadMessages(convo)}
            style={{
              cursor: 'pointer',
              padding: '8px',
              background: selectedConversation?._id === convo._id ? '#ffe0b2' : 'white',
              borderRadius: '5px',
              marginBottom: '5px',
            }}
          >
            Chat with: {currentUserId === convo.user1_id ? convo.user2_name : convo.user1_name}
          </div>
        ))}
      </div>

      {/* Right panel - Chat window */}
      <div style={{ width: '70%', padding: '10px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexGrow: 1, overflowY: 'auto', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          {messages.map((msg) => (
            <div key={msg._id} style={{ textAlign: msg.sender_id === currentUserId ? 'right' : 'left' }}>
              <div
                style={{
                  display: 'inline-block',
                  background: msg.sender_id === currentUserId ? '#f57c00' : '#ffcc80',
                  padding: '8px',
                  margin: '4px',
                  borderRadius: '10px',
                  color: 'white',
                  maxWidth: '60%',
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        {selectedConversation && (
          <div style={{ marginTop: '10px', display: 'flex' }}>
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ flexGrow: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: '8px',
                padding: '8px 16px',
                backgroundColor: 'orange',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
              }}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
