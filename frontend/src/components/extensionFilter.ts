import type { FileListItemDto } from "../@types/file.type";
import { getCurrentOrganizeState, updateOrganizeState } from "./organizeState";

let extensionList: string[] = [];

interface ExtensionElements {
  extensionMenuList: HTMLUListElement | undefined;
  extensionMenuHeading: HTMLHeadingElement | undefined;
}

const extensionElements: ExtensionElements = {
  extensionMenuList: undefined,
  extensionMenuHeading: undefined,
};

export function initExtensionFilter() {
  createExtensionMenu();
  extensionFilterHandler();
}

export async function getExtensionList(files: FileListItemDto[]) {
  const extensions = new Set<string>();
  for (const file of files) {
    extensions.add(file.extension);
  }
  extensionList = Array.from(extensions, (value) => value.slice(1));

  if (extensionList.length > 0) {
    extensionElements.extensionMenuHeading.textContent = "Select File Type:";
  } else {
    extensionElements.extensionMenuHeading.textContent = "No File Found!";
  }
  addListItems();
}

function extensionFilterHandler() {
  extensionElements.extensionMenuList.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const listItem = target.closest("li");
    if (!listItem) return;
    const extension = target.dataset.extension;
    setExtensionFilter(extension);
  });
}

function addListItems() {
  const fragment = document.createDocumentFragment();
  for (const extension of extensionList) {
    const list = document.createElement("li");

    list.dataset.extension = extension ?? "unknown";
    list.className = "flex flex-row gap-2.5";
    list.innerHTML = `
      <div class="fiv-viv fiv-size-sm fiv-icon-${extension}"></div>
      <div>${extension}</div>
      `;

    fragment.append(list);
  }
  extensionElements.extensionMenuList.append(fragment);
}

function createExtensionMenu() {
  const menu = document.createElement("div") as HTMLDivElement;
  const heading = document.createElement("h6") as HTMLHeadingElement;
  const listContainer = document.createElement("ul") as HTMLUListElement;

  menu.id = "extensionMenu";
  menu.className =
    "popupMenu depth-container overflow-hidden flex flex-col gap-1";
  menu.popover = "auto";

  heading.className = "text-(--primary-color) font-medium px-1";

  listContainer.className =
    "max-h-40 w-40 overflow-y-auto scrollbar-thin scrollbar-thumb-(--tertiary-color) rounded-md p-1 flex flex-col gap-2";

  extensionElements.extensionMenuList = listContainer as HTMLUListElement;
  extensionElements.extensionMenuHeading = heading as HTMLHeadingElement;

  document.body.append(menu);
  menu.append(heading);
  menu.append(listContainer);
  return listContainer;
}

function setExtensionFilter(extension: string) {
  const organizeState = getCurrentOrganizeState();
  organizeState.extension = extension;
  updateOrganizeState();
}
