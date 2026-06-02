import type { Request, Response, NextFunction } from "express";
import { AppError } from "../core/errors/AppError.js";
import { createUploadService, deleteUploadService, getUploadByIdService } from "../services/file.service.js";

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            throw new AppError(400, "No file uploaded");
        }

        const response = await createUploadService(req.file);

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
}

export const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);
        const file = await getUploadByIdService(id);
        res.download(file.filePath, file.metadata.originalName);
    } catch (err) {
        next(err);
    }
}

export const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);
        const response = await deleteUploadService(id);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}