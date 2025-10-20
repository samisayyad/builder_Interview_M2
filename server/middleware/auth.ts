import type { RequestHandler } from "express";
import { UserModel } from "../models/user.model.js";
import { HttpError } from "../utils/http-error.js";
import { env } from "../config/env.js";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: any;
    }
  }
}

let jwtModule: any = null;

const getJwt = async () => {
  if (!jwtModule) {
    jwtModule = await import("jsonwebtoken");
  }
  return jwtModule;
};

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new HttpError(401, "Missing authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    if (!env.jwtAccessSecret) {
      throw new HttpError(500, "JWT secret not configured");
    }

    const jwt = await getJwt();
    const decoded = jwt.verify(token, env.jwtAccessSecret) as {
      userId: string;
      type: string;
    };

    if (decoded.type !== "access") {
      throw new HttpError(401, "Invalid token type");
    }

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      throw new HttpError(401, "User not found");
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
    } else {
      next(new HttpError(401, "Invalid token"));
    }
  }
};
