import axios from 'axios';

// Create axios instance with Spring Boot backend
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - attach auth headers
api.interceptors.request.use(
  (config) => {
    const user = sessionStorage.getItem('user');
    const role = sessionStorage.getItem('role');
    
    // Add Authorization header if user exists
    if (user && role) {
      config.headers['X-User-Name'] = user;
      config.headers['X-User-Role'] = role;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401/403 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authLogin = (username, password) => 
  api.post('/auth/login', { username, password });

export const authLogout = () => 
  api.post('/auth/logout');

// User endpoints
export const getUserProfile = () => 
  api.get('/user/profile');

export const getUserData = () => 
  api.get('/user/data');

// Admin endpoints
export const getAdminDashboard = () => 
  api.get('/admin/dashboard');

export const getAllUsers = () => 
  api.get('/admin/users');

export const deleteUser = (userId) => 
  api.delete(`/admin/users/${userId}`);

export default api;
