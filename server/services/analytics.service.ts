import { HttpError } from "../utils/http-error.js";

export class AnalyticsService {
  async getDashboardAnalytics(_userId: string) {
    throw new HttpError(501, "Dashboard analytics not implemented");
  }

  async getSessionAnalytics(_sessionId: string) {
    throw new HttpError(501, "Session analytics not implemented");
  }
}

export const analyticsService = new AnalyticsService();
