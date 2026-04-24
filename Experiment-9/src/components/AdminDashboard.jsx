import { useState, useEffect } from 'react';
import { getAdminDashboard, getAllUsers, deleteUser } from '../api';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import Navbar from './Navbar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, userId: null, userName: '' });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    setError('');
    try {
      const dashRes = await getAdminDashboard();
      setDashboardData(dashRes.data);

      const usersRes = await getAllUsers();
      setUsers(usersRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (userId, userName) => {
    setDeleteDialog({ open: true, userId, userName });
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await deleteUser(deleteDialog.userId);
      setUsers(users.filter(u => u.id !== deleteDialog.userId));
      setDeleteDialog({ open: false, userId: null, userName: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, userId: null, userName: '' });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" className="my-5">
        <Box className="mb-4">
          <Typography variant="h4" component="h1" gutterBottom className="mb-3">
            <AdminPanelSettingsIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mb-4">
            Full administrative access to system controls and user management.
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
              Loading dashboard data...
            </Typography>
          </Box>
        ) : (
          <>
            {/* Dashboard Statistics */}
            {dashboardData && (
              <Box className="mb-4" sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
                {Object.entries(dashboardData).map(([key, value]) => (
                  <Card key={key} sx={{ boxShadow: 2 }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </Typography>
                      <Typography variant="h5">{value}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}

            {/* Users Table */}
            <Card className="mb-4" sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom className="mb-3">
                  User Management
                </Typography>

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell>
                          <strong>ID</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Username</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Email</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Role</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Actions</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.length > 0 ? (
                        users.map((user) => (
                          <TableRow key={user.id} hover>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>
                              <strong>{user.username}</strong>
                            </TableCell>
                            <TableCell>{user.email || 'N/A'}</TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: 'inline-block',
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: 1,
                                  backgroundColor: user.role === 'ADMIN' ? '#ffebee' : '#e8f5e9',
                                  color: user.role === 'ADMIN' ? '#c62828' : '#2e7d32',
                                  fontWeight: 'bold',
                                  fontSize: '0.875rem'
                                }}
                              >
                                {user.role}
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                size="small"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDeleteClick(user.id, user.username)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No users found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            {/* Admin Capabilities */}
            <Card sx={{ backgroundColor: '#fff3e0' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🔑 Admin Capabilities
                </Typography>
                <Typography variant="body2" component="div">
                  <ul className="mb-0">
                    <li>✅ Access admin dashboard</li>
                    <li>✅ View system statistics</li>
                    <li>✅ Manage all users</li>
                    <li>✅ Delete users</li>
                    <li>✅ View all endpoints</li>
                    <li>✅ Full system control</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete user <strong>{deleteDialog.userName}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={deleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
