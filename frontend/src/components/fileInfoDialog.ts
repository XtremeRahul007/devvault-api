import type { FileInfo } from "../@types/file.type";
import { formatFileSize } from "./formatFileSize";

export function updateInfoDialog(info: FileInfo | undefined) {
    const wrapper = document.querySelector(".dialog-int-wrapper") as HTMLDivElement;
    if (typeof info !== 'object' || info == undefined) {
        console.error("Invalid File information");
        return;
    }

    wrapper.innerHTML = `
    <div class="flex flex-row justify-between items-center font-bold">
        <div class="text-lg text-(--tertiary-color) ml-1">Info</div>
        <button data-action="close" type="button" class="primary-button active:scale-95">
            <span class="svg-gr svg-size-sm svg-close pointer-events-none"></span>
        </button>
    </div>
    <p>File name: ${info.name}</p>
    <p>File type: ${(info.extension).slice(1)}</p>
    <p>File size: ${formatFileSize(info.size)}</p>
    <p>Uploaded at: ${new Date(info.uploadedAt)}</p>
    `;
}

export const createInfoDialog = () => {
    const dialog = document.createElement('dialog');
    const wrapper = document.createElement('div');

    dialog.id = "fileInfoDialog";
    dialog.className = "info-dialog";
    wrapper.classList.add("dialog-int-wrapper", "depth-container");

    wrapper.innerHTML = `
    <div class="flex flex-row justify-between items-center font-bold">
        <div class="text-lg text-(--tertiary-color) ml-1">Info</div>
        <button data-action="close" type="button" class="primary-button active:scale-95">
            <span class="svg-gr svg-size-sm svg-close pointer-events-none"></span>
        </button>
    </div>
    <p>File name: originalName</p>
    <p>File type: extension</p>
    <p>File size: info.size</p>
    <p>Uploaded at: info.uploadedAt</p> 
    `;
    dialog.append(wrapper);
    document.body.append(dialog);

    dialog.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".dialog-int-wrapper")) {
            dialog.close();
        }
        if (target.dataset.action === "close") {
            dialog.close();
        }
    });

    return dialog;
}
