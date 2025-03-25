import { ResetPasswordRepository } from '../ports/ResetPasswordRepository';

export const requestResetUseCase = async (
  repository: ResetPasswordRepository,
  email: string
): Promise<void> => {
  return await repository.requestReset(email);
};
