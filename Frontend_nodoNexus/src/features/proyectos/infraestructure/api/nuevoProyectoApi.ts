import api from '../../../../app/api/axiosConfig';
import { Cotizacion } from '../../domain/entities/Cotizacion';
import { NuevoProyectoResumida, VistaSolicitudUsuario, nuevoProyectoDetallada } from '../../domain/entities/NuevoProyecto';

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

export const getCotizacionUser = async (id: number): Promise<Cotizacion> => {
	try {
		const response = await api.get(`/cotizaciones/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error al obtener detalles de la cotización', error);
		throw new Error('Error al obtener detalles de la cotización');
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

export const getSolicitudesByUsuarioId = async (usuarioId: number): Promise<VistaSolicitudUsuario[]> => {
	try {
		const response = await api.get(`/solicitudes/usuario/${usuarioId}`);
		return response.data;
	} catch (error) {
		console.error('Error al obtener solicitudes del usuario', error);
		throw new Error('Error al obtener solicitudes del usuario');
	}
};

export const aprobarCotizacion = async (id: number): Promise<void> => {
	try {
		await api.put(`/cotizaciones/${id}/estado`, { estado: 'APROBADA' });
	} catch (error) {
		console.error('Error al aprobar la cotización', error);
		throw new Error('No se pudo aprobar la cotización');
	}
};

