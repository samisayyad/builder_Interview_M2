import type { Request } from "express";
import { UserModel } from "../models/user.model.js";
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

let bcrypt: any = null;
let jwt: any = null;

const getBcrypt = async () => {
  if (!bcrypt) {
    bcrypt = await import("bcrypt");
  }
  return bcrypt;
};

const getJwt = async () => {
  if (!jwt) {
    jwt = await import("jsonwebtoken");
  }
  return jwt;
};

export class AuthService {
  private async generateTokens(userId: string) {
    if (!env.jwtAccessSecret || !env.jwtRefreshSecret) {
      throw new HttpError(
        500,
        "JWT secrets are not configured. Please set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET environment variables."
      );
    }

    const accessToken = sign({ userId, type: "access" }, env.jwtAccessSecret, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = sign({ userId, type: "refresh" }, env.jwtRefreshSecret, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });

    return { accessToken, refreshToken };
  }

  async register(payload: RegisterInput): Promise<AuthResult> {
    const existingUser = await UserModel.findOne({ email: payload.email });
    if (existingUser) {
      throw new HttpError(409, "Email already registered");
    }

    const passwordHash = await hash(payload.password, 12);

    const user = new UserModel({
      email: payload.email,
      passwordHash,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: "candidate",
    });

    await user.save();

    const { accessToken, refreshToken } = this.generateTokens(user._id.toString());

    return {
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
        },
      },
    };
  }

  async login(payload: LoginInput): Promise<AuthResult> {
    const user = await UserModel.findOne({ email: payload.email });
    if (!user) {
      throw new HttpError(401, "Invalid email or password");
    }

    const isValidPassword = await compare(payload.password, user.passwordHash);
    if (!isValidPassword) {
      throw new HttpError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = this.generateTokens(user._id.toString());

    return {
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user._id.toString(),
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

    const refreshToken = request.headers.authorization?.replace("Bearer ", "");
    if (!refreshToken) {
      throw new HttpError(401, "Missing refresh token");
    }

    try {
      const decoded = verify(refreshToken, env.jwtRefreshSecret) as {
        userId: string;
        type: string;
      };

      if (decoded.type !== "refresh") {
        throw new HttpError(401, "Invalid token type");
      }

      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        throw new HttpError(401, "User not found");
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = this.generateTokens(
        user._id.toString()
      );

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
    // For more complex scenarios with token blacklisting, you would invalidate here
  }
}

export const authService = new AuthService();
