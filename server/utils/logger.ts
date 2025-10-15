type LogLevel = "debug" | "info" | "warn" | "error";

type LogMethod = (message: string, meta?: unknown) => void;

const createLoggerMethod = (level: LogLevel): LogMethod => {
  return (message, meta) => {
    const timestamp = new Date().toISOString();
    const payload = meta instanceof Error ? { error: meta.message, stack: meta.stack } : meta;
    // eslint-disable-next-line no-console
    console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}`, payload ?? "");
  };
};

export const logger = {
  debug: createLoggerMethod("debug"),
  info: createLoggerMethod("info"),
  warn: createLoggerMethod("warn"),
  error: createLoggerMethod("error"),
};
