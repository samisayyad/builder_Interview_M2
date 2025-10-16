export const INTERVIEW_DOMAINS = [
  { id: "sde", name: "Software Development", slug: "software-dev", icon: "Code" },
  { id: "ds", name: "Data Science", slug: "data-science", icon: "BarChart3" },
  { id: "ml", name: "Machine Learning", slug: "machine-learning", icon: "Brain" },
  { id: "pm", name: "Product Management", slug: "product-management", icon: "Target" },
  { id: "ux", name: "UX Design", slug: "ux-design", icon: "Palette" },
  { id: "devops", name: "DevOps", slug: "devops", icon: "Server" },
  { id: "qa", name: "QA Engineering", slug: "qa-engineering", icon: "Zap" },
  { id: "ba", name: "Business Analysis", slug: "business-analysis", icon: "Briefcase" },
  { id: "sec", name: "Security", slug: "security", icon: "Shield" },
  { id: "infra", name: "Infrastructure", slug: "infrastructure", icon: "Network" },
  { id: "arch", name: "System Architecture", slug: "system-architecture", icon: "Layers" },
  { id: "cloud", name: "Cloud Computing", slug: "cloud-computing", icon: "Cloud" },
  { id: "db", name: "Database Design", slug: "database-design", icon: "Database" },
  { id: "frontend", name: "Frontend Development", slug: "frontend-development", icon: "Monitor" },
  { id: "backend", name: "Backend Development", slug: "backend-development", icon: "Settings" },
];

export const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Beginner", color: "green" },
  { value: "intermediate", label: "Intermediate", color: "blue" },
  { value: "advanced", label: "Advanced", color: "red" },
];

export const SESSION_TYPES = [
  { value: "mock", label: "Mock Interview" },
  { value: "audio", label: "Audio Interview" },
  { value: "video", label: "Video Interview" },
  { value: "case", label: "Case Study" },
];

export const EMOTIONS = ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"];

export const ANALYTICS_METRICS = {
  pose: ["posture_score", "eye_contact", "gestures"],
  speech: ["clarity", "pace", "confidence", "filler_words"],
  emotion: ["primary_emotion", "emotion_timeline", "stability"],
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000,
};
