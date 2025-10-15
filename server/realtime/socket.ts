import type { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { env } from "@server/config/env";
import { logger } from "@server/utils/logger";

export const createSocketServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: env.corsOrigins,
      credentials: true,
    },
  });

  const interviewNamespace = io.of("/interview");

  interviewNamespace.on("connection", (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on("disconnect", () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};
