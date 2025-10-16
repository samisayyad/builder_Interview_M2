import { createClient, RedisClientType } from "redis";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

let client: RedisClientType | null = null;

export const getRedisClient = () => {
  if (!client) {
    throw new Error("Redis client has not been initialized");
  }

  return client;
};

export const initializeRedis = async () => {
  if (!env.redisUrl) {
    logger.warn("Redis URL not provided. Caching and pub/sub will be disabled.");
    return null;
  }

  if (client) {
    return client;
  }

  client = createClient({
    url: env.redisUrl,
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
    },
  });

  client.on("error", (error) => {
    logger.error("Redis client error", error);
  });

  await client.connect();
  logger.info("Redis connected");
  return client;
};

export const shutdownRedis = async () => {
  if (!client) {
    return;
  }

  await client.quit();
  client = null;
  logger.info("Redis disconnected");
};
