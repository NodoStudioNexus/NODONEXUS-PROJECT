import { NuevoProyectoResumida, nuevoProyectoDetallada } from "../entities/NuevoProyecto";


export interface SolicitudProyectoRepository {
	getSolicitudesPendientes(): Promise<NuevoProyectoResumida[]>;
	getSolicitudDetalles(id: number): Promise<nuevoProyectoDetallada>;
}