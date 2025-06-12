import { SolicitudProyecto } from "../entities/SolicitudProyecto";

export interface SolicitudProyectoRepository {
	crearSolicitud(data: SolicitudProyecto): Promise<void>;
}