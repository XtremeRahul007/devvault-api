export interface FileMetaData {
    id: string,
    originalName: string,
    storedName: string,
    mimeType: string,
    extension: string,
    size: number,
    uploadedAt: number
}

export interface DownloadFileResult {
    metadata: FileMetaData;
    filePath: string;
}

export interface DeleteFileResponse {
    message: string
}

/*
export interface UploadFilters {
    name?: string | undefined,
    extension?: string | undefined
}

export interface UploadFilterInput {
    name?: unknown;
    extension?: unknown;
}

export interface UpdatePagination {
    page?: number;
    limit?: number;
}

export interface UpdatePaginationInput {
    page?: unknown;
    limit?: unknown;
}
*/

export interface UploadQuery {
    name?: string | undefined;
    extension?: string | undefined;

    sort?: SortField | undefined;
    order?: SortOrder | undefined;

    page?: number | undefined;
    limit?: number | undefined;
}

export type UpdateFileInput = Partial<Pick<FileMetaData, "originalName">>;

export type SortField = "name" | "size" | "uploadedAt" | undefined;

export type SortOrder = "asc" | "desc" | undefined;