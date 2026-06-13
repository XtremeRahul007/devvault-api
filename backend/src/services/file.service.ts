import path from "node:path";
import type { DeleteFileResponse, DownloadFileResult, FileMetaData, PaginatedResponse, UpdateFileInput, UploadQuery } from "../@types/file.types.js";
import * as FileRepository from "../repositories/file.repository.js";
import * as FolderRepository from "../repositories/folder.repository.js"
import { getFilePath } from "../storage/providers/file.localDiskStorage.js";
import { applyFilters, applyPagination, applySorting } from "../utils/uploadQuery.utils.js";
import { createPaginatedResponse } from "../utils/pagination.utils.js";

export async function createUploadService(file: Express.Multer.File, folderId: string | null) {
    const storedName = file.filename;
    const id = path.parse(storedName).name;
    const extension = path.extname(file.originalname);

    if (folderId !== null) { await FolderRepository.getById(folderId); }
    const metadata: FileMetaData = {
        id,
        originalName: file.originalname,
        storedName,
        mimeType: file.mimetype,
        extension,
        size: file.size,
        uploadedAt: Date.now(),
        folderId: folderId
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

export async function renameUploadService(id: string, data: UpdateFileInput) {
    return await FileRepository.update(id, data);
}

export async function getAllUploadsService(query: UploadQuery): Promise<PaginatedResponse<FileMetaData>> {
    let files = await FileRepository.getAll();

    files = applyFilters(files, query);

    const totalFiles = files.length;

    files = applySorting(files, query);

    files = applyPagination(files, query);

    const result = createPaginatedResponse(files, totalFiles, query.page, query.limit);
    return result;
}
