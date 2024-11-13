export interface TokenPayload {
  sub: string;
  email: string;
}

export interface AuthTokens {
  refreshToken: string;
  accessToken: string;
}
