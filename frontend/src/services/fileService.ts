import { deleteFile, downloadFile, getFileInfo, getFiles } from "../api/file.api";
import { confirmDialog } from "../components/confirmDialog ";
import { updateInfoDialog } from "../components/fileInfoDialog";
import { renderFiles } from "../components/renderList";
import { toast } from "./toastService";

export async function fileListRenderingService(): Promise<void> {
    const response = await getFiles();

    if (!response) return;

    const responseData = response.data;

    if (!responseData) {
        toast.error(`${response.error}`);
    }

    const files = responseData.data;

    renderFiles(files);

    toast.success(`${response.data.totalFiles} ${response.message}`);
}

export async function fileInfoService(fileID: string): Promise<void> {
    const response = await getFileInfo(fileID);

    if (!response) return;

    const responseData = response.data;

    if (!responseData) {
        toast.error(`${response.error}`);
    }

    toast.success(`${response.message}`);

    updateInfoDialog(responseData);
}

export async function downloadService(fileID: string) {
    const confirmed = await confirmDialog.ask({
        title: "Download File?",
        message: "Would you like to download this file to your device?",
        confirmText: "Download",
        cancelText: "Cancel"
    });

    if (!confirmed) return;

    if (confirmed === true) {
        const response = await downloadFile(fileID);
        if (!response) return;
        toast.success(`${response.data.name} is ready for download.`);
    }
}

export async function deleteService(fileID: string) {
    const confirmed = await confirmDialog.ask({
        title: "Delete File?",
        message: "Are you sure you want to permanently delete this file? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
        danger: true
    });

    if (!confirmed) return;

    if (confirmed === true) {
        const response = await deleteFile(fileID);
        if (!response) return;
        toast.success(`${response.message}`)
    }
}