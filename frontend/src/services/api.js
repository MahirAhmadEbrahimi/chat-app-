import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_BASE_URL = 'https://chat-app-project-resultfull-api.onrender.com';


const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/api/register', userData),
  login: (credentials) => api.post('/api/login', credentials),
};

export const chatAPI = {
  getMessages: () => api.get('/api/messages'),
};

export default api;
