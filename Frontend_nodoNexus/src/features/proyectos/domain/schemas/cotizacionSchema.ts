import * as Yup from 'yup';

export const cotizacionSchema = Yup.object().shape({
	costoTotal: Yup.number()
		.required('El costo total es requerido')
		.positive('El costo debe ser positivo'),
	materiales: Yup.number()
		.required('El costo de materiales es requerido')
		.positive('Debe ser un valor positivo'),
	mano_obra: Yup.number()
		.required('El costo de mano de obra es requerido')
		.positive('Debe ser un valor positivo'),
	tiempoAnalisis: Yup.number()
		.required('Tiempo de análisis es requerido')
		.positive('Debe ser un valor positivo')
		.integer('Debe ser un número entero'),
	tiempoDesarrollo: Yup.number()
		.required('Tiempo de desarrollo es requerido')
		.positive('Debe ser un valor positivo')
		.integer('Debe ser un número entero'),
	alcance: Yup.string()
		.required('El alcance es requerido')
		.min(20, 'El alcance debe tener al menos 20 caracteres'),
	expiracion: Yup.date()
		.required('La fecha de expiración es requerida')
		.min(new Date(), 'La fecha debe ser futura'),
	archivoUrl: Yup.string()
		.url('Debe ser una URL válida')

});