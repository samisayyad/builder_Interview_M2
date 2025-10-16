import { HttpError } from "../utils/http-error.js";

export interface CreateInterviewSessionInput {
  userId: string;
  domainId: string;
  sessionType: "mock" | "audio" | "video" | "case";
  scheduledAt?: string;
}

export interface UpdateSessionMetricsInput {
  sessionId: string;
  metrics: Record<string, unknown>;
}

export class InterviewService {
  async createSession(_input: CreateInterviewSessionInput) {
    throw new HttpError(501, "Interview session creation not implemented");
  }

  async listSessions(_userId: string) {
    throw new HttpError(501, "Interview sessions listing not implemented");
  }

  async getSession(_sessionId: string) {
    throw new HttpError(501, "Interview session retrieval not implemented");
  }

  async updateMetrics(_input: UpdateSessionMetricsInput) {
    throw new HttpError(501, "Interview session metrics update not implemented");
  }
}

export const interviewService = new InterviewService();
