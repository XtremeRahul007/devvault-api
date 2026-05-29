import type { Request, Response, NextFunction } from "express";
import { AppError } from "../core/errors/AppError.js";
import { logError } from "../utils/logger.js";

export function errorMiddleware(err: AppError, req: Request, res: Response, next: NextFunction): void {
    if (!err.stack) return;
    logError({
        method: req.method,
        url: req.url,
        message: err.message,
        statusCode: err.statusCode,
        stack: err.stack
    });
    res.status(err.statusCode ?? 500).json({ error: `${err.message}` })
}