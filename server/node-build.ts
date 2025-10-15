import path from "path";
import { fileURLToPath } from "url";
import * as express from "express";
import { createServer as createHttpServer } from "http";
import { createServer } from "./index";
import { env } from "@server/config/env";
import { connectDatabase } from "@server/config/database";
import { initializeRedis } from "@server/config/redis";
import { createSocketServer } from "@server/realtime/socket";
import { logger } from "@server/utils/logger";

const app = createServer();
const port = env.port || process.env.PORT || 3000;

const startServer = async () => {
  await connectDatabase();
  await initializeRedis();

  const httpServer = createHttpServer(app);
  createSocketServer(httpServer);

  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const distPath = path.join(dirname, "../spa");

  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }

    res.sendFile(path.join(distPath, "index.html"));
  });

  httpServer.listen(port, () => {
    logger.info(`Intervi server running on port ${port}`);
  });
};

startServer().catch((error) => {
  logger.error("Failed to start server", error as Error);
  process.exit(1);
});

process.on("SIGTERM", () => {
  logger.info("Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("Received SIGINT, shutting down gracefully");
  process.exit(0);
});
