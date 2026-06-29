import type { FileInfo, FileListItemDto, PaginatedResponse } from "../@types/file.type";
import { renderFiles } from "../components/renderList";
import { toast } from "../services/toastService";

export const getFiles = async () => {
    try {
        const response = await fetch("/api/file", { method: 'GET' });

        if (!response.ok) {
            throw new Error("Failed to fetch files");
        }

        const apiResponse = await response.json() as PaginatedResponse<FileListItemDto>;
        const files = apiResponse.data;

        renderFiles(files);
    } catch (err) {
        console.error("Data fetching failed:", err);
    }
}

export const getFileInfo = async (fileId: string) => {
    try {
        const response = await fetch(`/api/file/info/${fileId}`, { method: 'GET' });

        if (!response.ok) {
            throw new Error("Failed to fetch file info");
        }

        const apiResponse = await response.json() as FileInfo;

        return apiResponse;
    } catch (err) {
        toast.error(`Info Fetching failed: ${err}`);
    }
}

export const downloadFile = async (fileId: string) => {
    try {
        const response = await fetch(`/api/file/info/${fileId}`, { method: 'GET' });

        if (!response.ok) {
            throw new Error("Failed to do download file");
        }

        const apiResponse = await response.json();

        toast.success(`"${apiResponse.name}" has started downloading...`);
        window.location.href = `/api/file/download/${fileId}`;
    } catch (err) {
        toast.error(`Error downloading file: ${err}`);
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

        if (!response.ok) {
            throw new Error("Upload failed");
        }
        toast.success("Files uploaded successfully.");
    } catch (err) {
        toast.error(`Error uploading files: ${err}`);
    }

}

export async function deleteFile(fileId: string) {
    try {
        const response = await fetch(`/api/file/delete/${fileId}`, { method: 'DELETE' });

        if (!response.ok) {
            throw new Error("Failed to delete file");
        }

        toast.success("Files deleted successfully.");
    } catch (err) {
        toast.error(`Error uploading files: ${err}`);
    }
}