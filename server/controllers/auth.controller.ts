import type { RequestHandler } from "express";
import { z } from "zod";
import { badRequest } from "../utils/http-error.js";

let authService: any = null;

const getAuthService = async () => {
  if (!authService) {
    const { authService: imported } = await import("../services/auth.service.js");
    authService = imported;
  }
  return authService;
};

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  provider: z.enum(["email", "google", "github", "linkedin"]).default("email"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const parse = <T>(schema: z.ZodType<T>, payload: unknown) => {
  const result = schema.safeParse(payload);
  if (!result.success) {
    throw badRequest("Invalid request payload", result.error.flatten());
  }

  return result.data;
};

export const handleRegister: RequestHandler = async (req, res, next) => {
  try {
    const payload = parse(registerSchema, req.body);
    const result = await authService.register(payload);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const handleLogin: RequestHandler = async (req, res, next) => {
  try {
    const payload = parse(loginSchema, req.body);
    const result = await authService.login(payload);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const handleRefreshToken: RequestHandler = async (req, res, next) => {
  try {
    const tokens = await authService.refreshTokens(req);
    res.status(200).json(tokens);
  } catch (error) {
    next(error);
  }
};

export const handleLogout: RequestHandler = async (req, res, next) => {
  try {
    await authService.logout(req);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const handleGetMe: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("User not found in request");
    }

    res.status(200).json({
      data: {
        id: req.user._id.toString(),
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        avatarUrl: req.user.avatarUrl,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
