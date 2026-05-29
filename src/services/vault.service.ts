import { deleteVault, getAllVault, readVault, writeVault } from "../data/vault.storage.js";
import type { VaultItem } from "../types/vault.types.js";

export async function getItemService(id: number) {
    return await readVault(id);
}

export async function createItemService(data: VaultItem) {
    await writeVault(data);
    return data;
}

export async function deleteItemService(id: number) {
    return await deleteVault(id);
}

export async function updateVaultService(id: number, data: Partial<VaultItem>) {
    const previousData = await readVault(id);
    const newData = Object.assign({}, previousData, data);
    await writeVault(newData);
    return newData;
}

export async function getAllVaultService(): Promise<VaultItem[]> {
    return await getAllVault();
}