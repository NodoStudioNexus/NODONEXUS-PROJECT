// features/comunicacion/infraestructure/api/notificacionApi.ts
import axios from 'axios';
import { RootState } from '../../../../app/store';


export const getNotificaciones = async (state: RootState, leido?: boolean) => {
	const token = state.auth.user?.token;
	console.log("Token extraído del estado:", token);
	try {
		const response = await axios.get('http://localhost:9091/api/notificaciones', {
			headers: { Authorization: `Bearer ${token?.trim()}` },
			params: { leido },
		});
		return response.data;
	} catch (error) {
		console.error("Error al obtener notificaciones:", error);
		throw error;
	}
};

export const markNotificacionAsRead = async (id: number, state: RootState) => {
	const token = state.auth.user?.token;
	const response = await axios.put(`http://localhost:9091/api/notificaciones/${id}/read`, null, {
		headers: { Authorization: `Bearer ${token?.trim()}` },
	});
	return response.data;
};

export const deleteNotificacion = async (id: number, state: RootState) => {
	const token = state.auth.user?.token;
	const response = await axios.delete(`http://localhost:9091/api/notificaciones/${id}`, {
		headers: { Authorization: `Bearer ${token?.trim()}` },
	});
	return response.data;
};