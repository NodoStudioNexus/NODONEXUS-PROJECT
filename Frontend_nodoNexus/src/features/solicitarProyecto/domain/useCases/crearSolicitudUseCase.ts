import { SolicitudProyecto } from "../entities/SolicitudProyecto";
import { SolicitudProyectoRepository } from "../ports/SolicitudProyectoRepository";

export const crearSolicitudUseCase = async (
	repository: SolicitudProyectoRepository,
	data: SolicitudProyecto
): Promise<void> => {
	await repository.crearSolicitud(data);
};

