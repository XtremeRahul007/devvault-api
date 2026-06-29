import type { FileListItemDto } from "../@types/file.type";
import { formatFileSize } from "./formatFileSize";

export function renderFiles(files: FileListItemDto[]) {
    const container = document.getElementById("fileList");

    if (!container) return;

    const fragment = document.createDocumentFragment();
    files.forEach(file => {
        const li = document.createElement('li');

        li.dataset.fileId = file.id;

        li.innerHTML = `
            <div class="grid grid-cols-[auto_1fr_auto] gap-2 text-base items-baseline-last">
                <div class="fiv-viv fiv-size-sm fiv-icon-${file.extension.slice(1)}"></div>
                <div class="text-nowrap overflow-x-auto scrollbar-none">${file.name}</div>
                <div class="text-zinc-400 text-xs">${formatFileSize(file.size)}</div>
            </div>

            <button
                type="button"
                class="primary-button depth-box ml-4 three-dot-btn"
                popovertarget="file-menu"
            >
                <span class="svg-gr svg-size-sm svg-threeDots"></span>
            </button>
            `;

        fragment.append(li)
    });
    container?.replaceChildren(fragment);
}