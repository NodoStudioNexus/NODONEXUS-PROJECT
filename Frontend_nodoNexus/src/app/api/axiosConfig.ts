import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:9091'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const persistData = localStorage.getItem('persist:auth');
  let token: string | null = null;

  if (persistData) {
    try {
      const parsedData = JSON.parse(persistData);
      const user = parsedData.user ? JSON.parse(parsedData.user) : null;
      token = user?.token || null;
    } catch (error) {
      console.error('Error parsing persist:auth:', error);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
