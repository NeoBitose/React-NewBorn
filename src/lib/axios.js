import axios from 'axios';

// Buat axios instance untuk HMIF UNEJ API
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Bisa ditambahkan logic sebelum request dikirim
    // Misalnya menambahkan loading state atau token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Bisa ditambahkan logic setelah response diterima
    return response;
  },
  (error) => {
    // Handle error global
    if (error.response?.status === 404) {
      console.error('Data tidak ditemukan (404)');
    } else if (error.response?.status === 500) {
      console.error('Server error (500)');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (!error.response) {
      console.error('Network error - Tidak dapat terhubung ke server');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
