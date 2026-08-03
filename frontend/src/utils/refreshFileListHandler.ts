import { updateSelectionState } from "../components/multiFileSelection";
import { fileListRenderingService } from "../services/fileService";

export async function refreshFileList() {
  const result = await fileListRenderingService();
  if (result === true) {
    updateSelectionState();
  }
}
