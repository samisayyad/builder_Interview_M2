import { format, formatDistanceToNow, isPast, isFuture, differenceInMinutes } from "date-fns";

export const formatDate = (date: string | Date, formatStr: string = "PPP"): string => {
  return format(new Date(date), formatStr);
};

export const formatTime = (date: string | Date): string => {
  return format(new Date(date), "p");
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), "PPpp");
};

export const timeAgo = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const isScheduledInPast = (date: string | Date): boolean => {
  return isPast(new Date(date));
};

export const isScheduledInFuture = (date: string | Date): boolean => {
  return isFuture(new Date(date));
};

export const getMinutesUntil = (date: string | Date): number => {
  return differenceInMinutes(new Date(date), new Date());
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }

  return `${secs}s`;
};
