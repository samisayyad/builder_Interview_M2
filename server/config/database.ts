import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

let connectionPromise: Promise<typeof mongoose> | null = null;

mongoose.set("strictQuery", true);

export const connectDatabase = async () => {
  if (connectionPromise) {
    return connectionPromise;
  }

  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  connectionPromise = mongoose.connect(env.mongoUri, {
    maxPoolSize: 20,
    autoIndex: true,
  });

  try {
    await connectionPromise;
    logger.info("MongoDB connected");
  } catch (error) {
    connectionPromise = null;
    logger.error("MongoDB connection failed", error as Error);
    throw error;
  }

  return mongoose;
};

export const disconnectDatabase = async () => {
  if (!connectionPromise) {
    return;
  }

  await mongoose.disconnect();
  connectionPromise = null;
  logger.info("MongoDB disconnected");
};
