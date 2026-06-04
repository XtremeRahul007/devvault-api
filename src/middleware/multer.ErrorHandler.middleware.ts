import type { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import { AppError } from "../core/errors/AppError.js";

export function multerErrorHandler(err: unknown, _req: Request, _res: Response, next: NextFunction) {
    if (err instanceof MulterError) {
        return next(new AppError(
            400, err.message
        )
        );
    }
    next(err);
}