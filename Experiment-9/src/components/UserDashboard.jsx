import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../api';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import Navbar from './Navbar';
import PersonIcon from '@mui/icons-material/Person';

export default function UserDashboard() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getUserProfile();
      setProfileData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" className="my-5">
        <Box className="mb-4">
          <Typography variant="h4" component="h1" gutterBottom className="mb-3">
            <PersonIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            User Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mb-4">
            Welcome, <strong>{user}</strong>! This is your personal dashboard.
          </Typography>
        </Box>

        {error && (
          <Box className="mb-4">
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {loading ? (
          <Box className="text-center py-5">
            <CircularProgress />
            <Typography variant="body2" className="mt-2">
              Loading profile data...
            </Typography>
          </Box>
        ) : profileData ? (
          <Card className="mb-4" sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom className="mb-4">
                Profile Information
              </Typography>

              <TableContainer component={Paper} className="mb-4">
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell>
                        <strong>Field</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Value</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(profileData).map(([key, value]) => (
                      <TableRow key={key} hover>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </TableCell>
                        <TableCell>
                          {typeof value === 'object'
                            ? JSON.stringify(value)
                            : String(value)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Alert severity="info" className="mt-3">
                <strong>ℹ️ Info:</strong> This dashboard displays your user profile retrieved from the backend API.
              </Alert>
            </CardContent>
          </Card>
        ) : (
          <Alert severity="warning">No profile data available</Alert>
        )}

        <Card sx={{ backgroundColor: '#e3f2fd' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📋 User Restrictions
            </Typography>
            <Typography variant="body2" component="div">
              <ul className="mb-0">
                <li>✅ You can view your profile</li>
                <li>✅ You can access user-only endpoints</li>
                <li>❌ You cannot access admin functions</li>
                <li>❌ You cannot view admin dashboard</li>
                <li>❌ You cannot manage users</li>
              </ul>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
