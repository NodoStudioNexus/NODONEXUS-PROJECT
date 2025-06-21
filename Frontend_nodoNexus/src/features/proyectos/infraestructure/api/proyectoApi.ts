import api from "../../../../app/api/axiosConfig";
import { AvanceProyecto } from "../../domain/entities/AvanceProyecto";
import { ProyectoVista } from "../../domain/entities/ProyectoVista";

export const getProyectosVista = async (): Promise<ProyectoVista[]> => {
	try {
		const response = await api.get('/solicitudes/proyectos/vista');
		return response.data;
	} catch (error) {
		console.error('Error al obtener proyectos vista', error);
		throw new Error('Error al obtener proyectos vista');
	}
};

export const getAvanceProyecto = async (proyectoId: number): Promise<AvanceProyecto> => {
	try {
		const response = await api.get(`/solicitudes/proyectos/${proyectoId}/avance-completo`);
		return response.data;
	} catch (error) {
		console.error(`Error al obtener avance del proyecto ${proyectoId}`, error);
		throw new Error('Error al obtener avance del proyecto');
	}
};