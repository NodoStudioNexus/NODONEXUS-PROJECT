import axios from 'axios';
import { ResetPasswordRepository } from '../../domain/ports/ResetPasswordRepository';

const API_URL = 'http://localhost:9091/api/auth';

export const resetPasswordApi: ResetPasswordRepository = {
  async requestReset(email: string): Promise<void> {
    await axios.post(`${API_URL}/reset-password`, { email });
  },
};
