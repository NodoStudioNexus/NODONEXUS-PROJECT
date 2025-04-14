import axios from "axios";
import { AuthRepository } from "../../domain/ports/AuthRepository";
import UserAuth from "../../domain/entities/UserAuth";

const API_URL = 'http://localhost:9091/api/auth';

export const authApi: AuthRepository = {
  async login(email: string, password: string): Promise<UserAuth> {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return {
      email,
      role: response.data.role,
      token: response.data.token,
    };
  },
};
