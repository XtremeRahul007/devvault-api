import type { FileInfo } from "../@types/file.type";
import { getFileInfo } from "../api/file.api";

export async function fileInfoService(fileID: string): Promise<FileInfo> {
    return await getFileInfo(fileID) as FileInfo;
}