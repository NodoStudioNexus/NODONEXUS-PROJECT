import axios from 'axios';

import { RootState } from '../../../../app/store';
import { NuevoProyectoResumida, nuevoProyectoDetallada } from '../../domain/entities/NuevoProyecto';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9091',
});

export const getSolicitudesPendientes = async (state: RootState): Promise<NuevoProyectoResumida[]> => {
	try {
		const response = await api.get('/solicitudes/pendientes', {
			headers: { Authorization: `Bearer ${state.auth.user?.token}` },
		});
		return response.data;
	} catch (error) {
		throw new Error('Error al obtener solicitudes pendientes');
	}
};

export const getSolicitudDetalles = async (id: number, state: RootState): Promise<nuevoProyectoDetallada> => {
	try {
		const response = await api.get(`/solicitudes/pendientes/${id}`, {
			headers: { Authorization: `Bearer ${state.auth.user?.token}` },
		});
		return response.data;
	} catch (error) {
		throw new Error('Error al obtener detalles de la solicitud');
	}
};