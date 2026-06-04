import type { Request } from "express";
import { AppError } from "../core/errors/AppError.js";
import type { SortField, SortOrder, UploadQuery } from "../@types/file.types.js";

const ALLOWED_SORT = ["name", "size", "uploadedAt"] as const;
const ALLOWED_ORDER = ["asc", "desc"] as const;


export function validateUploadQuery(query: Request["query"]): UploadQuery {
    return {
        name: validateName(query.name),
        extension: validateExtension(query.extension),

        sort: validateSort(query.sort),
        order: validateOrder(query.order),

        page: validatePage(query.page),
        limit: validateLimit(query.limit)
    };
}

const validateName = (properties: unknown): string | undefined => {
    if (!properties) return undefined;
    const name = String(properties);
    return typeof name === "string" ? name.trim().toLowerCase() : undefined;
}

const validateExtension = (properties: unknown): string | undefined => {
    if (!properties) return undefined;
    const extension = String(properties);
    return typeof extension === "string" ? extension.trim().toLowerCase() : undefined;
}

const validateSort = (properties: unknown): SortField => {
    if (!properties) return undefined;
    const sort = String(properties);
    if (!ALLOWED_SORT.includes(sort as typeof ALLOWED_SORT[number])) {
        throw new AppError(400, "Invalid sort field");
    }
    return sort as SortField;
}

const validateOrder = (properties: unknown): SortOrder => {
    if (!properties) return undefined;
    const order = String(properties);
    if (!ALLOWED_ORDER.includes(order as typeof ALLOWED_ORDER[number])) {
        throw new AppError(400, "Invalid sort order");
    }
    return order as SortOrder;
}

const validatePage = (properties: unknown): number | undefined => {
    if (!properties) return undefined;
    const page = Number(properties);
    if (Number.isNaN(page) || !Number.isInteger(page) || page < 1) {
        throw new AppError(400, "Must be a whole positive number");
    }
    return page;
}

const validateLimit = (properties: unknown): number | undefined => {
    if (!properties) return undefined;
    const limit = Number(properties);
    const MAX_LIMIT = 50;
    if (Number.isNaN(limit) || !Number.isInteger(limit) || limit < 1) {
        throw new AppError(400, "Must be a whole positive number");
    }
    if (limit > MAX_LIMIT) {
        throw new AppError(
            400,
            `Limit cannot exceed ${MAX_LIMIT}`
        );
    }
    return limit;
}