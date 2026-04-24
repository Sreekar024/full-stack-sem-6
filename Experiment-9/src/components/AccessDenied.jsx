import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Alert
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import Navbar from './Navbar';

export default function AccessDenied() {
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleGoHome = () => {
    if (role === 'ADMIN') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/user', { replace: true });
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" className="my-5">
        <Card sx={{ boxShadow: 3 }}>
          <CardContent className="text-center py-5">
            <BlockIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom className="mb-3">
              Access Denied
            </Typography>
            <Typography variant="body1" color="textSecondary" className="mb-4">
              You don't have permission to access this resource. Your current role is <strong>{role}</strong>.
            </Typography>

            <Alert severity="warning" className="mb-4">
              <strong>Note:</strong> Only users with the appropriate role can access certain sections of the application.
            </Alert>

            <Box className="d-flex gap-2 justify-content-center">
              <Button
                variant="contained"
                size="large"
                onClick={handleGoHome}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
              >
                Login as Different User
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
