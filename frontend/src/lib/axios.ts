import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);


API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // window.location.href = '/login';
      // localStorage.removeItem('token');
      // localStorage.removeItem('user');
    } else if (error.response && error.response.status === 500) {
      console.error('Internal Server Error:', error.response.data);
    } else if (error.response && error.response.status === 403) {
    }
    return Promise.reject(error);
  }
);

export default API;
