import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api.client";

export interface InterviewSession {
  _id: string;
  domain: string;
  sessionType: "mock" | "audio" | "video" | "case";
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  scheduledAt: string;
  completedAt?: string;
  overallScore?: number;
  feedback?: Array<{ category: string; score: number; comments?: string }>;
}

export const useInterviewSessions = (userId: string) => {
  return useQuery({
    queryKey: ["interviews", userId],
    queryFn: () =>
      apiClient.get<InterviewSession[]>(
        `/api/interviews/sessions?userId=${userId}`,
      ),
    enabled: !!userId,
  });
};

export const useCreateInterviewSession = () => {
  return useMutation({
    mutationFn: (payload: {
      userId: string;
      domainId: string;
      sessionType: "mock" | "audio" | "video" | "case";
      scheduledAt?: string;
    }) => apiClient.post<InterviewSession>("/api/interviews/sessions", payload),
  });
};

export const useGetInterviewSession = (sessionId: string | null) => {
  return useQuery({
    queryKey: ["interview", sessionId],
    queryFn: () =>
      apiClient.get<InterviewSession>(`/api/interviews/sessions/${sessionId!}`),
    enabled: !!sessionId,
  });
};

export const useUpdateSessionMetrics = () => {
  return useMutation({
    mutationFn: (payload: {
      sessionId: string;
      metrics: Record<string, unknown>;
    }) =>
      apiClient.patch<InterviewSession>(
        `/api/interviews/sessions/${payload.sessionId}/metrics`,
        { metrics: payload.metrics },
      ),
  });
};
