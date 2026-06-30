import path from "node:path";
import type { ApiResponse, DeleteFileResponse, DownloadFileResult, FileInfo, FileListItemDto, FileMetaData, PaginatedResponse, UpdateFileInput, UploadQuery } from "../@types/file.types.js";
import * as FileRepository from "../repositories/file.repository.js";
import * as FolderRepository from "../repositories/folder.repository.js"
import { getFilePath } from "../storage/providers/file.localDiskStorage.js";
import { applyFilters, applyPagination, applySorting } from "../utils/uploadQuery.utils.js";
import { createPaginatedResponse } from "../utils/pagination.utils.js";

export async function createUploadService(files: Express.Multer.File[], folderId: string | null): Promise<ApiResponse<string>> {
    for (const file of files) {
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
    }

    return {
        message: "Upload successfully."
    }
}

export async function getFileInfoByIdService(id: string): Promise<ApiResponse<FileInfo>> {
    const metadata = await FileRepository.getById(id);
    return {
        data: {
            name: metadata.originalName,
            extension: metadata.extension,
            size: metadata.size,
            uploadedAt: metadata.uploadedAt
        },
        message: "Information fetched Successfully"
    };
}

export async function getUploadByIdService(id: string): Promise<ApiResponse<DownloadFileResult>> {
    const metadata = await FileRepository.getById(id);

    return {
        data: {
            metadata,
            filePath: getFilePath(metadata.storedName)
        },
        message: `${metadata.originalName} is ready for download.`
    }
}

export async function deleteUploadService(id: string): Promise<ApiResponse<DeleteFileResponse>> {
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

export async function getAllUploadsService(query: UploadQuery): Promise<ApiResponse<PaginatedResponse<FileListItemDto>>> {
    let files = await FileRepository.getAll();

    files = applyFilters(files, query);

    const totalFiles = files.length;

    files = applySorting(files, query);

    files = applyPagination(files, query);

    const filesList = files.map(file => ({
        id: file.id,
        name: file.originalName,
        extension: file.extension,
        size: file.size
    }));
    const result = createPaginatedResponse(filesList, totalFiles, query.page, query.limit);
    return {
        data: result,
        message: "Files fetched successfully"
    };
}
