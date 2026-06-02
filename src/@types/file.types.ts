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