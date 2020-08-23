export interface jwtToken {
  jwtToken: string;
}

export interface LoginData {
  firstName?: string;
  email?: string;
  passW?: string;
  accessTokenFB?: string;
  path: string;
}

export interface LoginRequest<T> {
  (loginData: LoginData): Promise<T>;
}
