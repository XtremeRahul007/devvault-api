import type { ApiResponse, FileInfo, FileListItemDto, PaginatedResponse } from "../@types/file.type";
import { apiResponse } from "./file.api.helper";

export const getFiles = async () => {
    try {
        const response = await fetch("/api/file", { method: 'GET' });

        return await apiResponse<ApiResponse<PaginatedResponse<FileListItemDto>>>(response);

    } catch (err) {
        console.error("Failed to fetch files:", err);
    }
}

export const getFileInfo = async (fileId: string) => {
    try {
        const response = await fetch(`/api/file/info/${fileId}`, { method: 'GET' });

        return await apiResponse<ApiResponse<FileInfo>>(response);

    } catch (err) {
        console.error("Failed to fetch files:", err);
    }
}

export const downloadFile = async (fileId: string) => {
    try {
        window.location.href = `/api/file/download/${fileId}`;

        const response = await fetch(`/api/file/info/${fileId}`, { method: 'GET' });

        return await apiResponse<ApiResponse<FileInfo>>(response);

    } catch (err) {
        console.error("Failed to fetch files:", err);
    }
};

export async function uploadFiles(files: File[]) {
    try {
        const formData = new FormData();

        for (const file of files) {
            formData.append("files", file);
        }

        const response = await fetch("/api/file/upload", {
            method: 'POST',
            body: formData
        });

        return await apiResponse<ApiResponse<any>>(response);

    } catch (err) {
        console.error("Failed to fetch files:", err);
    }

}

export async function deleteFile(fileId: string) {
    try {
        const response = await fetch(`/api/file/delete/${fileId}`, { method: 'DELETE' });

        return await apiResponse<ApiResponse<any>>(response);

    } catch (err) {
        console.error("Failed to fetch files:", err);
    }
}