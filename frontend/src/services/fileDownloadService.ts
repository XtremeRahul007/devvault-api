import { downloadFile } from "../api/file.api";
import { confirmDialog } from "../components/confirmDialog ";

export async function downloadService(fileID: string) {
    const confirmed = await confirmDialog.ask({
        title: "Download File?",
        message: "Would you like to download this file to your device?",
        confirmText: "Download",
        cancelText: "Cancel"
    });

    if (!confirmed) return;

    if (confirmed === true) {
        await downloadFile(fileID);
    }
}