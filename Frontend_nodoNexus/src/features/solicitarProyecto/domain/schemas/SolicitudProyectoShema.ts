import * as Yup from 'yup';

const phoneRegExp = /^(\+\d{1,3}\s?)?\d{7,12}$/;

export const solicitudProyectoSchema = Yup.object({
	email: Yup.string()
		.email('El correo no tiene un formato válido')
		.required('El correo es obligatorio'),

	nombre: Yup.string()
		.trim()
		.min(2, 'El nombre debe tener al menos 2 caracteres')
		.required('El nombre es obligatorio'),

	apellido: Yup.string()
		.trim()
		.min(2, 'El apellido debe tener al menos 2 caracteres')
		.required('El apellido es obligatorio'),

	numeroIdentidad: Yup.string()
		.matches(/^\d+$/, 'Solo se permiten números')
		.min(6, 'Mínimo 6 dígitos')
		.required('El número de identidad es obligatorio'),

	numeroTelefono: Yup.string()
		.matches(phoneRegExp, 'Número de teléfono inválido')
		.required('El número de teléfono es obligatorio'),

	tipoProyecto: Yup.string()
		.oneOf(
			['Web', 'Móvil', 'Desktop', 'IoT', 'Otro'],
			'Tipo de proyecto no reconocido'
		)
		.required('El tipo de proyecto es obligatorio'),

	descripcion: Yup.string()
		.trim()
		.min(20, 'Describe tu proyecto en al menos 20 caracteres')
		.required('La descripción es obligatoria'),

	presupuesto: Yup.number()
		.typeError('El presupuesto mínimo debe ser numérico')
		.positive('Debe ser mayor que cero'),

	presupuestoMax: Yup.number()
		.typeError('El presupuesto máximo debe ser numérico')
		.positive('Debe ser mayor que cero'),

	nombreProyecto: Yup.string()
		.trim()
		.min(4, 'El nombre del proyecto debe tener al menos 4 caracteres')
		.required('El nombre del proyecto es obligatorio'),

	plazoEstimado: Yup.number()
		.typeError('El plazo debe ser numérico')
		.integer('Debe ser un número entero de días')
		.positive('Debe ser mayor que cero'),

	archivosAdjuntos: Yup.string()
		.url('Debe ser una URL válida (S3, Drive, etc.)')
		.nullable(),
});
