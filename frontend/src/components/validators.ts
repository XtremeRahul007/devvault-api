import { toast } from "../services/toastService";
import { formatFileSize } from "./formatFileSize";

export function fileIdValidator(id: unknown): string {
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (typeof id !== "string" || !UUID_REGEX.test(id)) {
        throw new Error(`${id} is not a vaild file ID!`);
    }

    return id.trim();
}

const MAX_FILE_SIZE = Number(import.meta.env.VITE_MAX_FILE_SIZE);

export type ValidationResult = { ok: true; files: File[] } | { ok: false; reason: string };

type ValidationRule = (files: File[]) => ValidationResult;

const hasFiles = (files: File[]): ValidationResult => {
    return files.length > 0 ? { ok: true, files } : { ok: false, reason: "No files selected." };
};

const withinTotalSize = (files: File[]): ValidationResult => {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    return totalSize <= MAX_FILE_SIZE
        ? { ok: true, files }
        : { ok: false, reason: `Total size exceeds the ${formatFileSize(MAX_FILE_SIZE)} limit.` };
};

const rules: ValidationRule[] = [
    hasFiles,
    withinTotalSize
];

export const validatedFiles = (fileList: FileList | null): File[] | null => {
    const files = fileList ? Array.from(fileList) : [];

    for (const rule of rules) {
        const result = rule(files);
        if (!result.ok) {
            toast.error(result.reason);
            console.error(result.reason);
            return null;
        }
    }

    return files;
};