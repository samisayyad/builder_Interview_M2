import type { Request, Response, NextFunction } from "express";

export const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    message: "Requested resource was not found",
    path: req.originalUrl,
  });
};
