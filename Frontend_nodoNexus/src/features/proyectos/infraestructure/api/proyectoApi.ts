import api from "../../../../app/api/axiosConfig";
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