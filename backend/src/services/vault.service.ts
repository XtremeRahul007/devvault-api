import type { CreateVaultInput, VaultItem } from "../@types/vault.types.js";
import * as VaultRepository from "../repositories/vault.repository.js";

export async function getItemService(id: number) {
    return await VaultRepository.getById(id);
}

export async function createItemService(item: CreateVaultInput) {
    await VaultRepository.create(item);
}

export async function deleteItemService(id: number) {
    return VaultRepository.deleteById(id);
}

export async function updateVaultService(id: number, item: Partial<VaultItem>) {
    return VaultRepository.update(id, item);
}

export async function getAllVaultService() {
    return VaultRepository.getAll();
}