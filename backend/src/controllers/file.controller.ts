import type { Request, Response, NextFunction } from "express";
import { createUploadService, deleteUploadService, getAllUploadsService, getUploadByIdService, renameUploadService } from "../services/file.service.js";
import { updateFileValidator } from "../validators/updateFile.validator.js";
import { validateUploadFile } from "../validators/upload.validator.js";
import { validateUploadQuery } from "../validators/uploadQuery.validator.js";

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const folderId = req.body.folderId ?? null;

        const file = validateUploadFile(req.file);

        const response = await createUploadService(file, folderId);

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

export const renameUpload = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);
        const validatedBody = updateFileValidator(req.body);
        const response = await renameUploadService(id, validatedBody);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

export const getAllUploads = async (req: Request, res: Response, next :NextFunction) => {
    try {
        const validateQuery = validateUploadQuery(req.query);
        const response = await getAllUploadsService(validateQuery);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}