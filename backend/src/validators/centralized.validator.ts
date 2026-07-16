import { AppError } from "../core/errors/AppError.js";


interface StringValidationOptions {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  trim?: boolean;
}

interface NumberValidationOptions {
  min?: number;
  max?: number;
  allowFloat?: boolean;
}

/*  
    originalName: string;
    extension: string
*/

const validationItem = [["originalName", "string"], ["extension", "string"]]

export function validator(reqBody: unknown, validationItem: string[], required: boolean) {
  if (!isObject(reqBody)) {
    throw new AppError(400, "Request body must be a valid object");
  }

  const body = reqBody as Record<string, unknown>;

  if (Object.keys(body).length === 0) {
    throw new AppError(400, "At least one field is required");
  }

  if (hasUnknownFields(body, validationItem)) {
    throw new AppError(400, "Request contains invalid fields");
  }

  if (required) {
    Object.entries(body).forEach(([key, value]) => validateString(value, key));
    return body;
  } else {
    const partialBody = removeUndefined(body);
    Object.entries(partialBody).forEach(([key, value]) => validateString(value, key));
    return partialBody;
  }
}

const isObject = (obj: unknown): obj is Record<string, unknown> => {
  if (typeof obj !== "object" || Array.isArray(obj) || obj === null) return false;
  const proto = Object.getPrototypeOf(obj);
  return proto === Object.prototype || proto === null;
}

const hasUnknownFields = (obj: Record<string, unknown>, whiteListed: string[]) => {
  const keys = Object.keys(obj);
  return keys.some(key => !whiteListed.includes(key as typeof whiteListed[number]));
}

const removeUndefined = (obj: object) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined));
}

const validateString = (
  value: unknown,
  field: string,
  options: StringValidationOptions = {}
): asserts value is string => {
  const { minLength = 1, maxLength, pattern, trim = true } = options;

  if (typeof value !== "string") {
    throw new AppError(400, `${field} must be a string`);
  }

  const str = trim ? value.trim() : value;

  if (str.length < minLength) {
    throw new AppError(400, `${field} must be at least ${minLength} characters`);
  }

  if (maxLength && str.length > maxLength) {
    throw new AppError(400, `${field} must be at most ${maxLength} characters`);
  }

  if (pattern && !pattern.test(str)) {
    throw new AppError(400, `${field} has an invalid format`);
  }
}

const validateNumber = (
  value: unknown,
  field: string,
  options: NumberValidationOptions = {}
): asserts value is number => {
  const { min = 0, max, allowFloat = true } = options;

  if (typeof value !== "number") {
    throw new AppError(400, `${field} must be a number`);
  }

  if (!Number.isFinite(value)) {
    throw new AppError(400, `${field} must be a valid finite number`);
  }

  if (!allowFloat && !Number.isInteger(value)) {
    throw new AppError(400, `${field} must be a whole integer`);
  }

  if (min !== undefined && value < min) {
    throw new AppError(400, `${field} must be at least ${min}`);
  }

  if (max !== undefined && value > max) {
    throw new AppError(400, `${field} must be at most ${max}`);
  }
}