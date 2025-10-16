export interface PerformanceMetrics {
  postureScore: number;
  eyeContactScore: number;
  gestureScore: number;
  speechPaceWpm: number;
  speechClarityScore: number;
  fillerWordFrequency: number;
  overallPerformanceScore: number;
}

export const calculateOverallScore = (metrics: Partial<PerformanceMetrics>): number => {
  const weights = {
    postureScore: 0.15,
    eyeContactScore: 0.2,
    gestureScore: 0.1,
    speechClarityScore: 0.25,
    speechPaceWpm: 0.15,
    fillerWordFrequency: 0.15,
  };

  let totalScore = 0;
  let totalWeight = 0;

  Object.entries(weights).forEach(([key, weight]) => {
    const value = metrics[key as keyof PerformanceMetrics];
    if (value !== undefined) {
      totalScore += value * weight;
      totalWeight += weight;
    }
  });

  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
};

export const getPerformanceGrade = (score: number): string => {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
};

export const formatWpm = (wpm: number): string => {
  if (wpm < 100) return "Too slow";
  if (wpm > 150) return "Too fast";
  return "Good pace";
};

export const formatFillerWords = (frequency: number): string => {
  if (frequency < 0.05) return "Excellent";
  if (frequency < 0.1) return "Good";
  if (frequency < 0.15) return "Average";
  return "Too many";
};
