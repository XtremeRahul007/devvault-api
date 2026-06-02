import type { DeleteFileResponse, FileMetaData } from "../@types/file.types.js";
import { readMetadata, writeMetadata, readAllMetadata, deleteMetadata, deletePhysicalFile } from "../storage/providers/file.localDiskStorage.js";

export async function create(metadata: FileMetaData): Promise<{ message: string } | void> {
    return await writeMetadata(metadata);
}

export async function getById(id: string): Promise<FileMetaData> {
    return await readMetadata(id);
}

export async function getAll(): Promise<FileMetaData[]> {
    return await readAllMetadata();
}

export async function deleteById(id: string): Promise<void> {
    return await deleteMetadata(id);
}

export async function deleteStoredFile(storedName: string, originalName: string): Promise<void> {
    return await deletePhysicalFile(storedName, originalName);
}