import { Router } from "express";
import { handleRealtimeHandshake } from "@server/controllers/realtime.controller";

const router = Router();

router.post("/handshake", handleRealtimeHandshake);

export const realtimeRouter = router;
