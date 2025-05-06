const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9091';

export const getProfileImageUrl = (profileImage?: string | null): string => {
	if (!profileImage || profileImage === '') {
		return 'https://via.placeholder.com/40';
	}
	return `${API_URL}/Uploads/${profileImage.split('/').pop()}`;
};