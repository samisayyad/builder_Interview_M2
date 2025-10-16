import { Router } from "express";
import { handleRealtimeHandshake } from "../controllers/realtime.controller.js";

const router = Router();

router.post("/handshake", handleRealtimeHandshake);

export const realtimeRouter = router;
