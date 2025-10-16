import type { RequestHandler } from "express";
import { env } from "../config/env.js";

export const handleHealthCheck: RequestHandler = (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: env.nodeEnv,
  });
};

export const handlePing: RequestHandler = (_req, res) => {
  res.json({ message: "pong" });
};

export const handleDemo: RequestHandler = (_req, res) => {
  res.json({ message: "Welcome to Intervi API" });
};
