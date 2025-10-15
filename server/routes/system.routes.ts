import { Router } from "express";
import { handleDemo, handleHealthCheck, handlePing } from "@server/controllers/system.controller";

const router = Router();

router.get("/health", handleHealthCheck);
router.get("/ping", handlePing);
router.get("/demo", handleDemo);

export const systemRouter = router;
