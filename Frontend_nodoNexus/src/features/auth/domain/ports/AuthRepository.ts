import UserAuth from "../entities/UserAuth";

export interface AuthRepository {
  getProfile(email: string): any;
  login(email: string, password: string): Promise<UserAuth>;
}
