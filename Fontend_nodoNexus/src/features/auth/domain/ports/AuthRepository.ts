import { UserAuth } from "../entities/UserAuth";

export interface AuthRepository {
  login(email: string, password: string): Promise<UserAuth>;
}
