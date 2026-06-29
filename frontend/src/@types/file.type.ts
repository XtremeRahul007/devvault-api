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

export interface FileListItemDto {
    id: string;
    name: string;
    extension: string;
    size: number;
}

export interface FileInfo {
    name: string;
    extension: string;
    size: number;
    uploadedAt: number;
}

export interface PaginatedResponse<T> {
    page: number;
    limit: number;
    totalFiles: number;
    totalPages: number;
    data: T[];
}