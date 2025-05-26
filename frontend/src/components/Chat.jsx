import { useState, useEffect, useRef } from 'react';
import socketService from '../services/socket';
import { chatAPI } from '../services/api';
import UserList from './UserList';

const Chat = ({ user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Get existing messages
        const response = await chatAPI.getMessages();
        setMessages(response.data);

        // Connect to socket
        const token = localStorage.getItem('token');
        socketService.connect(token);

        // Listen for new messages
        socketService.onNewMessage((message) => {
          setMessages((prev) => [...prev, message]);
        });

        // Listen for online users updates
        socketService.onUsersOnline((users) => {
          setOnlineUsers(users);
        });

        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        setLoading(false);
      }
    };

    initializeChat();

    // Cleanup on unmount
    return () => {
      socketService.offNewMessage();
      socketService.offUsersOnline();
      socketService.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socketService.sendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleLogout = () => {
    socketService.disconnect();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="chat-container">
        <div className="loading">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat App</h1>
        <div className="user-info">
          <span>Welcome, {user.username}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-content">
          <div className="messages-container">
            <div className="messages">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.userId === user.id ? 'own-message' : ''}`}
                >
                  <div className="message-header">
                    <span className="username">{message.username}</span>
                    <span className="timestamp">{formatTime(message.timestamp)}</span>
                  </div>
                  <div className="message-text">{message.text}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
              maxLength="500"
            />
            <button type="submit" disabled={!newMessage.trim()}>
              Send
            </button>
          </form>
        </div>

        <UserList users={onlineUsers} currentUser={user} />
      </div>
    </div>
  );
};

export default Chat;
