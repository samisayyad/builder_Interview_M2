import type { Express } from "express";
import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { interviewRouter } from "./interview.routes.js";
import { analyticsRouter } from "./analytics.routes.js";
import { realtimeRouter } from "./realtime.routes.js";
import { systemRouter } from "./system.routes.js";

export const registerRoutes = (app: Express) => {
  const apiRouter = Router();

  apiRouter.use("/auth", authRouter);
  apiRouter.use("/interviews", interviewRouter);
  apiRouter.use("/analytics", analyticsRouter);
  apiRouter.use("/realtime", realtimeRouter);
  apiRouter.use(systemRouter);

  app.use("/api", apiRouter);
};
