import path from "node:path";
import type { DeleteFileResponse, DownloadFileResult, FileMetaData } from "../@types/file.types.js";
import * as FileRepository from "../repositories/file.repository.js";
import { getFilePath } from "../storage/providers/file.localDiskStorage.js";

export async function createUploadService(file: Express.Multer.File) {
    const storedName = file.filename;
    const id = path.parse(storedName).name;
    const extension = path.extname(file.originalname);

    const metadata: FileMetaData = {
        id,
        originalName: file.originalname,
        storedName,
        mimeType: file.mimetype,
        extension,
        size: file.size,
        uploadedAt: Date.now()
    }
    await FileRepository.create(metadata);
    return {
        message: "Upload successfully.",
        id: metadata.id
    }
}

export async function getUploadByIdService(id: string): Promise<DownloadFileResult> {
    const metadata = await FileRepository.getById(id);

    return {
        metadata,
        filePath: getFilePath(metadata.storedName)
    }
}

export async function deleteUploadService(id: string): Promise<DeleteFileResponse> {
    const metadata = await FileRepository.getById(id);
    await FileRepository.deleteStoredFile(metadata.storedName, metadata.originalName);
    await FileRepository.deleteById(metadata.id);
    return {
        message: `${metadata.originalName} deleted successfully`
    };
}