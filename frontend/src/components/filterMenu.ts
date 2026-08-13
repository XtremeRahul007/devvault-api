import type { OrganizeState } from "../@types/file.type";
import { getCurrentOrganizeState, updateOrganizeState } from "./organizeState";

let isAscending: boolean;
let elementList: ElementList;
let currentOrganizeState: OrganizeState;

interface ElementList {
  orderButtonIcon: HTMLSpanElement;
  orderButton: HTMLButtonElement;
  menu: HTMLUListElement;
}

export function initFilterMenu() {
  initElements();
  currentOrganizeState = getCurrentOrganizeState();
  elementList.menu = createOrganizeMenu();
  setCurrentOrder();
  initToggleOrder();
  organizeBtnHandler();
}

function initElements() {
  const orderButtonIcon = document.getElementById(
    "orderButtonIcon",
  ) as HTMLSpanElement;
  const orderButton = document.getElementById(
    "orderButton",
  ) as HTMLButtonElement;
  const menu = null;

  elementList = { orderButtonIcon, orderButton, menu };
}

async function initToggleOrder() {
  elementList.orderButton.addEventListener("click", async () => {
    isAscending = currentOrganizeState.order === "asc" ? true : false;
    if (isAscending) {
      setDescendingOrder();
    } else {
      setAscendingOrder();
    }
    await updateOrganizeState();
  });
}

function setCurrentOrder() {
  isAscending = currentOrganizeState.order === "asc" ? true : false;
  if (isAscending) {
    setAscendingOrder();
  } else {
    setDescendingOrder();
  }
}

function setAscendingOrder() {
  currentOrganizeState.order = "asc";
  elementList.orderButtonIcon.className = "svg-gr svg-size-sm svg-ascending";
}

function setDescendingOrder() {
  currentOrganizeState.order = "desc";
  elementList.orderButtonIcon.className = "svg-gr svg-size-sm svg-descending";
}

function organizeBtnHandler() {
  elementList.menu.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    const li = target.closest("li");
    if (!li) return;

    const action = li.dataset.action;

    switch (action) {
      case "sortByName":
        currentOrganizeState.sort = "name";
        break;
      case "sortBySize":
        currentOrganizeState.sort = "size";
        break;
      case "sortByTime":
        currentOrganizeState.sort = "uploadedAt";
        break;
    }
    updateOrganizeState();
  });
}

function createOrganizeMenu() {
  const menu = document.createElement("ul");

  menu.id = "filterMenu";
  menu.classList.add("popupMenu", "depth-container");
  menu.popover = "auto";

  menu.innerHTML = `
    <div>
        <li data-action="sortByName">
            <button type="button">
                <span class="svg-gr svg-size-sm svg-sortByName"></span>
                <div>Sort By Name</div>
            </button>
        </li>
        <li data-action="sortBySize">
            <button type="button">
                <span class="svg-gr svg-size-sm svg-sortBySize"></span>
                <div>Sort By Size</div>
            </button>
        </li>
        <li data-action="sortByTime">
            <button type="button">
                <span class="svg-gr svg-size-sm svg-sortByTime"></span>
                <div>Sort By Date</div>
            </button>
        </li>
    </div>
    `;

  document.body.append(menu);
  return menu;
}
