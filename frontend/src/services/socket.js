import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect(token) {
    if (this.socket) {
      this.disconnect();
    }

    this.socket = io(SOCKET_URL, {
      autoConnect: false,
    });

    this.socket.connect();

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
      this.socket.emit('authenticate', token);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('auth_error', (error) => {
      console.error('Authentication error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  sendMessage(message) {
    if (this.socket && this.isConnected) {
      this.socket.emit('send_message', { text: message });
    }
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('new_message', callback);
    }
  }

  onUsersOnline(callback) {
    if (this.socket) {
      this.socket.on('users_online', callback);
    }
  }

  offNewMessage() {
    if (this.socket) {
      this.socket.off('new_message');
    }
  }

  offUsersOnline() {
    if (this.socket) {
      this.socket.off('users_online');
    }
  }
}

export default new SocketService();
