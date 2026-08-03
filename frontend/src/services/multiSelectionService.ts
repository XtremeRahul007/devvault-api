import { deleteFile, downloadFile } from "../api/file.api";
import { confirmDialog } from "../components/confirmDialog";
import { refreshFileList } from "../utils/refreshFileListHandler";
import { toast } from "./toastService";

export async function multipleFileDownloadService(fileIDList: string[]) {
  if (!fileIDList || fileIDList.length === 0) {
    toast.error("No file selected!");
    return;
  }

  const fileCount = fileIDList.length;

  const message =
    fileCount === 1
      ? "Would you like to download this file to your device?"
      : `Would you like to download these ${fileCount} files to your device?`;

  const confirmed = await confirmDialog.ask({
    title: "Download File?",
    message: message,
    confirmText: "Download",
    cancelText: "Cancel",
  });

  if (!confirmed) return;

  if (confirmed === true) {
    for (const fileID of fileIDList) {
      const response = await downloadFile(fileID);
      if (!response) return;

      if (response.error !== undefined) {
        toast.error(response.error);
        continue;
      }
    }
    toast.success(
      `${fileCount} file${fileCount === 1 ? "" : "s"} ready for download.`,
    );
  }
}

export async function multipleFileDeleteService(fileIDList: string[]) {
  if (!fileIDList || fileIDList.length === 0) {
    toast.error("No file selected!");
    return;
  }

  const fileCount = fileIDList.length;

  const message =
    fileCount === 1
      ? "Are you sure you want to permanently delete this file? This action cannot be undone."
      : `Are you sure you want to permanently delete these ${fileCount} files? This action cannot be undone.`;

  const confirmed = await confirmDialog.ask({
    title: "Delete File?",
    message: message,
    confirmText: "Delete",
    cancelText: "Cancel",
    danger: true,
  });

  if (!confirmed) return;

  if (confirmed === true) {
    for (const fileID of fileIDList) {
      const response = await deleteFile(fileID);
      if (!response) return;

      if (response.error !== undefined) {
        toast.error(response.error);
        continue;
      }
    }
    toast.success(
      `${fileCount} file${fileCount === 1 ? "" : "s"} deleted successfully.`,
    );
    await refreshFileList();
  }
}
