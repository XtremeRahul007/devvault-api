interface ConfirmOptions {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
}

class ConfirmDialog {
    private dialog: HTMLDialogElement;
    private titleEl: HTMLElement;
    private messageEl: HTMLElement;
    private confirmBtn: HTMLButtonElement;
    private cancelBtn: HTMLButtonElement;
    private resolvePromise: ((value: boolean) => void) | null = null;

    constructor() {
        this.dialog = document.createElement("dialog");
        this.dialog.className = "confirm-dialog";

        this.dialog.innerHTML = `
      <form method="dialog" class="confirm-dialog-form depth-container">
        <h2 class="confirm-dialog-title"></h2>
        <p class="confirm-dialog-message"></p>
        <div class="confirm-dialog-actions">
          <button type="button" class="confirm-dialog-btn depth-box confirm-dialog-btn--cancel"></button>
          <button type="button" class="confirm-dialog-btn depth-box confirm-dialog-btn--confirm"></button>
        </div>
      </form>
    `;

        document.body.appendChild(this.dialog);

        this.titleEl = this.dialog.querySelector(".confirm-dialog-title")!;
        this.messageEl = this.dialog.querySelector(".confirm-dialog-message")!;
        this.cancelBtn = this.dialog.querySelector(".confirm-dialog-btn--cancel")!;
        this.confirmBtn = this.dialog.querySelector(".confirm-dialog-btn--confirm")!;

        this.bindEvents();
    }

    private bindEvents(): void {
        this.confirmBtn.addEventListener("click", () => this.close(true));
        this.cancelBtn.addEventListener("click", () => this.close(false));

        this.dialog.addEventListener("click", (e) => {
            const rect = this.dialog.getBoundingClientRect();
            const inDialog =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;
            if (!inDialog) this.close(false);
        });

        this.dialog.addEventListener("cancel", (e) => {
            e.preventDefault();
            this.close(false);
        });
    }

    private close(result: boolean): void {
        if (this.dialog.open) this.dialog.close();
        this.resolvePromise?.(result);
        this.resolvePromise = null;
    }

    public ask(options: ConfirmOptions): Promise<boolean> {
        const {
            title = "Please confirm",
            message,
            confirmText = "Confirm",
            cancelText = "Cancel",
            danger = false,
        } = options;

        this.titleEl.textContent = title;
        this.messageEl.textContent = message;
        this.confirmBtn.textContent = confirmText;
        this.cancelBtn.textContent = cancelText;
        this.confirmBtn.classList.toggle("confirm-dialog-btn--danger", danger);

        this.dialog.showModal();

        return new Promise<boolean>((resolve) => {
            this.resolvePromise = resolve;
        });
    }
}

export const confirmDialog = new ConfirmDialog();