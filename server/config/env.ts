import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(8080),
  CLIENT_URL: z.string().optional(),
  CORS_ORIGINS: z.string().optional(),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required for database access").optional(),
  REDIS_URL: z.string().optional(),
  JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 characters").optional(),
  JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 characters").optional(),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().default(15),
  BODY_LIMIT: z.string().default("10mb"),
  LOG_FORMAT: z.string().default("combined"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.format();
  throw new Error(`Environment validation failed: ${JSON.stringify(formatted)}`);
}

const derivedCorsOrigins = parsed.data.CORS_ORIGINS
  ? parsed.data.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : ["*"];

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  clientUrl: parsed.data.CLIENT_URL,
  corsOrigins: derivedCorsOrigins,
  mongoUri: parsed.data.MONGODB_URI,
  redisUrl: parsed.data.REDIS_URL,
  jwtAccessSecret: parsed.data.JWT_ACCESS_SECRET,
  jwtRefreshSecret: parsed.data.JWT_REFRESH_SECRET,
  rateLimitMax: parsed.data.RATE_LIMIT_MAX,
  rateLimitWindowMs: parsed.data.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  bodyLimit: parsed.data.BODY_LIMIT,
  logFormat: parsed.data.LOG_FORMAT,
  isProduction: parsed.data.NODE_ENV === "production",
  isDevelopment: parsed.data.NODE_ENV === "development",
};

export type AppEnv = typeof env;
