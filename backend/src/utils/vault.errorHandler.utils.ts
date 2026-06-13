import { AppError } from "../core/errors/AppError.js";

export const isNodeError = (err: unknown): err is NodeJS.ErrnoException => {
    return err instanceof Error && 'code' in err;
}

export function handleFileError(err: unknown) {
    switch (isNodeError(err) && err.code) {
        case "ENOENT":
            throw new AppError(404, "File or directory does not exist");
        case "EACCES":
            throw new AppError(403, "Permission denied");
        case 'ENOSPC':
            throw new AppError(507, "Insufficient storage");
        default:
            throw new AppError(500, "Unexpected storage failure");
    }
}

/*
export function handleFolderError(err: unknown) {
    switch (isNodeError(err) && err.code) {
        case 'EACCES':
            throw new AppError(403, "Permission denied");
        case 'ENOSPC':
            throw new AppError(507, "Insufficient storage");
        case 'EROFS':
            throw new AppError(500, "Storage is read-only");
        default:
            throw new AppError(500, "Unexpected storage failure");
    }
}
*/