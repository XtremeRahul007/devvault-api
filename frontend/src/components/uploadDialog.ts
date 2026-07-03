import { uploadService } from "../services/fileService";
import { formatFileSize } from "./formatFileSize";
import { validatedFiles } from "./validators";

const maxFileSize = Number(import.meta.env.VITE_MAX_FILE_SIZE);

let uploadState: File[] = [];
let isFilesUploading: boolean = false;
let progressElements: {
    size: HTMLDivElement;
    percentage: HTMLDivElement;
    bar: HTMLDivElement;
    speed: HTMLDivElement;
} | null = null;


export function initUploadFile() {
    const menu = createUploadContainer();

    bindOpenHandler(menu);
    bindCloseHandler(menu);
    bindFileSelection();
    bindSubmit(menu);
}

const createUploadContainer = () => {
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
        if (!isFilesUploading) {
            removeFileInfoList();
        }
    });
};

const bindCloseHandler = (menu: HTMLDialogElement) => {
    menu.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".upload-wrapper") || target.closest("#closeUploadComtainer")) {
            menu.close();
            resetInput();
        }

        if (!isFilesUploading && (!target.closest(".upload-wrapper") || target.closest("#closeUploadComtainer"))) {
            removeFileInfoList();
            removeProgressContainer();
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
        const serviceCalled = await uploadService(uploadState);
        if (serviceCalled) {
            createProgressBar(menu);
            resetInput();
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

const createProgressBar = (menu: HTMLDialogElement) => {
    const wrapper = menu.querySelector(".upload-wrapper") as HTMLDivElement;
    const div = document.createElement('div');
    div.className = "progress-container";

    div.innerHTML = `
        <div id="progressData" class="flex flex-row justify-between mx-1">
            <div id="progressPercentage" class="text-(--secondary-color)">??%</div>
            <div id="progressSize" class="text-(--secondary-color)">??/??</div>
        </div>
        <div class="flex flex-row p-2 rounded-lg primary-inset-container">
            <div id="progressBar" class="h-2 rounded-lg bg-(--blue-element-bg) depth-container transition-all duration-100 ease-in-out"></div>
        </div>
        <div id="uploadSpeed" class="text-(--secondary-color)"></div>
        `;

    wrapper.append(div);

    progressElements = {
        size: div.querySelector("#progressSize") as HTMLDivElement,
        percentage: div.querySelector("#progressPercentage") as HTMLDivElement,
        bar: div.querySelector("#progressBar") as HTMLDivElement,
        speed: div.querySelector("#uploadSpeed") as HTMLDivElement
    }
}

const removeFileInfoList = () => {
    document.querySelector(".file-info-container")?.remove();
    uploadState = [];
}

const removeProgressContainer = () => {
    document.querySelector(".progress-container")?.remove();
    progressElements = null;
}

const resetInput = () => {
    const inputField = document.getElementById("fileInput") as HTMLInputElement;
    if (!inputField) return;
    inputField.value = '';
    uploadState = [];
}

export const updateProgress = (loaded: number, totalSize: number, speed: number) => {
    if (!progressElements) return;
    const percent = Math.round((loaded / totalSize) * 100);

    progressElements.size.textContent = `${formatFileSize(loaded)}/${formatFileSize(totalSize)}`;
    progressElements.percentage.textContent = `${percent}%`;
    progressElements.bar.style.width = `${percent}%`;
    progressElements.speed.textContent = `Current upload speed: ${formatFileSize(speed)}/s`;
}

export const fileUploadingState = (isUploading: boolean) => {
    const submitBtn = document.querySelector("#submitUpload") as HTMLButtonElement;

    isFilesUploading = isUploading;

    if (isUploading) {
        submitBtn.disabled = true;
    } else {
        submitBtn.disabled = false;
    }
}