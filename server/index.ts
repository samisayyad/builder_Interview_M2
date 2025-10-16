import "dotenv/config";
import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes/index.js";
import { env } from "./config/env.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

export function createServer() {
  const app = express();

  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(
    cors({
      origin: env.corsOrigins,
      credentials: true,
    })
  );
  app.use(compression());
  app.use(express.json({ limit: env.bodyLimit }));
  app.use(express.urlencoded({ extended: true, limit: env.bodyLimit }));

  app.use(morgan(env.logFormat));

  // Only apply rate limiting in production and only to API routes
  if (env.isProduction) {
    app.use("/api/", rateLimit({
      windowMs: env.rateLimitWindowMs,
      max: env.rateLimitMax,
      standardHeaders: true,
      legacyHeaders: false,
    }));
  }

  registerRoutes(app);

  // Only add not-found handler for API routes; let Vite handle other routes
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) {
      notFoundHandler(req, res, next);
    } else {
      next();
    }
  });

  app.use(errorHandler);

  return app;
}
