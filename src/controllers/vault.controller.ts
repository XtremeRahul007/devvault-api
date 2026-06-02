import type { NextFunction, Request, Response } from "express";
import { createItemService, deleteItemService, getAllVaultService, getItemService, updateVaultService } from "../services/vault.service.js";
import { updateVaultValidator } from "../validators/updateVault.validator.js";
import { createVaultValidator } from "../validators/createVault.validator.js";

export const getVaultById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const response = await getItemService(id);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

export const createVault = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedBody = createVaultValidator(req.body);
        const response = await createItemService(validatedBody);
        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

export const deleteVault = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const response = await deleteItemService(id);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

export const updateVault = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const validatedBody = updateVaultValidator(req.body);
        const response = await updateVaultService(id, validatedBody);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

export const getAllVaults = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllVaultService();
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}