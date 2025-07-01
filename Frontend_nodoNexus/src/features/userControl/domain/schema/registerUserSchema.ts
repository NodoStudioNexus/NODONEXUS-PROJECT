import * as Yup from 'yup';

export const registerUserSchema = Yup.object({
	email: Yup.string()
		.email('Formato de correo inválido')
		.required('Correo electrónico requerido'),

	role: Yup.string()
		.oneOf(['ADMIN', 'USER', 'CLIENT', 'ANALYST', '	PLANNER', 'MODELING', 'IMPLEMENTATION', 'TESTER', 'VALIDATION'], 'Rol inválido')
		.required('Rol requerido'),

	primerNombre: Yup.string()
		.min(2, 'El nombre debe tener al menos 2 caracteres')
		.max(50, 'El nombre no puede exceder 50 caracteres')
		.matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras')
		.required('Primer nombre requerido'),

	primerApellido: Yup.string()
		.min(2, 'El apellido debe tener al menos 2 caracteres')
		.max(50, 'El apellido no puede exceder 50 caracteres')
		.matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras')
		.required('Primer apellido requerido'),

	tipoIdentidad: Yup.string()
		.oneOf(['CC', 'TI', 'CE', 'PP'], 'Tipo de identidad inválido')
		.required('Tipo de identidad requerido'),

	numeroIdentidad: Yup.string()
		.matches(/^\d+$/, 'El número de identidad solo puede contener números')
		.min(6, 'El número de identidad debe tener al menos 6 dígitos')
		.max(15, 'El número de identidad no puede exceder 15 dígitos')
		.required('Número de identidad requerido')
});
