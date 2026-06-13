import type { Folder, MoveFolderInput, UpdateFolderInput } from "../@types/folder.types.js";
import { deleteFolderById, readAllFolders, readFolder, writeFolder } from "../storage/providers/folder.localDiskStorage.js";


export async function create(data: Folder): Promise<{ message: string } | void> {
    return await writeFolder(data);
}

export async function getById(id: string): Promise<Folder> {
    return await readFolder(id);
}

export async function getAll(): Promise<Folder[]> {
    return await readAllFolders();
}

export async function deleteById(id: string): Promise<void> {
    return await deleteFolderById(id);
}

export async function update(id: string, newName: UpdateFolderInput) {
    const data = await readFolder(id);
    const newdata = Object.assign({}, data, newName);
    return await writeFolder(newdata);
}

export async function move(from: string, to: MoveFolderInput) {
    const previousData = await getById(from);
    const newData = Object.assign({}, previousData, to);
    await writeFolder(newData);
    return { message: "File moved successfully" };

}