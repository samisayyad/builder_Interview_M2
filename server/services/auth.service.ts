import { env } from "../config/env.js";
import type { Request } from "express";

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
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      avatarUrl?: string;
    };
  };
}

let serviceInstance: any = null;

const getServiceInstance = async () => {
  if (serviceInstance) {
    return serviceInstance;
  }

  if (env.isDevelopment) {
    // Use in-memory dev auth
    const { authService: devService } = await import("./auth.dev.js");
    serviceInstance = devService;
  } else {
    // Use production auth with database
    const { AuthService } = await import("./auth.production.js");
    serviceInstance = new AuthService();
  }

  return serviceInstance;
};

export class AuthService {
  async register(payload: RegisterInput): Promise<AuthResult> {
    const service = await getServiceInstance();
    return service.register(payload);
  }

  async login(payload: LoginInput): Promise<AuthResult> {
    const service = await getServiceInstance();
    return service.login(payload);
  }

  async refreshTokens(request: Request): Promise<AuthTokens> {
    const service = await getServiceInstance();
    return service.refreshTokens(request);
  }

  async logout(request: Request): Promise<void> {
    const service = await getServiceInstance();
    return service.logout(request);
  }
}

export const authService = new AuthService();
