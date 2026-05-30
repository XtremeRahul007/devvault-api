import type { CreateVaultInput } from "../@types/vault.types.js";
import { AppError } from "../core/errors/AppError.js";

const whiteListed = ["title", "type", "content", "tags"] as const;

export function createVaultValidator(reqBody: Record<string, unknown>): CreateVaultInput {

    if (typeof reqBody !== "object" || typeof reqBody === null || Array.isArray(reqBody)) {
        throw new AppError(400, "Request body must be a valid object");
    }

    const body = reqBody as Record<string, unknown>;

    const bodyKeys = Object.keys(body);

    const hasUnknownFields = bodyKeys.some(key => !whiteListed.includes(key as typeof whiteListed[number]));

    if (hasUnknownFields) {
        throw new AppError(400, "Request contains invalid fields");
    }

    const { title, type, content, tags } = body;

    const validatedTitle = validateRequiredString(title, "title");

    const validatedType = validateRequiredString(type, "type");

    const validatedContent = validateRequiredString(content, "content");

    if (!Array.isArray(tags)) {
        throw new AppError(400, "Invalid field: 'tags' must be an array");
    }

    const invalidTags = tags.some(tag => typeof tag !== "string" || tag.trim() === "");

    if (invalidTags) {
        throw new AppError(400, "Field 'tags' must contain non-empty strings")
    }

    const validatedTags = [...new Set(
        tags.map(tag => tag.trim().toLowerCase())
    )];

    return {
        title: validatedTitle,
        type: validatedType,
        content: validatedContent,
        tags: validatedTags
    };
};

const validateRequiredString = (value: unknown, fieldName: string): string => {
    if (typeof value !== "string" || value.trim() === "") {
        throw new AppError(400, `Invalid field: '${fieldName}' must be a non-empty string`);
    }
    return value.trim();
}