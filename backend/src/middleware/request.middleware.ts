import type { Request, Response, NextFunction } from "express";
import { logRequest } from "../utils/logger.utils.js";

export function requestMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    if (!req.ip) return;
    logRequest({
      requestId: req.requestId,
      start: start,
      method: req.method,
      originalUrl: req.originalUrl,
      statusCode: res.statusCode,
      duration: Date.now() - start,
      ip: req.ip
    });
  });
  next();
};