interface PanelButtonData {
  buttonID: string;
  spanID: string | undefined;
  buttonIcon: string | undefined;
  popoverTarget: string | undefined;
}

const buttonList: PanelButtonData[] = [
  {
    buttonID: "multiSelectButton",
    spanID: "multiSelectButtonIcon",
    buttonIcon: undefined,
    popoverTarget: undefined,
  },
  {
    buttonID: "uploadButton",
    spanID: undefined,
    buttonIcon: "upload",
    popoverTarget: undefined,
  },
  {
    buttonID: "actionMenuButton",
    spanID: undefined,
    buttonIcon: "menu",
    popoverTarget: "selectionActionMenu",
  },
  {
    buttonID: "orderButton",
    spanID: "orderButtonIcon",
    buttonIcon: undefined,
    popoverTarget: undefined,
  },
  {
    buttonID: "filterButton",
    spanID: undefined,
    buttonIcon: "filter",
    popoverTarget: "filterMenu",
  },
];

export function renderPanelButtons(): void {
  const panel = document.getElementById("buttonPanel") as HTMLDivElement;
  const fragment = document.createDocumentFragment();

  for (const buttonData of buttonList) {
    const button = createButton(buttonData);
    fragment.append(button);
  }

  panel.append(fragment);
}

function createButton(buttonData: PanelButtonData) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "primary-button depth-box";
  button.id = buttonData.buttonID;

  if (buttonData.popoverTarget) {
    button.setAttribute("popovertarget", buttonData.popoverTarget);
  }

  const validIcon: string = buttonData.buttonIcon
    ? `svg-${buttonData.buttonIcon}`
    : "";

  const validSpanID: string = buttonData.spanID
    ? `id=${buttonData.spanID}`
    : "";

  button.innerHTML = `<span ${validSpanID} class="svg-gr svg-size-sm ${validIcon}" />`;

  return button;
}
