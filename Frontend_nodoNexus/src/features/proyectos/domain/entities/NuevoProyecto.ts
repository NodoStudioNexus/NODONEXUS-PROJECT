export interface NuevoProyectoResumida {
	id: number;
	nombreProyecto: string;
	descripcion: string;
	estado: string;
	fechaSolicitud: string;
	clienteEmail: string;
	clienteNombre: string;
	clienteApellido: string;
	clienteNumeroIdentidad: string;
}

export interface nuevoProyectoDetallada {
	id: number;
	usuario: {
		id: number;
		email: string;
		primerNombre: string;
		primerApellido: string;
		numeroIdentidad: string;
		telefono: string | null;
		role: string;
		activo: boolean;
		fechaRegistro: string;
		mustChangePassword: boolean;
	};
	tipoProyecto: string;
	descripcion: string;
	presupuestoMin: number | null;
	presupuestoMax: number | null;
	nombreProyecto: string;
	plazoEstimado: number | null;
	archivosAdjuntos: string;
	fechaSolicitud: string;
	estado: string;
	numeroTelefonico: string | null;
}

export interface VistaSolicitudUsuario {
	solicitudId: number;
	usuarioId: number;
	nombreProyecto: string;
	descripcion: string;
	estado: string;
	fechaSolicitud: string; // ISO date string
	clienteEmail: string;
	clienteNombre: string;
	clienteApellido: string;
	clienteNumeroIdentidad: string;
}