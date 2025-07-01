export interface UserResponse {
	id: number;
	image: string;
	email: string;
	primerNombre: string;
	primerApellido: string;
	tipoIdentidad: string; // Corresponde a IdentityType del backend
	numeroIdentidad: string;
	telefono: string | null; // Opcional según el DTO
	role: string; // Corresponde a RoleEnum del backend
	fechaRegistro: string;
	activo: boolean;
}

export interface CreateUsersRequest {
	email: string;
	primerNombre: string;
	primerApellido: string;
	tipoIdentidad: string;
	numeroIdentidad: string;
	telefono: string | null;
	role: string;
}