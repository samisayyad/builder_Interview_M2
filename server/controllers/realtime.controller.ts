import type { RequestHandler } from "express";
import { realtimeService } from "../services/realtime.service.js";
import { badRequest } from "../utils/http-error.js";

export const handleRealtimeHandshake: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { userId } = req.body ?? {};
    if (typeof userId !== "string" || userId.length === 0) {
      throw badRequest(
        "userId is required to initialize realtime communication",
      );
    }

    const result = await realtimeService.createHandshake(userId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
