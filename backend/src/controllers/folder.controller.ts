import type { Request, Response, NextFunction } from "express";
import { createFolderService, deleteFolderService, getAllFoldersService, getFolderByIdService, getFolderContentsService, renameFolderService } from "../services/folder.service.js";
import { from } from "node:stream/iter";


export const getFolderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);
        const response = await getFolderByIdService(id);
        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
}

export const createFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await createFolderService(req.body);
        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

export const getAllFolders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllFoldersService();
        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
}

export const deleteFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);
        const response = await deleteFolderService(id);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

export const renameFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);
        const response = await renameFolderService(id, req.body);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

export const getFolderContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const folderId = String(req.params.id);
        const response = await getFolderContentsService(folderId);
        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
}

export const moveFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        next(err);
    }
}