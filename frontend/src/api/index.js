import axios from 'axios';
export const API_URL = "http://localhost:8000";


// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
 axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);