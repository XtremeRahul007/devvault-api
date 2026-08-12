import type { OrganizeState } from "../@types/file.type";
import { getCurrentOrganizeState, updateOrganizeState } from "./organizeState";

let currentOrganizeState: OrganizeState;

const searchElements = {
  searchForm: document.getElementById("searchForm") as HTMLButtonElement,
  searchBar: document.getElementById("searchBar") as HTMLInputElement,
};

export function initSearchBar() {
  currentOrganizeState = getCurrentOrganizeState();
  initSearchHandler();
}

function initSearchHandler() {
  searchElements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getSearchValue();
    updateOrganizeState();
  });
  searchElements.searchForm.addEventListener("reset", (e) => {
    e.preventDefault();
    searchElements.searchBar.value = "";
    currentOrganizeState.name = undefined;
    updateOrganizeState();
  });
}

function getSearchValue() {
  const value = searchElements.searchBar.value;
  const validValue = value?.trim() || undefined;
  currentOrganizeState.name = validValue;
}
