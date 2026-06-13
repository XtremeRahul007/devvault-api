import { infrastructureConfig } from "../core/configs/infrastructure.js";
import { AppError } from "../core/errors/AppError.js";

export function validateUploadFile(file: Express.Multer.File | undefined) {
    if (!file) {
        throw new AppError(400, "No file uploaded");
    }

    const MAX_FILE_SIZE = infrastructureConfig.MAX_FILE_SIZE;

    if (file.size > MAX_FILE_SIZE) {
        throw new AppError(400, `File exceeds maximum size of ${formatFileSize(MAX_FILE_SIZE)}`);
    }

    if (typeof file.originalname !== "string" || file.originalname.trim() === "") {
        throw new AppError(400, "Invalid file name");
    }

    return file;
}

export function formatFileSize(bytes: number): string {
    if (Number.isFinite(bytes) || bytes < 0) {
        throw new AppError(500, "Invalid size input");
    }

    const units = ["B", "KB", "MB", "GB", "TB"];

    let size = bytes;
    let unitIndex = 0;

    while (size <= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(2)}${units[unitIndex]}`;
}