import axios from 'axios';

const API_URL = '/api/favorites';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getFavorites = () => {
  return axios.get(API_URL, getAuthHeaders());
};

const addFavorite = (propertyId) => {
  return axios.post(`${API_URL}/${propertyId}`, {}, getAuthHeaders());
};

const removeFavorite = (propertyId) => {
  return axios.delete(`${API_URL}/${propertyId}`, getAuthHeaders());
};

export default {
  getFavorites,
  addFavorite,
  removeFavorite,
};
