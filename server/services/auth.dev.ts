import { HttpError } from "../utils/http-error.js";
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

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

// In-memory store for development
const users = new Map<string, any>();
let userId = 1;

let jwtModule: any = null;

const getJwt = async () => {
  if (!jwtModule) {
    jwtModule = await import("jsonwebtoken");
  }
  return jwtModule;
};

export class AuthService {
  private async generateTokens(userId: string) {
    if (!env.jwtAccessSecret || !env.jwtRefreshSecret) {
      throw new HttpError(
        500,
        "JWT secrets are not configured. Please set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET environment variables.",
      );
    }

    const jwtModule = await getJwt();
    const accessToken = jwtModule.sign(
      { userId, type: "access" },
      env.jwtAccessSecret,
      {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      },
    );

    const refreshToken = jwtModule.sign(
      { userId, type: "refresh" },
      env.jwtRefreshSecret,
      {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      },
    );

    return { accessToken, refreshToken };
  }

  async register(payload: RegisterInput): Promise<AuthResult> {
    const existingUser = Array.from(users.values()).find(
      (u) => u.email === payload.email,
    );
    if (existingUser) {
      throw new HttpError(409, "Email already registered");
    }

    const newUserId = (userId++).toString();
    const user = {
      id: newUserId,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      avatarUrl: undefined,
      password: payload.password, // Store plaintext for dev only!
      role: "candidate",
    };

    users.set(newUserId, user);

    const { accessToken, refreshToken } = await this.generateTokens(newUserId);

    return {
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
        },
      },
    };
  }

  async login(payload: LoginInput): Promise<AuthResult> {
    const user = Array.from(users.values()).find(
      (u) => u.email === payload.email,
    );
    if (!user || user.password !== payload.password) {
      throw new HttpError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user.id);

    return {
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
        },
      },
    };
  }

  async refreshTokens(request: Request): Promise<AuthTokens> {
    if (!env.jwtRefreshSecret) {
      throw new HttpError(500, "JWT secrets are not configured");
    }

    const jwtModule = await getJwt();
    const refreshToken = request.headers.authorization?.replace("Bearer ", "");
    if (!refreshToken) {
      throw new HttpError(401, "Missing refresh token");
    }

    try {
      const decoded = jwtModule.verify(refreshToken, env.jwtRefreshSecret) as {
        userId: string;
        type: string;
      };

      if (decoded.type !== "refresh") {
        throw new HttpError(401, "Invalid token type");
      }

      const user = users.get(decoded.userId);
      if (!user) {
        throw new HttpError(401, "User not found");
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await this.generateTokens(decoded.userId);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: 900, // 15 minutes
      };
    } catch (error) {
      throw new HttpError(401, "Invalid refresh token");
    }
  }

  async logout(_request: Request): Promise<void> {
    // In a simple JWT setup, logout is typically handled client-side by clearing tokens
  }
}

export const authService = new AuthService();
