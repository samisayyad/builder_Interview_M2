import type { RequestHandler } from "express";
import { z } from "zod";
import { interviewService } from "@server/services/interview.service";
import { badRequest } from "@server/utils/http-error";

const sessionSchema = z.object({
  userId: z.string().min(1),
  domainId: z.string().min(1),
  sessionType: z.enum(["mock", "audio", "video", "case"]),
  scheduledAt: z.string().datetime().optional(),
});

const metricsSchema = z.object({
  metrics: z.record(z.string(), z.unknown()),
});

const parse = <T>(schema: z.ZodType<T>, payload: unknown) => {
  const result = schema.safeParse(payload);
  if (!result.success) {
    throw badRequest("Invalid request payload", result.error.flatten());
  }

  return result.data;
};

export const handleCreateSession: RequestHandler = async (req, res, next) => {
  try {
    const payload = parse(sessionSchema, req.body);
    const session = await interviewService.createSession(payload);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

export const handleListSessions: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    if (typeof userId !== "string" || userId.length === 0) {
      throw badRequest("userId query parameter is required");
    }

    const sessions = await interviewService.listSessions(userId);
    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
};

export const handleGetSession: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      throw badRequest("sessionId parameter is required");
    }

    const session = await interviewService.getSession(sessionId);
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateSessionMetrics: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      throw badRequest("sessionId parameter is required");
    }

    const payload = parse(metricsSchema, req.body);
    const result = await interviewService.updateMetrics({ sessionId, metrics: payload.metrics });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
