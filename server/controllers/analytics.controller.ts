import type { RequestHandler } from "express";
import { analyticsService } from "@server/services/analytics.service";
import { badRequest } from "@server/utils/http-error";

export const handleGetDashboardAnalytics: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    if (typeof userId !== "string" || userId.length === 0) {
      throw badRequest("userId query parameter is required");
    }

    const analytics = await analyticsService.getDashboardAnalytics(userId);
    res.status(200).json(analytics);
  } catch (error) {
    next(error);
  }
};

export const handleGetSessionAnalytics: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      throw badRequest("sessionId parameter is required");
    }

    const analytics = await analyticsService.getSessionAnalytics(sessionId);
    res.status(200).json(analytics);
  } catch (error) {
    next(error);
  }
};
