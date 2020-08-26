import { UserData } from '../UserData';

export interface LoginResp {
  jwtToken: string;
  user: UserData;
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
