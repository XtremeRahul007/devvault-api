import * as FolderRepository from "../repositories/folder.repository.js";
import * as FileRepository from "../repositories/file.repository.js";
import type { Folder, UpdateFolderInput } from "../@types/folder.types.js";
import { randomUUID } from "node:crypto";


export async function createFolderService(folder: Folder) {
    const data: Folder = {
        id: randomUUID(),
        name: folder.name,
        parentId: folder.parentId,
        createdAt: Date.now()
    }

    if (folder.parentId !== null) {
        await FolderRepository.getById(folder.parentId);
    }

    await FolderRepository.create(data);
    return {
        message: "Upload successfully.",
        id: data.id
    }
}

export async function getFolderByIdService(id: string): Promise<Folder> {
    const data = await FolderRepository.getById(id);
    return data;
}

export async function deleteFolderService(id: string): Promise<{ message: string }> {
    const data = await FolderRepository.getById(id);
    await FolderRepository.deleteById(data.id);
    return {
        message: `${data.name} deleted successfully`
    };
}

export async function renameFolderService(id: string, data: UpdateFolderInput) {
    return await FolderRepository.update(id, data);
}

export async function moveFolderService() {
// Have to set move and fix or create validators
}

export async function getAllFoldersService() {
    return await FolderRepository.getAll();
}

export async function getFolderContentsService(folderId: string) {
    const folders = await FolderRepository.getAll();
    const files = await FileRepository.getAll();

    return {
        folders: folders.filter(folder => folder.parentId === folderId),
        files: files.filter(file => file.folderId === folderId)
    };
}