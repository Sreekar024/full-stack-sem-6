import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Box,
  Typography
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

export default function Login() {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('password123');
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!username.trim() || !password.trim()) {
      setLocalError('Username and password are required.');
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      // Navigate based on role
      if (result.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else if (result.role === 'USER') {
        navigate('/user', { replace: true });
      }
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <Container maxWidth="sm" className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="w-100" sx={{ boxShadow: 3 }}>
        <CardContent className="p-5">
          <Box className="text-center mb-4">
            <LockIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom className="mb-2">
              RBAC System
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Role-Based Access Control
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box className="mb-4">
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                placeholder="Enter username"
                autoComplete="username"
                margin="normal"
              />
            </Box>

            <Box className="mb-4">
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Enter password"
                autoComplete="current-password"
                margin="normal"
              />
            </Box>

            {localError && (
              <Box className="mb-4">
                <Alert severity="error">{localError}</Alert>
              </Box>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              className="mb-3"
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <Box className="mt-4 p-3" sx={{ backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="subtitle2" className="mb-2">
              <strong>Demo Credentials:</strong>
            </Typography>
            <Typography variant="caption" display="block" className="mb-2">
              <strong>Admin:</strong> username: <code>admin</code> | password: <code>password123</code>
            </Typography>
            <Typography variant="caption" display="block">
              <strong>User:</strong> username: <code>user</code> | password: <code>password123</code>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
