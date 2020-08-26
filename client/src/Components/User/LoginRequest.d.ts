export interface jwtToken {
  jwtToken: string;
}

export interface LoginData {
  firstName?: string;
  email?: string;
  passW?: string;
  fbToken?: string;
}

export interface LoginRequest<T> {
  (loginData: LoginData, path: string): Promise<T>;
}
