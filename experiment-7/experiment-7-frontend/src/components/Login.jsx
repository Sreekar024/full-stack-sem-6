import { useState } from 'react';
import { login } from '../api/apiService';

function Login({ onLogin }) {
  const [email, setEmail]     = useState('admin@test.com');
  const [password, setPassword] = useState('password123');
  const [status, setStatus]   = useState('idle');
  const [errMsg, setErrMsg]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrMsg('Email and password are required.');
      return;
    }
    setStatus('pending');
    setErrMsg('');
    try {
      const res = await login(email, password);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setStatus('idle');
      onLogin(user);
    } catch (err) {
      setErrMsg(err.response?.data?.message || err.message);
      setStatus('error');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Experiment 7</h1>
        <p className="login-subtitle">API Integration &amp; Backend Communication</p>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="post-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'pending'}
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={status === 'pending'}
              autoComplete="current-password"
            />
          </label>
          {errMsg && <p className="form-error">{errMsg}</p>}
          <button type="submit" disabled={status === 'pending'}>
            {status === 'pending' ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p className="login-hint">
          Demo → <code>admin@test.com</code> / <code>password123</code>
        </p>
      </div>
    </div>
  );
}

export default Login;
