import fs from "fs/promises";
import path from "path";
import type { VaultItem } from "../types/vault.types.js";
import { handleFileError, isNodeError } from "../utils/vault.errorHandler.js";
import { AppError } from "../core/errors/AppError.js";

const folderPath = path.join(process.cwd(), "storage");

const filePathFun = (id: number) => {
    return path.join(folderPath, `vault_id_${id}.json`);
}

export async function readVault(id: number): Promise<VaultItem> {
    const filePath = filePathFun(id);
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        if (isNodeError(err) && err.code === "ENOENT") {
            throw new AppError(404, "File does not exist");
        } else {
            throw new AppError(500, "An unexpected error occurred");
        }
    }
}

export async function getAllVault(): Promise<VaultItem[]> {
    try {
        const files = await fs.readdir(folderPath);
        const filteredFiles = files.filter(fileName => /^vault_id_\d+\.json$/.test(fileName));
        const filecontent = await Promise.all(
            filteredFiles.map(async (fileName) => {
                const text = await fs.readFile(path.join(folderPath, fileName), "utf-8");
                try { return JSON.parse(text); } catch (err) { return null; }
            })
        );
        const processedFilecontent = filecontent.filter((item): item is VaultItem => item !== null);
        return processedFilecontent;
    } catch (err) {
        if (isNodeError(err) && err.code === "ENOENT") {
            throw new AppError(404, "File or directory does not exist")
        } else if (isNodeError(err) && err.code === "EMFILE") {
            throw new AppError(503, "Too many open files");
        } else {
            throw new AppError(500, "An unexpected error occurred");
        }
    }
}

export async function writeVault(data: VaultItem) {
    const filePath = filePathFun(data.id);
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        handleFileError(err);
    }
}

export async function deleteVault(id: number): Promise<{ message: string }> {
    const filePath = filePathFun(id);
    try {
        await fs.unlink(filePath);
        return { message: "Deleted successfully." };
    } catch (err) {
        if (isNodeError(err) && err.code === "ENOENT") {
            throw new AppError(404, "File not found");
        } else {
            throw new AppError(500, "An unexpected error occurred");
        }
    }
}