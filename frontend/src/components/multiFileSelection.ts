import {
  multipleFileDeleteService,
  multipleFileDownloadService,
} from "../services/multiSelectionService";

let inSelection: boolean = true;
let isAllSelected: boolean = false;

let CheckBoxCollection: HTMLInputElement[];
let CheckedFileLIst: HTMLInputElement[];

const actionBtnEl = {
  uploadButton: document.getElementById("uploadButton") as HTMLButtonElement,
  actionMenuButton: document.getElementById(
    "actionMenuButton",
  ) as HTMLButtonElement,
  selectBtn: document.getElementById("multiSelectButton") as HTMLButtonElement,
};

const objEl = {
  actionMenu: document.getElementById(
    "selectionActionMenu",
  ) as HTMLUListElement,
  counter: document.getElementById("fileCounterContainer") as HTMLDivElement,
  menu: document.getElementById("fileList") as HTMLUListElement,
  selectBtnIco: document.getElementById(
    "multiSelectButtonIcon",
  ) as HTMLSpanElement,
};

export function initMultiSelect() {
  selectedFilesCounter();
  getCheckBoxCollection();
  selectionHandler();
  actionMenuHandler();
  actionBtnEl.selectBtn.addEventListener("click", () => {
    selectionHandler();
  });
}

function getCheckBoxCollection() {
  CheckBoxCollection = Array.from(
    objEl.menu.querySelectorAll(
      "[data-file-checkbox]",
    ) as NodeListOf<HTMLInputElement>,
  );
}

function selectionHandler() {
  objEl.counter.textContent = "Files Selected: 0";
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

  actionBtnEl.uploadButton.style.display = "none";
  actionBtnEl.actionMenuButton.style.display = "";

  document.documentElement.style.setProperty(
    "--handle-three-dot-btn-display",
    "none",
  );
  document.documentElement.style.setProperty(
    "--handle-listItem-cursor",
    "pointer",
  );

  objEl.counter.style.display = "";
  objEl.selectBtnIco.className = "svg-gr svg-size-sm svg-close";
  inSelection = true;
  isAllSelected = false;
}

function selectionDisabled(): void {
  for (const checkbox of CheckBoxCollection) {
    checkbox.disabled = true;
    checkbox.checked = false;
  }

  actionBtnEl.uploadButton.style.display = "";
  actionBtnEl.actionMenuButton.style.display = "none";

  document.documentElement.style.setProperty(
    "--handle-three-dot-btn-display",
    "flex",
  );
  document.documentElement.style.setProperty(
    "--handle-listItem-cursor",
    "default",
  );

  objEl.counter.style.display = "none";
  objEl.selectBtnIco.className = "svg-gr svg-size-sm svg-multiSelect";
  inSelection = false;
}

function selectedFilesCounter() {
  objEl.menu.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".check-li") || target.matches("[data-file-checkbox]")) {
      updateCheckList();
    }
  });
}

function updateCheckList() {
  CheckedFileLIst = Array.from(
    objEl.menu.querySelectorAll(
      "[data-file-checkbox]:checked",
    ) as NodeListOf<HTMLInputElement>,
  );
  const checkedCount = CheckedFileLIst.length;

  objEl.counter.textContent = `Files Selected: ${checkedCount}`;
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
  objEl.actionMenu.addEventListener("click", async (e) => {
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

export function updateSelectionState() {
  getCheckBoxCollection();
  updateCheckList();
  if (inSelection === true) {
    selectionEnabled();
  } else {
    selectionDisabled();
  }
}
