import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crowd API
export const getCrowdStatus = () => api.get('/crowd/status');
export const getCrowdPredictions = (templeId, date) => 
  api.get(`/crowd/predictions?templeId=${templeId}&date=${date}`);
export const getCrowdAnalytics = (templeId, days = 7) =>
  api.get(`/crowd/analytics?templeId=${templeId}&days=${days}`);

// Temples API
export const getTemples = () => api.get('/temples');
export const getTempleDetails = (id) => api.get(`/temples/${id}`);
export const updateCrowdData = (id, data) => api.put(`/temples/${id}/crowd`, data);
export const getCrowdHistory = (id, hours = 24) => 
  api.get(`/temples/${id}/crowd-history?hours=${hours}`);

// Emergencies API
export const reportEmergency = (data) => api.post('/emergencies', data);
export const getTempleEmergencies = (templeId) => api.get(`/emergencies/temple/${templeId}`);
export const updateEmergencyStatus = (id, data) => api.put(`/emergencies/${id}/status`, data);

// Users API
export const loginUser = (credentials) => api.post('/users/login', credentials);
export const registerUser = (userData) => api.post('/users/register', userData);
export const getUserProfile = () => api.get('/users/profile');

export default api;