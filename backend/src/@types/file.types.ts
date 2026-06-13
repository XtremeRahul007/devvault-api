export interface FileMetaData {
    id: string;
    originalName: string;
    storedName: string;
    mimeType: string;
    extension: string;
    size: number;
    uploadedAt: number;
    folderId: string | null;
}

export interface DownloadFileResult {
    metadata: FileMetaData;
    filePath: string;
}

export interface DeleteFileResponse {
    message: string
}

export interface UploadQuery {
    name?: string | undefined;
    extension?: string | undefined;

    sort?: SortField | undefined;
    order?: SortOrder | undefined;

    page: number;
    limit: number;
}

export interface PaginatedResponse<T> {
    page: number;
    limit: number;
    totalFiles: number;
    totalPages: number;
    data: T[];
}

export type UpdateFileInput = Partial<Pick<FileMetaData, "originalName">>;

export type SortField = "name" | "size" | "uploadedAt" | undefined;

export type SortOrder = "asc" | "desc" | undefined;