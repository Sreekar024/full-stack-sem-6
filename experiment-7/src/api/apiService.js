import axios from 'axios';

// Real Express backend running on localhost:3001
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach Bearer token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — clear token & reload on 401
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

// Auth
export const login  = (email, password) => api.post('/api/auth/login', { email, password });
export const logout = ()                 => api.post('/api/auth/logout');

// Posts CRUD
export const getPosts   = ()           => api.get('/api/posts');
export const getPost    = (id)         => api.get(`/api/posts/${id}`);
export const createPost = (data)       => api.post('/api/posts', data);
export const updatePost = (id, data)   => api.put(`/api/posts/${id}`, data);
export const deletePost = (id)         => api.delete(`/api/posts/${id}`);

export default api;

