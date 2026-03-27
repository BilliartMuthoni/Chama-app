// Fixed re-export for isolatedModules
import type { User } from './user'
export type { User } from './user'

export interface LoginPayload {
  email: string;
  password: string;
}


export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
}


export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

