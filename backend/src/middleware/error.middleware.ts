import type { Request, Response, NextFunction } from "express";
import { AppError } from "../core/errors/AppError.js";
import { logError } from "../utils/logger.utils.js";

export function errorMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    if (!err.stack) {
      res.status(500).json({
        error: "Unknown error"
      });
      return;
    }

    logError({
      requestId: req.requestId,
      method: req.method,
      url: req.url,
      message: err.message,
      statusCode: err.statusCode,
      stack: err.stack
    });
    res.status(err.statusCode ?? 500).json({ error: `${err.message}` });
  }
}