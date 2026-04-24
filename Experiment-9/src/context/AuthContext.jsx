import { createContext, useContext, useState, useCallback } from 'react';
import { authLogin, authLogout } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return sessionStorage.getItem('user') || null;
  });

  const [role, setRole] = useState(() => {
    return sessionStorage.getItem('role') || null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authLogin(username, password);
      const { user: userData, role: userRole } = response.data;

      // Store in sessionStorage
      sessionStorage.setItem('user', userData);
      sessionStorage.setItem('role', userRole);

      // Update state
      setUser(userData);
      setRole(userRole);

      return { success: true, role: userRole };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authLogout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      sessionStorage.clear();
      setUser(null);
      setRole(null);
      setError(null);
      setLoading(false);
    }
  }, []);

  const isAuthenticated = !!user && !!role;
  const isAdmin = role === 'ADMIN';
  const isUser = role === 'USER';

  const value = {
    user,
    role,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isUser,
    login,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
