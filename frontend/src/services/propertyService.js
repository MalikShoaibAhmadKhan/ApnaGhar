import axios from 'axios';

const API_URL = '/api/properties';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } : {};
};

const getProperties = (filters = {}) => {
  const params = new URLSearchParams();
  
  Object.keys(filters).forEach(key => {
    if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
      params.append(key, filters[key]);
    }
  });

  return axios.get(`${API_URL}?${params.toString()}`);
};

const getProperty = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const createProperty = (propertyData) => {
  return axios.post(API_URL, propertyData, getAuthHeaders());
};

const updateProperty = (id, propertyData) => {
  return axios.put(`${API_URL}/${id}`, propertyData, getAuthHeaders());
};

const deleteProperty = (id) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export default {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
};