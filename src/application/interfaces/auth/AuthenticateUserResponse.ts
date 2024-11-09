export interface AuthenticateUserResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
}
