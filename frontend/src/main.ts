import "./styles/main.css";
import { initFileActionController } from "./components/fileActionMenu";
import { initUploadFile } from "./components/uploadDialog";
import { initThemeController } from "./utils/themeManager";
import { initMultiSelect } from "./components/multiFileSelection";
import { initFilterMenu } from "./components/filterMenu";
import { renderPanelButtons } from "./components/panelButtonRender";
import { initSearchBar } from "./components/searchBar";
import {
  initOrganizeState,
  updateOrganizeState,
} from "./components/organizeState";
import { initExtensionFilter } from "./components/extensionFilter";

const UIModules: Array<() => void> = [renderPanelButtons, initThemeController];
const ActionModules: Array<() => void> = [
  initFileActionController,
  initUploadFile,
  initOrganizeState,
];
const postApiModules: Array<() => void> = [
  initMultiSelect,
  initFilterMenu,
  initSearchBar,
  initExtensionFilter,
];

function runModules(ModulesList: Array<() => void>): boolean {
  for (const Module of ModulesList) {
    try {
      Module();
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  return true;
}

async function initApp() {
  let operationFinished: boolean = false;
  try {
    operationFinished = runModules(UIModules);
    if (!operationFinished) return;

    operationFinished = runModules(ActionModules);
    if (!operationFinished) return;

    const rendered = await updateOrganizeState();
    if (rendered && operationFinished) {
      runModules(postApiModules);
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => initApp());
