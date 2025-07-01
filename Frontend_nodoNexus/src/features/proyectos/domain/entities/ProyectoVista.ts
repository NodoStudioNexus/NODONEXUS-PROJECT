export interface ProyectoVista {
	estado: string;
	proyecto_id: number;
	solicitud_id: number;
	cliente_id: number;
	nombre_proyecto: string;
	descripcion: string;
	fecha_inicio: string;
	proyecto_estado: string;
	documentacion_url: string;
	porcentaje_avance: number;
	cliente_email: string;
	cliente_nombre: string;
	cliente_apellido: string;
	solicitud_id_ref: number;
	solicitud_nombre: string;
	solicitud_estado: string;
}