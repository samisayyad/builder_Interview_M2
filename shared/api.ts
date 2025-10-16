export interface DemoResponse {
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  message: string;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "candidate" | "admin";
  avatarUrl?: string;
  statistics?: {
    totalSessions: number;
    averageScore: number;
    currentStreak: number;
    bestStreak: number;
    experiencePoints: number;
  };
}

export interface InterviewDomain {
  _id: string;
  name: string;
  slug: string;
  description: string;
  primarySkills: string[];
  difficultyTags: string[];
  icon?: string;
}

export interface InterviewSession {
  _id: string;
  user: string;
  domain: string;
  sessionType: "mock" | "audio" | "video" | "case";
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  scheduledAt: string;
  completedAt?: string;
  recording?: {
    videoUrl?: string;
    audioUrl?: string;
    transcriptUrl?: string;
  };
  feedback?: Array<{
    category: string;
    score: number;
    comments?: string;
  }>;
  overallScore?: number;
  recommendations?: string[];
}

export interface SessionMetrics {
  postureScore: number;
  eyeContactScore: number;
  gestureScore: number;
  speechPaceWpm: number;
  speechClarityScore: number;
  fillerWordFrequency: number;
  emotionTimeline: Array<{
    label: string;
    probability: number;
    timestamp: number;
  }>;
  overallPerformanceScore: number;
}

export interface Achievement {
  _id: string;
  code: string;
  title: string;
  description: string;
  icon?: string;
  points: number;
}

export interface StudyPlan {
  _id: string;
  user: string;
  summary: string;
  focusAreas: string[];
  items: Array<{
    title: string;
    description?: string;
    domain?: string;
    dueDate?: string;
    status: "pending" | "in_progress" | "completed";
  }>;
  generatedBy: "ai" | "coach" | "custom";
}
