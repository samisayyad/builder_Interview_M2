import type { Express } from "express";
import { Router } from "express";
import { authRouter } from "./auth.routes";
import { interviewRouter } from "./interview.routes";
import { analyticsRouter } from "./analytics.routes";
import { realtimeRouter } from "./realtime.routes";
import { systemRouter } from "./system.routes";

export const registerRoutes = (app: Express) => {
  const apiRouter = Router();

  apiRouter.use("/auth", authRouter);
  apiRouter.use("/interviews", interviewRouter);
  apiRouter.use("/analytics", analyticsRouter);
  apiRouter.use("/realtime", realtimeRouter);
  apiRouter.use(systemRouter);

  app.use("/api", apiRouter);
};
