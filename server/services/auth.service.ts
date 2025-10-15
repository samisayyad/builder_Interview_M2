import type { Request } from "express";
import { HttpError } from "@server/utils/http-error";

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  provider: "email" | "google" | "github" | "linkedin";
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResult {
  tokens: AuthTokens;
  userId: string;
}

export class AuthService {
  async register(_payload: RegisterInput): Promise<AuthResult> {
    throw new HttpError(501, "Registration workflow not implemented");
  }

  async login(_payload: LoginInput): Promise<AuthResult> {
    throw new HttpError(501, "Login workflow not implemented");
  }

  async refreshTokens(_request: Request): Promise<AuthTokens> {
    throw new HttpError(501, "Token refresh workflow not implemented");
  }

  async logout(_request: Request): Promise<void> {
    throw new HttpError(501, "Logout workflow not implemented");
  }
}

export const authService = new AuthService();
