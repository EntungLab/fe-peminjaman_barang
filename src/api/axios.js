import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // sesuaikan dengan URL backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Interceptor untuk debugging
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response || error);
    return Promise.reject(error);
  }
);

export default api; 