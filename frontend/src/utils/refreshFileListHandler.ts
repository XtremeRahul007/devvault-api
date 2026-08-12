import { updateSelectionState } from "../components/multiFileSelection";
import { fileListRenderingService } from "../services/fileService";

export async function refreshFileList(): Promise<boolean> {
  const result = await fileListRenderingService();
  if (result === true) {
    updateSelectionState();
  }
  return result;
}
