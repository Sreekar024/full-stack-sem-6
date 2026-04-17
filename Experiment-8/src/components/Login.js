import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  React.useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    try {
      // Call the login endpoint
      const response = await axios.post(
        'http://localhost:5001/login',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.token) {
        // Store JWT in sessionStorage
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('username', username);
        
        // Log for debugging
        console.log('Login successful, token stored in sessionStorage');
        console.log('Token:', response.data.token);

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="title">
        <h1>JWT Authentication</h1>
        <p>Experiment 8 - Session-Based Authentication</p>
      </div>
      <div className="login-card">
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', color: '#999' }}>
          <p style={{ fontSize: '12px' }}>
            Demo Credentials: <br />
            Username: <strong>user1</strong> <br />
            Password: <strong>password123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
