import { deleteService, fileInfoService, downloadService } from "../services/fileService";
import { createInfoDialog } from "./fileInfoDialog";
import { fileIdValidator } from "./validators";

let activeFileID: string | null = null;

export function initPopUpController() {
    const container = document.getElementById("fileList");

    if (!container) return;

    const menu = createMenu();
    const dialog = createInfoDialog();

    container.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        if (!target.classList.contains("three-dot-btn")) return;

        const fileId = target.closest('li')?.dataset.fileId;

        if (!fileId) return;

        const isSameFile = menu.dataset.fileId === fileId;
        const isOpen = menu.matches(":popover-open");

        menu.dataset.fileId = fileId
        activeFileID = fileId;

        if (isOpen && isSameFile) {
            menu.showPopover();
        } else {
            menu.hidePopover();
        }
    });

    menu.addEventListener("click", async (e) => {
        const target = e.target as HTMLElement;

        const li = target.closest('li');
        if (!li) return;
        const action = li.dataset.action;

        const validateFileID = fileIdValidator(activeFileID);
        switch (action) {
            case "download":
                await downloadService(validateFileID);
                break;
            case "delete":
                await deleteService(validateFileID);
                break;
            case "info":
                await fileInfoService(validateFileID);
                dialog.showModal();
                break;
        }

        menu.hidePopover();
    });
}

const createMenu = () => {
    const menu = document.createElement('ul');

    menu.id = "file-menu";
    menu.classList.add("popupMenu", "depth-container");
    menu.popover = "auto";

    menu.innerHTML = `
        <div>
            <li data-action="download">
                <button type="button">
                    <span class="svg-gr svg-size-xsm svg-download"></span>
                    <div>Download</div>
                </button>
            </li>
            <li data-action="delete">
                <button type="button">
                    <span class="svg-gr svg-size-xsm svg-recycle"></span>
                    <div>Delete</div>
                </button>
            </li>
            <li data-action="info">
                <button type="button">
                    <span class="svg-gr svg-size-xsm svg-info"></span>
                    <div>Info</div>
                </button>
            </li>
        </div>
    `;

    document.body.append(menu);
    return menu
}