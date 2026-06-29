import { deleteFile } from "../api/file.api";
import { confirmDialog } from "../components/confirmDialog ";

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
        await deleteFile(fileID);
    }
}