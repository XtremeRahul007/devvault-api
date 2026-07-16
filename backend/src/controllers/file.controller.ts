import type { Request, Response, NextFunction } from "express";
import { createUploadService, deleteUploadService, getAllUploadsService, getFileInfoByIdService, getUploadByIdService, renameUploadService } from "../services/file.service.js";
import { updateFileValidator } from "../validators/updateFile.validator.js";
import { validateUploadFile } from "../validators/upload.validator.js";
import { validateUploadQuery } from "../validators/uploadQuery.validator.js";

export const uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = validateUploadFile(req.files);

    const response = await createUploadService(files);

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

export const getFileInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const fileInfo = await getFileInfoByIdService(id);
    res.status(200).json(fileInfo);
  } catch (err) {
    next(err);
  }
}

export const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const upload = await getUploadByIdService(id);

    if (!upload.data) {
      throw new Error("File not found");
    }

    const file = upload.data;
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

export const getAllUploads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validateQuery = validateUploadQuery(req.query);
    const response = await getAllUploadsService(validateQuery);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}