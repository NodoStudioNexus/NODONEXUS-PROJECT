export interface SolicitudProyecto {
	email: string;
	nombre: string;
	apellido: string;
	numeroIdentidad: string;
	numeroTelefono: string;
	tipoProyecto: string;
	descripcion: string;
	presupuesto?: number;
	presupuestoMax?: number;
	nombreProyecto: string;
	plazoEstimado?: number;
	archivosAdjuntos: string;
}