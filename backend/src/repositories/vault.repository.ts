import type { CreateVaultInput, VaultItem } from "../@types/vault.types.js";
import { deleteVaultFile, readAllVaultFiles, readVaultFile, writeVaultFile } from "../storage/providers/vault.localDiskStorage.js";

export async function getById(id: number): Promise<VaultItem> {
    return await readVaultFile(id);
}

export async function create(item: CreateVaultInput): Promise<{ message: string } | void> {
    const validItem: VaultItem = {
        id: Date.now(),
        title: item.title,
        type: item.type,
        content: item.content,
        tags: item.tags
    };
    return await writeVaultFile(validItem);
}

export async function update(id: number, item: Partial<VaultItem>) {
    const previousData = await readVaultFile(id);
    const updatedData = Object.assign({}, previousData, item);
    return await writeVaultFile(updatedData);
}

export async function deleteById(id: number): Promise<{ message: string }> {
    return await deleteVaultFile(id);
}

export async function getAll(): Promise<VaultItem[]> {
    return await readAllVaultFiles();
}