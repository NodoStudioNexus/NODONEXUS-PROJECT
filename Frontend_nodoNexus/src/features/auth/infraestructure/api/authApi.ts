import { AuthRepository } from '../../domain/ports/AuthRepository';
import UserAuth from '../../domain/entities/UserAuth';
import api from '../../../../app/api/axiosConfig';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: number;
  sub: string;
}

export const authApi: AuthRepository = {
  async login(email: string, password: string): Promise<UserAuth> {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    const decodedToken: TokenPayload = jwtDecode(token);

    return {
      id: decodedToken.id,
      email: response.data.email || email,
      role: response.data.role,
      token,
      primerNombre: response.data.primerNombre,
      segundoNombre: response.data.segundoNombre,
      primerApellido: response.data.primerApellido,
      segundoApellido: response.data.segundoApellido,
      tipoIdentidad: response.data.tipoIdentidad,
      numeroIdentidad: response.data.numeroIdentidad,
      telefono: response.data.telefono,
      fechaRegistro: response.data.fechaRegistro,
      ultimoAcceso: response.data.ultimoAcceso,
      activo: response.data.activo,
      profileImage: response.data.profileImage,
      bannerProfileImage: response.data.bannerProfileImage,
      initial: response.data.initial,
    };
  },

  async getProfile(email: string): Promise<UserAuth> {
    const response = await api.get(`/users/profile?email=${email}`);
    const { token } = response.data;
    const decodedToken: TokenPayload = jwtDecode(token || '');

    return {
      id: decodedToken.id,
      email: response.data.email || email,
      role: response.data.role,
      token,
      primerNombre: response.data.primerNombre,
      segundoNombre: response.data.segundoNombre,
      primerApellido: response.data.primerApellido,
      segundoApellido: response.data.segundoApellido,
      tipoIdentidad: response.data.tipoIdentidad,
      numeroIdentidad: response.data.numeroIdentidad,
      telefono: response.data.telefono,
      fechaRegistro: response.data.fechaRegistro,
      ultimoAcceso: response.data.ultimoAcceso,
      activo: response.data.activo,
      profileImage: response.data.profileImage,
      bannerProfileImage: response.data.bannerProfileImage,
      initial: response.data.initial,
    };
  },
};