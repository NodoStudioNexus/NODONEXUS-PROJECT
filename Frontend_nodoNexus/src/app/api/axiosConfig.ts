import axios from "axios";

const api = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:9091'}/api`, // Base para todos los endpoints
	headers: {
		'Content-Type': 'application/json',
	},
});

// Interceptor para añadir el token JWT
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;