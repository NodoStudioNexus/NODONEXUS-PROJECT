
import UserAuth from "../entities/UserAuth";
import { AuthRepository } from "../ports/AuthRepository";

export const loginUseCase = async (
  repository: AuthRepository,
  email: string,
  password: string
): Promise<UserAuth> => {
  return await repository.login(email, password);
}
