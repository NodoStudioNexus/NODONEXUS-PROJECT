export interface AvanceProyecto {
	porcentajeProyecto: number;
	fases: Fase[];
	funcionalidades: Funcionalidad[];
}

export interface Fase {
	id: number;
	porcentaje: number;
	nombre: string;
}

export interface Funcionalidad {
	id: number;
	porcentaje: number;
	nombre: string;
}