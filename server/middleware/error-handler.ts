import type { ErrorRequestHandler } from "express";
import { logger } from "../utils/logger.js";

interface ApiError extends Error {
  statusCode?: number;
  details?: unknown;
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const status = (error as ApiError).statusCode ?? 500;

  if (status >= 500) {
    logger.error("Unhandled server error", error as Error);
  } else {
    logger.warn(`Handled API error with status ${status}`, (error as ApiError).details ?? error);
  }

  res.status(status).json({
    message: error.message || "Internal server error",
    details: (error as ApiError).details,
  });
};
