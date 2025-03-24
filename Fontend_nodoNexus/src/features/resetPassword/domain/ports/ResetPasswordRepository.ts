
export interface ResetPasswordRepository {
  requestRequest(email: string): Promise<void>;
}
