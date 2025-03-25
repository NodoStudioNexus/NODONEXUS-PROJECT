export interface ResetPasswordRepository {
  requestReset(email: string): Promise<void>;
}
