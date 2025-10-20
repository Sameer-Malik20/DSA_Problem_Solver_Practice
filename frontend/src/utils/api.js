import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const problemsAPI = {
  getAll: (params) => api.get('/problems', { params }),
  getBySlug: (slug) => api.get(`/problems/${slug}`),
  getRandom: (difficulty) => api.get('/problems/random/problem', { params: { difficulty } }),
};

export const companiesAPI = {
  getAll: () => api.get('/companies'),
  getBySlug: (slug) => api.get(`/companies/${slug}`),
};

export const submissionsAPI = {
  submit: (data) => api.post('/submissions', data),
  run: (data) => api.post('/submissions/run', data),
  getUserSubmissions: (userId) => api.get(`/submissions/user/${userId}`),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  getStats: () => api.get('/user/stats'),
};

export default api;
