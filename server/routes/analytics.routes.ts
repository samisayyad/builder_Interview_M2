import { Router } from "express";
import {
  handleGetDashboardAnalytics,
  handleGetSessionAnalytics,
} from "../controllers/analytics.controller.js";

const router = Router();

router.get("/dashboard", handleGetDashboardAnalytics);
router.get("/sessions/:sessionId", handleGetSessionAnalytics);

export const analyticsRouter = router;
