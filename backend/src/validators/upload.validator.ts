import { infrastructureConfig } from "../core/configs/infrastructure.js";
import { AppError } from "../core/errors/AppError.js";

export function validateUploadFile(files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] } | undefined): Express.Multer.File[] {
    let filesArray: Express.Multer.File[] = [];

    if (!files) throw new AppError(400, "No file uploaded");

    if (Array.isArray(files)) {
        filesArray = files;
    } else {
        filesArray = Object.values(files).flat();
    }

    if (filesArray.length === 0) throw new AppError(400, "No file uploaded");

    const MAX_FILE_SIZE = infrastructureConfig.MAX_FILE_SIZE

    filesArray.forEach(file => {
        if (!file.originalname || typeof file.originalname !== "string" || file.originalname.trim() === "") throw new AppError(400, "Invalid file name");
    });

    const totalSize = filesArray.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_FILE_SIZE) {
        throw new AppError(400, `Total size exceeds the ${formatFileSize(MAX_FILE_SIZE)} limit.`);
    }
    return filesArray;
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