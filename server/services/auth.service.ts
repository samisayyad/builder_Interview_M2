import type { Request } from "express";
import { env } from "../config/env.js";

// Use development in-memory auth for development, production auth with database for production
let authService: any = null;

const getAuthService = async () => {
  if (authService) {
    return authService;
  }

  if (env.isDevelopment) {
    const { authService: devService } = await import("./auth.dev.js");
    authService = devService;
  } else {
    const { AuthService } = await import("./auth.production.js");
    authService = new AuthService();
  }

  return authService;
};

export async function register(payload: any) {
  const service = await getAuthService();
  return service.register(payload);
}

export async function login(payload: any) {
  const service = await getAuthService();
  return service.login(payload);
}

export async function refreshTokens(request: any) {
  const service = await getAuthService();
  return service.refreshTokens(request);
}

export async function logout(request: any) {
  const service = await getAuthService();
  return service.logout(request);
}

export const authService = {
  register,
  login,
  refreshTokens,
  logout,
};
