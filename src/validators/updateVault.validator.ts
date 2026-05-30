import { AppError } from "../core/errors/AppError.js";
import type { UpdateVaultInput } from "../@types/vault.types.js";

const whiteListed = ["title", "type", "content", "tags"] as const;

export function updateVaultValidator(reqBody: unknown): UpdateVaultInput {
    if (typeof reqBody !== "object" || reqBody === null || Array.isArray(reqBody)) {
        throw new AppError(400, "Request body must be a valid object");
    }

    const body = reqBody as Record<string, unknown>;

    const bodyKeys = Object.keys(body);

    const hasUnknownFields = bodyKeys.some(key => !whiteListed.includes(key as typeof whiteListed[number]));

    if (hasUnknownFields) {
        throw new AppError(400, "Request contains invalid fields");
    }

    const { title, type, content, tags } = body;

    const validatedTitle = validateOptionalString(title, "title");

    const validatedType = validateOptionalString(type, "type");

    const validatedContent = validateOptionalString(content, "content");

    let validatedTags: string[] | undefined;

    if (tags !== undefined) {
        if (!Array.isArray(tags)) {
            throw new AppError(400, "Invalid field: 'tags' must be an array");
        }

        const invalidTags = tags.some(tag => typeof tag !== "string" || tag.trim() === "");

        if (invalidTags) {
            throw new AppError(400, "Field 'tags' must contain non-empty strings");
        }

        validatedTags = [...new Set(tags.map(tag => tag.trim().toLowerCase()))];
    }

    return removeUndefined({
        title: validatedTitle,
        type: validatedType,
        content: validatedContent,
        tags: validatedTags
    });
}

const validateOptionalString = (value: unknown, fieldName: string): string | undefined => {
    if (value === undefined) return undefined;

    if (typeof value !== "string" || value.trim() === "") {
        throw new AppError(400, `Field '${fieldName}' must be a non-empty string`)
    }
    return value.trim();
}

const removeUndefined = <T extends object>(obj: T) => {
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([_, value]) => value !== undefined)
    );
}