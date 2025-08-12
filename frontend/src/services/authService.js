import axios from 'axios';

const API_URL = '/api/auth';

const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        email: payload.email,
        id: payload.nameid,
      };
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }
  return null;
};

const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  isTokenExpired,
};