export interface User {
  id: number;
  email: string;
  role: string;
  primerNombre: string;
  segundoNombre?: string | null;
  primerApellido: string;
  segundoApellido?: string | null;
  tipoIdentidad: string;
  numeroIdentidad: string;
  telefono?: string | null;
  fechaRegistro: string;
  ultimoAcceso: string;
  activo: boolean;
  profileImage?: string | null;
  bannerProfileImage?: string | null;
  initial?: string | null;
}