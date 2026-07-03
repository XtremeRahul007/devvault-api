import type { ApiResponse, FileInfo, FileListItemDto, PaginatedResponse } from "../@types/file.type";
import { fileUploadingState, updateProgress } from "../components/uploadDialog";
import { toast } from "../services/toastService";
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

        const xhr = new XMLHttpRequest();

        let lastLoaded = 0;
        let lastTime = performance.now();

        xhr.upload.onprogress = (event) => {
            if (!event.lengthComputable) return;

            const now = performance.now();
            const timeDiff = (now - lastTime) / 1000;
            const loadedDiff = event.loaded - lastLoaded;

            const speed = loadedDiff / timeDiff;

            updateProgress(event.loaded, event.total, speed);
            fileUploadingState(true);

            lastLoaded = event.loaded;
            lastTime = now;
        }

        xhr.onload = async () => {
            const response = JSON.parse(xhr.responseText);
            toast.success(`${response.message}`);
            fileUploadingState(false);
        }

        xhr.onerror = () => {
            toast.error("Network Error");
            fileUploadingState(false);
        }

        xhr.open("POST", "/api/file/upload");

        xhr.send(formData);

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