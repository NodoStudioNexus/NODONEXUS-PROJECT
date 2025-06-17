export interface Cotizacion {
	id: number;
	solicitudId: number;
	costoTotal: number;
	desgloseCostos: string;
	tiemposEstimados: string;
	alcance: string;
	expiracion: string;
	archivoUrl: string;
	estado: string;
}