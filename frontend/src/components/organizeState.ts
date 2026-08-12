import type { OrderType, OrganizeState, SortType } from "../@types/file.type";
import { getOrganizeState } from "../services/fileService";
import { refreshFileList } from "../utils/refreshFileListHandler";

const currentOrganizeState: OrganizeState = {
  order: "asc",
  sort: "name",
  name: undefined,
};

export function initOrganizeState() {
  setPreviousOrganizeState();
}

export function setPreviousOrganizeState() {
  currentOrganizeState.order = getValidItem("order", "asc") as OrderType;
  currentOrganizeState.sort = getValidItem("sort", "name") as SortType;
  currentOrganizeState.name = undefined;
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
