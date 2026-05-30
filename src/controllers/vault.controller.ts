import type { NextFunction, Request, Response } from "express";
import { createItemService, deleteItemService, getAllVaultService, getItemService, updateVaultService } from "../services/vault.service.js";
import { updateVaultValidator } from "../validators/updateVault.validator.js";
import { createVaultValidator } from "../validators/createVault.validator.js";

export const getVault = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
        const response = await getItemService(id);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};


export const createVaultItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedBody = createVaultValidator(req.body);

        const item = {
            id: Date.now(),
            title: validatedBody.title,
            type: validatedBody.type,
            content: validatedBody.content,
            tags: validatedBody.tags
        };

        const response = await createItemService(item);
        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

export const deleteVaultItem = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
        const response = await deleteItemService(id);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

export const updateVaultItem = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
        const validatedBody = updateVaultValidator(req.body);
        const response = await updateVaultService(id, validatedBody);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

export const getAllVaultItem = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllVaultService();
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}