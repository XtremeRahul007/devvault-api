import { uploadFiles } from "../api/file.api";
import { confirmDialog } from "./confirmDialog ";
import { formatFileSize } from "./formatFileSize";
import { validatedFiles } from "./validators";

const maxFileSize = Number(import.meta.env.VITE_MAX_FILE_SIZE);

let uploadState: File[] = [];

export function initUploadFile() {
    const menu = createUplodContainer();

    bindOpenHandler(menu);
    bindCloseHandler(menu);
    bindFileSelection();
    bindSubmit(menu);
}

const createUplodContainer = () => {
    const dialog = document.createElement('dialog');

    dialog.className = "upload-dialog";

    dialog.innerHTML = `
        <div class="upload-wrapper depth-container">
            <div class="flex flex-row justify-between">
                <p class="text-xl text-(--secondary-color)">Upload your files</p>
                <button type="button" class="primary-button active:scale-95 transition-transform duration-150 ease-in-out" id="closeUploadComtainer">
                    <span class="svg-gr svg-size-sm svg-close"></span>
                </button>
            </div>
            <div class="flex flex-col justify-center items-center bg-(--secondary-bg) rounded-md p-4 primary-inset-container gap-4">
                <label for="fileInput" class="svg-gr svg-size-lg svg-upload text-(--tertiary-color)"></label>
                <input class="hidden" type="file" id="fileInput" name="fileInput" multiple></input>
                <p class="text-(--tertiary-color)">Ready to upload, Max files size is <strong>${formatFileSize(maxFileSize)}</strong>.</p>
                <button type="submit" class="depth-box px-2 py-1 rounded-lg bg-(--secondary-bg) text-(--secondary-color) active:scale-95 transition-transform duration-150 ease-in-out" id="submitUpload">Submit Upload</button>
            </div>
        </div>
    `;

    document.body.append(dialog);
    return dialog as HTMLDialogElement;
}

const bindOpenHandler = (menu: HTMLDialogElement) => {
    const uploadBtn = document.getElementById("uploadButton") as HTMLButtonElement;

    uploadBtn?.addEventListener("click", () => {
        menu.showModal();
        resetInput();
        removeFileInfoList();
    });
};

const bindCloseHandler = (menu: HTMLDialogElement) => {
    menu.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".upload-wrapper") || target.closest("#closeUploadComtainer")) {
            menu.close();
            resetInput();
            removeFileInfoList();
        }
    });
};

const bindFileSelection = () => {
    const inputField = document.getElementById("fileInput") as HTMLInputElement;

    inputField.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        const files: FileList | null = target.files;
        removeFileInfoList();

        const validResult = validatedFiles(files);
        if (validResult !== null) {
            uploadState = validResult
        } else {
            return;
        }

        createFileInfoList(uploadState);
    });
};

const bindSubmit = (menu: HTMLDialogElement) => {
    const submit = menu.querySelector("#submitUpload") as HTMLButtonElement;


    submit.addEventListener("click", async () => {
        const inputField = document.getElementById("fileInput") as HTMLInputElement;

        if (uploadState.length === 0) {
            inputField.click();
            return;
        }

        const confirmed = await confirmDialog.ask({
            title: "Confirm your upload",
            message: "Please review your file before submitting. Once uploaded, this action cannot be undone.",
            confirmText: "Confirm & Upload",
            cancelText: "Change File",
            danger: false
        });

        if (!confirmed) return

        if (confirmed === true) {
            uploadFiles(uploadState);
        }
    });
};

const createFileInfoList = (fileList: File[]) => {
    if (fileList.length === 0) return;

    const wrapper = document.querySelector(".upload-wrapper") as HTMLDivElement;

    const container = document.createElement('div');
    const head = document.createElement('p');
    const list = document.createElement('ol');

    container.className = "file-info-container";
    head.className = "file-info-header";
    list.className = "file-info-list";

    head.textContent = "Please review your file before submitting:";

    const fragment = document.createDocumentFragment();

    let itemNumber: number = 1;
    fileList.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<p>${itemNumber}. ${file.name} (${formatFileSize(file.size)})</p>`;

        fragment.append(li);
        itemNumber++;
    });

    list.append(fragment);
    container?.append(head, list);
    wrapper?.append(container);

    return container;
}

const removeFileInfoList = () => {
    const infoList = document.querySelector(".file-info-container") as HTMLDivElement;
    infoList?.remove();
    uploadState = [];
}

const resetInput = () => {
    const inputField = document.getElementById("fileInput") as HTMLInputElement;
    if (!inputField) return;
    inputField.value = '';
}