import { useState, useEffect } from 'react';
import authService from '../services/authService';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !authService.isTokenExpired()) {
      setIsAuthenticated(true);
      setUser(authService.getCurrentUser());
    } else {
      authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(authService.getCurrentUser());
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
