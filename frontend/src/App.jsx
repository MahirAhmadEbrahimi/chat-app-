import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      {user ? (
        <Chat user={user} onLogout={handleLogout} />
      ) : (
        <>
          {isLogin ? (
            <Login
              onLogin={handleLogin}
              onSwitchToRegister={switchToRegister}
            />
          ) : (
            <Register
              onLogin={handleLogin}
              onSwitchToLogin={switchToLogin}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
