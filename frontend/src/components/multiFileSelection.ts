import {
  multipleFileDeleteService,
  multipleFileDownloadService,
} from "../services/multiSelectionService";

interface ActionButtonElements {
  uploadButton: HTMLButtonElement;
  actionMenuButton: HTMLButtonElement;
  selectBtn: HTMLButtonElement;
}

interface ContainerElements {
  actionMenu: HTMLUListElement;
  counter: HTMLDivElement;
  menu: HTMLUListElement;
  selectBtnIco: HTMLSpanElement;
}

let inSelection: boolean = true;
let isAllSelected: boolean = false;

let CheckBoxCollection: HTMLInputElement[] = [];
let CheckedFileLIst: HTMLInputElement[] = [];

let actionButtonElements: ActionButtonElements;
let containerElements: ContainerElements;

export function initMultiSelect() {
  initElements();
  createBulkActionMenu();
  selectedFilesCounter();
  getCheckBoxCollection();
  selectionHandler();
  actionMenuHandler();
  actionButtonElements.selectBtn.addEventListener("click", () => {
    selectionHandler();
  });
}

function initElements() {
  const uploadButton = document.getElementById(
    "uploadButton",
  ) as HTMLButtonElement;
  const actionMenuButton = document.getElementById(
    "actionMenuButton",
  ) as HTMLButtonElement;
  const selectBtn = document.getElementById(
    "multiSelectButton",
  ) as HTMLButtonElement;
  const actionMenu = null;
  const counter = document.getElementById(
    "fileCounterContainer",
  ) as HTMLDivElement;
  const menu = document.getElementById("fileList") as HTMLUListElement;
  const selectBtnIco = document.getElementById(
    "multiSelectButtonIcon",
  ) as HTMLSpanElement;

  actionButtonElements = { uploadButton, actionMenuButton, selectBtn };
  containerElements = { actionMenu, counter, menu, selectBtnIco };
}

function getCheckBoxCollection() {
  CheckBoxCollection = Array.from(
    containerElements.menu.querySelectorAll(
      "[data-file-checkbox]",
    ) as NodeListOf<HTMLInputElement>,
  );
}

function selectionHandler() {
  containerElements.counter.textContent = "Files Selected: 0";
  if (inSelection) {
    selectionDisabled();
  } else {
    selectionEnabled();
  }
}

function selectionEnabled(): void {
  for (const checkbox of CheckBoxCollection) {
    checkbox.disabled = false;
  }

  actionButtonElements.uploadButton.style.display = "none";
  actionButtonElements.actionMenuButton.style.display = "";

  document.documentElement.style.setProperty(
    "--handle-three-dot-btn-display",
    "none",
  );
  document.documentElement.style.setProperty(
    "--handle-listItem-cursor",
    "pointer",
  );

  containerElements.counter.style.display = "";
  containerElements.selectBtnIco.className = "svg-gr svg-size-sm svg-close";
  inSelection = true;
  isAllSelected = false;
}

function selectionDisabled(): void {
  for (const checkbox of CheckBoxCollection) {
    checkbox.disabled = true;
    checkbox.checked = false;
  }

  actionButtonElements.uploadButton.style.display = "";
  actionButtonElements.actionMenuButton.style.display = "none";

  document.documentElement.style.setProperty(
    "--handle-three-dot-btn-display",
    "flex",
  );
  document.documentElement.style.setProperty(
    "--handle-listItem-cursor",
    "default",
  );

  containerElements.counter.style.display = "none";
  containerElements.selectBtnIco.className =
    "svg-gr svg-size-sm svg-multiSelect";
  inSelection = false;
}

function selectedFilesCounter() {
  containerElements.menu.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".check-li") || target.matches("[data-file-checkbox]")) {
      updateCheckList();
    }
  });
}

function updateCheckList() {
  CheckedFileLIst = Array.from(
    containerElements.menu.querySelectorAll(
      "[data-file-checkbox]:checked",
    ) as NodeListOf<HTMLInputElement>,
  );
  const checkedCount = CheckedFileLIst.length;

  containerElements.counter.textContent = `Files Selected: ${checkedCount}`;
}

function getSelectedFileID(): string[] {
  let selectedFileIds: string[] = [];

  if (!CheckedFileLIst || CheckedFileLIst.length === 0) {
    return [];
  }

  for (const checkedFile of CheckedFileLIst) {
    const fileId = checkedFile.closest("li")?.dataset.fileId;
    if (fileId) selectedFileIds.push(fileId);
  }
  return selectedFileIds;
}

function selectAllFiles() {
  if (isAllSelected === false) {
    for (const checkbox of CheckBoxCollection) {
      checkbox.checked = true;
      isAllSelected = true;
    }
  } else if (isAllSelected === true) {
    for (const checkbox of CheckBoxCollection) {
      checkbox.checked = false;
      isAllSelected = false;
    }
  }
  updateCheckList();
}

function actionMenuHandler() {
  if (!containerElements.actionMenu) return;
  containerElements.actionMenu.addEventListener("click", async (e: Event) => {
    const target = e.target as HTMLElement;
    const actionBtn = target.closest("li");
    if (!actionBtn) return;
    const action = actionBtn.dataset.action;

    const selectedFileIds = getSelectedFileID();

    switch (action) {
      case "SelectAll":
        selectAllFiles();
        break;

      case "DeleteSelected":
        await multipleFileDeleteService(selectedFileIds);
        break;

      case "DownloadSelected":
        await multipleFileDownloadService(selectedFileIds);
        break;
    }
  });
}

function createBulkActionMenu() {
  const menu = document.createElement("ul");

  menu.id = "selectionActionMenu";
  menu.className = "popupMenu depth-container";
  menu.popover = "auto";

  menu.innerHTML = `
    <div>
      <li data-action="SelectAll">
        <button type="button">
          <span class="svg-gr svg-size-xsm svg-selectAll"></span>
          <div id="checkToggleBtn">Check All</div>
        </button>
      </li>
      <li data-action="DeleteSelected">
        <button type="button">
          <span class="svg-gr svg-size-xsm svg-recycle"></span>
          <div>Delete Selected Files</div>
        </button>
      </li>
      <li data-action="DownloadSelected">
        <button type="button">
          <span class="svg-gr svg-size-xsm svg-download"></span>
          <div>Download Selected Files</div>
        </button>
      </li>
    </div>
    `;
  document.body.append(menu);
  containerElements.actionMenu = menu;
}

export function updateSelectionState() {
  getCheckBoxCollection();
  updateCheckList();
  if (inSelection === true) {
    selectionEnabled();
  } else {
    selectionDisabled();
  }
}
