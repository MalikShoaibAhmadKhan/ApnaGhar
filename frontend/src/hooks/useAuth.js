import { useState, useEffect } from 'react';
import authService from '../services/authService';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token && !authService.isTokenExpired()) {
        setIsAuthenticated(true);
        setUser(authService.getCurrentUser());
      } else {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(authService.getCurrentUser());
    // Force a re-render of the entire app
    window.dispatchEvent(new Event('auth-change'));
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/login';
  };

  return { isAuthenticated, user, login, logout };
};

export default useAuth;
