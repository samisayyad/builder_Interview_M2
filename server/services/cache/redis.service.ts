import { getRedisClient, initializeRedis } from "@server/config/redis";

export const ensureRedis = async () => {
  const client = await initializeRedis();
  return client ?? null;
};

export const cacheJson = async <T>(key: string, value: T, ttlSeconds: number) => {
  const client = getRedisClient();
  await client.set(key, JSON.stringify(value), {
    EX: ttlSeconds,
  });
};

export const getCachedJson = async <T>(key: string): Promise<T | null> => {
  const client = getRedisClient();
  const value = await client.get(key);
  return value ? (JSON.parse(value) as T) : null;
};

export const invalidateCache = async (pattern: string) => {
  const client = getRedisClient();
  const keys = await client.keys(pattern);
  if (keys.length === 0) {
    return;
  }

  await client.del(keys);
};
