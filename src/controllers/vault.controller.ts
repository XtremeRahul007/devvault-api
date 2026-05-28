import type { NextFunction, Request, Response } from "express";
import { createItemService, deleteItemService, getAllVaultService, getItemService, updateVaultService } from "../services/vault.service.js";
import type { VaultItem } from "../types/vault.types.js";

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

    const { title, type, content, tags } = req.body;
    if (!title || typeof title !== "string" || !type || typeof type !== "string" || !content || typeof content !== "string" || !Array.isArray(tags) || !tags.every(item => typeof item === "string")) {
        return res.status(400).json({ error: "Invalid request body" });
    }
    try {
        const item = {
            id: Date.now(),
            title,
            type,
            content,
            tags
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
    const { title, type, content, tags }:
        {
            title?: unknown;
            type?: unknown;
            content?: unknown;
            tags?: unknown;
        } = req.body;

    if (!isStringOrUndefined(title) || !isStringOrUndefined(type) || !isStringOrUndefined(content) || (tags !== undefined && (!Array.isArray(tags) || !tags.every(item => typeof item === "string")))) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    const newItem = {
        title,
        type,
        content,
        tags
    }

    const cleanSource: Partial<VaultItem> = Object.fromEntries(
        Object.entries(newItem)
            .filter(([_, value]) =>
                value !== undefined
            )
    );

    try {
        const response = await updateVaultService(id, cleanSource);
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

function isStringOrUndefined(value: unknown): boolean {
    return typeof value === "string" || value === undefined;
}