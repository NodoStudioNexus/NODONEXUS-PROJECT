import api from '../../../../app/api/axiosConfig';
import { Cotizacion } from '../../domain/entities/Cotizacion';
import { NuevoProyectoResumida, nuevoProyectoDetallada } from '../../domain/entities/NuevoProyecto';

export const getSolicitudesPendientes = async (): Promise<NuevoProyectoResumida[]> => {
	try {
		const response = await api.get('/solicitudes/pendientes');
		return response.data;
	} catch (error) {
		console.error('Error al obtener solicitudes pendientes', error);
		throw new Error('Error al obtener solicitudes pendientes');
	}
};

export const getSolicitudesEnProgreso = async (): Promise<NuevoProyectoResumida[]> => {
	try {
		const response = await api.get('/solicitudes/enProgreso');
		return response.data;
	} catch (error) {
		console.error('Error al obtener solicitudes en pendientes', error);
		throw new Error('Error al obtener solicitudes en pendientes');
	}
};

export const getSolicitudDetalles = async (id: number): Promise<nuevoProyectoDetallada> => {
	try {
		const response = await api.get(`/solicitudes/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error al obtener detalles de la solicitud', error);
		throw new Error('Error al obtener detalles de la solicitud');
	}
};

export const createCotizacion = async (cotizacion: Cotizacion, token: string): Promise<void> => {
	try {
		console.log('Enviando cotización con token:', token);
		await api.post('/cotizaciones', cotizacion, {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (error) {
		console.error('Error al crear cotización', error);
		throw error;
	}
};