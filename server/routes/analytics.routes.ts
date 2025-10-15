import { Router } from "express";
import { handleGetDashboardAnalytics, handleGetSessionAnalytics } from "@server/controllers/analytics.controller";

const router = Router();

router.get("/dashboard", handleGetDashboardAnalytics);
router.get("/sessions/:sessionId", handleGetSessionAnalytics);

export const analyticsRouter = router;
