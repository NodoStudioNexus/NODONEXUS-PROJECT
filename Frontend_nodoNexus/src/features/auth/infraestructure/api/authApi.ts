import axios from "axios";
import { AuthRepository } from "../../domain/ports/AuthRepository";
import UserAuth from "../../domain/entities/UserAuth";

const API_URL = 'http://localhost:9091/api/auth';

export const authApi: AuthRepository = {
  async login(email: string, password: string): Promise<UserAuth> {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return {
      email: response.data.email,
      role: response.data.role,
      token: response.data.token,
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