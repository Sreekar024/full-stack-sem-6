import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');

  // Check if token exists, redirect if not
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      const storedUsername = sessionStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [token, navigate]);

  const handleFetchData = async () => {
    setError('');
    setLoading(true);
    setData('');

    try {
      // Call the protected endpoint with JWT token
      const response = await axios.get(
        'http://localhost:5001/protected',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Protected endpoint response:', response.data);

      // Display the response
      if (typeof response.data === 'object') {
        setData(JSON.stringify(response.data, null, 2));
      } else {
        setData(response.data);
      }
    } catch (err) {
      console.error('Fetch data error:', err);
      
      if (err.response?.status === 401) {
        setError('Unauthorized! Token may be invalid or expired. Please login again.');
        // Clear session and redirect
        setTimeout(() => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('username');
          navigate('/');
        }, 2000);
      } else {
        setError(
          err.response?.data?.message ||
          err.message ||
          'Failed to fetch protected data'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    
    console.log('Logout successful, sessionStorage cleared');
    
    // Redirect to login
    navigate('/');
  };

  return (
    <div className="app-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="user-info">
            <div className="user-info-label">Logged in as</div>
            <div className="user-info-value">{username || 'User'}</div>
          </div>
        </div>

        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={handleFetchData}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Fetching...
              </>
            ) : (
              'Fetch Protected Data'
            )}
          </button>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
            disabled={loading}
          >
            Logout
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            padding: '15px',
            borderRadius: '5px',
            marginTop: '20px',
          }}>
            {error}
          </div>
        )}

        {data && (
          <div className="data-section">
            <div className="data-section-title">Protected Data Response:</div>
            <div className="data-content">{data}</div>
          </div>
        )}

        <div className="token-info">
          <div className="token-label">Session Token (JWT):</div>
          <div className="token-value">{token || 'No token found'}</div>
          <p style={{ marginTop: '10px', fontSize: '11px', color: '#999' }}>
            💡 Tip: Open DevTools (F12) → Application → Session Storage to see the stored token
          </p>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e7f3ff',
          borderLeft: '4px solid #2196F3',
          borderRadius: '5px',
          fontSize: '12px',
          color: '#333',
        }}>
          <strong>How this works:</strong>
          <ul style={{ marginTop: '10px', marginBottom: 0, paddingLeft: '20px' }}>
            <li>Login with credentials to receive a JWT token</li>
            <li>Token is stored in sessionStorage (session-based)</li>
            <li>Click "Fetch Protected Data" to access restricted API endpoint</li>
            <li>Token is sent in Authorization header as "Bearer {token}"</li>
            <li>Logout clears the token and redirects to login page</li>
            <li>If you refresh without a token, you'll be redirected to login</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
