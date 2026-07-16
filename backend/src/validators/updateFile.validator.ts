import type { UpdateFileInput } from "../@types/file.types.js";
import { AppError } from "../core/errors/AppError.js";

const whiteListed = ["originalName"] as const;

export function updateFileValidator(reqBody: unknown): UpdateFileInput {
  if (reqBody === null || typeof reqBody !== "object" || Array.isArray(reqBody)) {
    throw new AppError(400, "Request body must be a valid object");
  }

  const body = reqBody as Record<string, unknown>;

  if (Object.keys(body).length === 0) {
    throw new AppError(
      400,
      "At least one field is required"
    );
  }
  const bodykeys = Object.keys(body);

  const hasUnknownFields = bodykeys.some(key => !whiteListed.includes(key as typeof whiteListed[number]));

  if (hasUnknownFields) {
    throw new AppError(400, "Request contains invalid fields");
  }

  const validatedOriginalName = validateOptionalString(body.originalName, "originalName");

  return removeUndefined({ originalName: validatedOriginalName });
}

const validateOptionalString = (value: unknown, fieldName: string): string | undefined => {
  if (value === undefined) return undefined;

  if (typeof value !== "string" || value.trim() === "") {
    throw new AppError(400, `Field '${fieldName}' must be a non-empty string`)
  }
  return value.trim();
}

const removeUndefined = <T extends object>(obj: T) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, key]) => key !== undefined));
}