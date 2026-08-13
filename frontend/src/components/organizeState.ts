import type { OrderType, OrganizeState, SortType } from "../@types/file.type";
import { getOrganizeState } from "../services/fileService";
import { refreshFileList } from "../utils/refreshFileListHandler";

const currentOrganizeState: OrganizeState = {
  order: "asc",
  sort: "name",
  name: undefined,
  extension: undefined,
};

export function initOrganizeState() {
  setPreviousOrganizeState();
}

export function setPreviousOrganizeState() {
  currentOrganizeState.order = getValidItem("order", "asc") as OrderType;
  currentOrganizeState.sort = getValidItem("sort", "name") as SortType;
  currentOrganizeState.name = getValidItem("name", undefined) as string;
  currentOrganizeState.name = getValidItem("extension", undefined) as string;
}

export function getCurrentOrganizeState(): OrganizeState {
  return currentOrganizeState;
}

export async function updateOrganizeState(): Promise<boolean> {
  const result = getOrganizeState(currentOrganizeState);
  if (result) {
    refreshFileList();
  }
  setOrganizeState();
  return result;
}

function setOrganizeState() {
  for (const [key, value] of Object.entries(currentOrganizeState)) {
    if (value != null) {
      if (key === "extension") continue;
      localStorage.setItem(key, value);
    }
  }
}

function getValidItem(key: string, safetyValue: OrderType | SortType): string {
  const item = localStorage.getItem(key);
  if (item != null) {
    return String(item);
  } else {
    return safetyValue;
  }
}
