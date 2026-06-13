import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export function requestIdMiddleware(req: Request, _res: Response, next: NextFunction) {
    req.requestId = `REQ-${crypto.randomBytes(4).toString("hex")}`;
    next();
}