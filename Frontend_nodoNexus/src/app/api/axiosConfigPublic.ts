import axios from 'axios';

const axiosConfigPublic = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:9091'}/api`,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosConfigPublic;