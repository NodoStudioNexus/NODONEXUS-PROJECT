import axiosConfigPublic from "../../../app/api/axiosConfigPublic";
import { SolicitudProyecto } from "../domain/entities/SolicitudProyecto";
import { SolicitudProyectoRepository } from "../domain/ports/SolicitudProyectoRepository";

export const solicitudProyectoApi: SolicitudProyectoRepository = {
	async crearSolicitud(data: SolicitudProyecto): Promise<void> {
		await axiosConfigPublic.post('/solicitudes/nuevoProyecto', data)
	}
}