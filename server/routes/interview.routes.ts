import { Router } from "express";
import {
  handleCreateSession,
  handleGetSession,
  handleListSessions,
  handleUpdateSessionMetrics,
} from "@server/controllers/interview.controller";

const router = Router();

router.post("/sessions", handleCreateSession);
router.get("/sessions", handleListSessions);
router.get("/sessions/:sessionId", handleGetSession);
router.patch("/sessions/:sessionId/metrics", handleUpdateSessionMetrics);

export const interviewRouter = router;
