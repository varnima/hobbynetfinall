import axios from 'axios';

const API_BASE = 'http://localhost:5000/api'; // Update if needed

export const fetchConversations = (userId) =>
  axios.get(`${API_BASE}/conversations/${userId}`);

export const fetchMessages = (conversationId) =>
  axios.get(`${API_BASE}/messages/${conversationId}`);

export const sendMessage = (data) =>
  axios.post(`${API_BASE}/messages`, data);

export const markMessageRead = (messageId) =>
  axios.put(`${API_BASE}/messages/${messageId}/read`);
