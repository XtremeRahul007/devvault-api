import type { OrganizeState } from "../@types/file.type";
import { getCurrentOrganizeState, updateOrganizeState } from "./organizeState";

let currentOrganizeState: OrganizeState;
let isEmptyField: boolean;

const searchElements = {
  searchForm: document.getElementById("searchForm") as HTMLButtonElement,
  searchBar: document.getElementById("searchBar") as HTMLInputElement,
  resetIcon: document.getElementById("resetIcon") as HTMLSpanElement,
};

export function initSearchBar() {
  rehydrateSearchField();
  checkSearchField();
  setFeedBackIcon(isEmptyField);
  currentOrganizeState = getCurrentOrganizeState();
  initSearchHandler();
  initSearchFieldHandler();
}

function initSearchHandler() {
  searchElements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getSearchValue();
  });
  searchElements.searchForm.addEventListener("reset", (e) => {
    e.preventDefault();
    resetSearchField();
  });
}

async function resetSearchField() {
  currentOrganizeState.name = undefined;
  currentOrganizeState.extension = undefined;
  const result = await updateOrganizeState();
  if (result) {
    searchElements.searchBar.value = "";
    localStorage.removeItem("name");
    checkSearchField();
    setFeedBackIcon(isEmptyField);
  }
}

async function getSearchValue() {
  const value = searchElements.searchBar.value;
  const validValue = value?.trim() || undefined;
  if (validValue != null) {
    currentOrganizeState.name = validValue;
    await updateOrganizeState();
  }
}

function initSearchFieldHandler() {
  searchElements.searchBar.addEventListener("input", () => {
    checkSearchField();
    setFeedBackIcon(isEmptyField);
  });
}

function rehydrateSearchField() {
  const value = localStorage.getItem("name");
  if (value != null) {
    console.log(value);
    searchElements.searchBar.value = String(value);
  }
}

function checkSearchField() {
  const textLen = searchElements.searchBar.value.length;
  isEmptyField = textLen === 0 ? true : false;
}

function setFeedBackIcon(isEmptyField: boolean) {
  if (isEmptyField) {
    searchElements.resetIcon.className = "svg-gr svg-size-sm svg-reset";
  } else {
    searchElements.resetIcon.className = "svg-gr svg-size-sm svg-close";
  }
}
