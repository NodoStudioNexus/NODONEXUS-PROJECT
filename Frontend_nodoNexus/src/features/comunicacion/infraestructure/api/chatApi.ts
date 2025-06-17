import axios from 'axios';

export const createGroupChat = async (chatData: { name: string; participants: string[] }) => {
	try {
		const response = await axios.post('http://localhost:9091/api/chat/create', chatData, {
			headers: { 'Content-Type': 'application/json' },
		});
		return response.data;
	} catch (error) {
		console.error('Error creando chat grupal:', error);
		throw error;
	}
};